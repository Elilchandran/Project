import React from 'react';
import { Task as TaskType } from '../types/kanban';

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => (
  <div className="p-4 bg-white shadow rounded-md">
    <h3 className="font-semibold">{task.name}</h3>
    <p>{task.description}</p>
    <p className="text-sm">Due: {task.dueDate}</p>
    <span
      className={`text-white px-2 py-1 rounded ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}
    >
      {task.priority}
    </span>
  </div>
);

export default Task;
