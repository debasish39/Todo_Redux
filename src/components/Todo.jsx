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
      toast.success('Todo added successfully!', {
        style: {
          background: 'rgba(30, 30, 40, 0.85)',
          color: '#4ade80',
          fontWeight: 'bold',
        },
      });
      setNewTodoText('');
    } else {
      toast.error('Please enter a todo.', {
        style: {
          background: 'rgba(30, 30, 40, 0.85)',
          color: '#f87171',
          fontWeight: 'bold',
        },
      });
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };

  return (
    <div
      className="max-w-5xl mx-auto p-6 sm:p-10 min-h-screen mt-10 backdrop-blur-lg animate-fadeIn"
      data-aos="fade-up"
    >
      {/* Stylish Heading */}
      <h1
        className="text-3xl sm:text-5xl text-center bg-gradient-to-r from-[#ff8cba] via-[#a9c9ff] to-[#ffdde1] bg-clip-text text-transparent drop-shadow-lg mb-8 uppercase underline font-bold tracking-wide animate-slideDown"
        style={{ fontFamily: "'Lobster', cursive" }}
        data-aos="zoom-in"
      >
        Personal Todo App
      </h1>

      {/* Add Todo Input */}
      <div
        className="flex flex-row items-stretch sm:items-center gap-3 mb-8"
        data-aos="fade-right"
      >
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="✏️ Add a new task..."
          className="flex-grow px-4 py-3 rounded-lg border border-white/30 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring focus:ring-pink-200/50 transition-all duration-300 ease-in-out hover:shadow-lg"
        />
        <button
          className="px-4 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
          onClick={handleAddToDoClick}
        >
          <BsPlus size={24} />
        </button>
      </div>

      {/* Filter and Search */}
      <div
        className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6"
        data-aos="fade-left"
      >
        <div className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
          <FilterButton />
        </div>

        <div className="flex flex-row justify-center items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="🔍 Search Todos..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="px-4 py-3 rounded-lg border border-white/30 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200/50 transition-all duration-300 ease-in-out hover:shadow-lg"
          />
          <button className="px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 ease-in-out cursor-pointer">
            <BsSearch size={20} />
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="animate-fadeIn delay-150"
      >
        <TodoList />
      </div>
    </div>
  );
}
