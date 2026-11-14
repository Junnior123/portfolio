import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Check, Mail, Moon, Sun } from 'lucide-react'

type Project = {
  number: string
  name: string
  eyebrow: string
  description: string
  tags: string[]
  href: string
  productUrl: string
  productLabel: string
  showSource?: boolean
  art: 'afloat' | 'sentinel' | 'brewing'
  accent: string
}

const projects: Project[] = [
  {
    number: '01', name: 'Project One', eyebrow: 'PROJECT TYPE',
    description: '',
    tags: [], href: '#contact', productUrl: '#contact', productLabel: '프로젝트 링크', art: 'afloat', accent: 'mint',
  },
  {
    number: '02', name: 'Project Two', eyebrow: 'PROJECT TYPE',
    description: '',
    tags: [], href: '#contact', productUrl: '#contact', productLabel: '프로젝트 링크', art: 'sentinel', accent: 'blue',
  },
  {
    number: '03', name: 'Project Three', eyebrow: 'PROJECT TYPE',
    description: '',
    tags: [], href: '#contact', productUrl: '#contact', productLabel: '프로젝트 링크', showSource: false, art: 'brewing', accent: 'amber',
  },
]

function ProjectArt({ kind }: { kind: Project['art'] }) {
  if (kind === 'afloat') return <div className="art-window" aria-hidden="true"><span className="window-dots"><i /><i /><i /></span><div className="window-back">PROJECT</div><div className="window-front"><span>FEATURE</span><b>PROJECT<br />PREVIEW</b><kbd>⌃ ⌥ SHORTCUT</kbd></div><span className="art-star">✳</span></div>
  if (kind === 'sentinel') return <div className="art-sentinel" aria-hidden="true"><div className="scan-ring ring-one" /><div className="scan-ring ring-two" /><div className="shield"><svg viewBox="0 0 100 110"><path d="M50 6 88 20v29c0 25-14 42-38 55C26 91 12 74 12 49V20L50 6Z" /><path d="m34 52 11 11 23-25" /></svg></div><span className="sentinel-glint glint-one">✦</span><span className="sentinel-glint glint-two">·</span></div>
  return <div className="art-brewing" aria-hidden="true"><div className="brew-orbit orbit-one" /><div className="brew-orbit orbit-two" /><div className="potion potion-a"><i /></div><div className="potion potion-b"><i /></div><div className="potion potion-c"><i /></div><div className="brew-glow" /><span className="brew-spark spark-a">✦</span><span className="brew-spark spark-b">✳</span></div>
}

function DiscordIcon({ size = 19 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" /></svg>
}

function LocalClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const parts = new Intl.DateTimeFormat(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(now).reduce<Record<string, string>>((result, part) => { result[part.type] = part.value; return result }, {})
  return <span>[ {parts.year}.{parts.month}.{parts.day} · {parts.hour}:{parts.minute}:{parts.second} LOCAL ]</span>
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try { return localStorage.getItem('portfolio-template-theme') === 'light' ? 'light' : 'dark' }
    catch { return 'dark' }
  })
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const [discordCountdown, setDiscordCountdown] = useState<number | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const cursorGlowRef = useRef<HTMLDivElement>(null)
  const toastTimer = useRef<number | undefined>(undefined)
  const redirectTimer = useRef<number | undefined>(undefined)
  const countdownTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('portfolio-template-theme', theme) } catch { /* Storage can be disabled. */ }
  }, [theme])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.16, rootMargin: '0px 0px -45px 0px' })
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))

    let frame = 0
    const updateScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setScrollProgress(max > 0 ? window.scrollY / max : 0)
        const cards = document.querySelectorAll<HTMLElement>('.project-card')
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect()
          const center = rect.top + rect.height / 2 - window.innerHeight / 2
          card.style.setProperty('--scroll-shift', `${Math.max(-12, Math.min(12, center * -0.018))}px`)
        })
      })
    }
    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()

    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !cursorGlowRef.current) return
      cursorGlowRef.current.style.setProperty('--pointer-x', `${event.clientX}px`)
      cursorGlowRef.current.style.setProperty('--pointer-y', `${event.clientY}px`)
      document.querySelectorAll<HTMLElement>('.project-art-link').forEach((art) => {
        const rect = art.getBoundingClientRect()
        art.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
        art.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
        if (event.target instanceof Node && art.contains(event.target)) {
          const card = art.closest<HTMLElement>('.project-card')
          if (card) {
            card.style.setProperty('--tilt-x', `${((event.clientY - rect.top) / rect.height - 0.5) * -2.6}deg`)
            card.style.setProperty('--tilt-y', `${((event.clientX - rect.left) / rect.width - 0.5) * 2.6}deg`)
          }
        }
      })
      document.querySelectorAll<HTMLElement>('.contact-button:hover').forEach((button) => {
        const rect = button.getBoundingClientRect()
        button.style.setProperty('--mag-x', `${(event.clientX - rect.left - rect.width / 2) * 0.08}px`)
        button.style.setProperty('--mag-y', `${(event.clientY - rect.top - rect.height / 2) * 0.08}px`)
      })
    }
    const resetPointerEffects = () => {
      document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
        card.style.removeProperty('--tilt-x')
        card.style.removeProperty('--tilt-y')
      })
      document.querySelectorAll<HTMLElement>('.contact-button').forEach((button) => {
        button.style.removeProperty('--mag-x')
        button.style.removeProperty('--mag-y')
      })
    }
    window.addEventListener('pointermove', handlePointer, { passive: true })
    window.addEventListener('pointerleave', resetPointerEffects)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('pointermove', handlePointer)
      window.removeEventListener('pointerleave', resetPointerEffects)
      cancelAnimationFrame(frame)
      window.clearTimeout(toastTimer.current)
      window.clearTimeout(redirectTimer.current)
      window.clearInterval(countdownTimer.current)
    }
  }, [])

  const copyDiscord = async () => {
    window.clearTimeout(redirectTimer.current)
    window.clearInterval(countdownTimer.current)
    setDiscordCountdown(null)
    try {
      await navigator.clipboard.writeText('your_discord_username')
      setCopyStatus('copied')
      setDiscordCountdown(3)
      const endAt = Date.now() + 3000
      countdownTimer.current = window.setInterval(() => {
        const remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000))
        setDiscordCountdown(remaining)
        if (remaining === 0) {
          window.clearInterval(countdownTimer.current)
          window.location.assign('https://discord.com/app')
        }
      }, 150)
    } catch {
      setCopyStatus('failed')
      window.clearTimeout(toastTimer.current)
      toastTimer.current = window.setTimeout(() => setCopyStatus('idle'), 4200)
    }
  }

  return <div className="site-shell">
    <div className="cursor-glow" ref={cursorGlowRef} aria-hidden="true" />
    <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />
    <header className="site-header">
      <nav aria-label="주요 메뉴"><a href="#work">프로젝트 <span>03</span></a><a href="#contact">연락</a></nav>
      <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}<span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span></button>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb orb-left" aria-hidden="true" /><div className="hero-orb orb-right" aria-hidden="true" />
        <div className="hero-copy">
          <div className="status-line reveal" data-reveal><span className="status-index"><LocalClock /></span></div>
          <h1 className="hero-title"><span className="title-line" data-reveal>PORTFOLIO</span><span className="title-line title-indent" data-reveal><em>TEMPLATE</em><span className="title-period">.</span></span></h1>
          <div className="hero-bottom" data-reveal><div className="hero-greeting"><p>“Hello world👋”</p><div className="hero-social-links"><a className="social-icon mail-icon" href="mailto:hello@example.com" aria-label="이메일 보내기"><Mail size={18} /></a><button className="social-icon discord-icon" type="button" onClick={copyDiscord} aria-label="예시 Discord 이름을 복사하고 3초 뒤 Discord 열기"><DiscordIcon /></button></div></div><a className="round-link" href="#work" aria-label="프로젝트 소개 보기"><ArrowDown size={19} /></a></div>
        </div>
        <div className="hero-side-note" aria-label="시간대"><span>LOCAL</span><span>TIME</span></div>
        <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><i><b /></i></div>
      </section>

      <section className="work-section section-pad" id="work">
        <div className="section-head" data-reveal><div><p className="eyebrow"><span>01</span> SELECTED WORK</p><h2>프로젝트 소개<span className="muted">.</span></h2></div></div>
        <div className="project-list">{projects.map((project) => <article className={`project-card ${project.accent}`} key={project.name} data-reveal>
          <a className="project-art-link" href={project.productUrl} target="_blank" rel="noreferrer" aria-label={`${project.name} 열기: ${project.productLabel}`}><ProjectArt kind={project.art} /><span className="art-open"><ArrowUpRight size={20} /></span></a>
          <div className="project-info"><div className="project-meta"><span>{project.number} / 03</span><span>{project.eyebrow}</span></div><div className="project-main"><div><h3>{project.name}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-links"><a href={project.productUrl} target="_blank" rel="noreferrer">{project.productLabel}<ArrowUpRight size={14} /></a>{project.showSource !== false && <a href={project.href} target="_blank" rel="noreferrer">소스 코드<ArrowUpRight size={14} /></a>}</div></div>{project.showSource !== false && <a className="project-arrow" href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.name} GitHub 저장소`}><ArrowUpRight size={21} /></a>}</div></div>
        </article>)}</div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="contact-top" data-reveal><p className="eyebrow"><span>02</span> SAY HELLO</p></div>
        <div className="contact-main" data-reveal><h2>Say<br /><em>Hello.</em></h2><div className="contact-actions"><a className="contact-button primary" href="mailto:hello@example.com"><span><Mail size={18} /> Email</span><ArrowUpRight size={19} /></a><button className="contact-button secondary" type="button" onClick={copyDiscord}><span><DiscordIcon /> {copyStatus === 'copied' ? `Copied · ${discordCountdown ?? 0}s` : 'Discord'}</span>{copyStatus === 'copied' ? <Check size={18} /> : <ArrowUpRight size={19} />}</button></div><p className="contact-note" role="status" aria-live="polite">{copyStatus === 'copied' ? `Username copied · ${discordCountdown}s until Discord opens.` : copyStatus === 'failed' ? 'Could not copy the username. Check clipboard permissions.' : ''}</p></div>
      </section>
    </main>

    <footer className="site-footer"><p>Portfolio template <span>{new Date().getFullYear()}</span></p><a className="back-top" href="#home">BACK TO TOP <ArrowDownRight size={15} /></a></footer>
    {copyStatus !== 'idle' && <div className={`toast ${copyStatus === 'failed' ? 'toast-error' : ''}`} role="status"><Check size={15} /> {copyStatus === 'copied' ? `your_discord_username copied · ${discordCountdown ?? 0}s` : '복사에 실패했습니다 · Discord 연락처를 확인하세요'}</div>}
  </div>
}

export default App

