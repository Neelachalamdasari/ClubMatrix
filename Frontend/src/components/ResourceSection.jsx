import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  createResource, 
  getClubResources, 
  updateResource, 
  deleteResource 
} from "../services/resourceService";

function ResourceSection({ clubId, canManageClub, canEditDelete }) {
  const { user } = useAuth();
  const userId = user?._id?.toString();

  const [resources, setResources] = useState([]);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceFile, setResourceFile] = useState(null);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchResources = async () => {
    try {
      const data = await getClubResources(clubId);
      setResources(data.resources || []);
    } catch (err) {
      console.error("Error fetching resources:", err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [clubId]);

  const handleCreateResource = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (resourceFile) {
        formData.append("resourceFile", resourceFile);
      }

      await createResource(clubId, formData);
      
      setTitle("");
      setDescription("");
      setResourceFile(null);
      
      const fileInput = document.getElementById("resourceFileInput");
      if (fileInput) fileInput.value = "";

      fetchResources();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to share file asset");
    }
  };

  const startEdit = (resource) => {
    setEditingId(resource._id);
    setEditTitle(resource.title);
    setEditDescription(resource.description || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleUpdate = async (resourceId) => {
    try {
      await updateResource(resourceId, {
        title: editTitle,
        description: editDescription,
      });
      cancelEdit();
      fetchResources();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update resource references");
    }
  };

  const handleDelete = async (resourceId) => {
    if (!window.confirm("Are you sure you want to permanently delete this shared asset?")) return;
    try {
      await deleteResource(resourceId);
      fetchResources();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to drop asset file");
    }
  };

  const isResourceOwner = (resource) => {
    const ownerId = resource.uploadedBy?._id?.toString() || resource.uploadedBy?.toString();
    return ownerId === userId;
  };

  return (
    <div className="mt-14 text-white!">
      <h2 className="text-2xl font-bold text-red-100 tracking-tight flex items-center gap-2 mb-6">
        <span className="w-1.5 h-6 bg-red-800 rounded-full"></span>
        Resources
      </h2>

      {error && (
        <div className="p-3 bg-red-950/30 border border-red-900/40 rounded-xl text-red-400 text-xs font-medium mb-4">
          ⚠️ {error}
        </div>
      )}

      {canManageClub && (
        <form onSubmit={handleCreateResource} className="bg-[#120a0a]! border border-red-900/40 p-6 rounded-2xl flex flex-col gap-4 shadow-xl mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-red-400/80 mb-1">Upload Digital Asset</h3>
          
          <input 
            type="text" 
            placeholder="Asset / Document Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/50 text-white! placeholder-gray-500! outline-none text-sm" 
            required 
          />
          
          <textarea 
            placeholder="Provide brief resource description annotations (Optional)" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            rows={2} 
            className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/50 text-white! placeholder-gray-500! outline-none text-sm resize-none" 
          />

          <div className="flex flex-col gap-1 border border-dashed border-red-950/60 p-3 rounded-xl bg-[#0a0505]">
            <label className="text-xs text-gray-500 font-semibold ml-1 mb-1">Select File Document</label>
            <input
              id="resourceFileInput"
              type="file"
              onChange={(e) => setResourceFile(e.target.files[0])}
              className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-red-950/40 file:text-red-300 hover:file:bg-red-900/40 file:cursor-pointer cursor-pointer"
              required
            />
          </div>

          <button type="submit" className="bg-red-900/60 hover:bg-red-800/70 border border-red-800/40 text-red-100 font-semibold p-3 rounded-xl text-sm shadow-md mt-1">
            Share Resource Asset
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {resources.length === 0 ? (
          <p className="text-gray-600 text-sm italic py-4">No documentation assets shared in this club library yet.</p>
        ) : (
          resources.map((resource) => (
            <div key={resource._id} className="bg-[#120a0a]! border border-red-900/30 p-5 rounded-2xl shadow-md flex flex-col justify-between group hover:border-red-900/60 transition-all duration-300">
              
              {editingId === resource._id ? (
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wide">Editing Shared Asset Meta</h3>
                  <input 
                    type="text" 
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)} 
                    className="w-full p-3 rounded-xl bg-[#1e1414] border border-amber-900/40 text-white! text-sm font-semibold" 
                    required
                  />
                  <textarea 
                    value={editDescription} 
                    onChange={(e) => setEditDescription(e.target.value)} 
                    rows={2} 
                    className="w-full p-3 rounded-xl bg-[#1e1414] border border-amber-900/40 text-white! text-sm resize-none" 
                  />
                  <div className="flex gap-2 mt-1">
                    <button type="button" onClick={() => handleUpdate(resource._id)} className="px-4 py-2 rounded-xl bg-emerald-900/60 border border-emerald-700 text-emerald-200 text-xs font-semibold">
                      Save Properties
                    </button>
                    <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-gray-400 text-xs font-semibold">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-lg font-bold text-red-50/90">{resource.title}</h3>
                    {resource.description && (
                      <p className="text-gray-400 mt-2 text-sm leading-relaxed whitespace-pre-wrap">{resource.description}</p>
                    )}
                    
                    <a
                      href={`${resource.fileUrl}?fl_attachment`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
                    >
                      <span>Download Resource</span>
                      <span className="text-xs">↗</span>
                    </a>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-red-950/25 text-xs text-gray-500">
                    <p>Shared by: <span className="text-red-400/70 font-medium">{resource.uploadedBy?.name || "Member"}</span></p>

                    {(canEditDelete || isResourceOwner(resource)) && (
                      <div className="flex gap-2">
                        <button type="button" onClick={() => startEdit(resource)} className="px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-900/40 text-red-200 text-xs font-medium hover:bg-red-900/50">
                          Edit
                        </button>
                        <button type="button" onClick={() => handleDelete(resource._id)} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-gray-400 hover:text-red-200 text-xs font-medium transition-all">
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ResourceSection;