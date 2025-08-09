import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTodo, toggleTodo, removeTodo } from "../redux/actions";
import { FiEdit, FiSave, FiArrowLeft } from "react-icons/fi";
import { FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

export default function TodoDetail() {
  // --- Hooks & State ---
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos[parseInt(id)]);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo?.text || "");

  // --- Animation on load ---
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  // --- Guard: If todo not found ---
  if (!todo) {
    return (
      <p
        className="text-center text-red-500 font-medium mt-10"
        data-aos="fade-up"
      >
        🚫 Todo not found.
      </p>
    );
  }

  // --- Handlers ---
  const handleSave = () => {
    if (!editText.trim()) return;
    if (window.confirm("Are you sure you want to update this todo?")) {
      dispatch(editTodo(parseInt(id), editText.trim()));
      toast.success("Todo updated!", {
        style: { background: "#2E2E31", color: "green" },
      });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      dispatch(removeTodo(parseInt(id)));
      toast.error("Todo removed.", {
        style: { background: "#2E2E31", color: "red" },
      });
      navigate("/");
    }
  };

  const handleToggle = () => {
    dispatch(toggleTodo(parseInt(id)));
    toast.success(
      todo.completed ? "Marked as incomplete" : "Marked as completed",
      { style: { background: "#2E2E31", color: "green" } }
    );
  };

  // --- UI ---
  return (
    <div
      className="max-w-4xl mx-auto p-8 mt-10 backdrop-blur-lg"
      data-aos="fade-up"
    >
      {/* --- Title --- */}
      <h2
        className="text-3xl sm:text-4xl font-semibold mb-6 underline bg-gradient-to-r from-[#ff8cba] via-[#a9c9ff] to-[#ffdde1] bg-clip-text text-transparent drop-shadow-lg"
        style={{ fontFamily: "'Lobster', cursive" }}
        data-aos="zoom-in"
      >
        Todo Detail
      </h2>

      {/* --- Created At --- */}
      <p className="text-gray-400 text-sm mb-4" data-aos="fade-up">
        Created:{" "}
        {todo.createdAt
          ? new Date(todo.createdAt).toLocaleString()
          : "Unknown"}
      </p>

      {/* --- Todo Text / Edit Mode --- */}
      {isEditing ? (
        <textarea
          rows={10}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="w-full p-4 rounded-lg border border-white/30 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring focus:ring-pink-200/50 transition-all duration-300"
        />
      ) : (
        <p
          className={`mb-6 whitespace-pre-wrap text-gray-200 text-lg leading-relaxed ${
            todo.completed ? "line-through opacity-70" : ""
          }`}
        >
          {todo.text}
        </p>
      )}

      {/* --- Action Buttons --- */}
      <div
        className="flex flex-wrap sm:gap-3 sm:justify-end gap-1"
        data-aos="fade-left"
        data-aos-delay="100"
      >
        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <FiSave /> Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <FiEdit /> Edit
          </button>
        )}

        <button
          onClick={handleToggle}
          className="flex items-center gap-1 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {todo.completed ? <FaToggleOn /> : <FaToggleOff />}
          {todo.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-1 px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <FaTrash /> Delete
        </button>
      </div>

      {/* --- Back Button --- */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 border border-white/30 text-white w-full flex items-center justify-center gap-2 rounded-lg hover:bg-white/10 hover:scale-105 transition-all duration-300 cursor-pointer"
        data-aos="fade-right"
      >
        <FiArrowLeft size={30} />
       Go to Home
      </button>
    </div>
  );
}
