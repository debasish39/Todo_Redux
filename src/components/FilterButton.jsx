import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterTodos, markAllCompleted } from '../redux/actions';

export default function FilterButton() {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.filter);

  const handleFilter = (filter) => {
    dispatch(filterTodos(filter));
  };

  return (
    <div className="flex space-x-4 justify-between sm:items-center">
      {/* Filter Dropdown */}
      <select
        className="text-sm px-3 py-2 rounded-lg border border-white/30 bg-white/5 text-white cursor-pointer focus:outline-none  transition-all duration-100  "
        value={currentFilter}
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="ALL" style={{color:"black"}}>Default</option>
        <option value="COMPLETED"style={{color:"black"}}>Completed</option>
        <option value="INCOMPLETE" style={{color:"black"}}>Incomplete</option>
      </select>

      {/* Mark All Completed Button */}
      <button
        className="text-xs sm:text-sm px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
        onClick={() => dispatch(markAllCompleted())}
      >
        ✅ Mark All Completed
      </button>
    </div>
  );
}
