import React, { useState, useEffect } from 'react';
import { BsPlus, BsSearch } from 'react-icons/bs';
import { addTodo, updateSearchTerm } from '../redux/actions';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import FilterButton from './FilterButton';
import TodoList from './TodoList';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Todo() {
  const [newTodoText, setNewTodoText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 700, once: false });
  }, []);

  const handleAddtoTodo = (text) => {
    dispatch(addTodo(text));
  };

  const handleAddToDoClick = () => {
    if (newTodoText.trim() !== '') {
      handleAddtoTodo(newTodoText.trim());
      toast.success('Todo added successfully!');
      setNewTodoText('');
    } else {
      toast.error('Please enter a todo.');
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 min-h-screen rounded" data-aos="fade-up">
      {/* Stylish Heading */}
      <h1
        className="text-xl sm:text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-md mb-6 uppercase font-bold"
        style={{ fontFamily: "'Lobster', cursive" }}
        data-aos="zoom-in"
      >
        Personal Todo App
      </h1>

      {/* Add Todo Input */}
      <div
        className="flex flex-row items-stretch sm:items-center gap-3 mb-6"
        data-aos="fade-right"
      >
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add Todo"
          className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-sm rounded sm:rounded-none"
        />
        <button
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
          onClick={handleAddToDoClick}
        >
          <BsPlus size={22} />
        </button>
      </div>

      {/* Filter and Search */}
      <div
        className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-4 cursor-pointer"
        data-aos="fade-left"
      >
        <FilterButton />

        <div className="flex flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-sm rounded sm:rounded-none flex-grow sm:w-64"
          />
          <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer">
            <BsSearch size={20} />
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div data-aos="fade-up" data-aos-delay="100">
        <TodoList />
      </div>
    </div>
  );
}
