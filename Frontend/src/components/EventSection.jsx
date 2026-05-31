import { useEffect, useState } from "react";
import { createEvent, getClubEvents, updateEvent, deleteEvent } from "../services/eventService";

function formatDateTimeLocal(dateValue) {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function EventSection({ clubId, canManageClub, canEditDelete }) {
  const [events, setEvents] = useState([]);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [poster, setPoster] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editVenue, setEditVenue] = useState("");
  const [editPoster, setEditPoster] = useState(null);

  const fetchEvents = async () => {
    try {
      const data = await getClubEvents(clubId);
      setEvents(data.events || []);
    } catch (error) {
      console.error("Error fetching club events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [clubId]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("date", date);
      data.append("venue", venue);
      if (poster) {
        data.append("poster", poster);
      }

      await createEvent(clubId, data);
      
      setTitle("");
      setDescription("");
      setDate("");
      setVenue("");
      setPoster(null);
      
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const startEdit = (event) => {
    setEditingId(event._id);
    setEditTitle(event.title);
    setEditDescription(event.description);
    setEditDate(formatDateTimeLocal(event.date));
    setEditVenue(event.venue);
    setEditPoster(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleUpdate = async (eventId) => {
    try {
      const data = new FormData();
      data.append("title", editTitle);
      data.append("description", editDescription);
      data.append("date", editDate);
      data.append("venue", editVenue);
      if (editPoster) {
        data.append("poster", editPoster);
      }

      await updateEvent(eventId, data);
      cancelEdit();
      fetchEvents();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await deleteEvent(eventId);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="mt-14 text-white!">
      <h2 className="text-2xl font-bold text-red-100 tracking-tight flex items-center gap-2 mb-6">
        <span className="w-1.5 h-6 bg-red-800 rounded-full"></span>
        Events
      </h2>

      {canManageClub && (
        <form onSubmit={handleCreateEvent} className="bg-[#120a0a]! border border-red-900/40 p-6 rounded-2xl flex flex-col gap-4 shadow-xl mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-red-400/80 mb-1">Create Event</h3>
          
          <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/50 text-white! placeholder-gray-500! outline-none text-sm" required />
          <textarea placeholder="Event Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/50 text-white! placeholder-gray-500! outline-none text-sm resize-none" required />
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/50 text-white! outline-none text-sm" required />
          <input type="text" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/50 text-white! placeholder-gray-500! outline-none text-sm" required />

          <div className="flex flex-col gap-1 border border-dashed border-red-950/60 p-3 rounded-xl bg-[#0a0505]">
            <label className="text-xs text-gray-500 font-semibold ml-1 mb-1">Attach Event Poster Flyer</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPoster(e.target.files[0])}
              className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-red-950/40 file:text-red-300 hover:file:bg-red-900/40 file:cursor-pointer cursor-pointer"
            />
          </div>

          <button type="submit" className="bg-red-900/60 hover:bg-red-800/70 border border-red-800/40 text-red-100 font-semibold p-3 rounded-xl text-sm shadow-md">Create Event</button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {events.length === 0 ? (
          <p className="text-gray-600 text-sm italic py-4">No upcoming events scheduled.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="bg-[#120a0a]! border border-red-900/30 p-5 rounded-2xl shadow-md flex flex-col justify-between hover:border-red-900/60 transition-all">
              
              {editingId === event._id ? (
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wide">Editing Event Properties</h3>
                  <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full p-3 rounded-xl bg-[#1e1414] border border-amber-900/40 text-white! text-sm font-semibold" />
                  <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={3} className="w-full p-3 rounded-xl bg-[#1e1414] border border-amber-900/40 text-white! text-sm resize-none" />
                  <input type="datetime-local" value={editDate} onChange={(e) => setEditDate(e.target.value)} className="w-full p-3 rounded-xl bg-[#1e1414] border border-amber-900/40 text-white! text-sm" />
                  <input type="text" value={editVenue} onChange={(e) => setEditVenue(e.target.value)} className="w-full p-3 rounded-xl bg-[#1e1414] border border-amber-900/40 text-white! text-sm" />
                  
                  <div className="flex flex-col gap-1 border border-dashed border-amber-950/60 p-3 rounded-xl bg-[#0a0505]">
                    <label className="text-xs text-amber-500 font-semibold mb-1">Update Poster Image</label>
                    <input type="file" accept="image/*" onChange={(e) => setEditPoster(e.target.files[0])} className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-amber-950/40 file:text-amber-300" />
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button type="button" onClick={() => handleUpdate(event._id)} className="px-4 py-2 rounded-xl bg-emerald-900/60 border border-emerald-700 text-emerald-200 text-xs font-semibold">Save</button>
                    <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-gray-400 text-xs font-semibold">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    {event.poster && (
                      <img
                        src={event.poster}
                        alt={event.title}
                        className="w-full h-64 object-cover rounded-xl mb-4 border border-red-950/40 shadow-inner"
                      />
                    )}

                    <h3 className="text-lg font-bold text-red-50/90">{event.title}</h3>
                    <p className="text-gray-400 mt-2 text-sm leading-relaxed whitespace-pre-wrap">{event.description}</p>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#0a0505] border border-red-950/30 p-3 rounded-xl text-xs max-w-xl">
                      <p className="text-gray-400"><span className="text-red-400/60 font-semibold mr-1">📅 Time:</span> {new Date(event.date).toLocaleString()}</p>
                      <p className="text-gray-400"><span className="text-red-400/60 font-semibold mr-1">📍 Venue:</span> {event.venue}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-red-950/25 text-xs text-gray-500">
                    <p>Organized by: <span className="text-red-400/70 font-medium">{event.createdBy?.name || "Coordinator"}</span></p>

                    {canEditDelete && (
                      <div className="flex gap-2">
                        <button type="button" onClick={() => startEdit(event)} className="px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-900/40 text-red-200 text-xs font-medium hover:bg-red-900/50">
                          Edit
                        </button>
                        <button type="button" onClick={() => handleDelete(event._id)} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-gray-400 hover:text-red-200 text-xs font-medium transition-all">
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

export default EventSection;