import React from 'react';
import styled from 'styled-components';
import HomePage from '../images/homePage.png';

const Home = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>Seu Gerenciamento de Tarefas!</Title>
        <Subtitle>Crie uma conta e comece a organizar suas tarefas</Subtitle>
      </TitleContainer>

      <ImgContainer>
        <Image src={HomePage} alt="Home Page" />
      </ImgContainer>

    </Container>
  );
};

export default Home;

const Container = styled.div`
  background-color: papayawhip;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.25rem;
  color: #666;

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-bottom: 2rem;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

