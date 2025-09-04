# Enginuity — React Website

A modern, premium React.js website for Enginuity. This project converts the original HTML/CSS/JS website to a React-based architecture while maintaining all premium animations and effects.

## ✨ Features

- **Modern React Architecture** - Component-based structure with custom hooks
- **Premium Animations** - Scroll-triggered fade-ins, SVG line animations, particle systems
- **Glassmorphism Design** - Backdrop blur effects and modern UI elements
- **Mobile-First Responsive** - Optimized for all devices with touch support
- **Performance Optimized** - Efficient scroll handlers and intersection observers
- **Accessibility** - Proper semantic markup and keyboard navigation

## 🚀 Technologies Used

- **React 18** - Latest React with hooks and functional components
- **Vite** - Fast development server and build tool
- **CSS3** - Advanced animations, transforms, and glassmorphism effects
- **Intersection Observer API** - Scroll-triggered animations
- **CSS Custom Properties** - Design system with color variables
- **Satoshi Font** - Premium typography from Google Fonts

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Fixed glassmorphism navigation
│   ├── Hero.jsx             # Landing section with particles
│   ├── About.jsx            # Feature cards section
│   ├── Features.jsx         # Advanced workshops section
│   ├── Stats.jsx            # Animated counters with SVG
│   ├── CTA.jsx              # Call to action section
│   ├── Footer.jsx           # Links and information
│   └── ScrollProgressLine.jsx # Top progress bar
├── hooks/
│   └── useIntersectionObserver.js # Custom hook for animations
├── App.jsx                  # Main app component
├── App.css                  # Global styles and animations
└── main.jsx                 # React entry point
```

## 🎨 Key Components

### **Navbar**
- Fixed position with glassmorphism effect
- Active link detection based on scroll position
- Responsive design with mobile optimization

### **Hero**
- Animated particle system
- Floating shapes with CSS animations
- Parallax grid background
- Gradient text effects

### **About & Features**
- Intersection Observer-based fade-ins
- Reversible scroll animations
- Ripple click effects
- Gradient borders and hover states

### **Stats**
- Animated SVG line that draws on scroll
- Number counting animations
- Dynamic stroke width effects
- Responsive grid layout

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Design

- **Desktop** (1024px+): Full animations and effects
- **Tablet** (768px-1024px): Simplified floating elements
- **Mobile** (480px-768px): Optimized layouts and hidden complex animations
- **Small Mobile** (<480px): Minimal animations for performance

## 🎯 Performance Optimizations

- **Touch Device Detection** - Disables hover effects on touch devices
- **Animation Reduction** - Simplified animations on mobile for better performance
- **Efficient Scroll Handlers** - Optimized scroll event listeners
- **Legacy Browser Support** - Fallbacks for backdrop-filter and modern CSS

## 🎨 Animation Features

- **Scroll Progress Line** - Top gradient progress bar
- **SVG Line Animation** - Path drawing effects in stats section
- **Intersection Observer** - Reversible fade-in animations
- **Particle System** - Floating particles in hero section
- **Counter Animations** - Number counting effects
- **Ripple Effects** - Click interaction feedback
- **Glassmorphism** - Backdrop blur and transparency effects

## 🔧 Custom Hooks

### `useIntersectionObserver`
- Handles element visibility detection
- Supports reversible animations
- Configurable threshold and root margin
- Returns visibility state and element ref

## 📦 Build Output

The build process creates an optimized production bundle with:
- Minified CSS and JavaScript
- Optimized images and assets
- Modern browser support
- Performance-optimized loading

## 🤝 Contributing

This project maintains the design and functionality of the original site while providing a modern React architecture for easier maintenance and development.

## 📄 License

© 2025 Enginuity. All rights reserved.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
