import React from 'react';
import { Clock, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import Badge from '../ui/Badge';
import { Task } from '../../types';
import { useTaskContext } from '../../context/TaskContext';
import { getTagById } from '../../data/mockData';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { deleteTask, updateTask } = useTaskContext();
  const [menuOpen, setMenuOpen] = React.useState(false);
  
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  
  const statusColors = {
    todo: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    'in-progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    }).format(date);
  };
  
  const isPastDue = () => {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < now && task.status !== 'completed';
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    updateTask(task.id, { status: newStatus });
    setMenuOpen(false);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MoreVertical size={16} />
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                <div className="py-1">
                  <button
                    onClick={() => onEdit(task)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  >
                    <Edit2 size={14} className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  >
                    <Trash2 size={14} className="mr-2" />
                    Delete
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                  <div className="px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                    Change Status
                  </div>
                  <button
                    onClick={() => handleStatusChange('todo')}
                    className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                      task.status === 'todo' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    To Do
                  </button>
                  <button
                    onClick={() => handleStatusChange('in-progress')}
                    className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                      task.status === 'in-progress' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleStatusChange('completed')}
                    className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                      task.status === 'completed' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{task.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {task.tags.map(tagId => {
            const tag = getTagById(tagId);
            return tag ? (
              <Badge key={tag.id} text={tag.name} color={tag.color} />
            ) : null;
          })}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className={`text-xs font-medium px-2.5 py-0.5 rounded ${priorityColors[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </div>
          
          <div className={`text-xs font-medium px-2.5 py-0.5 rounded ${statusColors[task.status]}`}>
            {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </div>
        </div>
        
        <div className="flex items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
          <Clock size={14} className={`mr-1 ${isPastDue() ? 'text-red-500 dark:text-red-400' : ''}`} />
          <span className={isPastDue() ? 'text-red-500 dark:text-red-400 font-medium' : ''}>
            Due {formatDate(task.dueDate)} {isPastDue() && '(overdue)'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;