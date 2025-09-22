import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

export default function TaskCard({ task, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-yellow-100 shadow-lg rounded-xl p-5 flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
      <p className="text-gray-600">
        Status: {task.completed ? "Completed" : "Incomplete"}
      </p>
      <p className="text-gray-600">
        Deadline: {new Date(task.deadline).toLocaleDateString()}
      </p>
      <p className="text-gray-600">
        Remind At: {new Date(task.remindAt).toLocaleString()}
      </p>
      <div className="flex justify-between mt-4">
        <button
          className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
          onClick={() => navigate(`/update/${task.title}`)}
        >
          <Pencil className="w-5 h-5 text-blue-600" />
        </button>
        <button
          className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors duration-200"
          onClick={() => onDelete(task.title)}
        >
          <Trash2 className="w-5 h-5 text-red-600" />
        </button>
      </div>
    </div>
  );
}
