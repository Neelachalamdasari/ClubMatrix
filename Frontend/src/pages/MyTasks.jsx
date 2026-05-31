import { useEffect, useState } from "react";
import { getMyTasks, updateTaskStatus } from "../services/taskService";
import Layout from "../components/Layout";

function MyTasks() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await getMyTasks();
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, status) => {
    try {
      await updateTaskStatus(taskId, status);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Pending") return "bg-red-700";
    if (status === "In Progress") return "bg-orange-600";
    if (status === "Completed") return "bg-green-700";
    return "bg-gray-600";
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-50 mb-8">
          My Tasks
        </h1>

        {tasks.length === 0 ? (
          <div className="text-center py-16 bg-[#161010] border border-red-900/30 rounded-2xl">
            <p className="text-gray-400">No tasks assigned to you yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-[#161010] border border-red-900/30 p-5 rounded-2xl"
              >
                <h2 className="text-xl font-bold text-red-100">
                  {task.title}
                </h2>
                <p className="mt-3 text-gray-400 text-sm">
                  {task.description}
                </p>
                <p className="mt-3 text-sm text-gray-500">
                  Club: {task.club?.clubName}
                </p>
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task._id, e.target.value)
                  }
                  className={`${getStatusColor(task.status)} p-2 rounded-lg mt-4 text-sm text-white border-0`}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyTasks;
