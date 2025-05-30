import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import TaskForm from './components/tasks/TaskForm';
import { Task } from './types';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskFormOpen(true);
  };

  const handleCreateTask = () => {
    setTaskToEdit(undefined);
    setIsTaskFormOpen(true);
  };

  const handleCloseTaskForm = () => {
    setIsTaskFormOpen(false);
    setTaskToEdit(undefined);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage onEditTask={handleEditTask} />;
      case 'tasks':
        return <TasksPage onEditTask={handleEditTask} />;
      default:
        return (
          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Coming Soon</h1>
            <p className="text-gray-600 dark:text-gray-400">
              This section is under development. Please check back later.
            </p>
          </div>
        );
    }
  };

  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
          
          <div className="md:ml-64 min-h-screen flex flex-col">
            <Header onCreateTask={handleCreateTask} />
            <main className="flex-1">
              {renderPage()}
            </main>
          </div>
          
          <TaskForm 
            isOpen={isTaskFormOpen}
            onClose={handleCloseTaskForm}
            editTask={taskToEdit}
          />
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;