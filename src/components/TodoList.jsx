import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function TodoList() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  const filteredTodos = useSelector((state) => {
    const todos = state.todos;
    const filter = state.filter;
    const searchTerm = state.searchTerm.toLowerCase();

    return todos.filter((todo) => {
      const matchesFilter =
        (filter === 'COMPLETED' && todo.completed) ||
        (filter === 'INCOMPLETE' && !todo.completed) ||
        filter === 'ALL';

      const matchesSearch = todo.text.toLowerCase().includes(searchTerm);

      return matchesFilter && matchesSearch;
    });
  });

  return (
    <ul className="space-y-4">
      {/* Title */}
      <h1
        className="ml-1 text-3xl font-bold underline bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg"
        style={{ fontFamily: "'Lobster', cursive" }}
        data-aos="fade-down"
      >
        All Todos
      </h1>

      {filteredTodos.length === 0 ? (
        <p
          className="text-center text-gray-400 italic mt-6"
          data-aos="fade-in"
        >
          No todos found.
        </p>
      ) : (
        filteredTodos.map((todo, index) => {
          const isActive = location.pathname === `/todo/${index}`;

          return (
            <div
              key={index}
              data-aos="fade-up"
             
              className="transition-transform duration-300 hover:scale-[1.02] active:scale-[1.02]  "
            >
              <li
                className={`p-4 rounded-xl backdrop-blur-lg border shadow-md hover:shadow-xl transition-all duration-300 mb-9 ${
                  isActive
                    ? 'border-2 border-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-border'
                    : 'bg-white/10 border-white/20'
                }`}
              >
                <div className="flex items-center justify-between gap-3 ">
                  {/* Todo Text */}
                  <p
                    className={`text-white ${
                      todo.completed ? 'line-through opacity-60' : ''
                    }`}
                  >
                    {todo.text.length > 18
                      ? `${todo.text.slice(0, 18)}...`
                      : todo.text}
                  </p>

                  {/* Read More Button */}
                  <Link
                    to={`/todo/${index}`}
                    className="text-sm px-3 py-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-[1.02]"
                  >
                    Read more
                  </Link>
                </div>
              </li>
            </div>
          );
        })
      )}
    </ul>
  );
}
