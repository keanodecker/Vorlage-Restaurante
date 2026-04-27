'use client'

import { useEffect, useState } from 'react'

// JS getDay(): 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
// Our list index: 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
function getTodayIndex(): number {
  const jsDay = new Date().getDay()
  if (jsDay === 0) return 6  // Sunday → index 6
  return jsDay - 1           // Mon=0 … Sat=5
}

const schedule = [
  { day: 'Montag',     time: 'Geschlossen',                    closed: true  },
  { day: 'Dienstag',   time: '11:30 – 14:00  &  17:00 – 22:00', closed: false },
  { day: 'Mittwoch',   time: '11:30 – 14:00  &  17:00 – 22:00', closed: false },
  { day: 'Donnerstag', time: '11:30 – 14:00  &  17:00 – 22:00', closed: false },
  { day: 'Freitag',    time: '11:30 – 14:00  &  17:00 – 22:00', closed: false },
  { day: 'Samstag',    time: '12:00 – 22:00',                   closed: false },
  { day: 'Sonntag',    time: '12:00 – 21:00',                   closed: false },
]

export default function OpeningHours() {
  const [todayIndex, setTodayIndex] = useState<number>(-1)

  useEffect(() => {
    setTodayIndex(getTodayIndex())

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      gsap.fromTo(
        '.hours-inner > *',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.hours', start: 'top 75%' },
        }
      )
    }

    init()
  }, [])

  return (
    <section className="hours" id="hours">
      <div className="hours-inner">
        <span className="section-label">Wir sind für Sie da</span>
        <h2 className="hours-headline">Öffnungszeiten</h2>
        <div className="hours-divider" />

        <ul className="hours-list" aria-label="Öffnungszeiten">
          {schedule.map((item, i) => {
            const isToday = i === todayIndex
            const isClosed = item.closed
            let className = 'hours-row'
            if (isClosed) className += ' hours-closed'
            if (isToday) className += ' hours-today'

            return (
              <li key={item.day} className={className}>
                <span className="hours-day">
                  {item.day}
                  {isToday && <span className="hours-today-badge">Heute</span>}
                </span>
                <span className="hours-time">{item.time}</span>
              </li>
            )
          })}
        </ul>

        <div className="hours-phone">
          <span className="hours-phone-label">Reservierung &amp; Anfragen</span>
          <a href="tel:078219769376" className="hours-phone-number" aria-label="Anrufen: 07821 9769376">
            07821 9769376
          </a>
        </div>
      </div>
    </section>
  )
}
