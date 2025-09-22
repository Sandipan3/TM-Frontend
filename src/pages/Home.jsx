import React, { useEffect, useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import TaskCard from "../components/TaskCard";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Fetch failed");
    }
  };

  const deleteTask = async (title) => {
    try {
      const res = await api.delete(`/tasks/${title}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const updateTask = async (title) => {
    try {
      const res = await api.put(`/tasks/${title}`);
      toast.success(res.data.message);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex justify-center min-h-screen  p-8">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My Tasks
        </h1>
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No tasks yet</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.title}
                task={task}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
