import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editTodo, toggleTodo, removeTodo } from '../redux/actions';
import { FiEdit, FiSave, FiArrowLeft } from 'react-icons/fi';
import { FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos[parseInt(id)]);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo?.text || '');

  if (!todo) {
    return <p className="text-center text-red-500 font-medium">Todo not found.</p>;
  }

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(editTodo(parseInt(id), editText.trim()));
      toast.success('Todo updated!');
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    dispatch(removeTodo(parseInt(id)));
    toast.error('Todo removed.');
    navigate('/');
  };

  const handleToggle = () => {
    dispatch(toggleTodo(parseInt(id)));
    toast.success(todo.completed ? 'Marked as incomplete' : 'Marked as completed');
  };

  return (
    <div className="max-w-6xl mx-auto p-6  bg-white  rounded-md">
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-3 py-1 border border-gray-300 text-gray-700 flex items-center gap-2 rounded hover:text-blue-700 hover:border-blue-400 transition cursor-pointer"
      >
        <FiArrowLeft size={16} />
        Back to List
      </button>

      {/* Title */}
      <h2
        className="text-2xl sm:text-3xl font-semibold mb-6 text-indigo-700 underline"
        style={{ fontFamily: "'Lobster', cursive" }}
      >
        Todo Detail
      </h2>

      {/* Todo Text or Edit Mode */}
      {isEditing ? (
        <textarea
          rows={12}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <p
          className={`mb-6 whitespace-pre-wrap text-gray-800 text-lg text-justify ${
            todo.completed ? 'line-through text-gray-500' : ''
          }`}
        >
          {todo.text}
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-end">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer"
          >
            <FiSave />
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition cursor-pointer"
          >
            <FiEdit />
            Edit
          </button>
        )}

        <button
          onClick={handleToggle}
          className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
        >
          {todo.completed ? <FaToggleOn /> : <FaToggleOff />}
          {todo.completed ? 'Undo' : 'Complete'}
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  );
}
