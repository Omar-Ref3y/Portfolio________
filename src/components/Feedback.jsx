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
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      rgba(var(--primary-rgb), 0.05),
      rgba(var(--accent-rgb), 0.05)
    );
    z-index: -1;
  }
`;

const ProjectName = styled.h4`
  color: var(--primary-color);
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  opacity: 0.95;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
`;

const FeedbackText = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0;
  margin-top: 0.5rem;
  text-decoration: underline;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const ClientInfo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
`;

const ClientName = styled.h4`
  color: var(--text-primary);
  font-size: 1.1rem;
  margin: 0;
`;

const ProjectNameComponent = styled.p`
  color: var(--accent-color);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
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
    text: "Skills great. Responsiveness great. Communication great. Availability great. Cooperation great. I felt like I could trust his work",
    client: {

      project: "Photo resizing with dedicated Ai tool"
    },
    rating: 5
  },{
    id: 2,
    text: "Ali did a great job. I would definitely hire him again in the future.",
    client: {

      project: "Photo Editing and Image Modification using Photoshop"
    },
    rating: 5
  },
  {
    id: 3,
    text: "I had terrible pics to start with but given the circumstances, he did a great job making them look great!",
    client: {

      project: "My Pics Need Photoshop!"
    },
    rating: 5
  },
  {
    id: 4,
    text: "Efficient, friendly and understood the requirements of the work in entirety. Great work!",
    client: {

      project: "Change colour of Aircraft Tail & Engines in PNG Image"
    },
    rating: 5
  },
  {
    id: 5,
    text: "I have trusted Ali with several lightroom and photoshop projects. He has been able to help me with many photos in return completing several projects and helping me finalize creative photo enhancements. He has been prompt and very good with detail on all fronts. He is a great person to work with and does his very best and takes great care to the details. I am appreciative to have found him and to work with him. Thank you.",
    client: {
      project: "Photo Editing for Home Windows"
    },
    rating: 5
  },
  {
    id: 6,
    text: "Ali did great work very quickly for us",
    client: {

      project: "Urgent Photo Touch-Up Services Needed"
    },
    rating: 5
  }
  ,
  {
    id: 7,
    text: "I recently worked with Ali on a photo retouching project, and I couldn't be more satisfied with the results. Ali demonstrated excellent skills in photo editing and paid close attention to every detail. He was responsive and completed the project on time, delivering exactly what I envisioned. If you're looking for a reliable and talented photo retouching expert, I highly recommend Ali!",
    client: {

      project: "Photo Retouching Expert Needed"
    },
    rating: 5
  },
  {
    id: 8,
    text: "Super attentive to detail, kind, honest, hard worker, will contact this freelancer for multi-RAW photography edit and merge jobs in the future!!!!!",
    client: {

      project: "Image Editing & Enhancement Using Photoshop"
    },
    rating: 5
  },
  {
    id: 9,
    text: "Thank you so much for your diligence and hard work on this project. The colors on the photo correction were above my expectations. You did such a great job on the landscape in addition to the people and the items that were in need of repair from scratches and color loss. I appreciate your skills and hope that you have success in your future endeavors! Thank you again.",
    client: {

      project: "Retouching 3 photographs with specific instructions."
    },
    rating: 5
  },
  {
    id: 10,
    text: "Ali is amazing to work with. He quickly helped me when I was in a job with an image. He was able to proportion it perfectly with another image to fit beautifully as the hero image on our Home page.Thanks Ali! Will reach out again.:)",
    client: {
      project: "Image Edit"
    },
    rating: 5,
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
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const TEXT_LIMIT = 150;

  const getDisplayText = (text) => {
    if (text.length <= TEXT_LIMIT || isExpanded) {
      return text;
    }
    return `${text.slice(0, TEXT_LIMIT)}...`;
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
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <ProjectNameComponent>{feedbacks[currentIndex].client.project}</ProjectNameComponent>
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
                {getDisplayText(feedbacks[currentIndex].text)}
                {feedbacks[currentIndex].text.length > TEXT_LIMIT && (
                  <ReadMoreButton 
                    onClick={() => setIsExpanded(!isExpanded)}
                    as={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </ReadMoreButton>
                )}
              </FeedbackText>
              <ClientInfo
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <ClientName>{feedbacks[currentIndex].client.name}</ClientName>
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
