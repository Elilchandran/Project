import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board, Column, Task } from '../../types/kanban';
import { v4 as uuidv4 } from 'uuid';

interface KanbanState {
  boards: Board[];
}

const initialState: KanbanState = {
  boards: JSON.parse(localStorage.getItem('kanbanBoards') || '[]'),
};

const saveToLocalStorage = (boards: Board[]) => {
  localStorage.setItem('kanbanBoards', JSON.stringify(boards));
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addBoard(state, action: PayloadAction<{ name: string }>) {
      const newBoard: Board = {
        id: uuidv4(),
        name: action.payload.name,
        columns: [
          { id: uuidv4(), name: 'To-Do', tasks: [] },
          { id: uuidv4(), name: 'In Progress', tasks: [] },
          { id: uuidv4(), name: 'Done', tasks: [] },
        ],
      };
      state.boards.push(newBoard);
      saveToLocalStorage(state.boards);
    },
    addTask(state, action: PayloadAction<{ boardId: string; columnId: string; task: Task }>) {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      const column = board?.columns.find((c) => c.id === action.payload.columnId);
      if (column) {
        column.tasks.push(action.payload.task);
        saveToLocalStorage(state.boards);
      }
    },
    updateBoard(state, action: PayloadAction<{ boardId: string; columns: Column[] }>) {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (board) {
        board.columns = action.payload.columns;
        saveToLocalStorage(state.boards);
      }
    },
    deleteBoard(state, action: PayloadAction<string>) {
      state.boards = state.boards.filter(board => board.id !== action.payload);
      saveToLocalStorage(state.boards); // Update localStorage after deleting a board
    }
  },
});

export const { addBoard, addTask, updateBoard, deleteBoard } = kanbanSlice.actions;
export default kanbanSlice.reducer;
