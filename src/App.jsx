import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Stats from './components/Stats';
import Tutorials from './components/Tutorials';
import CTA from './components/CTA';
import Contact from './components/Contact';
import SEO from './components/SEO';
import Impact from './components/Impact';
import './App.css';

const Club = () => (
  <>
    <SEO
      title="Club — Enginuity STEM"
      description="Enginuity STEM Club: projects, meetups, and community for student makers."
      path="/club"
      keywords={["enginuity", "club", "stem club", "projects"]}
    />
    <div className="page-placeholder"><h2>Club</h2><p>Coming soon.</p></div>
  </>
);

// Research page removed; replaced by Impact.

const UNWork = () => (
  <>
    <SEO
      title="UN Work — Enginuity STEM"
      description="UN Work: Enginuity STEM projects and initiatives supporting United Nations sustainable goals."
      path="/unwork"
      keywords={["enginuity", "UN", "sustainable development", "stem"]}
    />
    <div className="page-placeholder"><h2>UN Work</h2><p>Coming soon.</p></div>
  </>
);

const TinkoYSWS = () => (
  <>
    <SEO
      title="Tinko — Enginuity STEM Tutorials"
      description="Tinko tutorial series on Enginuity STEM: hands-on projects and step-by-step guides for learners."
      path="/tinko"
      keywords={["tinko", "enginuity", "tutorials", "stem"]}
    />
    <Tutorials />
    <CTA />
  </>
);

const Home = () => (
  <>
    <SEO
      title="Enginuity STEM — Project-based STEM tutorials & tracks"
      description="Enginuity STEM: project-based tutorials, tracks, and resources to learn coding, electronics, and hands-on STEM."
      path="/"
      keywords={["enginuity", "stem tutorials", "project-based learning", "coding tutorials"]}
    />
    <Hero />
    <About />
    <Stats />
  </>
);

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
  <Route path="/club" element={<Club />} />
  <Route path="/impact" element={<Impact />} />
  <Route path="/unwork" element={<UNWork />} />
        <Route path="/tinko" element={<TinkoYSWS />} />
        <Route path="/contact" element={<>
          <SEO
            title="Contact — Enginuity STEM"
            description="Contact Enginuity STEM for partnerships, questions, or community involvement."
            path="/contact"
            keywords={["contact", "enginuity", "support"]}
          />
          <Contact />
        </>} />
      </Routes>
    </div>
  );
}

export default App;
