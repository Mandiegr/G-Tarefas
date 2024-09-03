import React, { useState } from 'react';
import styled from 'styled-components';
import { PencilSquare } from 'react-bootstrap-icons';
import { useTasks } from '../context/TaskContext';

const TaskList = () => {
  const {
    tasks,
    activeTask,
    showModal,
    editTitle,
    editDescription,
    setEditTitle,
    setEditDescription,
    handleDelete,
    handleEdit,
    handleUpdate,
    handleStatusChange,
    handleFilterChange,
    setActiveTask,
    setShowModal,
    filter,
  } = useTasks();

  return (
    <TaskListContainer>
      <TaskInput
        type="text"
        placeholder="Filtrar por status (pendente, em andamento, concluído, atrasado)"
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
      />
      <TaskItems>
        {tasks.map((task) => (
          <TaskItem key={task.id} status={task.status}>
            <div>
              <h3>{task.title}</h3>
              <TaskDescription description={task.description} />
            </div>
            <ButtonGroup>
              <StatusDropdown
                value={task.status}
                onChange={(e) => handleStatusChange(task, e.target.value)}
              >
                <option value="pendente">Pendente</option>
                <option value="em andamento">Em Andamento</option>
                <option value="concluído">Concluído</option>
                <option value="atrasado">Atrasado</option>
              </StatusDropdown>
              <IconWrapper>
                <PencilSquare onClick={() => setActiveTask(task.id === activeTask ? null : task.id)} />
                {activeTask === task.id && (
                  <ActionMenu>
                    <button onClick={() => handleEdit(task)}>Editar</button>
                    <button onClick={() => handleDelete(task.id)}>Excluir</button>
                  </ActionMenu>
                )}
              </IconWrapper>
            </ButtonGroup>
          </TaskItem>
        ))}
      </TaskItems>

      {showModal && (
        <Modal>
          <ModalContent>
            <h2>Editar Tarefa</h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <ButtonGroup>
              <button onClick={handleUpdate}>Salvar</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </TaskListContainer>
  );
};

const TaskDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const truncatedDescription = description.length > 100 && !isExpanded
    ? `${description.substring(0, 100)}...`
    : description;

  return (
    <p>
      {truncatedDescription}
      {description.length > 100 && (
        <span onClick={toggleExpand} style={{ color: 'black', cursor: 'pointer' }}>
          {isExpanded ? ' Mostrar menos' : ' Mostrar mais'}
        </span>
      )}
    </p>
  );
};

export default TaskList;

const TaskListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  justify-content: flex-start;
  border-radius: 8px;
`;

const TaskInput = styled.input`
  width: 446px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 540px) {
    width: 100%;
    max-width: 500px; 
    min-width: 300px;
    box-sizing: border-box; 
  }

  @media (max-width: 390px) {
    min-width: 280px; 
  }
`;

const TaskItems = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const TaskItem = styled.li`
  background-color: ${(props) => {
    switch (props.status) {
      case 'concluído':
        return '#d4edda';
      case 'atrasado':
        return '#f8d7da';
      case 'em andamento':
        return '#fff3cd';
      default:
        return '#fff';
    }
  }};
  padding: 20px;
  border: 1px solid #dfe1e6;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 446px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    text-decoration: ${(props) => (props.status === 'concluído' ? 'line-through' : 'none')};
    font-size: 18px;
    margin-bottom: 8px;
  }

  p {
    text-decoration: ${(props) => (props.status === 'concluído' ? 'line-through' : 'none')};
    font-size: 16px;
    margin-bottom: 12px;
    word-break: break-word;
  }

  @media (max-width: 1280px) {
    flex: 1 1 calc(25% - 16px); 
  }

  @media (max-width: 920px) {
    flex: 1 1 calc(33.33% - 16px);
  }

  @media (max-width: 620px) {
    flex: 1 1 calc(50% - 16px);
  }

  @media (max-width: 540px) {
    flex: 1 1 100%;
    width: 470px; 
  }

  @media (max-width: 414px) and (min-width: 300px) {
    width: 310px;
  }

  @media (max-width: 320px) {
    width: 280px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusDropdown = styled.select`
  border: none; 
  border-radius: 4px;
  padding: 6px 12px;
  background-color: #282c34; 
  color: wheat; 
  cursor: pointer;
  font-size: 14px;

  option {
    color: wheat; 
  }

  &:hover {
    background-color: #3a3f47; 
  }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    font-size: 20px;
    cursor: pointer;
    color: #282c34;
  }
`;

const ActionMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #282c34;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 10px;
  z-index: 10;

  button {
    background-color: #282c34;
    color: wheat;
    border: none;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #3a3f47;
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;

  input,
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  textarea {
    height: 100px;
  }

  button {
    padding: 10px 20px;
    margin-right: 10px;
    background-color: #3a3f47;
    color: wheat;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: wheat; 
      color: #3a3f47;
    }
  }
`;
