import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import { BoxArrowRight } from 'react-bootstrap-icons';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleShowLogoutConfirm = () => {
    setShowLogoutConfirm(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <Nav>
      <NavLinks>
        {isAuthenticated ? (
          <>
            <BoxArrowRight
              onClick={handleShowLogoutConfirm}
              color='wheat'
              size={24}
            />
            {showLogoutConfirm && (
              <LogoutModal>
                <ModalContent>
                  <p>Tem certeza que deseja sair?</p>
                  <ModalButtons>
                    <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
                    <CancelButton onClick={handleCancelLogout}>Cancelar</CancelButton>
                  </ModalButtons>
                </ModalContent>
              </LogoutModal>
            )}
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Registrar</NavLink>
          </>
        )}
      </NavLinks>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #282c34;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: papayawhip;
  text-decoration: none;
  margin: 0 1rem;
  font-size: 1.2rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ModalButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const LogoutButton = styled.button`
  background-color: wheat;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: black;
    color: wheat;
  }
`;

const CancelButton = styled.button`
  background-color: black;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: wheat;
    color: black;
  }
`;
