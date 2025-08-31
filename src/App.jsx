import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Stats from './components/Stats';
import Tutorials from './components/Tutorials';
import CTA from './components/CTA';
import Contact from './components/Contact';
import './App.css';

const Club = () => <div className="page-placeholder"><h2>Club</h2><p>Coming soon.</p></div>;
const Research = () => <div className="page-placeholder"><h2>Research</h2><p>Coming soon.</p></div>;
const UNWork = () => <div className="page-placeholder"><h2>UN Work</h2><p>Coming soon.</p></div>;

const TinkoYSWS = () => (
  <>
    <Tutorials />
    <CTA />
  </>
);

const Home = () => (
  <>
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
        <Route path="/research" element={<Research />} />
        <Route path="/unwork" element={<UNWork />} />
        <Route path="/tinko" element={<TinkoYSWS />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
