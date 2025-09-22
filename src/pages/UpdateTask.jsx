import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

export default function UpdateTask() {
  const { title } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    completed: false,
    deadline: "",
    remindAt: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get("/tasks");
        const task = res.data.data.find((t) => t.title === title);
        if (!task) {
          toast.error("Task not found");
          navigate("/");
          return;
        }

        setForm({
          title: task.title,
          completed: task.completed,
          deadline: task.deadline.split("T")[0], // Get YYYY-MM-DD part
          remindAt: task.remindAt.slice(0, 16), // Get YYYY-MM-DDTHH:mm part
        });
      } catch (err) {
        toast.error(err.response?.data?.message);
      }
    };

    fetchTask();
  }, [title, navigate]);

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
      const taskData = {
        ...form,
        deadline: new Date(form.deadline).toISOString(),
        remindAt: new Date(form.remindAt).toISOString(),
      };

      await api.put(`/tasks/${title}`, taskData);
      toast.success("Task updated");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update task");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Update Task</h1>
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
          Update Task
        </button>
      </form>
    </div>
  );
}
