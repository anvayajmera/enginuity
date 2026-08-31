import SEO from './SEO';
import './SiblingsKeeperPage.css';
import skLogo from '../../images/siblingskeeper/sk-logo.png';
import classroom1 from '../../images/siblingskeeper/classroom-1.jpeg';
import classroom2 from '../../images/siblingskeeper/classroom-2.jpeg';
import classroom3 from '../../images/siblingskeeper/classroom-3.jpeg';
import classroom4 from '../../images/siblingskeeper/classroom-4.jpeg';
import feeding1 from '../../images/siblingskeeper/feeding-1.jpeg';
import feeding2 from '../../images/siblingskeeper/feeding-2.jpeg';
import feeding3 from '../../images/siblingskeeper/feeding-3.jpeg';
import feeding4 from '../../images/siblingskeeper/feeding-4.jpeg';
import community1 from '../../images/siblingskeeper/community-1.jpeg';

const impactStats = [
  { value: '5', label: 'Continents Served' },
  { value: '12+', label: 'Countries Reached' },
  { value: '100s', label: 'Computers Shipped' },
  { value: 'Monthly', label: 'Feeding Programs' },
];

const pillars = [
  {
    title: 'Education for All',
    text: 'Dominion School delivers free and subsidized education for vulnerable children, with literacy, numeracy, and life skills.',
  },
  {
    title: 'Community Empowerment',
    text: 'Families are supported through mentorship, practical development initiatives, and sustained local engagement.',
  },
  {
    title: 'Compassion in Action',
    text: 'Programs are built around dignity, consistency, and direct support for children who need stable opportunities.',
  },
  {
    title: 'Sustainable Futures',
    text: 'Beyond academics, initiatives include workforce skills, health awareness, and long-term community resilience.',
  },
];

const SiblingsKeeperPage = () => (
  <>
    <SEO
      title="Enginuity: Siblings Keeper"
      description="Learn about Siblings Keeper Zambia: education access, feeding programs, and community empowerment across underserved communities."
      path="/siblings-keeper"
      keywords={['siblings keeper', 'zambia education', 'dominion school', 'community development', 'enginuity partner']}
    />

    <div className="siblings-page">
      <div className="siblings-bg" aria-hidden="true">
        <div className="siblings-orb orb-a"></div>
        <div className="siblings-orb orb-b"></div>
        <div className="siblings-grid"></div>
      </div>

      <section className="siblings-hero">
        <div className="container siblings-hero-inner">
          <div className="siblings-hero-copy">
            <h1>Siblings Keeper</h1>
            <p>
              Siblings Keeper Zambia helps children and families access education, nutrition, and long-term support.
              Through Dominion School and community programs, they turn daily care into opportunity for all families. Enginuity STEM works directly under them.
            </p>
            <a href="https://siblingskeeper-zm.com/" target="_blank" rel="noopener noreferrer" className="siblings-cta">
              Visit Official Site
            </a>
          </div>

          <div className="siblings-hero-media">
            <img src={skLogo} alt="Siblings Keeper logo" />
          </div>
        </div>
      </section>

      <section className="siblings-gallery">
        <div className="container">
          <div className="siblings-section-head">
            <h2>Photo Highlights</h2>
            <p>
              Visual highlights from Siblings Keeper Zambia&apos;s school and community programming.
            </p>
          </div>
          <div className="siblings-mosaic">
            <img src={classroom1} alt="Students working in class at Dominion School" />
            <img src={feeding1} alt="Children in a feeding program" />
            <img src={classroom2} alt="Students writing in classroom" />
            <img src={feeding2} alt="Students sharing a meal at school" />
            <img src={classroom3} alt="Young students in class activities" />
            <img src={community1} alt="Community group supported by Siblings Keeper" />
            <img src={classroom4} alt="Students participating in lessons" />
            <img src={feeding3} alt="Children eating in community feeding session" />
            <img src={feeding4} alt="Students receiving nutrition support" />
          </div>
          <p className="siblings-source">
            Content and images adapted from <a href="https://siblingskeeper-zm.com/" target="_blank" rel="noopener noreferrer">siblingskeeper-zm.com</a>.
          </p>
        </div>
      </section>

      <section className="siblings-impact">
        <div className="container">
          <div className="siblings-section-head">
            <h2>Impact at a Glance</h2>
            <p>
              Their work spans education access, feeding support, and practical community services that families can rely on.
            </p>
          </div>
          <div className="siblings-stats-grid">
            {impactStats.map((stat) => (
              <article key={stat.label} className="siblings-stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="siblings-pillars">
        <div className="container">
          <div className="siblings-section-head">
            <h2>Core Pillars</h2>
            <p>
              The mission is simple: support children well, strengthen families, and build steady long-term outcomes.
            </p>
          </div>
          <div className="siblings-pillars-grid">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="siblings-pillar-card">
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  </>
);

export default SiblingsKeeperPage;
