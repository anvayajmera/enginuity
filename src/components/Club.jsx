import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from './SEO';
import './Club.css';
import clubPic from '../../clubpic.svg';
import kidsImg from '../../images/kids.png';
import eyfun from '../../images/eyfun.png';
import hlpfun from '../../images/hlpfun.JPG';
import anvayspeakingun from '../../images/anvayspeakingun.JPG';
import club2 from '../../images/club2.png';
import apexwork from '../../images/apexwork.png';
import apexspace from '../../images/apexspace.jpg';
import apexproject from '../../images/apexproject.jpg';
// Use CDN URLs for videos
const apexlaunchSrc = 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/b0c4dd9cb1113b352efe4ac771cca46a21c563ce_apexlaunch.mp4';
const larryunSrc = 'https://files.catbox.moe/d2woa3.mp4';
import apexweather from '../../images/apexweather.png';

const Club = () => {
  const particlesRef = useRef(null);
  const [selectedSection, setSelectedSection] = useState('hero');
  const sectionsRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    // lightweight floating particles for visual polish
    const el = particlesRef.current;
    if (!el) return;
    for (let i = 0; i < 20; i++) { // Increased particle count
      const p = document.createElement('div');
      p.className = 'club-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 15 + 's';
      p.style.animationDuration = (Math.random() * 15 + 10) + 's'; // Varied duration
      el.appendChild(p);
    }

    return () => { if (el) el.innerHTML = ''; };
  }, []);

  useEffect(() => {
    // smooth scroll to selected section
    const id = selectedSection;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    }
    // mark active section classes
    document.querySelectorAll('.club-un-section, .club-research-section, .club-overview-section, .club-cta-section')
      .forEach(s => s.classList.remove('active'));
    const active = document.getElementById(id) || document.getElementById(id + '-section');
    if (active) active.classList.add('active');
  }, [selectedSection]);

  useEffect(() => {
    // If navigated here with state (from navbar), scroll to that section
    if (location && location.state && location.state.scrollTo) {
      const target = location.state.scrollTo;
      setSelectedSection(target);
      // remove state to avoid repeated scrolling on re-mounts
      try { window.history.replaceState({}, ''); } catch (e) {}
    }
  }, [location]);

  useEffect(() => {
    // reveal-on-scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.18 });
    const nodes = document.querySelectorAll('.club-un-section, .club-research-section, .club-overview-section, .club-cta-section');
    nodes.forEach(n => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="club-page">
          {/*
            NOTE: The style block below contains the specific fixes for the layout issue.
            Ideally, these styles would go into your 'Club.css' file, but they are
            included here for a self-contained solution.
          */}
          <style>
            {`
              .club-steps-four {
                display: flex;
                flex-wrap: wrap; /* Allows items to wrap on smaller screens */
                gap: 1.5rem; /* Creates space between the boxes */
                align-items: stretch; /* Ensures all boxes have the same height */
              }

              .club-steps-four .club-step {
                flex: 1; /* Allows each box to grow and take up equal space */
                min-width: 200px; /* Prevents boxes from becoming too narrow */
                display: flex; /* Use flex for consistent internal alignment */
                flex-direction: column;
              }

              /* Specific styles for the first box containing the image */
              .club-step-img {
                padding: 0; /* Remove padding to let the image fill the box */
                border: 3px solid #3b82f6; /* Added the minor blue border */
                position: relative; /* Required to position the text over the image */
                overflow: hidden; /* Hides any part of the image that goes outside the border */
              }

              /* Styles for the image itself */
              .club-step-img .club-step-img-pic {
                width: 100%;
                height: 100%;
                object-fit: cover; /* Makes the image cover the entire box without losing its aspect ratio */
              }

              /* Styles for the text overlay on the image */
              .club-step-img .club-step-text {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                background-color: rgba(0, 0, 0, 0.5); /* Adds a semi-transparent background for readability */
                color: white;
                padding: 0.5rem;
                box-sizing: border-box; /* Ensures padding doesn't affect the width */
                text-align: center;
              }
            `}
          </style>
          <SEO
              title="Enginuity Impact"
            description="Enginuity impact: student-led chapters, projects, and measurable outcomes from hands-on STEM learning."
            path="/impact"
          />

      <div className="club-background">
        {/* Added noise overlay for texture */}
        <div className="noise-overlay"></div>
        <div className="club-orbs">
          <>
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
            <div className="orb orb-4"></div>
          </>
        </div>
        <div className="club-grid-pattern"></div>
        <div className="club-particles" ref={particlesRef}></div>
         <div className="club-floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
            <div className="shape shape-6"></div>
        </div>
      </div>

  <section id="hero" className="club-hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-sparkle"></span>
                Changing Youth Lives
              </div>
              <h1 className="hero-title title-centered">
                <span className="hero-title-line">Local & Global</span>
                <span className="hero-title-line impact-word gradient-text">
                  Impact
                  {/* inline scribble SVG underline */}
                  <svg className="scribble" viewBox="0 0 200 30" preserveAspectRatio="none" aria-hidden>
                    <defs>
                      <linearGradient id="scribbleGradient" x1="0" x2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                    </defs>
                    {/* taller control points for greater height, narrower horizontal span visually via CSS */}
                    <path d="M20 18 C50 28, 80 6, 100 18 C120 30, 150 8, 180 18" fill="none" stroke="url(#scribbleGradient)" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="hero-lead">
Whether it's empowering students in underserved communities or advocating at the United Nations, we show how hands-on STEM can be implemented worldwide.</p>
              <div className="hero-actions">
                <a href="/tinko" className="btn primary">Get Started</a>
                <a href="/contact" className="btn ghost">Contact Us</a>
              </div>
              {/* selector removed from hero — navigation dropdown now in navbar */}
            </div>

            <div className="hero-media">
              <div className="hero-photo-card">
                <div className="card-glare"></div>
                <img src={kidsImg} alt="Enginuity kids" className="hero-photo-img" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* United Nations Initiative */}
  <section id="un" className="club-un-section">
        <div className="container">
          <div className="section-header">
            <div className="section-bubble">Policy Work</div>
            <h2 className="section-title">United Nations Initiative</h2>
            <p className="section-description">Learn how we establish connections at the UN, including Larry Irving and Vint Cerf.</p>
          </div>

          {/* What we do at the UN + tall featured image box (left + right portraits, center text) */}
          <div className="un-details">
            <div className="un-gallery-box">
              <div className="un-gallery-top">
                <div className="top-item">
                  <img src={anvayspeakingun} alt="Anvay speaking at UN" />
                </div>
                <div className="top-item">
                  <video controls playsInline preload="metadata" className="top-video">
                    <source src={larryunSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="top-item">
                  <div className="top-video-placeholder"><em>coming soon after sept. 25 panelist role</em></div>
                </div>
              </div>

              <div className="gallery-portraits">
                <div className="gallery-portrait left">
                  <img src={eyfun} alt="EY Fun program portrait" />
                </div>
                <div className="gallery-copy">
                <div className="gallery-copy-inner">
                  <h3 className="gallery-title">Successfully Proving Youth Impact</h3>
                  <p className="gallery-lead">Enginuity brings its mission to the UN not only to advocate for STEM education globally, but also to challenge ageism. Through the DTC, the UN’s first teen-led board, we prove that youth under 18 must have a voice in policy, as they are the future agents of change.<br />View the 2025 UN events we spoke at:</p>

                  <ul className="gallery-points" aria-hidden>
                    <li><strong>ECOSOC Youth Forum: </strong>April 15th to 17th</li>
                    <li><strong>High-Level Political Forum: </strong>July 14th to July 23rd</li>
                    <li><strong>International Youth Conference: </strong> September 24th to 27th</li>
                  </ul>

                  <div className="gallery-cta">
                    <a href="/contact" className="btn btn-purple-outline small">Partner With Us</a>
                    <a href="#research" className="btn btn-purple-outline small">View Our Club</a>
                  </div>
                </div>
                </div>
                <div className="gallery-portrait right">
                  <img src={hlpfun} alt="HLP Fun program portrait" />
                </div>
              </div>
            </div>

            {/* SDG focus cards moved below the gallery */}
            <div className="sdg-grid">
              <div className="sdg-card glass" aria-hidden>
                <div className="sdg-badge">
                  <svg viewBox="0 0 64 64" aria-hidden>
                    <circle cx="32" cy="32" r="30" fill="#e53935" />
                    <text x="32" y="38" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="700">4</text>
                  </svg>
                </div>
                <h3>SDG 4: Quality Education</h3>
                <p>We design classroom-ready STEM kits and modules to improve learning for all skill levels, with our proprietary dashboard.</p>
              </div>

              <div className="sdg-card glass" aria-hidden>
                <div className="sdg-badge">
                  <svg viewBox="0 0 64 64" aria-hidden>
                    <circle cx="32" cy="32" r="30" fill="#8e44ad" />
                    <text x="32" y="38" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="700">10</text>
                  </svg>
                </div>
                <h3>SDG 10: Reduced Inequalities</h3>
                <p>We directly bridge the digital divide by providing equal opportunities to locations excluded by the government.</p>
              </div>

              <div className="sdg-card glass" aria-hidden>
                <div className="sdg-badge">
                  <svg viewBox="0 0 64 64" aria-hidden>
                    <circle cx="32" cy="32" r="30" fill="#1e88e5" />
                    <text x="32" y="38" textAnchor="middle" fontSize="18" fill="#fff" fontWeight="700">17</text>
                  </svg>
                </div>
                <h3>SDG 17: Partnerships</h3>
                <p>We establish partnerships across schools, NGOs, and municipal bodies to scale impact toward global communities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research projects (existing research section, retitled) */}
  <section id="research" className="club-research-section">
        <div className="container">
          <div className="section-header">
            <div className="section-bubble">Worldwide Chapters</div>
            <h2 className="section-title">Enginuity Club</h2>

            <p className="section-description">An overview of our club: what we do, how we run chapters, and how to join.</p>
          </div>

          {/* Glassmorphism 4-box section: Student chapters & local impact */}
          <div className="club-glassmorph-section">
            <h3 className="club-glassmorph-title">Six Enginuity Chapters Around the U.S.</h3>
            <div className="glass-row">
              <div className="glass-box glass-img-box">
                <img src={club2} alt="Enginuity club" className="glass-img" />
              </div>
              <div className="glass-box">
                <div className="glass-num-wrap">
                  <div className="glass-num-bg"></div>
                  <div className="glass-num">1</div>
                </div>
                <div className="glass-text">Weekly STEM meetings from Arduino to Physics</div>
              </div>
              <div className="glass-box">
                <div className="glass-num-wrap">
                  <div className="glass-num-bg"></div>
                  <div className="glass-num">2</div>
                </div>
                    <div className="glass-text">Opportunities to apply skills learned to impacting others</div>
              </div>
              <div className="glass-box">
                <div className="glass-num-wrap">
                  <div className="glass-num-bg"></div>
                  <div className="glass-num">3</div>
                </div>
                <div className="glass-text">Free kits, premium software, and grant opportunites</div>
              </div>
            </div>
          </div>

          {/* Apex feature — top row (apexwork, apexlaunch video, apexspace) and portraits (apexwweather, apexproject) */}
          <div className="un-gallery-box apex-gallery">
            <div className="un-gallery-top">
              <div className="top-item">
                <img src={apexwork} alt="Apex work" />
              </div>
              <div className="top-item">
                <video controls playsInline className="top-video">
                  <source src={apexlaunchSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="top-item">
                <img src={apexspace} alt="Apex space" />
              </div>
            </div>

            <div className="gallery-portraits">
              <div className="gallery-portrait left">
                <img src={apexweather} alt="Apex weather project" />
              </div>
              <div className="gallery-copy">
                <div className="gallery-copy-inner">
                  <h3 className="gallery-title">STEM Research Projects</h3>
                  <p className="gallery-lead">Take a look at Orionis: Enginuity's research subcommitte developing a $1000 high-altitude balloon research project with Hack Club, travelling up to 100,000 feet into the stratosphere.</p>
                  <ul className="gallery-points" aria-hidden>
                    <li><strong>Atmospheric Spectroscopy: </strong>Spectrometer with diffraction lens classifies atmospheric elements using a proprietary CNN.</li>
                    <li><strong>UV & Radiation Profiling: </strong>Custom muon watch and UV sensors measure radiation and ultraviolet light in the atmosphere.</li>
                    <li><strong>Environmental Sensing: </strong> — Pressure, temperature, humidity, and light sensors log data to serve as a control factor.</li>
                  </ul>

                  <div className="gallery-cta">
                    <a href="/contact" className="btn btn-purple-outline small">Partner With Us</a>
                  </div>
                </div>
              </div>
              <div className="gallery-portrait right">
                <img src={apexproject} alt="Apex project portrait" />
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* Our Club overview removed as requested */}

  <section id="join" className="club-cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-glow"></div>
            <h3 className="cta-title">Collaborate with Enginuity</h3>
            <p className="cta-description">Fill out the form linked below and we'll help you in whatever way we can.</p>
            <div className="apply-wrap">
              <a href="https://forms.gle/4Y5W8HNDFPECsaeD8" className="btn primary" target="_blank" rel="noopener noreferrer">Apply Now</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Club;