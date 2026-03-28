import SEO from './SEO';
import InstagramFeed from './InstagramFeed';
import './GalleryPage.css';

const GalleryPage = () => (
  <>
    <SEO
      title="Enginuity: Gallery"
      description="Live Enginuity gallery featuring custom engineering kits, CAD and PCB learning, UN engagement, and global school partnership updates."
      path="/gallery"
      keywords={['enginuity gallery', 'engineering kits', 'pcb education', 'cad curriculum', 'un youth advocacy']}
    />
    <div className="gallery-page">
      <div className="gallery-page-background" aria-hidden="true">
        <div className="gallery-page-orb orb-a"></div>
        <div className="gallery-page-orb orb-b"></div>
        <div className="gallery-page-orb orb-c"></div>
        <div className="gallery-page-grid"></div>
      </div>
      <InstagramFeed />
    </div>
  </>
);

export default GalleryPage;
