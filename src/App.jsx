import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from './components/Todo';
import TodoDetail from './components/TodoDetail';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="overflow-hidden">
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/todo/:id" element={<TodoDetail />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
