import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <Container>

      <TitleContainer>
      <Title>Bem-vindo à Página Inicial</Title>
      </TitleContainer>
     
    </Container>
  );
};

export default Home;

const Container = styled.div`
  background-color: papayawhip;
  width: 100svw;
  height: 100vh;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;

`;
const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #333;
`;