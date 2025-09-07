import { useEffect, useRef } from 'react';
import picture2 from '../../images/picture2.png';
import './Testimonial.css';

const Testimonial = ({ imageSrc = picture2, quote = "Learning by doing changed my life — Enginuity made complex ideas feel tangible and fun.", author = 'Anvay Ajmera', role = 'Founder / Mentor' }) => {
  const particleRef = useRef(null);

  useEffect(() => {
    // create floating decorative shapes only
    const parent = particleRef.current;
    if (!parent) return;

    const shapes = [];
    for (let i = 0; i < 20; i++) {
      const el = document.createElement('div');
      // vary classes for more visual variety
      el.className = `testimonial-shape shape-${i % 6}`;
      el.style.left = Math.random() * 100 + '%';
      el.style.top = Math.random() * 100 + '%';
      el.style.animationDelay = (Math.random() * 10) + 's';
      el.style.animationDuration = (8 + Math.random() * 20) + 's';
      parent.appendChild(el);
      shapes.push(el);
    }

    return () => shapes.forEach(s => s.remove());
  }, []);

  return (
    <section id="testimonial" className="testimonial-section">
      <div className="testimonial-bg">
        <div className="testimonial-orbs">
          <div className="testimonial-orb orb-a"></div>
          <div className="testimonial-orb orb-b"></div>
          <div className="testimonial-orb orb-c"></div>
        </div>
        <div className="testimonial-grid"></div>
        <div className="testimonial-particles" ref={particleRef}></div>
      </div>

      <div className="container testimonial-container">
        <div className="testimonial-card glass-card reveal-up">
          <div className="avatar-wrap">
            <img src={imageSrc} alt={author} className="avatar-img" />
          </div>
          <div className="testimonial-content">
            <div className="quote-mark">“</div>
            <blockquote className="quote-text">{quote}</blockquote>
            <div className="quote-meta">
              <div className="quote-author">{author}</div>
              <div className="quote-role">{role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
