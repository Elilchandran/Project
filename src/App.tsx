import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import BoardOverview from './pages/BoardOverview';
import BoardView from './pages/BoardView';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
        <Route path="/board/:boardId" element={<BoardView />} />
          <Route path="/" element={<BoardOverview />} />
          
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
