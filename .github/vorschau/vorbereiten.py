"""Stellt die Seite auf eine Datei-Fassung unter /<VORSCHAU_PFAD> um (Next.js, Astro oder reines HTML).
Läuft nur auf GitHub, nie lokal committen. Schreibt ART (next|astro|html) und OUT (Ausgabeordner) nach $GITHUB_ENV."""
import glob, json, os, shutil, sys

pfad = os.environ.get("VORSCHAU_PFAD", "").strip("/")
if not pfad:
    sys.exit("VORSCHAU_PFAD fehlt (GitHub → Settings → Variables)")

abh = {}
if os.path.isfile("package.json"):
    p = json.load(open("package.json"))
    abh = {**p.get("dependencies", {}), **p.get("devDependencies", {})}
art = "next" if "next" in abh else "astro" if "astro" in abh else "html"

if art == "next":
    out = "out"
    for alt in glob.glob("next.config.*"):
        os.remove(alt)
    with open("next.config.ts", "w") as f:
        f.write(f"""import type {{ NextConfig }} from 'next'
import path from 'node:path'
const nextConfig: NextConfig = {{
  output: 'export',
  basePath: '/{pfad}',
  trailingSlash: true,
  turbopack: {{ root: path.resolve(__dirname) }},
  images: {{ unoptimized: true }},
}}
export default nextConfig
""")
    # robots/sitemap brauchen einen Server; die Vorschau sperrt Suchmaschinen über die robots.txt der Wurzel
    for muster in ("app/robots.*", "app/sitemap.*", "src/app/robots.*", "src/app/sitemap.*"):
        for datei in glob.glob(muster):
            os.remove(datei)
    # Server-Routen (Formular-Versand) laufen in der Datei-Fassung nicht
    for ordner in ("app/api", "src/app/api"):
        shutil.rmtree(ordner, ignore_errors=True)
    # Seiten, die die Adresszeile auf dem Server lesen (searchParams), gehen als Datei nicht: in der Vorschau leer
    import re
    for datei in glob.glob("app/**/page.*", recursive=True) + glob.glob("src/app/**/page.*", recursive=True):
        text = open(datei, encoding="utf-8").read()
        neu = re.sub(r"await\s+searchParams\b", "({} as any)", text)
        if neu != text:
            open(datei, "w", encoding="utf-8").write(neu)
            print(f"searchParams in der Vorschau leer: {datei}")
    with open(".env.production.local", "a") as f:
        f.write("NEXT_PUBLIC_VORSCHAU=1\n")

elif art == "astro":
    out = "dist"
    alt = (glob.glob("astro.config.*") or [None])[0]
    endung = alt.split("astro.config.")[1] if alt else None
    if alt:
        os.rename(alt, f"astro.vorschau-original.{endung}")
    with open("astro.config.mjs", "w") as f:
        imp = f"import original from './astro.vorschau-original.{endung}'\n" if alt else "const original = {}\n"
        f.write(imp + f"""export default {{ ...original, output: 'static', base: '/{pfad}', trailingSlash: 'ignore' }}
""")

else:
    # Reine HTML-Seite: Dateien in out/ sammeln, ohne Arbeitsmaterial (alte Website, Notizen, lokaler Server)
    out = "out"
    quelle = "." if os.path.isfile("index.html") else "website" if os.path.isfile("website/index.html") else None
    if not quelle:
        sys.exit("keine index.html gefunden")
    weg = {".git", ".github", "node_modules", "alt-website", "alte-website-material", "quelle.html", "server.mjs",
           "vercel.json", "package.json", "package-lock.json", "out", ".gitignore", ".vercelignore"}
    os.makedirs(out, exist_ok=True)
    for name in os.listdir(quelle):
        if name in weg or name.endswith(".md") or name.startswith("."):
            continue
        q = os.path.join(quelle, name)
        (shutil.copytree if os.path.isdir(q) else shutil.copy2)(q, os.path.join(out, name))

if "GITHUB_ENV" in os.environ:
    with open(os.environ["GITHUB_ENV"], "a") as f:
        f.write(f"ART={art}\nOUT={out}\n")
print(f"Vorschau-Fassung ({art}) für /{pfad} vorbereitet, Ausgabe {out}/")
