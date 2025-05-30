export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate: string;
  tags: string[];
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export type ThemeMode = 'light' | 'dark';