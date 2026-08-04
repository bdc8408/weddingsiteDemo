import { useEffect, useMemo, useRef, useState } from 'react'

const weddingDate = new Date('2026-08-01T15:00:00-04:00')
const weddingEndDate = new Date('2026-08-01T23:00:00-04:00')
const weddingTitle = 'Alex Morgan & Jordan Rivera Celebration Demo'
const weddingLocation = 'Private Venue, Finger Lakes, NY'
const weddingDescription =
  'Join us for a sample celebration site demo. Shuttle transport is required and departure details are sent after RSVP.'

const navLinks = [
  { id: 'hero', label: 'Start' },
  { id: 'countdown', label: 'Date' },
  { id: 'photos', label: 'Photos' },
  { id: 'explore', label: 'Explore' },
  { id: 'faq', label: 'FAQ' },
  { id: 'registry', label: 'Stay + Registry' },
  { id: 'rsvp', label: 'RSVP' },
]

const galleryImages = [
  'gallery-1.jpg',
  'gallery-2.jpg',
  'gallery-3.jpg',
  'gallery-4.jpg',
  'gallery-5.jpg',
  'gallery-6.jpg',
]

const faqItems = [
  {
    question: 'Where will the wedding be?',
    answer:
      'This demo uses a private venue in New York to model a real event flow.',
  },
  {
    question: 'Are kids allowed?',
    answer: 'This will be an adults-only celebration (18+).',
  },
  {
    question: 'Can I bring a plus one?',
    answer:
      'Guest limits are controlled in the RSVP portal and shown per invitation.',
  },
  {
    question: 'Will this be indoors or outdoors?',
    answer:
      'Both the ceremony and reception will be outdoors, rain or shine — here\'s hoping for a beautiful day!',
  },
  {
    question: 'What should I wear?',
    answer:
      'Cocktail/semi-formal attire is strongly encouraged. For shoes, the grounds are a mix of patio and lawn/grass. so dress accordingly!',
  },
  {
    question: "What's for dinner? What if I have dietary restrictions?",
    answer:
      "Dinner will be barbecue! We think we are aware of all dietary needs, but fill out the RSVP form with any restrictions or allergies we should know about.",
  },
  {
    question: 'How do I get there?',
    answer:
      'Shuttle pickup details are shared directly with confirmed guests. Private venue parking is not available.',
    highlighted: true,
  },
  {
    question: 'Can this template be reused?',
    answer: 'Yes. This version is intentionally anonymized so it can be shared publicly as a portfolio sample.',
  },
  {
    question: 'Will there be dancing?',
    answer:
      'Absolutely. This section is a stand-in for your own personality and reception plans.',
  },
  {
    question: "How's planning going?",
    answer:
      "Things are ramping up! We've been having fun picking out details and are so excited to celebrate with everyone!",
  },
  {
    question: "When do I need to RSVP by?",
    answer:
      'Please RSVP by June 13, 2026 so transport and catering counts stay accurate.',
  },
    {
    question: "When will shuttles return?",
    answer:
      "Shuttles will return after the reception ends. The first shuttle will depart around 8:30 PM.",
  },
  {
    question: "The hotel block is for two days but I only want to stay one night?",
    answer: "Use the booking link's edit controls to adjust check-in and check-out dates before confirming."
  },
  {
    question: "Check-in is at 3 PM but the shuttle leaves at 3:10 PM, will I have time to get to the hotel and drop off my stuff?",
    answer: 'In this demo scenario, we recommend early check-in or direct shuttle pickup from the designated lot.'
  },
      {
    question: "This website is great, who made it?",
    answer:
      'This demo was built as a public-safe sample site to show layout, interaction, and content architecture.',
  },
  
]

const areaSpots = [
  {
    name: 'Dr. Konstantin Frank Winery',
    vibe: 'A classic Finger Lakes stop with tastings and great scenery.',
    href: 'https://www.google.com/maps/search/?api=1&query=Dr.+Konstantin+Frank+Winery',
  },
  {
    name: 'Lakeside State Park',
    vibe: 'Lakeside trails, beach access, and picnic spots for a relaxed daytime stop.',
    href: 'https://www.google.com/maps/search/?api=1&query=Lakeside+State+Park+New+York',
  },
  {
    name: 'Historic Main Street',
    vibe: 'Walkable downtown with coffee, shops, and casual pre-wedding hangs.',
    href: 'https://www.google.com/maps/search/?api=1&query=Historic+Main+Street+Finger+Lakes',
  },
  {
    name: 'The Windmill Farm & Craft Market',
    vibe: 'A local market with food stands and crafts if you are in town on Saturday.',
    href: 'https://www.google.com/maps/search/?api=1&query=The+Windmill+Farm+and+Craft+Market',
  },
  {
    name: 'Watkins Glen State Park',
    vibe: 'Dramatic gorge trail with waterfalls, ideal for a day trip.',
    href: 'https://www.google.com/maps/search/?api=1&query=Watkins+Glen+State+Park',
  },
  {
    name: 'Hilltop Vineyards',
    vibe: 'Favorite local vineyard with lake-facing views and easy afternoon tastings.',
    href: 'https://www.google.com/maps/search/?api=1&query=Hilltop+Vineyards+New+York',
  },
  {
    name: 'Lakeside Country Club',
    vibe: 'Nearby golf option for guests making a full weekend of it.',
    href: 'https://www.google.com/maps/search/?api=1&query=Lakeside+Country+Club+Finger+Lakes',
  },
]

function getCountdownParts(targetDate) {
  const distance = targetDate.getTime() - Date.now()
  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, complete: true }
  }
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    complete: false,
  }
}

function formatGoogleCalendarDate(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')
}

function makeAppleCalendarIcs({ title, description, location, startDate, endDate }) {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${startDate.getTime()}@demo.wedding`,
    `DTSTAMP:${formatGoogleCalendarDate(new Date())}`,
    `DTSTART:${formatGoogleCalendarDate(startDate)}`,
    `DTEND:${formatGoogleCalendarDate(endDate)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

function useRevealOnScroll() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function RevealSection({ children, className = '', ...props }) {
  const ref = useRevealOnScroll()
  return (
    <div ref={ref} className={`reveal ${className}`} {...props}>
      {children}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [countdown, setCountdown] = useState(() => getCountdownParts(weddingDate))
  const [openQuestion, setOpenQuestion] = useState(-1)
  const [heroReady, setHeroReady] = useState(false)
  const [topbarSolid, setTopbarSolid] = useState(false)

  const countdownParts = useMemo(
    () => [
      { label: 'Days', value: countdown.days },
      { label: 'Hours', value: countdown.hours },
      { label: 'Minutes', value: countdown.minutes },
      { label: 'Seconds', value: countdown.seconds },
    ],
    [countdown],
  )

  const googleCalendarUrl = useMemo(() => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: weddingTitle,
      dates: `${formatGoogleCalendarDate(weddingDate)}/${formatGoogleCalendarDate(weddingEndDate)}`,
      location: weddingLocation,
      details: weddingDescription,
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }, [])

  const appleCalendarUrl = useMemo(() => {
    const ics = makeAppleCalendarIcs({
      title: weddingTitle,
      description: weddingDescription,
      location: weddingLocation,
      startDate: weddingDate,
      endDate: weddingEndDate,
    })
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownParts(weddingDate))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const t = window.setTimeout(() => setHeroReady(true), 400)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const heroEl = document.getElementById('hero')
    if (!heroEl) return
    const observer = new IntersectionObserver(
      ([entry]) => setTopbarSolid(!entry.isIntersecting),
      { threshold: 0.05 },
    )
    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: 0.15 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const jumpToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  return (
    <>
      {/* ─── Header ─── */}
      <header className={`topbar ${topbarSolid ? 'is-solid' : ''}`}>
        <button
          type="button"
          className={`menu-btn ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
        >
          <span /><span /><span />
        </button>
        <a className="brandmark" href="#hero" onClick={() => setMenuOpen(false)}>
          H&nbsp;+&nbsp;B
        </a>
        <a className="topbar-rsvp" href="https://example.com/rsvp" target="_blank" rel="noreferrer">
          RSVP
        </a>
      </header>

      {/* ─── Nav overlay ─── */}
      <nav id="site-nav" className={`menu-panel ${menuOpen ? 'is-open' : ''}`} aria-label="Jump to section">
        <div className="menu-panel-inner">
          <p className="menu-eyebrow">Jump to</p>
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`menu-link ${activeSection === link.id ? 'is-active' : ''}`}
              onClick={() => jumpToSection(link.id)}
            >
              {link.label}
            </button>
          ))}
          <a className="menu-rsvp-link" href="https://example.com/rsvp" target="_blank" rel="noreferrer">
            Open RSVP
          </a>
        </div>
      </nav>

      <main>
        {/* ═══ HERO — sticky, full-bleed ═══ */}
        <section id="hero" className="hero" data-section>
          <img
            className="hero-bg"
            src="/assets/photos/hero-main.jpg"
            onError={(e) => { e.currentTarget.src = '/assets/photos/hero-main.svg' }}
            alt="Couple portrait placeholder artwork"
          />
          <div className="hero-overlay" />
          <div className={`hero-copy ${heroReady ? 'is-ready' : ''}`}>
            <p className="eyebrow">August 1, 2026 · Finger Lakes</p>
            <h1>
              <span className="hero-name">Alex Morgan</span>
              <span className="hero-amp">and</span>
              <span className="hero-name">Jordan Rivera</span>
            </h1>
          </div>
          <button
            type="button"
            className="scroll-cue"
            onClick={() => jumpToSection('countdown')}
            aria-label="Scroll to details"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </section>

        {/* ═══ COUNTDOWN — slides up over hero ═══ */}
        <section id="countdown" className="countdown" data-section>
          <img
            className="countdown-bg"
            src="/assets/photos/countdown-bg.jpg"
            onError={(e) => { e.currentTarget.src = '/assets/photos/countdown-bg.svg' }}
            alt=""
            aria-hidden="true"
          />
          <div className="countdown-bg-overlay" />
          <div className="countdown-inner">
            <RevealSection className="countdown-content">
              <p className="eyebrow light">Save The Date</p>
              <h2>August 1st · 3:00 PM</h2>
              <p className="countdown-location">Private venue and shuttle pickup details are shared after RSVP confirmation.</p>
              <p className="rsvp-deadline">RSVPs due by June 13th</p>

              <div className="countdown-grid">
                {countdownParts.map((part) => (
                  <div className="countdown-cell" key={part.label}>
                    <span className="countdown-value">{String(part.value).padStart(2, '0')}</span>
                    <span className="countdown-label">{part.label}</span>
                  </div>
                ))}
              </div>

              <div className="shuttle-callout">
                <span className="shuttle-icon" aria-hidden="true">🚐</span>
                <div>
                  <strong>Mandatory shuttle notice</strong>
                  <p>Shuttles are required for all guests. There is no on-site parking at the venue, so arrive early for pickup.</p>
                </div>
              </div>

              <div className="countdown-actions">
                <a className="btn btn-primary" href={googleCalendarUrl} target="_blank" rel="noreferrer">
                  Add to Google Calendar
                </a>
                <a className="btn btn-secondary" href={appleCalendarUrl} download="demo-wedding-event.ics">
                  Add to Apple Calendar
                </a>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ═══ PHOTOS — engagement gallery mini-grid ═══ */}
        <section id="photos" className="section" data-section>
          <div className="container">
            <RevealSection>
              <p className="eyebrow dark">Our Engagement</p>
              <h2 className="section-title">A few of our favorites.</h2>
            </RevealSection>

            <div className="gallery-grid">
              {galleryImages.map((img, i) => (
                <div className="gallery-item" key={img}>
                  <img
                    src={`/assets/photos/${img}`}
                    onError={(e) => {
                      e.currentTarget.src = `/assets/photos/${img.replace('.jpg', '.svg')}`
                    }}
                    alt={`Engagement photo ${i + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="gallery-cta">
              <a className="btn btn-gold" href="https://example.com/gallery" target="_blank" rel="noreferrer">
                Explore a full sample gallery →
              </a>
            </div>
          </div>
        </section>

        {/* ═══ EXPLORE — map + spots ═══ */}
        <section id="explore" className="section" data-section>
          <div className="container">
            <RevealSection>
              <p className="eyebrow dark">Around The Area</p>
              <h2 className="section-title">Make a weekend out of it.</h2>
              <p className="section-subtitle">
                Curated spots for guests who want to explore wine, trails, and small-town stops nearby.
              </p>
            </RevealSection>

            <div className="explore-grid">
              <div className="map-shell" role="region" aria-label="Map of Finger Lakes area">
                <iframe
                  title="Finger Lakes area map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d93700!2d-77.09!3d42.56!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="spot-list">
                {areaSpots.map((spot) => (
                  <a key={spot.name} className="spot-item" href={spot.href} target="_blank" rel="noreferrer">
                    <h3>{spot.name}</h3>
                    <p>{spot.vibe}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section id="faq" className="section section-alt" data-section>
          <div className="container">
            <RevealSection>
              <p className="eyebrow dark">Know Before You Go</p>
              <h2 className="section-title">Logistics first, smooth weekend second.</h2>
            </RevealSection>

            <div className="faq-list">
              {faqItems.map((item, index) => {
                const isOpen = openQuestion === index
                return (
                  <article
                    className={`faq-item ${isOpen ? 'is-open' : ''} ${item.highlighted ? 'is-highlighted' : ''}`}
                    key={item.question}
                  >
                    <button
                      type="button"
                      className="faq-question"
                      aria-expanded={isOpen}
                      onClick={() => setOpenQuestion(isOpen ? -1 : index)}
                    >
                      <span>{item.question}</span>
                      <span className="faq-icon" aria-hidden="true">+</span>
                    </button>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ═══ STAY + REGISTRY ═══ */}
        <section id="registry" className="section" data-section>
          <div className="container">
            <RevealSection>
              <p className="eyebrow dark">Stay + Registry</p>
              <h2 className="section-title">All practical links in one stop.</h2>
            </RevealSection>

            <div className="registry-grid">
              <article className="registry-card">
                <span className="card-label">Hotel Block</span>
                <h3>Waterfront Guest Hotel</h3>
                <p>Sample address for demo purposes only</p>
                <a className="inline-link" href="https://example.com/hotel-block" target="_blank" rel="noreferrer">
                  Book Your Room →
                </a>
              </article>
              {/*}
              <article className="registry-card">
                <span className="card-label">Registry</span>
                <h3>Amazon Wedding Registry</h3>
                <p>Browse our wish list and help us start this next chapter.</p>
                <a
                  className="inline-link"
                  href="https://www.amazon.com/wedding/guest-view/1TYACN8BPDADN"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Registry →
                </a>
              </article>
              */}
              <article className="registry-card">
                <span className="card-label">Cash Fund</span>
                <h3>New Home Fund</h3>
                <p>Help us build our first home together.</p>
                <a
                  className="inline-link"
                  href="https://example.com/registry"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contribute →
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* ═══ RSVP — full-bleed photo bookend ═══ */}
        <section id="rsvp" className="rsvp" data-section>
          <img
            className="rsvp-bg"
            src="/assets/photos/photo-motion.jpg"
            onError={(e) => { e.currentTarget.src = '/assets/photos/photo-motion.svg' }}
            alt="Couple walking placeholder artwork"
          />
          <div className="rsvp-overlay" />
          <RevealSection className="rsvp-copy">
            <p className="eyebrow">Final Stop</p>
            <h2>Ready to celebrate with us?</h2>
            <p>RSVPs are due by June 13th — head over and review shuttle notes before the weekend arrives.</p>
            <a className="btn btn-gold btn-lg" href="https://example.com/rsvp" target="_blank" rel="noreferrer">
              Go to RSVP
            </a>
          </RevealSection>
        </section>
      </main>

      {/* ─── Floating RSVP ─── */}
      <a className="floating-rsvp" href="https://example.com/rsvp" target="_blank" rel="noreferrer">
        RSVP
      </a>
    </>
  )
}

export default App
