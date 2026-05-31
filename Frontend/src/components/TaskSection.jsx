import { useEffect, useState } from "react";
import {
  createTask,
  getClubTasks,
  updateTask,
  updateTaskStatus,
  deleteTask
} from "../services/taskService";

function TaskSection({
  clubId,
  canManageClub,
  canEditDelete,
  clubMembers = []
}) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [editAssignedTo, setEditAssignedTo] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await getClubTasks(clubId);
      setTasks(data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [clubId]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await createTask(clubId, { title, description, deadline, assignedTo });
      setTitle("");
      setDescription("");
      setDeadline("");
      setAssignedTo([]);
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDeadline(task.deadline ? new Date(task.deadline).toISOString().slice(0, 10) : "");
    setEditAssignedTo((task.assignedTo || []).map((m) => m._id ? m._id.toString() : m.toString()));
  };

  const toggleAssignee = (memberId, list, setter) => {
    const id = memberId.toString();
    if (list.includes(id)) {
      setter(list.filter((item) => item !== id));
    } else {
      setter([...list, id]);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Pending") return "bg-red-950/80 border border-red-800/60 text-red-300!";
    if (status === "In Progress") return "bg-amber-950/80 border border-amber-800/60 text-amber-300!";
    if (status === "Completed") return "bg-emerald-950/80 border border-emerald-800/60 text-emerald-300!";
    return "bg-[#251a1a] border border-red-900/40 text-gray-200!";
  };

  return (
    <div className="mt-14 text-white!">
      <h2 className="text-2xl font-bold text-red-100 tracking-tight flex items-center gap-2 mb-6">
        <span className="w-1.5 h-6 bg-red-800 rounded-full"></span>
        Tasks
      </h2>

      {canManageClub && (
        <form onSubmit={handleCreateTask} className="bg-[#120a0a]! border border-red-900/40 p-6 rounded-2xl flex flex-col gap-4 shadow-xl mb-8 text-white!">
          <h3 className="text-sm font-bold uppercase tracking-wider text-red-400/80 mb-1">Assign New Task</h3>
          
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/50 text-white! placeholder-gray-500! outline-none focus:border-red-700/80 transition-all text-sm"
            required
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/50 text-white! placeholder-gray-500! outline-none focus:border-red-700/80 transition-all text-sm resize-none"
            required
          />

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium ml-1">Deadline Date</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/50 text-white! outline-none focus:border-red-700/80 transition-all text-sm color-scheme-dark"
              required
            />
          </div>

          {clubMembers.length > 0 && (
            <div className="flex flex-col gap-2 border-t border-red-900/20 pt-3">
              <p className="text-xs text-gray-400 font-medium mb-1">Assign to specific members:</p>
              <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto bg-[#0a0505] border border-red-950/60 p-3 rounded-xl">
                {clubMembers.map((member) => (
                  <label key={member._id} className="flex items-center gap-2 text-xs bg-[#120a0a] border border-red-900/20 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-red-950/40">
                    <input
                      type="checkbox"
                      checked={assignedTo.includes(member._id.toString())}
                      onChange={() => toggleAssignee(member._id, assignedTo, setAssignedTo)}
                      className="rounded accent-red-700 cursor-pointer"
                    />
                    <span className="text-gray-300">{member.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="bg-red-900/80 hover:bg-red-800 border border-red-700/50 text-red-100 font-semibold p-3 rounded-xl transition-all text-sm shadow-md">
            Create Task
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {tasks.length === 0 ? (
          <p className="text-gray-600 text-sm italic py-4">No tasks assigned to this workspace yet.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="bg-[#120a0a]! border border-red-900/30 p-5 rounded-2xl shadow-md flex flex-col justify-between hover:border-red-900/60 transition-all">
              
              {editingId === task._id ? (
                <div className="flex flex-col gap-3">
                  <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full p-3 rounded-xl bg-[#1e1414] border border-amber-900/40 text-white! text-sm font-semibold" />
                  <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={3} className="w-full p-3 rounded-xl bg-[#1e1414] border border-amber-900/40 text-white! text-sm resize-none" />
                  <input type="date" value={editDeadline} onChange={(e) => setEditDeadline(e.target.value)} className="w-full p-3 rounded-xl bg-[#1e1414] border border-amber-900/40 text-white! text-sm" />
                  <div className="flex gap-2">
                    <button type="button" onClick={() => handleUpdate(task._id)} className="px-4 py-2 rounded-xl bg-emerald-900/60 border border-emerald-700 text-emerald-200 text-xs font-semibold">Save</button>
                    <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-gray-400 text-xs font-semibold">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-red-50/90">{task.title}</h3>
                      <p className="text-gray-400 mt-2 text-sm leading-relaxed">{task.description}</p>
                    </div>

                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      className={`${getStatusColor(task.status)} px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer outline-none transition-all min-w-[125px] h-9 text-white! appearance-none border`}
                    >
                      <option value="Pending" className="bg-[#120a0a] text-red-400">Pending</option>
                      <option value="In Progress" className="bg-[#120a0a] text-amber-400">In Progress</option>
                      <option value="Completed" className="bg-[#120a0a] text-emerald-400">Completed</option>
                    </select>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 border-t border-red-950/40 pt-3">
                    <p>📅 Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No Limit"}</p>
                    <p>✍️ Assigned by: <span className="text-red-400/60 font-medium">{task.createdBy?.name || "Coordinator"}</span></p>
                    {task.assignedTo && task.assignedTo.length > 0 && (
                      <p className="w-full mt-1 text-gray-600 truncate">
                        👥 Targeted Assignees: <span className="text-gray-400/80 font-medium">{task.assignedTo.map(a => a.name || "Member").join(", ")}</span>
                      </p>
                    )}
                  </div>

                  {canEditDelete && (
                    <div className="flex gap-2 mt-4 pt-3 border-t border-red-950/40">
                      <button type="button" onClick={() => startEdit(task)} className="px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-900/40 text-red-200 text-xs font-medium hover:bg-red-900/50">Edit Task</button>
                      <button type="button" onClick={() => handleDelete(task._id)} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-gray-400 text-xs font-medium hover:bg-red-950/40 hover:text-red-200">Delete</button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskSection;