import React from 'react';
import { Column as ColumnType } from '../types/kanban';
import Task from './Task';
import { Draggable } from 'react-beautiful-dnd';

interface ColumnProps {
  column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column }) => (
  <div className="w-1/3 bg-gray-100 p-4 rounded-md">
    <h2 className="font-bold">{column.name}</h2>
    <div className="mt-4 space-y-2">
      {column.tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id} index={index}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <Task task={task} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  </div>
);

export default Column;
