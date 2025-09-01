import { useEffect, useRef } from 'react';
import './Hero.css';
import heroImg from '../../heropic.svg';

const Hero = () => {
  const particlesRef = useRef(null);
  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      if (particlesRef.current) {
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 15 + 's';
          particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
          particlesRef.current.appendChild(particle);
        }
      }
    };

    // Parallax effect for hero grid
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const heroGrid = document.querySelector('.hero-grid');
      if (heroGrid) {
        heroGrid.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
      }
    };

    createParticles();
    window.addEventListener('scroll', handleParallax);

    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="hero-grid"></div>
      <div className="floating-elements">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>
      <div className="particles" ref={particlesRef}></div>

      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-badge">
            <span>Enginuity Cohort II (2025)</span>
          </div>
          <h1 className="glow-text visible">Engineering <span className="underline"> Dreams</span></h1>
          <p className="hero-subtitle">
            Join Enginuity, the organization for future engineers and innovators. Recieve funding for real-world projects, learn hands-on skills, and collaborate with a passionate STEM community.
    
          </p>
          <div className="hero-cta">
            <a href="/tinko" className="btn btn-primary">Start Engineering</a>
            <a href="#info" className="btn btn-secondary">Learn More</a>
          </div>
        </div>

  {/* hero visual removed — center content only */}
      </div>
    </section>
  );
};

export default Hero;
