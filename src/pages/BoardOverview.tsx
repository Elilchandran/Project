import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addBoard, deleteBoard, addTask } from '../redux/slices/kanbanSlice';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const BoardOverview: React.FC = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.kanban.boards);

  const [boardName, setBoardName] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');
  const [taskPriority, setTaskPriority] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);

  const handleAddBoard = () => {
    if (boardName.trim()) {
      dispatch(addBoard({ name: boardName }));
      setBoardName(''); // Clear input after adding
    }
  };

  const handleAddTask = () => {
    if (taskName.trim() && selectedBoardId && selectedColumnId) {
      const newTask = {
        id: uuidv4(),
        name: taskName,
        description: taskDescription,
        assignee: taskAssignee,
        priority: taskPriority,
        dueDate: taskDueDate,
      };
      dispatch(addTask({ boardId: selectedBoardId, columnId: selectedColumnId, task: newTask }));
      setTaskName('');
      setTaskDescription('');
      setTaskAssignee('');
      setTaskPriority('Low');
      setTaskDueDate('');
    }
  };

  const handleDeleteBoard = (boardId: string) => {
    dispatch(deleteBoard(boardId));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>
      <div className="mb-6">
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Enter board name"
          className="border px-4 py-2 mr-2 rounded"
        />
        <button onClick={handleAddBoard} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Board
        </button>
      </div>

      {/* Add Task Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Task</h2>
        <select
          value={selectedBoardId || ''}
          onChange={(e) => setSelectedBoardId(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">Select Board</option>
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>

        {selectedBoardId && (
          <select
            value={selectedColumnId || ''}
            onChange={(e) => setSelectedColumnId(e.target.value)}
            className="border px-4 py-2 rounded"
          >
            <option value="">Select Column</option>
            {boards
              .find((board) => board.id === selectedBoardId)
              ?.columns.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.name}
                </option>
              ))}
          </select>
        )}

        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
          className="border px-4 py-2 mr-2 rounded"
        />
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Description"
          className="border px-4 py-2 mr-2 rounded"
        />
        <input
          type="text"
          value={taskAssignee}
          onChange={(e) => setTaskAssignee(e.target.value)}
          placeholder="Assignee"
          className="border px-4 py-2 mr-2 rounded"
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value as 'Low' | 'Medium' | 'High')}
          className="border px-4 py-2 mr-2 rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
          className="border px-4 py-2 mr-2 rounded"
        />
        <button
          onClick={handleAddTask}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      {/* Display Boards */}
      <div className="space-y-4">
        {boards.map((board) => (
          <div key={board.id} className="flex justify-between items-center">
            <Link to={`/board/${board.id}`} className="text-blue-500 hover:underline">
              {board.name}
            </Link>
            <button
              onClick={() => handleDeleteBoard(board.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardOverview;
