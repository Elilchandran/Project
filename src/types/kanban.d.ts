export interface Task {
  id: string;
  name: string;
  description: string;
  assignee: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}
