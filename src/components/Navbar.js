import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import Menu from './Button';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <Nav>
      <LeftNavLinks>
        {isAuthenticated && <NavLink to="/tasks">Minhas Tarefas</NavLink>}
      </LeftNavLinks>

      {isAuthenticated && (
        <SearchForm onSubmit={handleSearchSubmit}>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Pesquisar..."
          />
          <SearchButton type="submit">Buscar</SearchButton>
        </SearchForm>
      )}

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

  @media (max-width: 789px) {
    justify-content: center;
  }
`;

const LeftNavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 789px) {
    display: none;
  }
`;

const RightNavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 820px) {
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

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  flex: 1;
  //justify-content: center;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
  width: 400px;

  @media (max-width: 768px) {
    width: 60%;
  }
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: wheat;
  color: #282c34;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #faedcd;
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
