import React from 'react';
import SEO from './SEO';
import Stats from './Stats';
import './Impact.css';

const Impact = () => (
  <>
    <SEO
      title="Impact — Enginuity STEM"
      description="Enginuity STEM impact: community stories, student outcomes, and measurable project results."
      path="/impact"
      keywords={["enginuity", "impact", "community", "stem"]}
    />

    <header className="impact-hero">
      <div className="impact-hero-bg">
        <div className="impact-grid"></div>
        <div className="impact-orbs">
          <div className="impact-orb orb-1"></div>
          <div className="impact-orb orb-2"></div>
          <div className="impact-orb orb-3"></div>
        </div>
      </div>

      <div className="impact-hero-inner container">
        <div className="impact-hero-content">
          <div className="impact-badge">Our Reach</div>
          <h1 className="impact-title">Enginuity: Real Projects, Real Impact</h1>
          <p className="impact-subtitle">See how students, clubs, and schools are building real solutions with hands-on STEM projects.</p>
          <div className="impact-cta">
            <a href="#stats" className="btn btn-primary">View Metrics</a>
            <a href="#stories" className="btn btn-secondary">Read Stories</a>
          </div>
        </div>
      </div>
    </header>

    <main className="impact-main container">
      <section id="stats" className="impact-section">
        {/* Stats component moved here from Home */}
        <Stats />
      </section>

      <section id="stories" className="impact-section">
        <h3 className="section-title-small">Community Stories</h3>
        <div className="stories-grid">
          <article className="glass-card">
            <h4>Student Robotics Team</h4>
            <p>Built assistive robots used by local clinics.</p>
          </article>
          <article className="glass-card">
            <h4>Rural STEM Kits</h4>
            <p>Distributed 120 kits and trained teachers in three districts.</p>
          </article>
          <article className="glass-card">
            <h4>School Partnerships</h4>
            <p>Established ongoing curriculum partnerships with 8 schools.</p>
          </article>
        </div>
      </section>

      <section id="partners" className="impact-section">
        <h3 className="section-title-small">Partners & Supporters</h3>
        <div className="partners-row">
          <div className="partner">School Districts</div>
          <div className="partner">Local NGOs</div>
          <div className="partner">Industry Mentors</div>
        </div>
      </section>
    </main>
  </>
);

export default Impact;
