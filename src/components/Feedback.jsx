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

const FeedbackText = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  flex: 1;
`;

const ClientInfo = styled.div`
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

const Rating = styled.div`
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

const NavButton = styled.button`
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

const Dot = styled.button`
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
    text: "Working with Omar was a pleasure. His photo manipulation skills are incredible, and he brought my creative vision to life perfectly. I highly recommend his services for any photo editing needs.",
    client: {
      name: "Michael Chen",
      project: "Wedding Album Retouching"
    },
    rating: 5
  },
  {
    id: 3,
    text: "Omar restored our old family photos beautifully. His work helped us preserve precious memories that were fading away. The quality of his restoration work is remarkable.",
    client: {
      name: "Emma Davis",
      project: "Photo Restoration"
    },
    rating: 5
  },
  {
    id: 4,
    text: "Incredible attention to detail in fashion photo retouching. Omar knows exactly how to enhance images while maintaining their natural look. The results were magazine-worthy!",
    client: {
      name: "Sophie Martinez",
      project: "Fashion Photography Retouching"
    },
    rating: 5
  },
  {
    id: 5,
    text: "Omar's real estate photo editing made our properties look stunning. His work significantly improved our listings' visual appeal and helped us close deals faster.",
    client: {
      name: "James Thompson",
      project: "Real Estate Photography"
    },
    rating: 5
  },
  {
    id: 6,
    text: "The photo manipulation work was mind-blowing! Omar created composite images that perfectly matched our creative vision. His technical skills are truly impressive.",
    client: {
      name: "David Wilson",
      project: "Creative Photo Manipulation"
    },
    rating: 5
  }
];

const Feedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

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
          transition={{ duration: 0.5 }}
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
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <Rating>
                {[...Array(feedbacks[currentIndex].rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </Rating>
              <FeedbackText>{feedbacks[currentIndex].text}</FeedbackText>
              <ClientInfo>
                <ClientName>{feedbacks[currentIndex].client.name}</ClientName>
                <ProjectName>{feedbacks[currentIndex].client.project}</ProjectName>
              </ClientInfo>
            </FeedbackCard>
          </AnimatePresence>
        </FeedbackContainer>
        <NavigationButtons>
          <NavButton onClick={() => paginate(-1)}>←</NavButton>
          <NavButton onClick={() => paginate(1)}>→</NavButton>
        </NavigationButtons>
        <Dots>
          {feedbacks.map((_, index) => (
            <Dot
              key={index}
              active={index === currentIndex}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </Dots>
      </Container>
    </FeedbackSection>
  );
};

export default Feedback;
