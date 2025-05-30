import { Task, Tag } from '../types';

export const mockTags: Tag[] = [
  { id: '1', name: 'Work', color: '#3B82F6' },
  { id: '2', name: 'Personal', color: '#8B5CF6' },
  { id: '3', name: 'Urgent', color: '#EF4444' },
  { id: '4', name: 'Learning', color: '#10B981' },
  { id: '5', name: 'Meeting', color: '#F59E0B' },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Draft and submit the Q3 project proposal with budget estimates',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2025-07-10',
    tags: ['1', '3'],
    createdAt: '2025-06-30T10:00:00Z',
  },
  {
    id: '2',
    title: 'Schedule team meeting',
    description: 'Coordinate with team members for weekly progress review',
    priority: 'medium',
    status: 'todo',
    dueDate: '2025-07-05',
    tags: ['1', '5'],
    createdAt: '2025-06-29T14:30:00Z',
  },
  {
    id: '3',
    title: 'Learn React 18 features',
    description: 'Study new React 18 features and implement in current project',
    priority: 'medium',
    status: 'todo',
    dueDate: '2025-07-15',
    tags: ['4'],
    createdAt: '2025-06-28T09:15:00Z',
  },
  {
    id: '4',
    title: 'Gym session',
    description: 'Complete 45-minute workout focusing on cardio and strength',
    priority: 'low',
    status: 'todo',
    dueDate: '2025-07-02',
    tags: ['2'],
    createdAt: '2025-06-30T11:20:00Z',
  },
  {
    id: '5',
    title: 'Review performance metrics',
    description: 'Analyze Q2 performance data and prepare summary report',
    priority: 'high',
    status: 'todo',
    dueDate: '2025-07-08',
    tags: ['1'],
    createdAt: '2025-06-29T16:45:00Z',
  },
  {
    id: '6',
    title: 'Update portfolio website',
    description: 'Add recent projects and refresh design elements',
    priority: 'low',
    status: 'completed',
    dueDate: '2025-06-29',
    tags: ['2', '4'],
    createdAt: '2025-06-25T13:10:00Z',
  },
];

export const getTagById = (id: string): Tag | undefined => {
  return mockTags.find(tag => tag.id === id);
};