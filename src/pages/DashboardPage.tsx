import React from 'react';
import { CheckCircle, Clock, BarChart2, AlertCircle } from 'lucide-react';
import TaskCard from '../components/tasks/TaskCard';
import { useTaskContext } from '../context/TaskContext';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center">
        <div 
          className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
};

interface DashboardPageProps {
  onEditTask: (task: any) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onEditTask }) => {
  const { tasks } = useTaskContext();
  
  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
  
  // Calculate completion rate
  const completionRate = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;
  
  // Get recent tasks (last 4)
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);
  
  // Get upcoming due tasks (next 4)
  const upcomingTasks = [...tasks]
    .filter(task => task.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4);
    
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's an overview of your tasks.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Tasks" 
          value={totalTasks} 
          icon={<BarChart2 size={24} className="text-white" />} 
          color="bg-blue-600"
        />
        <StatCard 
          title="Completed" 
          value={completedTasks} 
          icon={<CheckCircle size={24} className="text-white" />} 
          color="bg-green-600"
        />
        <StatCard 
          title="In Progress" 
          value={inProgressTasks} 
          icon={<Clock size={24} className="text-white" />} 
          color="bg-purple-600"
        />
        <StatCard 
          title="Completion Rate" 
          value={`${completionRate}%`} 
          icon={<AlertCircle size={24} className="text-white" />} 
          color="bg-amber-600"
        />
      </div>
      
      {/* Recent Tasks */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Tasks</h2>
        {recentTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentTasks.map(task => (
              <TaskCard key={task.id} task={task} onEdit={onEditTask} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No recent tasks found.</p>
        )}
      </div>
      
      {/* Upcoming Due */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Due</h2>
        {upcomingTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingTasks.map(task => (
              <TaskCard key={task.id} task={task} onEdit={onEditTask} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No upcoming tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;