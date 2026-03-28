import SEO from './SEO';
import './Club.css';
import govMeeting from '../../govmeeting.png';
import eyfun from '../../images/eyfun.png';
import hlpfun from '../../images/hlpfun.JPG';
import anvayspeakingun from '../../images/anvayspeakingun.JPG';
import iycImg from '../../iyc.png';

const unSpeechSrc = 'https://media.githubusercontent.com/media/anvayajmera/enginuity/main/public/UNspeech.mp4';

const UnitedNations = () => (
  <div className="club-page un-initiative-page">
    <SEO
      title="Enginuity: United Nations"
      description="Enginuity at the United Nations: youth-led engineering advocacy, member-state engagement, and policy collaboration to close the global digital divide."
      path="/united-nations"
      keywords={["enginuity", "united nations", "member states", "engineering education", "digital divide", "youth advocacy"]}
    />

    <div className="club-background">
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

    <section id="hero" className="club-hero in-view active">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-sparkle"></span>
              Global Advocacy
            </div>
            <h1 className="hero-title title-centered">
              <span className="hero-title-line">United Nations</span>
              <span className="hero-title-line impact-word gradient-text">Initiative</span>
            </h1>
            <p className="hero-lead">
              We work alongside UN stakeholders, NGOs, and member-state representatives to push for engineering access, youth leadership, and digital equity worldwide.
            </p>
            <div className="hero-actions">
              <a href="#un" className="btn primary">View Initiative</a>
              <a href="/contact" className="btn ghost">Partner With Us</a>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-photo-card">
              <div className="card-glare"></div>
              <img src={govMeeting} alt="Enginuity representatives meeting government officials" className="hero-photo-img" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="un" className="club-un-section in-view active">
      <div className="container">
        <div className="section-header">
          <div className="section-bubble">Policy Work</div>
          <h2 className="section-title">United Nations Initiative</h2>
          <p className="section-description">From ECOSOC to HLPF and CSocD, our delegates speak, connect, and build partnerships that move youth ideas into real action.</p>
        </div>

        <div className="un-details">
          <div className="un-gallery-box">
            <div className="un-gallery-top">
              <div className="top-item un-top-left">
                <img src={anvayspeakingun} alt="Anvay speaking at UN" />
              </div>
              <div className="top-item un-top-middle">
                <video controls playsInline preload="metadata" className="top-video">
                  <source src={unSpeechSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="top-item un-top-right">
                <img src={iycImg} alt="International Youth Conference engagement" />
              </div>
            </div>

            <div className="gallery-portraits">
              <div className="gallery-portrait left">
                <img src={eyfun} alt="EY Fun program portrait" />
              </div>
              <div className="gallery-copy">
                <div className="gallery-copy-inner">
                  <h3 className="gallery-title">Youth Engineering at UN Scale</h3>
                  <p className="gallery-lead">Enginuity representatives were invited to major UN forums in New York, where we pushed practical conversations on engineering access, digital inclusion, and youth leadership in policy.<br />Highlights from 2025:</p>

                  <ul className="gallery-points" aria-hidden>
                    <li><strong>ECOSOC Youth Forum 2025: </strong>Engaged leaders including Ambassador Bob Rae and Larry Irving at UN Headquarters.</li>
                    <li><strong>HLPF 2025: </strong>Participated alongside the UN Major Group for Children and Youth in a global assembly of 6,000+ stakeholders.</li>
                    <li><strong>CSocD64 + International Youth Conference: </strong>Delivered youth-led interventions on governing technology and bridging digital divides.</li>
                  </ul>

                  <div className="gallery-cta">
                    <a href="/contact" className="btn btn-purple-outline small">Partner With Us</a>
                    <a href="/impact" className="btn btn-purple-outline small">View Program Impact</a>
                  </div>
                </div>
              </div>
              <div className="gallery-portrait right">
                <img src={hlpfun} alt="HLP Fun program portrait" />
              </div>
            </div>
          </div>

          <div className="sdg-grid">
            <div className="sdg-card glass" aria-hidden>
              <div className="sdg-badge">
                <svg viewBox="0 0 64 64" aria-hidden>
                  <circle cx="32" cy="32" r="30" fill="#e53935" />
                  <text x="32" y="38" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="700">4</text>
                </svg>
              </div>
              <h3>SDG 4: Quality Education</h3>
              <p>We build classroom-ready engineering modules covering CAD, circuitry, and hands-on assembly so students learn by building real systems.</p>
            </div>

            <div className="sdg-card glass" aria-hidden>
              <div className="sdg-badge">
                <svg viewBox="0 0 64 64" aria-hidden>
                  <circle cx="32" cy="32" r="30" fill="#8e44ad" />
                  <text x="32" y="38" textAnchor="middle" fontSize="20" fill="#fff" fontWeight="700">10</text>
                </svg>
              </div>
              <h3>SDG 10: Reduced Inequalities</h3>
              <p>Through Siblings Keeper partnerships, we deliver devices and engineering kits to underserved schools to reduce technology inequality at the source.</p>
            </div>

            <div className="sdg-card glass" aria-hidden>
              <div className="sdg-badge">
                <svg viewBox="0 0 64 64" aria-hidden>
                  <circle cx="32" cy="32" r="30" fill="#1e88e5" />
                  <text x="32" y="38" textAnchor="middle" fontSize="18" fill="#fff" fontWeight="700">17</text>
                </svg>
              </div>
              <h3>SDG 17: Partnerships</h3>
              <p>We collaborate with member-state offices, schools, NGOs, and UN youth structures to scale durable engineering education across regions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default UnitedNations;
