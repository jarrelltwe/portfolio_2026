import { useState, useEffect } from 'react'
import profileImg from './assets/profile-full.webp'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const TITLES = ['Software Engineer.', 'Full-Stack Developer.', 'Angular Specialist.']

const SKILLS = {
  Languages: ['TypeScript', 'C#', 'Python', 'C/C++', 'JavaScript'],
  Frontend: ['Angular', 'React', 'RxJS', 'Reactive Forms', 'HTML5', 'CSS3', 'Bootstrap'],
  Backend: ['ASP.NET Core', 'RESTful APIs', 'Entity Framework', 'Node.js'],
  Testing: ['Playwright', 'UI Automation'],
  Databases: ['MySQL', 'SQL Server'],
  Tools: ['Git', 'Azure DevOps', 'CI/CD', 'Agile / Scrum'],
}

const EXPERIENCE = [
  {
    role: 'Software Developer',
    company: 'AstreaX',
    period: 'Aug 2023 – Present',
    bullets: [
      'Built enterprise Angular applications using TypeScript, RxJS, and Reactive Forms for business registration and amendment workflows in regulated filing systems.',
      'Developed and maintained ASP.NET backend controllers and service-layer logic for API integrations and database operations using Entity Framework.',
      'Implemented complex frontend validation logic, dynamic form behavior, and REST API integrations for entity amendments and filing submissions.',
      'Built and maintained automated UI testing frameworks with Playwright, improving regression coverage for high-risk workflows.',
      'Collaborated in Agile sprints via Azure DevOps to deliver features, resolve defects, and support production releases.',
    ],
  },
  {
    role: 'Web Developer Intern',
    company: 'SciQuel',
    period: 'Jun 2022 – Aug 2022',
    bullets: [
      'Implemented responsive frontend UI components from design mockups using JavaScript, HTML, and CSS.',
      'Integrated frontend registration workflows with backend APIs to support user sign-up functionality.',
      'Collaborated within a large development team on mobile web application development.',
    ],
  },
  {
    role: 'Virtual Reality Pod Operator',
    company: 'Dreamscape Learn',
    period: 'Nov 2021 – May 2023',
    bullets: [
      'Facilitated immersive VR learning experiences for ASU freshmen using Dreamscape Learn\'s educational platform, supporting technology-enhanced STEM education.',
      'Delivered real-time technical support and troubleshooting for VR hardware and software, ensuring uninterrupted daily operations across multiple sessions.',
      'Upheld equipment quality standards through routine maintenance and inspection, sustaining a consistently reliable and engaging student experience.',
    ],
  },
]

const PROJECTS = [
  {
    name: 'Compiler for Simple Language',
    period: 'Summer 2022',
    tags: ['C', 'Compilers', 'Parsing', 'Academic'],
    description:
      'Designed and implemented a full compiler and parser for a custom programming language. Built execution logic to interpret generated instructions, manage operand memory locations, and support conditional jump operations. Developed parsing that translates source programs into executable instruction sequences using linked-list intermediate representations.',
  },
]

function useTypewriter(words: string[], typingSpeed = 75, deletingSpeed = 40, pauseMs = 2200) {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]

    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => setCharIndex(i => i + 1), typingSpeed)
      return () => clearTimeout(t)
    }
    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pauseMs)
      return () => clearTimeout(t)
    }
    if (deleting && charIndex > 0) {
      const t = setTimeout(() => setCharIndex(i => i - 1), deletingSpeed)
      return () => clearTimeout(t)
    }
    if (deleting && charIndex === 0) {
      setDeleting(false)
      setWordIndex(i => (i + 1) % words.length)
    }
  }, [charIndex, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs])

  return words[wordIndex].slice(0, charIndex)
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function SunIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

function Nav({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'var(--nav-scrolled)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        padding: '0 2rem',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <a href="#hero" style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: 18, fontWeight: 600, textDecoration: 'none', letterSpacing: '-0.02em' }}>
          JT
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="nav-links">
          <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{ color: 'var(--muted)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s', fontFamily: 'monospace' }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--accent)')}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--muted)')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <a
              href="/Jarrell_Tan_Resume.pdf"
              download
              style={{
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                fontFamily: 'monospace',
                fontSize: 13,
                padding: '0.4rem 1rem',
                borderRadius: 5,
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(111,207,151,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Resume
            </a>
          </div>
        </div>

        <div style={{ alignItems: 'center', gap: '0.75rem' }} className="hamburger">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', padding: 4 }}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M6 6l10 10M16 6L6 16" /> : <path d="M4 7h14M4 12h14M4 17h14" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background: 'var(--nav)', borderTop: '1px solid var(--border)', padding: '1rem 2rem' }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ display: 'block', color: 'var(--muted)', padding: '0.6rem 0', textDecoration: 'none', fontFamily: 'monospace', fontSize: 14 }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/Jarrell_Tan_Resume.pdf"
            download
            style={{ display: 'block', color: 'var(--accent)', padding: '0.6rem 0', textDecoration: 'none', fontFamily: 'monospace', fontSize: 14 }}
          >
            Resume ↓
          </a>
        </div>
      )}

      <style>{`
        .hamburger { display: none; }
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; align-items: center; gap: 8px; }
        }
      `}</style>
    </nav>
  )
}

function Hero() {
  const title = useTypewriter(TITLES)

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <div>
        <p className="reveal" style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: 15, marginBottom: '1rem', letterSpacing: '0.04em' }}>
          Hi, I'm
        </p>
        <h1 className="reveal reveal-delay-1" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 700, color: 'var(--text)', margin: '0 0 0.25rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Jarrell Tan.
        </h1>
        <h2 className="reveal reveal-delay-2" style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', fontWeight: 600, color: 'var(--muted)', margin: '0 0 1.5rem', letterSpacing: '-0.02em', lineHeight: 1.2, minHeight: '1.2em' }}>
          {title}
          <span style={{ color: 'var(--accent)', animation: 'blink 1s step-end infinite', marginLeft: 2 }}>|</span>
        </h2>
        <p className="reveal reveal-delay-3" style={{ maxWidth: 560, color: 'var(--muted)', fontSize: 17, lineHeight: 1.75, marginBottom: '2.5rem' }}>
          I build enterprise web applications with Angular, TypeScript, and ASP.NET — specializing in complex form-driven workflows, API integrations, and automated UI testing in regulated environments.
        </p>
        <div className="reveal reveal-delay-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="#projects"
            style={{ background: 'transparent', border: '1.5px solid var(--accent)', color: 'var(--accent)', padding: '0.75rem 1.75rem', borderRadius: 6, textDecoration: 'none', fontFamily: 'monospace', fontSize: 14, transition: 'all 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(111,207,151,0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            View my work
          </a>
          <a
            href="/Jarrell_Tan_Resume.pdf"
            download
            style={{ background: 'transparent', border: '1.5px solid var(--muted)', color: 'var(--muted)', padding: '0.75rem 1.75rem', borderRadius: 6, textDecoration: 'none', fontFamily: 'monospace', fontSize: 14, transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--muted)'; e.currentTarget.style.color = 'var(--muted)' }}
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
      <span style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: 14 }}>{'// '}</span>
      <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 600, color: 'var(--text)', margin: 0, letterSpacing: '-0.02em' }}>
        {children}
      </h2>
      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
    </div>
  )
}

function About() {
  return (
    <section id="about" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel>About me</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'start' }}>
        <div className="reveal reveal-delay-1">
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 16, marginBottom: '1.2rem' }}>
            I'm a software engineer based in Tempe, AZ with 2+ years of experience building enterprise web applications in regulated business environments. I graduated from Arizona State University with a B.S. in Computer Science in 2023.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 16, marginBottom: '1.2rem' }}>
            At AstreaX, I work across the full stack — designing Angular frontends with complex form logic, maintaining ASP.NET backend services, and writing Playwright test suites to keep critical filing workflows reliable.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 16 }}>
            Outside of work I like to rock climb and boulder — still very much a work in progress. I'm also always on the hunt for the best pad kra pao or chicken dum biryani wherever I happen to be.
          </p>
          <div style={{ marginTop: '1.5rem' }}>
            <p style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: 13, marginBottom: '0.75rem', letterSpacing: '0.04em' }}>Technologies I work with</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {['TypeScript', 'Angular', 'C# / ASP.NET', 'Entity Framework', 'Playwright', 'SQL Server', 'RxJS', 'Azure DevOps'].map((tech) => (
                <div key={tech} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: 12 }}>▸</span>
                  <span style={{ color: 'var(--muted)', fontSize: 14 }}>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="reveal reveal-delay-2" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 300, flexShrink: 0 }}>
            <img
              src={profileImg}
              alt="Jarrell Tan"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 10,
                display: 'block',
                filter: 'grayscale(20%)',
                border: '1px solid var(--border)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 10,
                border: '1.5px solid var(--accent)',
                transform: 'translate(10px, 10px)',
                zIndex: -1,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" style={{ padding: '4rem 2rem 6rem', maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel>Skills</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {Object.entries(SKILLS).map(([category, items], i) => (
          <div
            key={category}
            className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '1.25rem', transition: 'border-color 0.2s, transform 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <p style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: 12, marginBottom: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {category}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {items.map((item) => (
                <span key={item} style={{ background: 'rgba(111,207,151,0.06)', border: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12, padding: '3px 10px', borderRadius: 4, fontFamily: 'monospace' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" style={{ padding: '4rem 2rem 6rem', maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel>Education</SectionLabel>
      <div
        className="reveal reveal-delay-1"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '1.75rem 2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', transition: 'border-color 0.2s, transform 0.2s' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
      >
        <div>
          <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: 18, margin: '0 0 4px' }}>B.S. Computer Science</h3>
          <p style={{ color: 'var(--accent)', fontSize: 15, margin: '0 0 0.75rem' }}>Arizona State University — Tempe, AZ</p>
          <div style={{ marginTop: '0.25rem' }}>
            <p style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>
              Activities &amp; Leadership
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: 12, flexShrink: 0 }}>▸</span>
                <span style={{ color: 'var(--muted)', fontSize: 14 }}>
                  Malaysian Student Association — <span style={{ color: 'var(--text)' }}>Event Management Director</span>
                  <span style={{ color: 'var(--muted)', fontFamily: 'monospace', fontSize: 12, marginLeft: 8 }}>Aug 2022 – May 2023</span>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: 12, flexShrink: 0 }}>▸</span>
                <span style={{ color: 'var(--muted)', fontSize: 14 }}>
                  Malaysian Student Association — <span style={{ color: 'var(--text)' }}>Event Management Associate</span>
                  <span style={{ color: 'var(--muted)', fontFamily: 'monospace', fontSize: 12, marginLeft: 8 }}>Aug 2021 – Jul 2022</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <span style={{ color: 'var(--muted)', fontFamily: 'monospace', fontSize: 13, whiteSpace: 'nowrap', paddingTop: 2 }}>
          Aug 2021 – May 2023
        </span>
      </div>
    </section>
  )
}

function Experience() {
  const [active, setActive] = useState(0)

  return (
    <section id="experience" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel>Experience</SectionLabel>
      <div className="reveal reveal-delay-1 exp-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2.5rem', alignItems: 'start' }}>
        <div className="exp-tabs" style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid var(--border)' }}>
          {EXPERIENCE.map((exp, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`exp-tab-btn${active === i ? ' active-tab' : ''}`}
              style={{
                background: active === i ? 'rgba(111,207,151,0.06)' : 'transparent',
                border: 'none',
                borderLeft: `2px solid ${active === i ? 'var(--accent)' : 'transparent'}`,
                marginLeft: -1,
                color: active === i ? 'var(--accent)' : 'var(--muted)',
                fontFamily: 'monospace',
                fontSize: 13,
                padding: '0.75rem 1.25rem',
                cursor: 'pointer',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {exp.company}
            </button>
          ))}
        </div>
        <div>
          <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: 18, margin: '0 0 4px' }}>
            {EXPERIENCE[active].role}{' '}
            <span style={{ color: 'var(--accent)' }}>@ {EXPERIENCE[active].company}</span>
          </h3>
          <p style={{ color: 'var(--muted)', fontFamily: 'monospace', fontSize: 13, margin: 0 }}>
            {EXPERIENCE[active].period}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '1.25rem 0 0' }}>
            {EXPERIENCE[active].bullets.map((bullet, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.9rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', marginTop: 3, flexShrink: 0, fontFamily: 'monospace' }}>▸</span>
                <span style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: 15 }}>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel>Projects</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {PROJECTS.map((project, i) => (
          <div
            key={project.name}
            className={`reveal reveal-delay-${i + 1}`}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '1.75rem', transition: 'border-color 0.2s, transform 0.2s', cursor: 'default' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <svg width="32" height="32" fill="none" stroke="var(--accent)" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M3 7l4-4 4 4M7 3v13M17 21l4-4-4-4M21 17H8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: 'var(--muted)', fontFamily: 'monospace', fontSize: 12 }}>{project.period}</span>
            </div>
            <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: 17, margin: '0 0 0.75rem', lineHeight: 1.3 }}>{project.name}</h3>
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, margin: '0 0 1.25rem' }}>{project.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: 11, padding: '2px 8px', background: 'rgba(111,207,151,0.08)', borderRadius: 3, border: '1px solid rgba(111,207,151,0.15)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" style={{ padding: '6rem 2rem 8rem', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
      <div className="reveal">
        <p style={{ color: 'var(--accent)', fontFamily: 'monospace', fontSize: 14, marginBottom: '1rem' }}>What's next?</p>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'var(--text)', margin: '0 0 1.25rem', letterSpacing: '-0.02em' }}>
          Get in touch
        </h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 16, maxWidth: 480, margin: '0 auto 2.5rem' }}>
          I'm currently open to new opportunities. Whether you have a question, a role, or just want to say hello — my inbox is open.
        </p>
        <a
          href="mailto:jarrelltwe@gmail.com"
          style={{ display: 'inline-block', border: '1.5px solid var(--accent)', color: 'var(--accent)', padding: '1rem 2.5rem', borderRadius: 6, textDecoration: 'none', fontFamily: 'monospace', fontSize: 14, transition: 'all 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(111,207,151,0.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          Say Hello
        </a>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '4rem' }}>
          <a href="https://www.linkedin.com/in/jarrelltwe/" target="_blank" rel="noreferrer"
            style={{ color: 'var(--muted)', transition: 'color 0.2s', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}>
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
      <p style={{ color: 'var(--muted)', fontFamily: 'monospace', fontSize: 12 }}>
        Designed &amp; built by Jarrell Tan
      </p>
    </footer>
  )
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useScrollReveal()

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
