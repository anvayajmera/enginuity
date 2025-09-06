import React from 'react';
import SEO from './SEO';
import './About.css';

const Impact = () => (
  <>
    <SEO
      title="Impact — Enginuity STEM"
      description="Enginuity STEM impact: community stories, student outcomes, and measurable project results."
      path="/impact"
      keywords={["enginuity", "impact", "community", "stem"]}
    />
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Impact</h2>
          <p className="section-description">Stories from learners, clubs, and projects powered by Enginuity STEM.</p>
        </div>

        <div className="page-placeholder">
          <h3>What we've achieved</h3>
          <p>Coming soon — we'll showcase student projects, community partnerships, and measurable outcomes here.</p>
        </div>
      </div>
    </section>
  </>
);

export default Impact;
