import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from './SEO';
import './Club.css';
import zambiaSuccess from '../../zambiasuccess.png';
import kits1 from '../../kits1.png';
import kits2 from '../../kits2.png';
import suppliesImg from '../../supplies.png';
import bluetoothKitImg from '../../images/bluetooth kit.png';
import anvayLatoyaImg from '../../images/anvay+latoya.png';

const Club = () => {
  const [selectedSection, setSelectedSection] = useState('hero');
  const location = useLocation();

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
      try { window.history.replaceState({}, ''); } catch { /* no-op */ }
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
  <div className="club-page impact-page-program">
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
              title="Enginuity: Impact"
            description="Enginuity impact: custom engineering kits, CAD and PCB education, global school partnerships, and youth-led engagement with UN and policy stakeholders."
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
                Engineering in Action
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
                We build and ship custom engineering modules, train students in CAD and circuitry, and partner with schools and policymakers to expand hands-on STEM access worldwide!
              </p>
              <div className="hero-actions">
                <a href="#build" className="btn primary">Get Started</a>
                <a href="/contact" className="btn ghost">Contact Us</a>
              </div>
              {/* selector removed from hero — navigation dropdown now in navbar */}
            </div>

            <div className="hero-media">
              <div className="hero-photo-card">
                <div className="card-glare"></div>
                <img src={zambiaSuccess} alt="Zambia classroom success with Enginuity kits" className="hero-photo-img" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Build pipeline */}
  <section id="build" className="club-research-section">
        <div className="container">
          <div className="section-header">
            <div className="section-bubble">Program Model</div>
            <h2 className="section-title">Enginuity STEM Program</h2>

            <p className="section-description">How we design engineering curriculum, deploy kits, and activate student-led chapters with measurable impact.</p>
          </div>

          <div className="un-gallery-box impact-media-gallery">
            <div className="un-gallery-top">
              <div className="top-item impact-top-left">
                <img src={suppliesImg} alt="Engineering supplies organized for kit assembly" />
              </div>
              <div className="top-item impact-top-middle">
                <img src={bluetoothKitImg} alt="Bluetooth engineering kit modules" />
              </div>
              <div className="top-item impact-top-right">
                <img src={anvayLatoyaImg} alt="Anvay and LaToya preparing kit shipment materials" />
              </div>
            </div>

            <div className="gallery-portraits">
              <div className="gallery-portrait left impact-left-portrait">
                <img src={kits2} alt="Kits batch two packed for school delivery" />
              </div>
              <div className="gallery-copy">
                <div className="gallery-copy-inner">
                  <h3 className="gallery-title">Built, Packed, and Shipped</h3>
                  <p className="gallery-lead">Every module is assembled for classroom use, checked completely, and shipped so students can start utilizing our resources immediately.</p>
                  <ul className="gallery-points" aria-hidden>
                    <li><strong>Design to Device: </strong>Students move from CAD and circuit plans to physical parts and working assemblies.</li>
                    <li><strong>Hands-On Skills: </strong>Our modules cover wiring, PCB fundamentals, component testing, and troubleshooting.</li>
                    <li><strong>Global Delivery: </strong>Each shipment is organized for partner classrooms, including schools in Zambia and beyond.</li>
                  </ul>

                  <div className="gallery-cta">
                    <a href="/contact" className="btn btn-purple-outline small">Partner With Us</a>
                  </div>
                </div>
              </div>
              <div className="gallery-portrait right impact-right-portrait">
                <img src={kits1} alt="Kits batch one ready for deployment" />
              </div>
            </div>
          </div>

        </div>
      </section>

  {/* Our Club overview removed as requested */}

    </div>
  );
};

export default Club;
