import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

export default function CreateTask() {
  const [form, setForm] = useState({
    title: "",
    completed: false,
    deadline: "",
    remindAt: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "completed" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send dates as ISO strings - backend will convert to UTC
      const taskData = {
        ...form,
        deadline: new Date(form.deadline).toISOString(),
        remindAt: new Date(form.remindAt).toISOString(),
      };

      await api.post("/tasks", taskData);

      toast.success("Task created");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Create Task</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-left mb-1">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="completed" className="text-left mb-1">
            Status
          </label>
          <select
            id="completed"
            name="completed"
            value={form.completed.toString()}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          >
            <option value="false">Incomplete</option>
            <option value="true">Completed</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="deadline" className="text-left mb-1">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="remindAt" className="text-left mb-1">
            Reminder
          </label>
          <input
            type="datetime-local"
            id="remindAt"
            name="remindAt"
            value={form.remindAt}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
