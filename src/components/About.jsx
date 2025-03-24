import { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion, useInView } from 'framer-motion';
import { MdPhotoCamera, MdEdit } from 'react-icons/md';
import { FaCamera, FaPaintBrush, FaPhotoVideo, FaCrop } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobelightroom } from 'react-icons/si';
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
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
`;

const SkillCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    border-color: var(--primary-color);
  }

  svg {
    font-size: 3rem;
    color: #3b82f6;
    margin-bottom: 0.5rem;
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--text-primary);
  margin: 0.5rem 0;
`;

const SkillDescription = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
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
    icon: <MdEdit />,
    title: 'Photo Retoucher',
    description: 'Professional retouching and color grading'
  },
  {
    icon: <SiAdobephotoshop />,
    title: 'Photoshop Expert',
    description: 'Advanced manipulation and compositing'
  },
  {
    icon: <SiAdobelightroom />,
    title: 'Lightroom Expert',
    description: 'Color correction and batch processing'
  },
  {
    icon: <FaCamera />,
    title: 'AI Generated & Retouch',
    description: 'Composition and lighting techniques'
  }
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const [displayText, setDisplayText] = useState('About Me');
  
  useEffect(() => {
    if (isInView) {
      const finalText = "AAbout Me";
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
                    {skill.icon}
                    <SkillTitle>{skill.title}</SkillTitle>
                    <SkillDescription>{skill.description}</SkillDescription>
                  </SkillCard>
                ))}
              </SkillsGrid>
            </motion.div>
          </AboutText>
          <ImageContainer>
            <AboutImage
              as={motion.img}
              src="/profile.jpg"
              alt="Ali's Profile"
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
