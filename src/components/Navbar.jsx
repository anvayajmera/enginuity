import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/enginuitylogo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.pageYOffset > 100);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keep Home first, then Impact (club page renamed), then other pages. Remove UN from navbar.
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/impact', label: 'Impact' },
    { to: '/tinko', label: 'Tinko' },
    { to: '/contact', label: 'Contact' },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const [impactOpen, setImpactOpen] = useState(false);

  const handleImpactSelect = (val) => {
    if (location.pathname === '/impact') {
      // already on impact page: scroll directly
      const el = document.getElementById(val);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      }
    } else {
      // navigate to /impact and pass desired section in state
      navigate('/impact', { state: { scrollTo: val } });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${mobileOpen ? 'open' : ''}`}>
      <div className="nav-content">
        <NavLink to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <img src={logo} alt="Enginuity logo" className="logo-img" />
          <span>Enginuity</span>
        </NavLink>
        <button
          className="mobile-toggle"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
        >
          <span className="hamburger" aria-hidden="true"></span>
        </button>

        <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {navLinks.map(({ to, label }) => {
            if (to === '/impact') {
              return (
                <li key={to} className="nav-link-wrapper">
                  <NavLink
                    to={to}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => { setMobileOpen(false); setImpactOpen(false); }}
                  >
                    <span className="nav-label">{label}</span>
                    <button
                      aria-expanded={impactOpen}
                      aria-controls="nav-impact-menu"
                      className="nav-impact-toggle"
                      onClick={(e) => { e.stopPropagation(); e.preventDefault(); setImpactOpen(v => !v); }}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                        <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </NavLink>
                  <div id="nav-impact-menu" className={`nav-impact-menu ${impactOpen ? 'open' : ''}`} role="menu">
                    <button role="menuitem" className="menu-item" onClick={() => { handleImpactSelect('un'); setImpactOpen(false); }}>United Nations</button>
                    <button role="menuitem" className="menu-item" onClick={() => { handleImpactSelect('club'); setImpactOpen(false); }}>Enginuity Club</button>
                    <button role="menuitem" className="menu-item" onClick={() => { handleImpactSelect('join'); setImpactOpen(false); }}>Join</button>
                  </div>
                </li>
              );
            }

            return (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
