import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styled from '@emotion/styled';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Feedback from './components/Feedback';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  overflow-y: auto;
  scroll-behavior: smooth;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary);
`;

// Create a HomePage component to contain all sections
const HomePage = () => {
  return (
    <>
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="feedback">
        <Feedback />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
};

function App() {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    ScrollTrigger.refresh();

    // Add scroll trigger for each section
    const sections = document.querySelectorAll('[id]');
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          const id = section.getAttribute('id');
          if (id) {
            window.history.replaceState(null, '', `#${id}`);
          }
        }
      });
    });

    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
      disable: 'mobile'
    });

    // Enable smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').replace('#', '');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  return (
    <Router>
      <AppWrapper>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="project/:id" element={<ProjectDetails />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MainContent>
        <Footer>
          {new Date().getFullYear()} | Crafted with passion
        </Footer>
      </AppWrapper>
    </Router>
  );
}

export default App;
