"""Setzt feste Pfade (/bilder/…, /kontakt) auf /<VORSCHAU_PFAD>/… und bricht ab, wenn danach ein Verweis ins Leere zeigt.
Next.js und Astro setzen den Grundpfad nur bei eigenen Links davor, nicht bei Bildern und einfachen Links."""
import os, re, shutil, sys

pfad = os.environ["VORSCHAU_PFAD"].strip("/")
OUT = os.environ.get("OUT", "out")
ART = os.environ.get("ART", "next")
oeffentlich = os.listdir("public") if os.path.isdir("public") else []
# Mehrsprachige Seiten (app/[lang], Deutsch ohne Präfix über proxy.ts): der Proxy läuft in der Datei-Fassung nicht,
# darum kommt die deutsche Fassung aus de/ nach oben (vorhandene Dateien bleiben)
if not os.path.isfile(os.path.join(OUT, "index.html")) and os.path.isfile(os.path.join(OUT, "de", "index.html")):
    def zusammen(q, z):  # Ordner gleichen Namens (Seite „bilder“ + Bilder-Ordner) zusammenführen, nichts überschreiben
        if os.path.isdir(q):
            os.makedirs(z, exist_ok=True)
            for n in os.listdir(q):
                zusammen(os.path.join(q, n), os.path.join(z, n))
        elif not os.path.exists(z):
            shutil.copy2(q, z)
    zusammen(os.path.join(OUT, "de"), OUT)
    print("Deutsche Fassung aus de/ nach oben gelegt")
seiten = [d for d in os.listdir(OUT)
          if os.path.isfile(os.path.join(OUT, d, "index.html")) and d not in ("_next", "_astro", "_not-found", "404")]
if ART == "html":
    seiten += [d for d in os.listdir(OUT) if not d.startswith(".")]
else:
    # Dateien, die Next/Astro selbst oben ablegen (app/icon.png, apple-icon, favicon, Manifest)
    seiten += [d for d in os.listdir(OUT) if os.path.isfile(os.path.join(OUT, d))
               and d.endswith((".png", ".ico", ".svg", ".jpg", ".jpeg", ".webp", ".webmanifest", ".xml"))]
namen = "|".join(re.escape(n) for n in sorted(set(oeffentlich + seiten), key=len, reverse=True))
muster = re.compile(r"""(["'`(=,\s]|\\")/(%s)(?=[/"'`)\s?#\\]|$)""" % namen) if namen else None
start = [('href="/"', f'href="/{pfad}/"'), ('\\"href\\":\\"/\\"', f'\\"href\\":\\"/{pfad}/\\"'), ('"href":"/"', f'"href":"/{pfad}/"'),
         ('href="/#', f'href="/{pfad}/#'), ('href="/?', f'href="/{pfad}/?')]

for wurzel, _, dateien in os.walk(OUT):
    for name in dateien:
        if not name.endswith((".html", ".js", ".css", ".txt", ".json")):
            continue
        datei = os.path.join(wurzel, name)
        text = open(datei, encoding="utf-8", errors="surrogateescape").read()
        neu = muster.sub(lambda m: f"{m.group(1)}/{pfad}/{m.group(2)}", text) if muster else text
        for alt, ersatz in start:
            neu = neu.replace(alt, ersatz)
        if neu != text:
            open(datei, "w", encoding="utf-8", errors="surrogateescape").write(neu)

fehler, hinweise, gesamt = set(), set(), 0
for wurzel, _, dateien in os.walk(OUT):
    for name in dateien:
        if not name.endswith(".html"):
            continue
        text = open(os.path.join(wurzel, name), encoding="utf-8", errors="replace").read()
        for m in re.finditer(r"""(?:src|href|poster|content|srcSet|srcset)="([^"]+)"|url\(([^)]+)\)""", text):
            for url in (m.group(1) or m.group(2) or "").split(","):
                url = url.strip().strip("\"'").split(" ")[0]
                if not url.startswith("/") or url.startswith("//"):
                    continue
                gesamt += 1
                if not url.startswith(f"/{pfad}/"):
                    rest = url[1:].split("?")[0].split("#")[0]
                    ziel = os.path.join(OUT, rest)
                    if rest and (os.path.isfile(ziel) or os.path.isfile(os.path.join(ziel, "index.html"))
                                 or os.path.isfile(ziel.rstrip("/") + ".html")):
                        fehler.add(f"ohne Vorschau-Pfad: {url}")
                    else:
                        hinweise.add(f"Link ins Leere (auch auf der echten Seite): {url}")
                    continue
                rest = url[len(pfad) + 2:].split("?")[0].split("#")[0]
                ziel = os.path.join(OUT, rest)
                if rest and not (os.path.isfile(ziel) or os.path.isfile(os.path.join(ziel, "index.html"))
                                 or os.path.isfile(ziel.rstrip("/") + ".html")):
                    # Bild/Datei, die schon im Repo fehlt (nur auf dem Mac, nie gepusht): fehlt auch auf der echten Seite
                    if "." in rest.rstrip("/").split("/")[-1] and not os.path.isfile(os.path.join("public", rest)):
                        hinweise.add(f"Datei fehlt schon im Repo: {url}")
                    else:
                        fehler.add(f"Datei fehlt: {url}")

print(f"{gesamt} Verweise geprüft, {len(fehler)} Probleme, {len(hinweise)} Hinweise")
for h in sorted(hinweise)[:30]:
    print("  Hinweis: " + h)
for f in sorted(fehler)[:30]:
    print("  " + f)
sys.exit(1 if fehler else 0)
