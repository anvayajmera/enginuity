import { useEffect, useRef, useState } from 'react';
import './Stats.css';

const Stats = () => {
  const [_countersStarted, _setCountersStarted] = useState(false);
  const statsRef = useRef(null);
  const svgPathRef = useRef(null);
  const particleSystemRef = useRef(null);

  const stats = [
    {
      number: 1700,
      label: 'STUDENTS REACHED',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zM16 13c-.29 0-.62.02-.97.05 1.16.84 1.97 1.98 1.97 3.45V19h6v-2.5C23 14.17 18.33 13 16 13z" />
        </svg>
      ),
      description: ''
    },
    {
      number: 350,
      label: 'ENGINEERING KITS SHIPPED',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 4H3c-1.1 0-2 .9-2 2v12a1 1 0 001 1h20a1 1 0 001-1V6c0-1.1-.9-2-2-2zM8 18H5v-2h3v2zm0-4H5v-2h3v2zm11 4h-9v-2h9v2zm0-4h-9v-2h9v2z" />
        </svg>
      ),
      description: ''
    },
    {
      number: 34,
      label: 'CAD & PCB MODULES',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
        </svg>
      ),
      description: ''
    },
    {
      number: 8,
      label: 'SCHOOL PARTNERS',
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L2 9l10 6 10-6-10-6zm0 8.5L6 9.33v2.83L12 16l6-3.84V9.33L12 11.5zM4 12.2v5.8l8 4 8-4v-5.8L12 16.2 4 12.2z" />
        </svg>
      ),
      description: ''
    }
  ];

  const [statValues, setStatValues] = useState(stats.map(() => 0));

  // Create floating particles
  useEffect(() => {
    const createParticleSystem = () => {
      if (particleSystemRef.current) {
        for (let i = 0; i < 30; i++) {
          const particle = document.createElement('div');
          particle.className = 'stat-particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 25 + 's';
          particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
          particleSystemRef.current.appendChild(particle);
        }
      }
    };

    createParticleSystem();
  }, []);

  // SVG Line Animation
  useEffect(() => {
    const statsPath = svgPathRef.current;
    
    if (statsPath) {
      const pathLength = statsPath.getTotalLength();
      statsPath.style.strokeDasharray = pathLength + ' ' + pathLength;
      statsPath.style.strokeDashoffset = pathLength;

      const handleScroll = () => {
        const rect = statsRef.current?.getBoundingClientRect();
        if (!rect) return;

        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate progress based on element visibility
        const progress = Math.max(0, Math.min(1, 
          (windowHeight - elementTop) / (windowHeight + elementHeight)
        ));
        
        console.log('Progress:', progress); // Debug
        
        // Animate the line drawing
        const drawLength = pathLength * progress;
        statsPath.style.strokeDashoffset = pathLength - drawLength;
        
        // Dynamic stroke width
        const strokeWidth = 100 - (progress * 20); // From 100px to 80px
        statsPath.style.strokeWidth = `${Math.max(60, strokeWidth)}px`;
        
        // Force visibility
        statsPath.style.stroke = 'url(#lineGradient)';
        statsPath.style.opacity = '1';
      };
      
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Counter Animation with single requestAnimationFrame loop
  useEffect(() => {
    const finalValues = stats.map(s => s.number);
    const duration = 1600;
    let rafId = null;
    let startTime = null;
    const startedRef = { started: false };

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const t = Math.min((timestamp - startTime) / duration, 1);
      const next = finalValues.map(v => Math.floor(v * t));
      setStatValues(next);
      if (t < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !startedRef.started) {
          startedRef.started = true;
          rafId = requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.35 });

    if (statsRef.current) io.observe(statsRef.current);

    return () => {
      io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="stats" className="stats-section-new" ref={statsRef}>
      <div className="stats-background">
        <div className="particle-system" ref={particleSystemRef}></div>
        <div className="stats-orbs">
          <div className="stats-orb stats-orb-1"></div>
          <div className="stats-orb stats-orb-2"></div>
          <div className="stats-orb stats-orb-3"></div>
        </div>
      </div>

   
      
      <div className="stats-container">
        <div className="stats-header">
          <div className="section-badge-stats">Our Impact</div>
          <h2 className="section-title-stats">Global Engineering Footprint</h2>
          <p className="section-description-stats">
            These numbers reflect kits deployed, partner schools supported, and hands-on engineering opportunities delivered across communities.
          </p>
        </div>
        
        <div className="stats-grid-new">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card-glass">
              <div className="stat-card-glow"></div>
              {/* icon backdrop uses blue-themed classes: blue-1..blue-4 */}
              <div className={`stat-icon blue-${index + 1}`}>
                <span className="stat-emoji">{stat.icon}</span>
              </div>
              <div className="stat-content">
                <div className="stat-number-new">
                  {index === 0 && statValues[index] >= 1700 ? statValues[index].toLocaleString() + '+' : statValues[index].toLocaleString()}
                </div>
                <div className="stat-label-new">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
              <div className="stat-border-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

