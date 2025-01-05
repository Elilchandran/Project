import React from 'react';
import { Column } from '../types/kanban';

interface BoardProps {
  board: { id: string; name: string; columns: Column[] };
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div className="flex space-x-6">
      {board.columns.map((column) => (
        <div key={column.id} className="border rounded p-4 w-64">
          <h2 className="font-semibold">{column.name}</h2>
          <div className="space-y-4">
            {column.tasks.map((task) => (
              <div key={task.id} className="border p-4 rounded mb-2">
                <h3 className="font-bold">{task.name}</h3>
                <p>{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
