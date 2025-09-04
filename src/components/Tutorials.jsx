// ...existing code...
import { useState, useEffect, useRef } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './Tutorials.css';

const Tutorials = () => {
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [path1Ref, path1Visible] = useIntersectionObserver();
  const [path2Ref, path2Visible] = useIntersectionObserver();
  const [hoveredPath, setHoveredPath] = useState(null);
  const [activePath, setActivePath] = useState(null);
  const particleSystemRef = useRef(null);

  useEffect(() => {
    // Create floating particles
    const createParticleSystem = () => {
      if (particleSystemRef.current) {
        for (let i = 0; i < 40; i++) {
          const particle = document.createElement('div');
          particle.className = 'tutorial-particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 30 + 's';
          particle.style.animationDuration = (Math.random() * 20 + 20) + 's';
          particleSystemRef.current.appendChild(particle);
        }
      }
    };

    createParticleSystem();
  }, []);

  const handleRippleClick = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const paths = [
    {
      id: 'introduction',
      title: 'Foundation Track',
      audience: 'Early Coders',
      location: 'Students',
      reward: 'Micro:bit Kit',
      difficulty: 'Beginner',
      duration: '6 weeks',
      description: 'With our interactive curriculum technology, this is the perfect foundation for young innovators starting their STEM journey.',
      features: [
        'Visual programming environment',
        'Hardware prototyping basics',
        'Interactive dashboard creation'
      ],
      color: 'blue',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
      icon: 'microbit'
    },
    {
      id: 'advanced',
      title: 'Advanced Track',
      audience: 'Advanced Coders',
      location: 'Hack Club',
      reward: 'Arduino Mega Kit',
      difficulty: 'Advanced',
      duration: '8 weeks',
      description: 'This is an intensive program for experienced developers ready for new challenges (and a cool reward to continue your journey).',
      features: [
        'Professional IoT development',
        'Machine learning integration',
        'Interactive dashboard creation'
      ],
      color: 'purple',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
      icon: 'arduino'
    }
  ];

  const render3DModel = (type) => {
    if (type === 'microbit') {
      return (
        <div className="model-3d microbit-model">
          <div className="board-simple">
            <div className="led-grid">
              {Array.from({ length: 9 }, (_, i) => (
                <div key={i} className={`led led-${i + 1}`}></div>
              ))}
            </div>
            <div className="buttons-simple">
              <div className="btn-simple btn-a"></div>
              <div className="btn-simple btn-b"></div>
            </div>
          </div>
        </div>
      );
    } else if (type === 'arduino') {
      return (
        <div className="model-3d arduino-model">
          <div className="board-simple">
            <div className="chip-simple"></div>
            <div className="pins-simple">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="pin-simple"></div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="tutorials" className="tutorials-section-enhanced">
      {/* Enhanced Background Elements */}
      <div className="tutorials-background-enhanced">
        <div className="particle-system" ref={particleSystemRef}></div>
        <div className="tutorials-orbs">
          <div className="tutorial-orb tutorial-orb-1"></div>
          <div className="tutorial-orb tutorial-orb-2"></div>
          <div className="tutorial-orb tutorial-orb-3"></div>
          <div className="tutorial-orb tutorial-orb-4"></div>
        </div>
        <div className="tutorials-grid-enhanced"></div>
        <div className="floating-elements-enhanced">
          <div className="floating-shape floating-code"></div>
          <div className="floating-shape floating-chip"></div>
          <div className="floating-shape floating-circuit"></div>
          <div className="floating-shape floating-brain"></div>
          <div className="floating-shape floating-rocket"></div>
        </div>
      </div>

      <div className="container">
        <div 
          ref={headerRef}
          className={`section-header-enhanced fade-in reveal-left swoop ${headerVisible ? 'visible' : ''}`}
        >
          <div className="section-badge-enhanced">
            <span className="badge-icon">Learning Paths</span>
          </div>
          <h2 className="section-title-enhanced">Choose Your Journey</h2>
          <p className="section-description-enhanced">
            Two distinct tracks designed for different skill levels and learning objectives.
          </p>
        </div>

  <div className="paths-container-enhanced stagger-group">
          {paths.map((path, index) => (
            <div
              key={path.id}
              ref={index === 0 ? path1Ref : path2Ref}
              className={`path-card-enhanced reveal-up stagger-${index + 1} ${
                index === 0 ? (path1Visible ? 'visible' : '') : (path2Visible ? 'visible' : '')
              } ${hoveredPath === path.id ? 'hovered' : ''} ${activePath === path.id ? 'active' : ''}`}
              onMouseEnter={() => setHoveredPath(path.id)}
              onMouseLeave={() => setHoveredPath(null)}
              onClick={() => setActivePath(activePath === path.id ? null : path.id)}
            >
              {/* Card Background Glow */}
              <div className="card-glow-enhanced" style={{ background: path.gradient }}></div>
              
              {/* Card Header */}
              <div className="card-header-enhanced">
                <div className="path-number">{index + 1}</div>
                <div className="path-icon">
                  {render3DModel(path.icon)}
                </div>
                <div className="path-info">
                  <h3 className="path-title">{path.title}</h3>
                  <p className="path-subtitle">{path.subtitle}</p>
                </div>
                <div className="difficulty-badge" style={{ background: path.gradient }}>
                  {path.difficulty}
                </div>
              </div>

              {/* Card Content */}
              <div className="card-content-enhanced">
                <p className="path-description">{path.description}</p>
                {/* Meta Information (only Target and Reward) */}
                <div className="path-meta-enhanced">
                  <div className="meta-item">
                    <span className="meta-label">Target:</span>
                    <span className="meta-value">{path.audience}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Reward:</span>
                    <span className="meta-value">{path.reward}</span>
                  </div>
                </div>
                {/* Glassmorphism What You'll Learn Section */}
                <div className="learn-section-glass">
                  <h4 className="learn-title-glass">What to Expect</h4>
                  <ul className="learn-list-glass">
                    {path.features.map((feature, idx) => (
                      <li key={idx} className="learn-item-glass">
                        <span className="learn-text-glass">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Action Button */}
                <div className="path-action-enhanced">
                  <button 
                    className="btn-enhanced ripple"
                    style={{ background: path.gradient }}
                    onClick={handleRippleClick}
                  >
                    <span className="btn-text">Begin {path.title}</span>
                    <div className="btn-glow"></div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tutorials;
