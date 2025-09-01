import { useState, useEffect, useRef } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './CTA.css';

const CTA = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const particleSystemRef = useRef(null);

  useEffect(() => {
    // Create animated particle system for CTA
    const createCtaParticles = () => {
      if (particleSystemRef.current) {
        for (let i = 0; i < 40; i++) {
          const particle = document.createElement('div');
          particle.className = 'cta-particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 25 + 's';
          particle.style.animationDuration = (Math.random() * 15 + 20) + 's';
          
          // Random particle colors
          const colors = [
            'rgba(99, 102, 241, 0.8)',
            'rgba(236, 72, 153, 0.8)', 
            'rgba(168, 85, 247, 0.8)',
            'rgba(59, 130, 246, 0.8)'
          ];
          particle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, transparent 70%)`;
          
          particleSystemRef.current.appendChild(particle);
        }
      }
    };

    createCtaParticles();
  }, []);

  return (
    <section id="contact" className="cta-section-new">
      <div className="cta-background">
        <div className="cta-particles" ref={particleSystemRef}></div>
        <div className="cta-mesh-gradient">
          <div className="cta-orb cta-orb-1"></div>
          <div className="cta-orb cta-orb-2"></div>
          <div className="cta-orb cta-orb-3"></div>
        </div>
      </div>
      
      <div className="container">
        <div 
          ref={headerRef}
          className={`cta-content-new swoop stagger-group ${headerVisible ? 'visible' : ''}`}
        >
          <div className="cta-header-new">
            <div className="cta-badge">Join the Revolution</div>
            <h2 className="cta-title-new">
              Ready to take a step forward <span className="highlight-text-new">In the Future of STEM?</span>
            </h2>
            <p className="cta-description-new">
              Join a community of young scientists, engineers, and innovators. 
              Develop cutting-edge projects, master new technologies, and solve real-world problems through STEM.
            </p>
          </div>

          <div className="cta-actions-new">
            <a href="/apply" className="cta-primary-btn-new">
              <span>Submit Your Project</span>
              <div className="btn-glow"></div>
            </a>
            
            <div className="cta-secondary-actions-new">
              <a href="#tutorials" className="secondary-link-new">
                <span>View Tutorials</span>
                <div className="link-underline"></div>
              </a>
              <a href="https://discord.gg/hackclub" className="secondary-link-new">
                <span>Join Community</span>
                <div className="link-underline"></div>
              </a>
              <a href="#about" className="secondary-link-new">
                <span>Learn More</span>
                <div className="link-underline"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
