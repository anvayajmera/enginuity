import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from './SEO';
import './Club.css';
import clubPic from '../../clubpic.svg';
import eyfun from '../../images/eyfun.png';
import hlpfun from '../../images/hlpfun.JPG';
import anvayspeakingun from '../../images/anvayspeakingun.JPG';
import club2 from '../../images/club2.png';
import apexwork from '../../images/apexwork.png';
import apexspace from '../../images/apexspace.jpg';
import apexproject from '../../images/apexproject.jpg';
import apexlaunch from '../../images/apexlaunch.mp4';
import larryun from '../../images/larryun.mp4';
import apexweather from '../../images/apexweather.png';

// In production deployments (Vercel), prefer serving videos from the `public/` root.
// Place `apexlaunch.mp4` and `larryun.mp4` in the project's `public/` folder so
// they're served as `/apexlaunch.mp4` and `/larryun.mp4`. During local dev we
// continue using the imported assets so HMR still works.
const apexlaunchSrc = (process.env.NODE_ENV === 'production') ? '/apexlaunch.mp4' : apexlaunch;
const larryunSrc = (process.env.NODE_ENV === 'production') ? '/larryun.mp4' : larryun;

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
          <SEO
            title="Impact — Enginuity STEM"
            description="Enginuity impact: student-led chapters, projects, and measurable outcomes from hands-on STEM learning."
            path="/impact"
          />

      <div className="club-background">
        {/* Added noise overlay for texture */}
        <div className="noise-overlay"></div>
        <div className="club-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="orb orb-4"></div>
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
                Stories from student chapters and community projects — how hands-on STEM makes measurable change in classrooms and neighborhoods.
              </p>
              <div className="hero-actions">
                <a href="/tinko" className="btn primary">Get Started</a>
                <a href="/contact" className="btn ghost">Contact Us</a>
              </div>
              {/* selector removed from hero — navigation dropdown now in navbar */}
            </div>

            <div className="hero-media">
              <div className="hero-photo-card">
                <div className="card-glare"></div>
                <div className="hero-photo-placeholder" aria-hidden>
                  <em>*picture incoming after UN speech sept. 25th*</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* United Nations Initiative */}
  <section id="un" className="club-un-section">
        <div className="container">
          <div className="section-header">
            <div className="section-bubble">UN Initiative</div>
            <h2 className="section-title">United Nations Initiative</h2>
            <p className="section-description">LARRY IRGVING AND VINT CERF AHAHHAHAH GET THAT PICo advance specific Sustainable Development Goals through student-led engineering projects, policy-aligned pilots, and capacity building.</p>
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
                  <div className="top-video-placeholder"><em>coming soon</em></div>
                </div>
              </div>

              <div className="gallery-portraits">
                <div className="gallery-portrait left">
                  <img src={eyfun} alt="EY Fun program portrait" />
                </div>
                <div className="gallery-copy">
                <div className="gallery-copy-inner">
                  <h3 className="gallery-title">Successfully Proving Youth Impact</h3>
                  <p className="gallery-lead">Through UN partnership pilots we support curriculum, field deployments, and open evaluation so student work leads to measurable learning and community outcomes.</p>

                  <ul className="gallery-points" aria-hidden>
                    <li><strong>Curriculum pilots</strong> — field-tested modules aligned to SDG priorities.</li>
                    <li><strong>Community deployments</strong> — student-built prototypes used in real settings.</li>
                    <li><strong>Evidence & scale</strong> — open evaluation data used to iterate and expand.</li>
                  </ul>

                  <div className="gallery-cta">
                    <a href="/contact" className="btn primary small">Partner with us</a>
                    <a href="#research" className="btn ghost small">See research</a>
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
                <h3>SDG 4 — Quality Education</h3>
                <p>We design classroom-ready STEM modules that improve learning outcomes and measurement frameworks for student assessment.</p>
              </div>

              <div className="sdg-card glass" aria-hidden>
                <div className="sdg-badge">
                  <svg viewBox="0 0 64 64" aria-hidden>
                    <circle cx="32" cy="32" r="30" fill="#8e44ad" />
                    <text x="32" y="38" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="700">10</text>
                  </svg>
                </div>
                <h3>SDG 10 — Reduced Inequalities</h3>
                <p>Projects and outreach that lower barriers to STEM for underrepresented groups, with mentorship and subsidized kits.</p>
              </div>

              <div className="sdg-card glass" aria-hidden>
                <div className="sdg-badge">
                  <svg viewBox="0 0 64 64" aria-hidden>
                    <circle cx="32" cy="32" r="30" fill="#1e88e5" />
                    <text x="32" y="38" textAnchor="middle" fontSize="18" fill="#fff" fontWeight="700">17</text>
                  </svg>
                </div>
                <h3>SDG 17 — Partnerships</h3>
                <p>We forge partnerships across schools, NGOs and municipal bodies to scale student innovations toward community impact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research projects (existing research section, retitled) */}
  <section id="research" className="club-research-section">
        <div className="container">
          <div className="section-header">
            <div className="section-bubble">Club</div>
            <h2 className="section-title">Enginuity Club</h2>
            <p className="section-description">A compact overview of our club — what we do, how we run chapters, and quick links to join.</p>
          </div>

          {/* Small club intro box (image + key info) */}
          <div className="club-box">
            <div className="club-box-media">
              <img src={club2} alt="Enginuity club" />
            </div>
            <div className="club-box-copy">
              <h3 className="club-box-title">Student chapters & local impact</h3>
              <p className="club-box-lead">Enginuity chapters run regular build nights, mentor projects, and connect students with curriculum and kits.</p>
              <ul className="club-keypoints">
                <li>Weekly hands-on sessions</li>
                <li>Mentor-led project tracks</li>
                <li>Free/subsidized starter kits</li>
              </ul>
              <div className="club-box-cta"><a className="btn primary small" href="/contact">Start a chapter</a></div>
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
                  <h3 className="gallery-title">Apex: Launches, Field Work, & Space Data</h3>
                  <p className="gallery-lead">Apex brings launch telemetry, field sensors, and space-enabled analysis together — student teams design, deploy, and analyze real systems.</p>

                  <ul className="gallery-points" aria-hidden>
                    <li><strong>Launch telemetry</strong> — telemetry capture and analysis from suborbital tests.</li>
                    <li><strong>Field sensing</strong> — distributed weather & environmental sensors.</li>
                    <li><strong>Space data</strong> — satellite/telemetry integrations for classroom projects.</li>
                  </ul>

                  <div className="gallery-cta">
                    <a href="/contact" className="btn primary small">Collaborate on Apex</a>
                    <a href="#join" className="btn ghost small">Start a project</a>
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
            <h3 className="cta-title">Ready to start a chapter?</h3>
            <p className="cta-description">Apply for mentorship and starter kits — we'll help you plan your first term of projects.</p>
            <div className="apply-wrap">
              <a href="/contact" className="btn primary">Apply Now</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Club;