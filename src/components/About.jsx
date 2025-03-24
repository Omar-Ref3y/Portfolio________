import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styled from '@emotion/styled';
import 'aos/dist/aos.css';

const AboutSection = styled.section`
  padding: 6rem 2rem;
  background: var(--bg-secondary);
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const AboutText = styled(motion.div)`
  opacity: 1;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
  text-align: left;

  @media (max-width: 1024px) {
    text-align: center;
  }
`;

const LeadText = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
  line-height: 1.8;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
  }
`;

const SkillCard = styled(motion.div)`
  background: rgba(var(--bg-secondary-rgb), 0.5);
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, background-color 0.3s ease;

  i {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(var(--bg-secondary-rgb), 0.7);

    i {
      transform: scale(1.1);
    }
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`;

const SkillDescription = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
  flex-grow: 1;
`;

const ImageContainer = styled.div`
  position: relative;
  
  @media (max-width: 1024px) {
    order: -1;
  }
`;

const AboutImage = styled(motion.img)`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  display: block;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(var(--primary-color-rgb), 0.3);
  }
`;

const skills = [
  {
    name: 'Photoshop Expert',
    icon: 'fas fa-layer-group',
    color: '#31A8FF'
  },
  {
    name: 'Lightroom Expert',
    icon: 'fas fa-adjust',
    color: '#31A8FF'
  },
  {
    name: 'AI Generated & Retouch',
    icon: 'fas fa-robot',
    color: '#00FF9D'
  },
  {
    name: 'Photo Retoucher',
    icon: 'fas fa-magic',
    color: '#FF61F6'
  }
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [displayText, setDisplayText] = useState('AAbout Me');  // Changed from 'About Me'
  
  useEffect(() => {
    if (isInView) {
      const finalText = "AAbout Me";  // Changed from 'About Me'
      let i = 0;
      setDisplayText('');  // Clear first
      
      const timer = setInterval(() => {
        if (i < finalText.length) {
          setDisplayText(prev => prev + finalText.charAt(i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 100);
      
      return () => clearInterval(timer);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <AboutContent
          as={motion.div}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <AboutText>
            <SectionTitle className="typewriter">
              {displayText}
            </SectionTitle>
            <LeadText variants={itemVariants}>
            I’m Ali, a Photoshop Expert and Retouching Specialist with over 10 years of experience in image editing and AI-generated visuals. I have worked with clients worldwide, delivering high-quality results with precision and efficiency
            </LeadText>
            <motion.div variants={containerVariants}>
              <SkillsGrid>
                {skills.map((skill, index) => (
                  <SkillCard
                    key={index}
                    variants={itemVariants}
                  >
                    <i className={skill.icon} style={{ color: skill.color }}></i>
                    <SkillTitle>{skill.name}</SkillTitle>
                  </SkillCard>
                ))}
              </SkillsGrid>
            </motion.div>
          </AboutText>
          <ImageContainer>
            <AboutImage
              as={motion.img}
              src="/profile.jpg"
              alt="Omar's Profile"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </ImageContainer>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;
