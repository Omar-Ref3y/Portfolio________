import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styled from '@emotion/styled';
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const ContactSection = styled.section`
  padding: 6rem 2rem;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary);
  position: relative;
  overflow: hidden;
`;

const Container = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 4rem;
  background-color: var(--bg-secondary);
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-primary);
  font-weight: 600;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 3rem;
`;

const ContactLinksContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ContactLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: var(--text-primary);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  svg {
    font-size: 1.5rem;
    color: var(--primary-color);
  }
`;

const LinkText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const LinkTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
`;

const LinkDescription = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
`;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactLinks = [
    {
      icon: <FaEnvelope />,
      title: "Email",
      description: "Drop me a message",
      href: "mailto:omarrefay2004@gmail.com"
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      description: "Let's chat",
      href: "https://wa.me/+201001234567" // Replace with your WhatsApp number
    },
    {
      icon: <FaGithub />,
      title: "GitHub",
      description: "Check out my code",
      href: "https://github.com/Omar-Ref3y"
    },
    {
      icon: <FaLinkedin />,
      title: "LinkedIn",
      description: "Connect with me",
      href: "https://www.linkedin.com/in/omar-refaey" // Replace with your LinkedIn profile
    }
  ];

  return (
    <ContactSection id="contact" ref={ref}>
      <Container
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
          }
        }}
      >
        <SectionTitle>Get in Touch</SectionTitle>
        <SectionSubtitle>Let's connect and discuss your next project!</SectionSubtitle>
        
        <ContactLinksContainer
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {contactLinks.map((link, index) => (
            <ContactLink
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut"
                  }
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {link.icon}
              <LinkText>
                <LinkTitle>{link.title}</LinkTitle>
                <LinkDescription>{link.description}</LinkDescription>
              </LinkText>
            </ContactLink>
          ))}
        </ContactLinksContainer>
      </Container>
    </ContactSection>
  );
};

export default Contact;
