import { useMemo, useState } from 'react';
import './NJFblaPage.css';

const sparklesSeed = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  duration: `${12 + Math.random() * 10}s`,
  delay: `${Math.random() * 10}s`,
  size: `${3 + Math.random() * 3}px`,
}));

const highlightCards = [
  {
    title: 'Start a Chapter',
    text: 'Launch FBLA at your school with turnkey guides, recruiting kits, and funding tips.',
    badge: 'Launch',
    cta: 'Chapter Toolkit',
  },
  {
    title: 'Resources Hub',
    text: 'Practice tests, study playlists, slide templates, and winning project breakdowns.',
    badge: 'Prep',
    cta: 'Open Hub',
  },
  {
    title: 'FBLA Connect',
    text: 'Access BAA, store, and national programs—stay synced with the national experience.',
    badge: 'National',
    cta: 'Go to Connect',
  },
];

const initiatives = [
  {
    title: 'Fuel Your Future',
    body: 'Theme-first visuals, language, and CTAs woven across every page.',
  },
  {
    title: 'National Initiatives',
    body: 'BAA, Champion Chapter, LEAD, and toolkits to align NJ with national standards.',
  },
  {
    title: 'Design Refresh',
    body: 'Modern gradients, clean grids, and decluttered layouts for faster navigation.',
  },
  {
    title: 'Graphics Upgrade',
    body: 'Hero art, badges, and section accents to boost visual storytelling.',
  },
];

const events = [
  { name: 'Local Chapter Officer Training', date: 'Late September, 2025', location: 'Virtual', tag: 'Officers' },
  { name: 'State Fall Leadership Conference', date: 'Late October, 2025', location: 'Kean University', tag: 'Conference' },
  { name: 'National Fall Leadership Conference', date: 'Nov 6-8, 2025', location: 'Phoenix, AZ', tag: 'National' },
  { name: 'Regional Competitive Events', date: 'Late Nov/Early Dec, 2025', location: 'Within Chapter', tag: 'Competition' },
  { name: 'Regional Summits', date: 'January, 2025', location: 'Regional VP Schools', tag: 'Summits' },
  { name: 'State Leadership Conference', date: 'Mid March, 2026', location: 'Harrah’s, Atlantic City', tag: 'SLC' },
  { name: 'Collegiate National Leadership Conference', date: 'June 6 - July 8, 2026', location: 'Las Vegas, NV', tag: 'Collegiate' },
  { name: 'MS/HS National Leadership Conference', date: 'June 29 - July 2, 2026', location: 'San Antonio, TX', tag: 'NLC' },
];

const stats = [
  { label: 'NJ FBLA alumni', value: '150,000+' },
  { label: 'Nationals winners in 2024', value: '87' },
  { label: 'Members 2024-2025', value: '10,000+' },
  { label: 'Raised for partners', value: '$500,000+' },
];

const resourceTabs = {
  highSchool: {
    title: 'High School',
    items: [
      'Passport of Progress',
      'Competitive Events practice tests',
      'Officer resources and branding kit',
      'Community service toolkits',
      'Advertising and outreach templates',
    ],
  },
  middleSchool: {
    title: 'Middle School',
    items: [
      'Passport of Progress (ML)',
      'Starter decks and chapter launch kit',
      'Study playlists and practice tests',
      'Service and advocacy ideas',
      'Officer onboarding guides',
    ],
  },
  collegiate: {
    title: 'Collegiate',
    items: [
      'Competitive events resources',
      'Resume/portfolio templates',
      'Speaker + alumni match requests',
      'Scholarship + travel support links',
      'Winning project spotlight library',
    ],
  },
};

const officers = [
  { name: 'Angela Liu', role: 'State President' },
  { name: 'Aakar Annamalai', role: 'Northern Region VP' },
  { name: 'Laasini Kavuri', role: 'Central Region VP' },
  { name: 'Yuvika Patel', role: 'Southern Region VP' },
  { name: 'Sophia Helou', role: 'North-Central Region VP' },
  { name: 'Pari Malla', role: 'Membership VP' },
  { name: 'Santiago Gonzalez', role: 'Community Service VP' },
  { name: 'Ayur Munipalli', role: 'Secretary' },
  { name: 'Claire Yang', role: 'Historian' },
  { name: 'Aaditya Mittal', role: 'Webmaster' },
  { name: 'Alana Tyagi', role: 'Parliamentarian' },
];

const collegiateOfficers = [
  { name: 'Stephanie Ruales', role: 'Collegiate State President' },
  { name: 'Jonathan Martin', role: 'Collegiate State Vice President' },
  { name: 'Natalie Moranchel', role: 'Collegiate Membership VP' },
  { name: 'Vacant', role: 'Collegiate State Secretary' },
];

const advisers = [
  { name: 'Dr. Jeffrey Victor', role: 'State Chairman' },
  { name: 'Kimberly Clark', role: 'State Adviser' },
  { name: 'Fatima Rivera', role: 'Programs Assistant' },
  { name: 'Jatin Punjabi', role: 'State Officer Coach' },
];

const faqs = [
  { q: 'How do I start a chapter?', a: 'Use the Start a Chapter toolkit for recruiting, constitution templates, and advisor onboarding steps.' },
  { q: 'Where do I find practice tests?', a: 'Open the Resources Hub and pick High School or Middle School. Tests are under Competitive Events.' },
  { q: 'How do I access FBLA Connect?', a: 'Use the FBLA Connect card on Home to jump to national resources and store.' },
  { q: 'Where is the SLC schedule?', a: 'On the SLC App section—download the Yapp app and open the schedule module.' },
  { q: 'Who registers for events?', a: 'Advisers handle event registration. Check the events list for dates and advisor-only notes.' },
];

const NJFblaPage = () => {
  const [activeTab, setActiveTab] = useState('highSchool');
  const [openFaq, setOpenFaq] = useState(0);
  const sparkles = useMemo(() => sparklesSeed, []);

  return (
    <div className="nj-page">
      <div className="nj-hero">
        <div className="nj-grid" aria-hidden="true" />
        <div className="nj-sparkles" aria-hidden="true">
          {sparkles.map((s) => (
            <span
              key={s.id}
              className="nj-sparkle"
              style={{
                left: s.left,
                animationDuration: s.duration,
                animationDelay: s.delay,
                width: s.size,
                height: s.size,
              }}
            />
          ))}
        </div>
        <div className="nj-hero-inner">
          <div className="nj-hero-copy">
            <div className="nj-badge">#1 FBLA State • Fuel Your Future</div>
            <h1>New Jersey FBLA</h1>
            <p>
              Inspiring New Jersey students to become community-minded leaders through career exploration,
              competitions, and hands-on experiences.
            </p>
            <div className="nj-cta-row">
              <a className="nj-btn primary" href="#resources">Explore Resources</a>
              <a className="nj-btn ghost" href="#initiatives">National Initiatives</a>
            </div>
            <div className="nj-hero-pills">
              <span>Fuel Your Future</span>
              <span>Leadership</span>
              <span>National Alignment</span>
            </div>
          </div>
          <div className="nj-hero-visual">
            <div className="nj-hero-card">
              <div className="nj-hero-ring" />
              <div className="nj-hero-bar" />
              <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/f301d5b55853e6d952fc766593732b0f438cae48_dsc_1738.jpg" alt="NJ FBLA" />
            </div>
          </div>
        </div>
      </div>

      <section className="nj-section nj-highlights" id="highlights">
        <div className="nj-section-head">
          <h2>Move Fast with NJ FBLA</h2>
          <p>Launch, learn, and connect with modern tools built for students and advisers.</p>
        </div>
        <div className="nj-card-grid">
          {highlightCards.map((card) => (
            <article key={card.title} className="nj-card">
              <div className="nj-card-badge">{card.badge}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <button className="nj-link-btn" type="button">{card.cta}</button>
            </article>
          ))}
        </div>
      </section>

      <section className="nj-section nj-initiatives" id="initiatives">
        <div className="nj-section-head">
          <h2>National Alignment</h2>
          <p>Connect NJ FBLA to national programs with toolkits and graphics that stay on-theme.</p>
        </div>
        <div className="nj-grid-2">
          {initiatives.map((item) => (
            <div key={item.title} className="nj-initiative">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="nj-section nj-stats">
        <div className="nj-section-head">
          <h2>This Is New Jersey FBLA</h2>
          <p>Proud to lead the nation with results, reach, and impact.</p>
        </div>
        <div className="nj-stat-grid">
          {stats.map((s) => (
            <div key={s.label} className="nj-stat">
              <div className="nj-stat-value">{s.value}</div>
              <div className="nj-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="nj-section nj-resources" id="resources">
        <div className="nj-section-head">
          <h2>Resources That Win</h2>
          <p>Tailored prep for every division with toolkits, practice tests, and verified insights.</p>
        </div>
        <div className="nj-tabs">
          {Object.keys(resourceTabs).map((key) => (
            <button
              key={key}
              className={`nj-tab ${activeTab === key ? 'active' : ''}`}
              type="button"
              onClick={() => setActiveTab(key)}
            >
              {resourceTabs[key].title}
            </button>
          ))}
        </div>
        <div className="nj-resource-panel">
          <h3>{resourceTabs[activeTab].title} Toolkit</h3>
          <ul>
            {resourceTabs[activeTab].items.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="nj-inline-cta">
            <span>Verified insights from event placers</span>
            <a className="nj-btn tiny" href="https://forms.gle/placeholder" target="_blank" rel="noreferrer">Submit + View</a>
          </div>
        </div>
      </section>

      <section className="nj-section nj-events" id="events">
        <div className="nj-section-head">
          <h2>Upcoming Events</h2>
          <p>Advisor-only registration noted where required. Stay ahead of deadlines.</p>
        </div>
        <div className="nj-event-grid">
          {events.map((event) => (
            <div key={event.name} className="nj-event-card">
              <div className="nj-event-tag">{event.tag}</div>
              <h3>{event.name}</h3>
              <p className="nj-event-date">{event.date}</p>
              <p className="nj-event-location">{event.location}</p>
              <button className="nj-link-btn" type="button">More info</button>
            </div>
          ))}
        </div>
      </section>

      <section className="nj-section nj-leadership" id="leadership">
        <div className="nj-section-head">
          <h2>Leadership</h2>
          <p>State officers, collegiate leaders, and advisers guiding NJ FBLA.</p>
        </div>
        <div className="nj-leadership-grid">
          {officers.map((officer) => (
            <div key={officer.name} className="nj-leader">
              <div className="nj-avatar" aria-hidden="true">{officer.name.slice(0, 1)}</div>
              <div className="nj-leader-name">{officer.name}</div>
              <div className="nj-leader-role">{officer.role}</div>
            </div>
          ))}
        </div>
        <div className="nj-subhead">Collegiate Officers</div>
        <div className="nj-leadership-grid compact">
          {collegiateOfficers.map((officer) => (
            <div key={officer.name} className="nj-leader">
              <div className="nj-avatar" aria-hidden="true">{officer.name.slice(0, 1)}</div>
              <div className="nj-leader-name">{officer.name}</div>
              <div className="nj-leader-role">{officer.role}</div>
            </div>
          ))}
        </div>
        <div className="nj-subhead">Advisers & Staff</div>
        <div className="nj-leadership-grid compact">
          {advisers.map((person) => (
            <div key={person.name} className="nj-leader">
              <div className="nj-avatar" aria-hidden="true">{person.name.slice(0, 1)}</div>
              <div className="nj-leader-name">{person.name}</div>
              <div className="nj-leader-role">{person.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="nj-section nj-help" id="help">
        <div className="nj-section-head">
          <h2>Help & FAQ</h2>
          <p>Quick answers and useful links to keep chapters moving.</p>
        </div>
        <div className="nj-help-grid">
          <div className="nj-faq">
            {faqs.map((item, idx) => (
              <details key={item.q} open={idx === openFaq} onClick={() => setOpenFaq(idx)}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
          <div className="nj-links">
            <h3>Useful Links</h3>
            <ul>
              <li><a href="#resources">Resources Hub</a></li>
              <li><a href="#events">Event Deadlines</a></li>
              <li><a href="#initiatives">National Programs</a></li>
              <li><a href="#slc-app">SLC App (Yapp)</a></li>
              <li><a href="#contact">Contact Adviser</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="nj-section nj-slc" id="slc-app">
        <div className="nj-section-head">
          <h2>State Leadership Conference App</h2>
          <p>Streamlined schedules, alerts, maps, and resources—aligned to Fuel Your Future.</p>
        </div>
        <div className="nj-slc-card">
          <div className="nj-slc-body">
            <div className="nj-pill">SLC • Yapp</div>
            <h3>Cover art, schedules, and alerts in one place</h3>
            <ul>
              <li>Fuel Your Future themed cover and graphics</li>
              <li>Agenda, competitions, room maps, and push alerts</li>
              <li>Advisor notes and student-ready checklists</li>
            </ul>
            <div className="nj-cta-row">
              <a className="nj-btn primary" href="#" onClick={(e) => e.preventDefault()}>Download App</a>
              <a className="nj-btn ghost" href="#" onClick={(e) => e.preventDefault()}>View Schedule</a>
            </div>
          </div>
          <div className="nj-slc-visual" aria-hidden="true">
            <div className="nj-slc-screen">
              <div className="nj-slc-gradient" />
              <div className="nj-slc-logo">NJ FBLA</div>
              <div className="nj-slc-theme">Fuel Your Future</div>
            </div>
          </div>
        </div>
      </section>

      <section className="nj-section nj-contact" id="contact">
        <div className="nj-section-head">
          <h2>Contact</h2>
          <p>New Jersey FBLA • Kean University Townsend Hall 209-A • 1000 Morris Avenue • Union, NJ 07083</p>
        </div>
        <div className="nj-contact-grid">
          <div>
            <div className="nj-contact-label">Phone</div>
            <div className="nj-contact-value">(908) 737-0236</div>
          </div>
          <div>
            <div className="nj-contact-label">Website</div>
            <div className="nj-contact-value">www.njfbla.org</div>
          </div>
          <div>
            <div className="nj-contact-label">Email</div>
            <div className="nj-contact-value">kclark@njfbla.org</div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default NJFblaPage;
