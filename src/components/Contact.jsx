import { useState, useRef, useEffect } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './Contact.css';

const Contact = () => {
  const [isSuccess] = useState(false);
  
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [formRef, formVisible] = useIntersectionObserver();
  const particleSystemRef = useRef(null);

  useEffect(() => {
    // Create floating particles
    const createParticleSystem = () => {
      if (particleSystemRef.current) {
        for (let i = 0; i < 40; i++) {
          const particle = document.createElement('div');
          particle.className = 'contact-particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 25 + 's';
          particle.style.animationDuration = (Math.random() * 20 + 25) + 's';
          particleSystemRef.current.appendChild(particle);
        }
      }
    };

    createParticleSystem();
  }, []);



  return (
    <>
      <section id="contact" className="contact-section">
            <div className="contact-background">
        <div className="contact-grid"></div>
        <div className="floating-contact-elements">
          <div className="stem-shapes">
            <div className="stem-shape stem-dna"></div>
            <div className="stem-shape stem-atom"></div>
            <div className="stem-shape stem-molecule"></div>
            <div className="stem-shape stem-circuit"></div>
            <div className="stem-shape stem-gear"></div>
          </div>
        </div>
        <div className="particle-system" ref={particleSystemRef}></div>
      </div>

      <div className="container">
        <div 
          ref={headerRef}
          className={`section-header fade-in reveal-left swoop ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-badge">Get In Touch</div>
          <h2 className="section-title">Let's Do Something Amazing Together</h2>
          <p className="section-description">
            Want to launch a chapter, partner with our engineering program, or support kit deployment in underserved communities?
            Send us a message and we will connect with next steps.
          </p>
        </div>

        <div 
          ref={formRef}
          className={`contact-container fade-in reveal-right stagger-group ${formVisible ? 'visible' : ''}`}
        >
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h3>Email Us</h3>
              <p>anvayajmera9@gmail.com<br/>a.ajmera@apeers.com</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <h3>Call Us</h3>
              <p>+1 (908) 524-4059<br/>Mon-Sun 1PM-8PM</p>
            </div>
          </div>

          <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">
            <input type="hidden" name="access_key" value="01202b92-e165-4ba1-828e-9bfc213b1adf" />
            <div className="form-glass">
              <div className="form-glow"></div>
              
              {isSuccess && (
                <div className="success-message">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder=" "
                  />
                  <label>Full Name</label>
                  <div className="form-line"></div>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder=" "
                  />
                  <label>Email Address</label>
                  <div className="form-line"></div>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder=" "
                />
                <label>Subject</label>
                <div className="form-line"></div>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  required
                  placeholder=" "
                  rows="6"
                ></textarea>
                <label>Message</label>
                <div className="form-line"></div>
              </div>
              <button 
                type="submit" 
                className="submit-btn"
              >
                <span className="btn-text">Send Message</span>
                <div className="btn-ripple"></div>
                <div className="btn-glow"></div>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
    </>
  );
};

export default Contact;
