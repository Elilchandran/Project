import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Board from '../components/Board';

const BoardView: React.FC = () => {
  const { boardId } = useParams();
  const board = useSelector((state: RootState) =>
    state.kanban.boards.find((board) => board.id === boardId)
  );

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Boarding Details</h1>
      <Board board={board} />
    </div>
  );
};

export default BoardView;
