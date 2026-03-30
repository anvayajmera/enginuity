import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Club from './components/Club';
import Contact from './components/Contact';
import SEO from './components/SEO';
import UnitedNations from './components/UnitedNations';
import GalleryPage from './components/GalleryPage';
import SiblingsKeeperPage from './components/SiblingsKeeperPage';
import { buildGalleryFeedUrl, readGalleryCache, warmGalleryMedia, writeGalleryCache } from './utils/galleryCache';
import './App.css';

let hasWarmedGallery = false;

const Home = () => (
  <>
    <SEO
      title="Enginuity: Engineering for All"
      description="Enginuity is a global engineering-focused STEM program under Siblings Keeper, delivering custom PCB/CAD kits, hands-on learning, and UN-connected youth impact."
      path="/"
      keywords={["enginuity", "engineering education", "pcb", "cad", "un youth", "siblings keeper", "stem kits"]}
    />
    <Hero />
    <About />
    <Stats />
  </>
);

function App() {
  useEffect(() => {
    if (hasWarmedGallery) return;
    hasWarmedGallery = true;

    let cancelled = false;
    let timeoutId = null;
    let idleId = null;

    const warmGallery = async () => {
      if (readGalleryCache()) return;
      try {
        const response = await fetch(buildGalleryFeedUrl());
        if (!response.ok) return;
        const payload = await response.json();
        if (cancelled) return;
        writeGalleryCache(payload);
        warmGalleryMedia(Array.isArray(payload?.posts) ? payload.posts : []);
      } catch {
        // Ignore startup prefetch failures.
      }
    };

    const scheduleWarmGallery = () => {
      if (typeof window === 'undefined') return;
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => {
          warmGallery();
        }, { timeout: 1500 });
        return;
      }
      timeoutId = window.setTimeout(() => {
        warmGallery();
      }, 350);
    };

    scheduleWarmGallery();

    return () => {
      cancelled = true;
      if (timeoutId !== null) window.clearTimeout(timeoutId);
      if (idleId !== null && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
    };
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/impact" element={<Club />} />
          <Route path="/club" element={<Navigate to="/impact" replace />} />
          <Route path="/united-nations" element={<UnitedNations />} />
          <Route path="/unwork" element={<Navigate to="/united-nations" replace />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/siblings-keeper" element={<SiblingsKeeperPage />} />
          <Route path="/njfbla" element={<Navigate to="/" replace />} />
          <Route
            path="/contact"
            element={(
              <>
                <SEO
                  title="Enginuity: Contact"
                  description="Contact Enginuity STEM for engineering program partnerships, school deployments, and youth leadership opportunities."
                  path="/contact"
                  keywords={['contact', 'enginuity', 'support']}
                />
                <Contact />
              </>
            )}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
