import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterTodos,markAllCompleted } from '../redux/actions';

export default function FilterButton() {
    const dispatch=useDispatch();
    const currentFilter=useSelector((state)=>state.filter);
    const handleFilter=(filter)=>{
        dispatch(filterTodos(filter));
    }
  return (
    <div className='flex space-x-4 items-center'>
      <select  className="text-sm px-2 py-1 rounded border border-gray-300 cursor-pointer focus:outline-none" value={currentFilter} onChange={(e)=>handleFilter(e.target.value)}>
        <option value="ALL">Default</option>
        <option value="COMPLETED">Completed</option>
        <option value="INCOMPLETE">Incomplete</option>
      </select>
      <button
        className="text-[12px] sm:text-[18px]  px-2 py-1 bg-purple-500 text-white rounded ml-2 cursor-pointer"
       onClick={()=>dispatch(markAllCompleted())}
      >
        Mark All Completed
      </button>
    </div>
  )
}
