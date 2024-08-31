import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const TaskContext = createContext();

export const useTasks = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const fetchFilteredTasks = async (status) => {
    try {
      const response = await api.get(`/tasks?status=${status}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas filtradas:', error);
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
    setActiveTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setShowModal(true);
    setActiveTask(null);
  };

  const handleUpdate = async () => {
    await api.put(`/tasks/${editingTask}`, {
      title: editTitle,
      description: editDescription,
    });
    setTasks(tasks.map((task) =>
      task.id === editingTask ? { ...task, title: editTitle, description: editDescription } : task
    ));
    setEditingTask(null);
    setEditTitle('');
    setEditDescription('');
    setShowModal(false);
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      await api.patch(`/tasks/${task.id}/status`, { status: newStatus });
      setTasks(tasks.map((t) =>
        t.id === task.id ? { ...t, status: newStatus } : t
      ));
    } catch (error) {
      console.error('Erro ao atualizar o status da tarefa:', error);
      alert('Erro ao atualizar o status da tarefa.');
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
    if (status) {
      fetchFilteredTasks(status);
    } else {
      fetchTasks();
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      editingTask,
      editTitle,
      editDescription,
      showModal,
      activeTask,
      filter,
      setEditTitle,
      setEditDescription,
      setShowModal,
      setActiveTask,
      setFilter,
      handleDelete,
      handleEdit,
      handleUpdate,
      handleStatusChange,
      handleFilterChange,
      fetchTasks,
    }}>
      {children}
    </TaskContext.Provider>
  );
};
