import { useEffect, useRef } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './Features.css';

const Features = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [card1Ref, card1Visible] = useIntersectionObserver();
  const [card2Ref, card2Visible] = useIntersectionObserver();
  const [card3Ref, card3Visible] = useIntersectionObserver();
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Create animated particles background
    const createParticleSystem = () => {
      if (backgroundRef.current) {
        for (let i = 0; i < 25; i++) {
          const particle = document.createElement('div');
          particle.className = 'bg-particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 30 + 's';
          particle.style.animationDuration = (Math.random() * 20 + 20) + 's';
          backgroundRef.current.appendChild(particle);
        }
      }
    };

    createParticleSystem();
  }, []);

  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
          <path d="M4 14L5 17L8 18L5 19L4 22L3 19L0 18L3 17L4 14Z" fill="currentColor" opacity="0.6"/>
          <path d="M18 6L19 9L22 10L19 11L18 14L17 11L14 10L17 9L18 6Z" fill="currentColor" opacity="0.6"/>
        </svg>
      ),
      title: 'Advanced Workshops',
      description: 'Deep-dive into cutting-edge technologies like AI, machine learning, blockchain, and more through hands-on workshops led by industry experts.',
      gradient: 'from-violet-500 to-purple-600',
      glowColor: 'rgba(139, 92, 246, 0.3)'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
          <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
          <circle cx="16" cy="8" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="8" cy="16" r="1.5" fill="currentColor"/>
          <circle cx="16" cy="16" r="1.5" fill="currentColor"/>
          <path d="M8 8L16 8M8 16L16 16M8 8L8 16M16 8L16 16M8 8L16 16M16 8L8 16" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
        </svg>
      ),
      title: 'Global Network',
      description: 'Connect with like-minded innovators from around the world, building relationships that last beyond your time in the program.',
      gradient: 'from-blue-500 to-cyan-600',
      glowColor: 'rgba(59, 130, 246, 0.3)'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L12.5 8.5L18 9L12.5 9.5L12 15L11.5 9.5L6 9L11.5 8.5L12 3Z" fill="currentColor"/>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3"/>
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
          <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.7"/>
        </svg>
      ),
      title: 'Project Incubation',
      description: 'Turn your ideas into reality with our project incubation program, complete with mentorship, resources, and potential funding opportunities.',
      gradient: 'from-pink-500 to-rose-600',
      glowColor: 'rgba(236, 72, 153, 0.3)'
    }
  ];

  const cardRefs = [card1Ref, card2Ref, card3Ref];
  const cardVisibility = [card1Visible, card2Visible, card3Visible];

  return (
    <section id="features" className="features-section">
      <div className="features-background" ref={backgroundRef}>
        <div className="features-stem-shapes">
          <div className="features-stem-shape features-network"></div>
          <div className="features-stem-shape features-server"></div>
          <div className="features-stem-shape features-blockchain"></div>
          <div className="features-stem-shape features-ai-brain"></div>
          <div className="features-stem-shape features-code"></div>
        </div>
        <div className="mesh-gradient">
          <div className="mesh-orb mesh-orb-1"></div>
          <div className="mesh-orb mesh-orb-2"></div>
          <div className="mesh-orb mesh-orb-3"></div>
          <div className="mesh-orb mesh-orb-4"></div>
        </div>
      </div>
      
      <div className="container">
        <div 
          ref={headerRef}
          className={`section-header fade-in reveal-right swoop ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-badge">What We Offer</div>
          <h2 className="section-title">Comprehensive Learning Experience</h2>
          <p className="section-description">
            From mentorship to hands-on projects, we provide everything you need to excel 
            in the world of software development.
          </p>
        </div>
        
  <div className="features-grid stagger-group">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={cardRefs[index]}
              className={`feature-card-3d reveal-up stagger-${index + 1} ${cardVisibility[index] ? 'visible' : ''}`}
              style={{ 
                '--glow-color': feature.glowColor 
              }}
            >
              <div className="card-inner">
                <div className="card-front">
                  <div className="feature-glow"></div>
                  <div className={`feature-icon-3d ${feature.gradient}`}>
                    <div className="icon-3d">{feature.icon}</div>
                    <div className="icon-ring"></div>
                    <div className="icon-ring-2"></div>
                  </div>
                  <div className="feature-content-3d">
                    <h3 className="feature-title-3d">{feature.title}</h3>
                    <p className="feature-description-3d">{feature.description}</p>
                  </div>
                  <div className="card-shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
