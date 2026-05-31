import { useState, useEffect } from "react";
import { createAnnouncement, getClubAnnouncements, updateAnnouncement, deleteAnnouncement } from "../services/announcementService"; 

function AnnouncementSection({ clubId, canManageClub, canEditDelete }) {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchAnnouncements = async () => {
    try {
      const data = await getClubAnnouncements(clubId);
      setAnnouncements(data.announcements || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [clubId]);

  return (
    <div className="mt-12 text-white!">
      <h2 className="text-2xl font-bold text-red-100 tracking-tight flex items-center gap-2 mb-6">
        <span className="w-1.5 h-6 bg-red-800 rounded-full"></span>
        Announcements
      </h2>

      {canManageClub && (
        <form onSubmit={async (e) => {
          e.preventDefault();
          await createAnnouncement(clubId, { title, content });
          setTitle(""); setContent(""); fetchAnnouncements();
        }} className="bg-[#120a0a]! border border-red-900/40 p-6 rounded-2xl flex flex-col gap-4 shadow-xl mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-red-400/80 mb-1">Post New Notice</h3>
          
          <input
            type="text"
            placeholder="Announcement Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/50 text-white! placeholder-gray-500! outline-none focus:border-red-700/80 text-sm"
            required
          />

          <textarea
            placeholder="Announcement Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/50 text-white! placeholder-gray-500! outline-none focus:border-red-700/80 text-sm resize-none"
            required
          />

          <button type="submit" className="bg-red-900/60 hover:bg-red-800/70 border border-red-800/40 text-red-100 font-semibold p-3 rounded-xl transition-all text-sm shadow-md">
            Post Announcement
          </button>
        </form>
      )}

      <div className="flex flex-col gap-5">
        {announcements.map((item) => (
          <div key={item._id} className="bg-[#120a0a]! border border-red-900/30 p-5 rounded-2xl shadow-md">
            <h3 className="text-lg font-bold text-red-50/90">{item.title}</h3>
            <p className="text-gray-400 mt-2 text-sm leading-relaxed whitespace-pre-wrap">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementSection;