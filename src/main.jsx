import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import TicTacToe from './tictactoe.jsx';
import CloudPad from './cloudpad.jsx';
import './styles.css'

const Arrow = () => <span className="arrow">↗</span>
const LinkedInIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.2 8.2H3.1V21h3.1V8.2ZM4.65 3A1.81 1.81 0 1 0 4.6 6.62 1.81 1.81 0 0 0 4.65 3ZM21 13.66c0-3.85-2.06-5.64-4.81-5.64-2.21 0-3.2 1.21-3.75 2.07V8.2H9.33V21h3.11v-6.34c0-1.67.31-3.29 2.39-3.29 2.05 0 2.08 1.92 2.08 3.4V21H20v-6.34h1Z" /></svg>
const InstagramIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle className="dot-icon" cx="17.5" cy="6.8" r="1" /></svg>
const projects = [
  { id: '01', name: 'CloudPad', type: 'Web-Notepad', accent: 'yellow', redirect: '/cloudpad' },
  { id: '02', name: 'NewsStack', type: 'All latest news at one place.', accent: 'outline', redirect: 'Coming soon...' },
  { id: '03', name: 'tic-tac-toe', type: 'Wanna play tic-tac-toe?', accent: 'yellow', redirect: '/tictactoe' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [cursor, setCursor] = useState({ x: -100, y: -100 })
  const goToRoute = useNavigate()

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY })
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  const navigate = (id) => {
    if (id.startsWith('/')) {
      goToRoute(id)
      return
    }
    setActive(id); setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return <main>
    <div className="main-page">
    <div className="main-cursor" style={{ transform: `translate(${cursor.x - 7}px, ${cursor.y - 7}px)` }} />
    <div className="grain" />
    <header className="main-header">
      <button className="logo-name" onClick={() => navigate('home')} aria-label="Go home">Ritik Agrawal<span>®</span></button>
      <nav className={menuOpen ? 'open' : ''}>
        {['home', 'work', 'about'].map(item => <button key={item} className={active === item ? 'selected' : ''} onClick={() => navigate(item)}>{item}</button>)}
      </nav>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><i /><i /></button>
    </header>

    <section id="home" className="hero">
      <div className="hero-top"><span className="availability"><b />A Biker with coding skills</span><span>BASED IN BENGALURU, IN</span></div>
      <div className="hero-title">
        <h2>FULL STACK</h2>
        <h1>ENGINEER<span className="dot">.</span></h1>
      </div>
      <div className="hero-bottom">
        <p>I design and build digital<br />experiences that feel <em>alive.</em></p>
        <button className="round-link" onClick={() => navigate('work')}>SCROLL TO EXPLORE <Arrow /></button>
      </div>
      <div className="orbit"><div className="orbit-word">CODE • CREATE • SHIP</div><span>✳</span></div>
      <div className="hero-index">01 / 03</div>
    </section>

    <section id="work" className="work">
      <div className="section-label"><span>LOOK, What I've built...</span></div>
      <h2>BUILT TO<br /><i>MATTER.</i></h2>
      <div className="project-grid">
        {projects.map((project, i) => <article className={`project ${project.accent}`} key={project.id}>
          <div className="project-head"><span>{project.id}</span><button aria-label={`View ${project.name}`} onClick={() => project.redirect && window.open(project.redirect, '_blank', 'noopener,noreferrer')}>↗</button></div>
          <div className="project-mark">{i === 0 ? '◒' : i === 1 ? '⌁' : '✣'}</div>
          <div><h3>{project.name}</h3><p>{project.type}</p></div>
        </article>)}
      </div>
    </section>

    <section id="about" className="about">
      <p className="section-label">Meet the man behind this...</p>
      <div className="about-copy"><h2>Logic meets<br /><i>loud ideas.</i></h2><p>I’m Ritik, a full stack developer focused on turning complex problems into sharp, memorable products. Currently building internet things from a tiny desk and an unreasonable amount of coffee.</p></div>
      <div className="skills"><span>Tech Stack:</span><span>JAVA</span><span>Spring Boot</span><span>Web Services</span><span>React.JS</span><span>MySQL</span><span>AWS</span></div>
    </section>

    <footer className="contact-footer">
      <p>HAVE SOMETHING IN MIND?</p>
      <a className="talk-link" href="mailto:ritik6244@gmail.com">LET'S TALK <Arrow /></a>
      <div className="socials" aria-label="Social profiles">
        <span>FOLLOW<br />ALONG</span>
        <a href="https://www.linkedin.com/in/imritik/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
        <a href="https://www.instagram.com/theritik.in/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
      </div>
    </footer>
    </div>
  </main>
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
      <Route path="/cloudpad" element={<CloudPad />} />
    </Routes>
  </BrowserRouter>
)
