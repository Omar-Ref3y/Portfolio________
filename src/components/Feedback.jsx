import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

const FeedbackSection = styled.section`
  padding: 6rem 2rem;
  background-color: var(--bg-primary);
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 3rem;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FeedbackContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  height: 300px;
  margin-bottom: 2rem;
`;

const FeedbackCard = styled(motion.div)`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
`;

const FeedbackText = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  flex: 1;
`;

const ClientInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ClientName = styled.h4`
  color: var(--text-primary);
  font-size: 1.1rem;
  margin: 0;
`;

const ProjectName = styled.p`
  color: var(--accent-color);
  font-size: 0.9rem;
  margin: 0;
  font-weight: 500;
`;

const Rating = styled(motion.div)`
  display: flex;
  gap: 0.25rem;
  color: #FFD700;
  font-size: 1.25rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const NavButton = styled(motion.button)`
  background: transparent;
  border: 2px solid var(--accent-color);
  color: var(--accent-color);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-color);
    color: var(--bg-primary);
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Dot = styled(motion.button)`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? 'var(--accent-color)' : 'var(--text-secondary)'};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.active ? 1 : 0.5};

  &:hover {
    opacity: 1;
  }
`;

const feedbacks = [
  {
    id: 1,
    text: "Omar's work is exceptional! He transformed our product photos with his expert retouching skills, making them stand out in our e-commerce store. His attention to detail and quick turnaround time exceeded our expectations.",
    client: {
      name: "Sarah Johnson",
      project: "Product Photo Enhancement"
    },
    rating: 5
  },
  {
    id: 2,
    text: "Ali did a great job. I would definitely hire him again in the future.",
    client: {
      name: "Michael Chen",
      project: "Photo Editing and Image Modification using Photoshop"
    },
    rating: 5
  },
  {
    id: 3,
    text: "I had terrible pics to start with but given the circumstances, he did a great job making them look great!",
    client: {
      name: "Emma Davis",
      project: "My Pics Need Photoshop!"
    },
    rating: 5
  },
  {
    id: 4,
    text: "Efficient, friendly and understood the requirements of the work in entirety. Great work!",
    client: {
      name: "Sophie Martinez",
      project: "Change colour of Aircraft Tail & Engines in PNG Image"
    },
    rating: 5
  },
  {
    id: 5,
    text: "I have trusted Ali with several lightroom and photoshop projects. He has been able to help me with many photos in return completing several projects and helping me finalize creative photo enhancements. He has been prompt and very good with detail on all fronts. He is a great person to work with and does his very best and takes great care to the details. I am appreciative to have found him and to work with him. Thank you.",
    client: {
      name: "James Thompson",
      project: "Photo Editing for Home Windows"
    },
    rating: 5
  },
  {
    id: 6,
    text: "Ali did great work very quickly for us",
    client: {
      name: "David Wilson",
      project: "Urgent Photo Touch-Up Services Needed"
    },
    rating: 5
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95,
    zIndex: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Feedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + feedbacks.length) % feedbacks.length);
  };

  const handleDotClick = (index) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <FeedbackSection ref={containerRef}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Client Feedback
        </SectionTitle>
        <FeedbackContainer>
          <AnimatePresence mode="wait" custom={direction}>
            <FeedbackCard
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 25,
                  restDelta: 0.01
                },
                opacity: { 
                  duration: 0.4,
                  ease: "easeInOut" 
                },
                scale: {
                  duration: 0.4,
                  ease: "easeInOut"
                }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <Rating
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {[...Array(feedbacks[currentIndex].rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                  >
                    ★
                  </motion.span>
                ))}
              </Rating>
              <FeedbackText
                as={motion.p}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {feedbacks[currentIndex].text}
              </FeedbackText>
              <ClientInfo
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <ClientName>{feedbacks[currentIndex].client.name}</ClientName>
                <ProjectName>{feedbacks[currentIndex].client.project}</ProjectName>
              </ClientInfo>
            </FeedbackCard>
          </AnimatePresence>
        </FeedbackContainer>
        <NavigationButtons>
          <NavButton
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(-1)}
          >
            ←
          </NavButton>
          <NavButton
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(1)}
          >
            →
          </NavButton>
        </NavigationButtons>
        <Dots>
          {feedbacks.map((_, index) => (
            <Dot
              key={index}
              as={motion.button}
              active={index === currentIndex}
              onClick={() => handleDotClick(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </Dots>
      </Container>
    </FeedbackSection>
  );
};

export default Feedback;
