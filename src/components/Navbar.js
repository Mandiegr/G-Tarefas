import React, { useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import Menu from './Button';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };


  return (
    <Nav>
      <LeftNavLinks>
        <NavLink to="/">Home</NavLink>
        {isAuthenticated && <NavLink to="/tasks">Minhas Tarefas</NavLink>}
      </LeftNavLinks>

      <RightNavLinks>
        {isAuthenticated ? (
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Registrar</NavLink>
          </>
        )}
      </RightNavLinks>

      <Menu />
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #282c34;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LeftNavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightNavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: wheat;
  text-decoration: none;
  margin: 0 1rem;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background-color: wheat;
  border: none;
  color: black;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #faedcd;
  }
`;
