import React from 'react';
import kidsImg from '../../images/kids.png';
import SEO from './SEO';
import './Impact.css';

const stats = [
  { label: "Students Reached", value: "18k+" },
  { label: "Clubs Supported", value: "420+" },
  { label: "Projects Built", value: "1.2k+" },
  { label: "Volunteer Hours", value: "45k+" },
];

const projects = [
  { title: 'Solar Kart', desc: 'Student-built solar vehicle demonstrating clean-energy engineering.' },
  { title: 'Hydro Habitat', desc: 'Water-filtration prototype created with local partners.' },
  { title: 'Robotics League', desc: 'Regional robotics competition entries & winners.' },
];

const Impact = () => {
  return (
    <>
      <SEO
        title="Enginuity Impact"
        description="Enginuity STEM impact: community stories, student outcomes, and measurable project results."
        path="/impact"
        keywords={["enginuity", "impact", "community", "stem"]}
      />

  <main className="impact-page club-page">
        <header className="impact-hero">
          <div className="hero-content container">
            <h1 className="hero-title gradient-text">Engineering futures. Measuring impact.</h1>
            <p className="hero-sub">Real projects. Real learners. Real change — powered by hands-on STEM learning.</p>

            <div className="hero-cta">
              <a className="btn primary" href="#projects">See projects</a>
              <a className="btn ghost" href="#get-involved">Get involved</a>
            </div>
          </div>

          {/* hero visual: show kids.png */}
          <div className="impact-hero-photo">
            <img src={kidsImg} alt="Enginuity kids" className="impact-photo-img" />
          </div>

          {/* decorative animated background blobs and grid */}
          {/* use shared club background elements so Impact matches Club theme */}
          <div className="club-background" aria-hidden>
            <div className="noise-overlay" />
            <div className="club-orbs">
              <div className="orb orb-1" />
              <div className="orb orb-2" />
              <div className="orb orb-3" />
              <div className="orb orb-4" />
            </div>
            <div className="club-grid-pattern" />
            <div className="club-floating-shapes">
              <div className="shape shape-1" />
              <div className="shape shape-2" />
              <div className="shape shape-3" />
              <div className="shape shape-4" />
              <div className="shape shape-5" />
              <div className="shape shape-6" />
            </div>
          </div>
        </header>

        <section className="impact-stats container" aria-labelledby="impact-stats-title">
          <h2 id="impact-stats-title" className="section-heading">By the numbers</h2>
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-card glass">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="impact-projects container">
          <h2 className="section-heading">Project highlights</h2>
          <p className="section-lead">A selection of student projects and community partnerships that showcase learning and impact.</p>

          <div className="projects-grid">
            {projects.map((p) => (
              <article key={p.title} className="project-card glass">
                <div className="project-thumb" aria-hidden />
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <a className="project-link" href="#">Read story</a>
              </article>
            ))}
          </div>
        </section>

        <section id="get-involved" className="impact-cta container glass-cta">
          <div>
            <h2 className="section-heading">Join the movement</h2>
            <p>Partner with us, start a club, or mentor students — help scale hands-on STEM learning.</p>
          </div>
          <div className="cta-actions">
            <a className="btn primary large" href="#contact">Partner with us</a>
            <a className="btn ghost large" href="#volunteer">Volunteer</a>
          </div>
        </section>
      </main>
    </>
  );
};

export default Impact;
