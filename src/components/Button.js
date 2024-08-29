import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { Justify } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    toggleMenu();
    navigate('/');
  };

  return (
    <>
      <MenuButton onClick={toggleMenu}>
        <Justify size={25} color="wheat" />
      </MenuButton>

      {isOpen && (
        <MenuContainer>
          <MenuSection>
            {isAuthenticated ? (
              <>
                <MenuItem>
                  <NavLink to="/tasks" onClick={toggleMenu}>Minhas Tarefas</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink onClick={handleLogout}>Logout</NavLink>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem>
                  <NavLink to="/login" onClick={toggleMenu}>Login</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/register" onClick={toggleMenu}>Registrar</NavLink>
                </MenuItem>
              </>
            )}
          </MenuSection>
        </MenuContainer>
      )}
    </>
  );
};

export default Menu;

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  h3{
    color:wheat;
  }
`;

const MenuItem = styled.div`
  color: wheat;
  text-decoration: none;
  font-size: 1.5rem;
  margin: 10px 0;

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const MenuButton = styled.button`
  position: absolute;
  background: #282c34;
  border: none;
  z-index: 1100;
  display: none;
  right: 2rem;

  @media (max-width:  820px) and (min-width: 300px){
    display: block;
    font-size: 1rem;
  }
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  top: -30px;
`;

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-size: 1.5rem;
  margin: 10px 0;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    font-size: 1.55rem;
  }
`;
