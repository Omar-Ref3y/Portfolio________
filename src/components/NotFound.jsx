import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 2rem;
  color: var(--text-primary);
`;

const Title = styled.h1`
  font-size: 8rem;
  margin: 0;
  color: var(--accent);
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin: 1rem 0;
  color: var(--text-primary);
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Text = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0 2rem;
  color: var(--text-secondary);
`;

const HomeButton = styled(Link)`
  padding: 1rem 2rem;
  background-color: var(--accent);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Text>The page you're looking for doesn't exist or has been moved.</Text>
      <HomeButton to="/home">Back to Home</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;
