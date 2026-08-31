import { useEffect, useRef } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './About.css';

const About = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [card1Ref, card1Visible] = useIntersectionObserver();
  const [card2Ref, card2Visible] = useIntersectionObserver();
  const [card3Ref, card3Visible] = useIntersectionObserver();
  const floatingElementsRef = useRef(null);

  useEffect(() => {
    // Create floating particles for the about section
    const createFloatingElements = () => {
      if (floatingElementsRef.current) {
        for (let i = 0; i < 15; i++) {
          const element = document.createElement('div');
          element.className = 'floating-particle';
          element.style.left = Math.random() * 100 + '%';
          element.style.top = Math.random() * 100 + '%';
          element.style.animationDelay = Math.random() * 20 + 's';
          element.style.animationDuration = (Math.random() * 15 + 15) + 's';
          floatingElementsRef.current.appendChild(element);
        }
      }
    };

    createFloatingElements();
  }, []);

  const features = [
    {
      id: '01',
      title: 'Innovation',
      description: 'From CAD and PCB design, we build pathways to allow students to touch, test, and improve everywhere.',
      iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' // Lightning bolt
    },
    {
      id: '02',
      title: 'Collaboration',
      description: 'Under Siblings Keeper, we partner with schools, NGOs, and UN networks to bring engineering access to communities that are too often left out.',
      iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' // Users
    },
    {
      id: '03',
      title: 'Impact',
      description: 'We fully focus on build-first engineering, where students design, assemble, and deploy complete products, with coding used as one tool in the process.',
      iconPath: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' // Star
    }
  ];

  const cardRefs = [card1Ref, card2Ref, card3Ref];
  const cardVisibility = [card1Visible, card2Visible, card3Visible];

  return (
    <section id="about" className="about-section">
      <div className="about-background">
        <div className="floating-elements" ref={floatingElementsRef}></div>
        <div className="about-stem-shapes">
          <div className="about-stem-shape about-math-formula"></div>
          <div className="about-stem-shape about-beaker"></div>
          <div className="about-stem-shape about-telescope"></div>
          <div className="about-stem-shape about-binary"></div>
          <div className="about-stem-shape about-rocket"></div>
        </div>
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
      </div>
      
      <div className="container">
        <div 
          ref={headerRef}
          className={`section-header fade-in reveal-left swoop ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-badge">Our Mission</div>
          <h2 className="section-title">Engineering Access at Global Scale</h2>
          <p className="section-description">
            Enginuity is a global engineering-focused STEM program under Siblings Keeper. We bring hands-on education, technology, and mentorship to communities that are too often left out.
          </p>
         
        </div>
        
    <div className="features-grid stagger-group"> 
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={cardRefs[index]}
      className={`feature-card glass-card reveal-up stagger-${index + 1} ${cardVisibility[index] ? 'visible' : ''}`}
            >
              <div className="card-glow"></div>
              <div className="feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={feature.iconPath} />
                </svg>
                <div className="icon-backdrop"></div>
              </div>
              <div className="feature-content">
                <div className="feature-number">{feature.id}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
              <div className="card-border-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
