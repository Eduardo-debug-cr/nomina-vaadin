import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import TaskCard from '../components/tasks/TaskCard';
import Button from '../components/ui/Button';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types';

interface TasksPageProps {
  onEditTask: (task: Task) => void;
}

const TasksPage: React.FC<TasksPageProps> = ({ onEditTask }) => {
  const { tasks, tags } = useTaskContext();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // Apply filters
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesTag = tagFilter === 'all' || task.tags.includes(tagFilter);
    
    return matchesStatus && matchesPriority && matchesTag;
  });
  
  // Group tasks by status
  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');
  
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tasks</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setFiltersVisible(!filtersVisible)}
          className="mt-4 sm:mt-0"
        >
          <Filter size={16} className="mr-2" />
          Filters
        </Button>
      </div>
      
      {/* Filters */}
      {filtersVisible && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Statuses</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tag
              </label>
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Tags</option>
                {tags.map(tag => (
                  <option key={tag.id} value={tag.id}>{tag.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setStatusFilter('all');
                setPriorityFilter('all');
                setTagFilter('all');
              }}
              className="mr-2"
            >
              Reset
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => setFiltersVisible(false)}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
      
      {/* Kanban-style layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* To Do Column */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            To Do
            <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {todoTasks.length}
            </span>
          </h2>
          
          <div className="space-y-4">
            {todoTasks.length > 0 ? (
              todoTasks.map(task => (
                <TaskCard key={task.id} task={task} onEdit={onEditTask} />
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No tasks to do</p>
            )}
          </div>
        </div>
        
        {/* In Progress Column */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            In Progress
            <span className="ml-2 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {inProgressTasks.length}
            </span>
          </h2>
          
          <div className="space-y-4">
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map(task => (
                <TaskCard key={task.id} task={task} onEdit={onEditTask} />
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No tasks in progress</p>
            )}
          </div>
        </div>
        
        {/* Completed Column */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            Completed
            <span className="ml-2 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {completedTasks.length}
            </span>
          </h2>
          
          <div className="space-y-4">
            {completedTasks.length > 0 ? (
              completedTasks.map(task => (
                <TaskCard key={task.id} task={task} onEdit={onEditTask} />
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No completed tasks</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;