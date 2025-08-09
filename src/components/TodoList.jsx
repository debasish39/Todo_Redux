import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function TodoList() {
  useEffect(() => {
    AOS.init({ duration: 100, once: true });
  }, []);

  const filteredTodos = useSelector((state) => {
    const todos = state.todos;
    const filter = state.filter;
    const searchTerm = state.searchTerm.toLowerCase(); // Convert search term to lowercase for case-insensitive search

    return todos.filter((todo) => {
      const matchesFilter = (filter === 'COMPLETED' && todo.completed) ||
        (filter === 'INCOMPLETE' && !todo.completed) ||
        filter === 'ALL';

      const matchesSearch = todo.text.toLowerCase().includes(searchTerm);

      return matchesFilter && matchesSearch;
    });
  });

  console.log('Filtered Todos:', filteredTodos);
  return (
    <ul className="space-y-4">
      <h1
        className="ml-1 text-xl underline text-blue-700"
        style={{ fontFamily: "'Lobster', cursive" }}
        data-aos="fade-down"
      >
        All Todos
      </h1>

      {filteredTodos.length === 0 ? (
        <p
          className="text-center text-gray-500"
          data-aos="fade-in"
        >
          No todos found.
        </p>
      ) : (
        filteredTodos.map((todo, index) => (
          <div key={index} data-aos="fade-up ">
            <li className="p-4 bg-white rounded shadow">
              <div className="flex items-center justify-between gap-3">
                <p
                  className={
                    todo.completed
                      ? 'line-through text-gray-500'
                      : ''
                  }
                >
                  {todo.text.length > 30
                    ? `${todo.text.slice(0, 18)}...`
                    : todo.text}
                </p>

                <Link
                  to={`/todo/${index}`}
                  className="text-sm text-blue-600 underline"
                >
                  Read more
                </Link>
              </div>
            </li>
          </div>
        ))
      )}
    </ul>
  );
}
