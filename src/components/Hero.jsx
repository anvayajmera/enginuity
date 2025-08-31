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
            <span>🚀 Enginuity 2025</span>
          </div>
          <h1 className="glow-text visible">Invent. Engineer. <span className="underline">Inspire.</span></h1>
          <p className="hero-subtitle">
            Join Enginuity: the club for future engineers, makers, and innovators. Build real-world projects, learn hands-on skills, and connect with a passionate STEM community.
          </p>
          <div className="hero-cta">
            <a href="#about" className="btn btn-primary">Start Engineering</a>
            <a href="#tutorials" className="btn btn-secondary">Explore Tracks</a>
          </div>
        </div>

  {/* hero visual removed — center content only */}
      </div>
    </section>
  );
};

export default Hero;
