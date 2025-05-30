import React, { createContext, useContext, useState } from 'react';
import { Task, Tag } from '../types';
import { mockTasks, mockTags } from '../data/mockData';

interface TaskContextType {
  tasks: Task[];
  tags: Tag[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addTag: (tag: Omit<Tag, 'id'>) => void;
  deleteTag: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [tags, setTags] = useState<Tag[]>(mockTags);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTag = (tag: Omit<Tag, 'id'>) => {
    const newTag: Tag = {
      ...tag,
      id: Date.now().toString(),
    };
    setTags([...tags, newTag]);
  };

  const deleteTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        tags,
        addTask,
        updateTask,
        deleteTask,
        addTag,
        deleteTag,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};