import { Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Particles from './components/Particles';
import LoadingSpinner from './components/LoadingSpinner';
import BackToTop from './components/BackToTop';
import LoadingProgress from './components/LoadingProgress';

// Lazy load components
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-accent">
      <LoadingProgress />
      <Particles />
      <Header />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;