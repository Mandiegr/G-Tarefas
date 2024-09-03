import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import styled from 'styled-components';
import { TaskProvider, useTasks } from '../context/TaskContext';

const Tasks = () => {
  const { fetchTasks } = useTasks(); 
  const [taskListKey, setTaskListKey] = useState(0);

  const handleTaskAdded = () => {
    fetchTasks(); 
    setTaskListKey(taskListKey + 1); 
  };

  return (
    <TasksContainer>
      <TaskFormWrapper>
        <TaskForm onTaskAdded={handleTaskAdded} />
      </TaskFormWrapper>
      <TaskListWrapper>
        <TaskProvider key={taskListKey}>
          <TaskList />
        </TaskProvider>
      </TaskListWrapper>
    </TasksContainer>
  );
};

export default Tasks;

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskFormWrapper = styled.div`
  flex: 2;
  position: relative;
  align-items: center;
  max-width: 100%;
  top: 1rem;
  
  @media (min-width: 768px) {
    margin-left: 2rem;
  }
  @media (min-width: 300px) and (max-width: 600px) {
    margin-left: 0.8rem;
  }
`;

const TaskListWrapper = styled.div`
  flex: 1;
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    margin-left: 1.4rem;
  }
`;
