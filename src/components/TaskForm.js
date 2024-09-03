import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';
import { PencilSquare, X } from 'react-bootstrap-icons';

const TaskManager = ({ onTaskAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/tasks', { title, description });
    setTitle('');
    setDescription('');
    onTaskAdded();
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setTitle('');
    setDescription('');
  };

  return (
    <Container>
      {!showForm ? (
        <NewTaskButton onClick={() => setShowForm(true)}>
          Nova Tarefa <PencilSquare />
        </NewTaskButton>
      ) : (
        <>
          <Overlay onClick={handleCancel} />
          <TaskFormContainer>
            <CloseIcon onClick={handleCancel}>
              <X size={24} />
            </CloseIcon>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                required
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição"
                required
              ></textarea>
              <button type="submit">Adicionar Tarefa</button>
            </form>
          </TaskFormContainer>
        </>
      )}
    </Container>
  );
};

export default TaskManager;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`;

const NewTaskButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #282c34;
  color: wheat;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: wheat;
    color: #282c34;
  }

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const TaskFormContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 500px;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;

  @media (max-width: 600px) {
      width: 90%;
    }

  form {
    display: flex;
    flex-direction: column;
  }

  input,
  textarea {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ced4da;
    resize: none;

    @media (max-width: 600px) {
      font-size: 14px;
    }
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #282c34;
    color: wheat;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: wheat;
      color: #282c34;
    }

    @media (max-width: 600px) {
      width: 100%;
      font-size: 14px;
    }
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: 5px;
  cursor: pointer;
  color: #282c34;

  &:hover {
    color: wheat;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
