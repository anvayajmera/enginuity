import { useEffect, useRef } from 'react';
import SEO from './SEO';
import './Club.css';
import clubPic from '../../clubpic.svg';
import research1 from '../../images/research1.png';
import research2 from '../../images/research2.png';
import research3 from '../../images/research3.png';
import research4 from '../../images/research4.mp4';

const Club = () => {
  const particlesRef = useRef(null);

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

  return (
    <div className="club-page">
      <SEO
        title="Club — Enginuity STEM"
        description="Enginuity Clubs: student-led chapters, projects, and local meetups for hands-on STEM learning."
        path="/club"
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

      <section className="club-hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-sparkle"></span>
                Local Chapters
              </div>
              <h1 className="hero-title">
                <span className="hero-title-line">Start or Join an</span>
                <span className="hero-title-line gradient-text">Enginuity Club</span>
              </h1>
              <p className="hero-lead">
                Enginuity Clubs are student-led groups that run hands-on projects, build engineering kits, and collaborate with peers worldwide. We provide resources, mentorship, and small grants to get your chapter off the ground.
              </p>
              <div className="hero-actions">
                <a href="/tinko" className="btn primary">Get Started</a>
                <a href="/contact" className="btn ghost">Contact Us</a>
              </div>
            </div>

            <div className="hero-media">
              <div className="hero-photo-card">
                 <div className="card-glare"></div>
                <img src={clubPic} alt="Enginuity club" />
                <div className="hero-photo-badges">
                  <div className="badge">Kits</div>
                  <div className="badge">Mentorship</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="club-research-section">
        <div className="container">
          <div className="section-header">
            <div className="section-bubble">Research</div>
            <h2 className="section-title">Research & Publications</h2>
            <p className="section-description">Enginuity supports student research and publishes project write-ups, field results, and educational studies.</p>
          </div>

          <div className="research-grid">
            {/* All cards now have the glare effect */}
            <div className="research-card">
              <div className="card-glare"></div>
              <div className="card-glow"></div>
              <div className="card-border-glow"></div>
              <div className="research-media">
                <img src={research1} alt="Research 1" />
              </div>
              <div className="research-content">
                <h3 className="research-title">Low-Cost Air Quality Sensors</h3>
                <p className="research-description">Students built distributed air-quality monitors and validated low-cost sensors against reference equipment. Results show strong correlation and a reliable calibration approach for classroom deployments.</p>
                <div className="research-meta">
                  <div className="meta-tag">Sensor Networks</div>
                  <div className="meta-tag">Paper</div>
                </div>
              </div>
            </div>

            <div className="research-card reverse">
              <div className="card-glare"></div>
              <div className="card-glow"></div>
              <div className="card-border-glow"></div>
              <div className="research-media">
                <img src={research2} alt="Research 2" />
              </div>
              <div className="research-content">
                <h3 className="research-title">Robotics for Field Mapping</h3>
                <p className="research-description">A cross-country student team created an affordable rover for agricultural mapping. The project includes design notes, sensor fusion code, and deployment case studies.</p>
                <div className="research-meta">
                  <div className="meta-tag">Robotics</div>
                  <div className="meta-tag">Open Source</div>
                </div>
              </div>
            </div>

            <div className="research-card">
              <div className="card-glare"></div>
              <div className="card-glow"></div>
              <div className="card-border-glow"></div>
              <div className="research-media">
                <img src={research3} alt="Research 3" />
              </div>
              <div className="research-content">
                <h3 className="research-title">STEM Education Outcomes</h3>
                <p className="research-description">A study on learning outcomes from hands-on projects. This report details pre/post assessments, engagement metrics, and recommendations for teachers running makerspace programs.</p>
                <div className="research-meta">
                  <div className="meta-tag">Education</div>
                  <div className="meta-tag">Study</div>
                </div>
              </div>
            </div>

            <div className="research-card reverse">
               <div className="card-glare"></div>
               <div className="card-glow"></div>
               <div className="card-border-glow"></div>
              <div className="research-media">
                <video controls playsInline width="100%">
                  <source src={research4} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="research-content">
                <h3 className="research-title">Field Pilot: Community Sensors (Video)</h3>
                <p className="research-description">Watch a field deployment of our community sensors. This video documents installation, calibration, and real-world troubleshooting led by student teams.</p>
                <div className="research-meta">
                  <div className="meta-tag">Video</div>
                  <div className="meta-tag">Deployment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="club-cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-glow"></div>
            <h3 className="cta-title">Ready to start a chapter?</h3>
            <p className="cta-description">Apply for mentorship and starter kits — we'll help you plan your first term of projects.</p>
            <div>
              <a href="/contact" className="btn primary">Apply Now</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Club;