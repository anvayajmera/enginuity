import './SponsorsBar.css';
import jukeboxLogo from '../../partners/j_jukebox_logo_RGB_WEB.png';
import siblingsLogo from '../../partners/SK logo 2023.jpg';
import mgcyLogo from '../../partners/UN+MGCY_LOGO+Single.webp';
import hcbLogo from '../../partners/hcb-dark.png';
import hackclubLogo from '../../partners/flag-orpheus-left.png';


const SponsorsBar = () => (
  <section className="sponsors-bar-section">
    {/* Decorative background orbs for extra polish */}
    <div className="sponsors-bar-bg-orb orb1" />
    <div className="sponsors-bar-bg-orb orb2" />
    <div className="sponsors-bar-bg-orb orb3" />
    <div className="sponsors-bar sponsors-bar-centered">
      <div className="sponsor-item">
        <img src={jukeboxLogo} alt="Jukebox" className="sponsor-logo" />
        <div className="sponsor-caption sponsor-gradient-text">
          Thank you Jukebox for supplying <a href="https://www.jukeboxprint.com/custom-stickers" target="_blank" rel="noopener noreferrer">custom stickers</a>!
        </div>
      </div>
      <div className="sponsor-item">
        <img src={siblingsLogo} alt="Siblings Keeper" className="sponsor-logo" />
        <div className="sponsor-caption sponsor-gradient-text">
          Shoutout to <a href="https://siblingskeeper.org" target="_blank" rel="noopener noreferrer">Siblings Keeper</a> and their mission!
        </div>
      </div>
      <div className="sponsor-item">
        <img src={mgcyLogo} alt="UN MGCY" className="sponsor-logo" />
        <div className="sponsor-caption sponsor-gradient-text">
          We are proudly partnered with <a href="https://www.unmgcy.org/" target="_blank" rel="noopener noreferrer">MGCY</a> at UN HQ.
        </div>
      </div>
      <div className="sponsor-item">
        <img src={hackclubLogo} alt="Hack Club" className="sponsor-logo" />
        <div className="sponsor-caption sponsor-gradient-text">
          Big thanks to <a href="https://hackclub.com" target="_blank" rel="noopener noreferrer">Hack Club</a> for empowering student coders!
        </div>
      </div>
      <div className="sponsor-item">
        <img src={hcbLogo} alt="HCB" className="sponsor-logo" />
        <div className="sponsor-caption sponsor-gradient-text">
          <a href="https://hcb.hackclub.com" target="_blank" rel="noopener noreferrer">HCB</a> provides us an effective platform for funding.
        </div>
      </div>
    </div>
  </section>
);

export default SponsorsBar;
