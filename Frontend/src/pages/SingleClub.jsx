import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleClub } from "../services/clubService";

import ChatSection from "../components/ChatSection";
import TaskSection from "../components/TaskSection";
import EventSection from "../components/EventSection";
import ResourceSection from "../components/ResourceSection";
import AnnouncementSection from "../components/AnnouncementSection";
import AIAssistant from "../components/AIAssistant";
import Layout from "../components/Layout";

function SingleClub() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { clubId } = useParams();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  const announcementRef = useRef(null);
  const discussionRef = useRef(null);
  const taskRef = useRef(null);
  const eventRef = useRef(null);
  const resourceRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const userId = user?._id?.toString();

  const isCreator =
    club?.createdBy?._id?.toString() === userId ||
    club?.createdBy?.toString() === userId;

  const isCoordinator =
    club?.coordinators?.some(
      (coordinator) =>
        coordinator._id?.toString() === userId ||
        coordinator.toString() === userId
    ) || false;

  const canManageClub = isCreator || isCoordinator;
  const canEditDelete = isCreator;

  const fetchClub = async () => {
    try {
      const data = await getSingleClub(clubId);
      setClub(data.club);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClub();
  }, [clubId]);

  if (loading) {
    return (
      <Layout showFooter={false}>
        <div className="p-10 min-h-screen bg-[#070404] flex items-center justify-center">
          <p className="text-red-200/60 animate-pulse font-medium">Loading Club Workspace...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showFooter={false}>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-[#070404] text-gray-200">

        
        <div className="w-full lg:w-[280px] lg:sticky lg:top-0 bg-[#0d0808] border-b lg:border-b-0 lg:border-r border-red-950/40 flex flex-col shrink-0 z-10 self-start">
          <div className="p-6 pb-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-red-400/80">
              Workspace
            </h2>
            <h1 className="text-xl font-bold text-red-50 truncate mt-1">
              {club?.clubName}
            </h1>

            <div className="mt-6 flex flex-row lg:flex-col gap-1 lg:gap-2 flex-wrap">
              {[
                { label: "Announcements", ref: announcementRef },
                { label: "Discussions", ref: discussionRef },
                { label: "Tasks", ref: taskRef },
                { label: "Events", ref: eventRef },
                { label: "Resources", ref: resourceRef },
              ].map(({ label, ref }) => (
                <button
                  key={label}
                  onClick={() => scrollToSection(ref)}
                  className="text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-red-200 hover:bg-red-950/30 transition-all duration-200"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 pt-2 bg-[#0d0808]">
            <AIAssistant compact />
          </div>
        </div>

        
        <div className="flex-1 p-4 sm:p-6 lg:p-10 space-y-12 max-w-6xl overflow-y-auto">
          
          
          <div className="border-b border-red-950/30 pb-6">
            {club?.clubImage && (
              <img
                src={club.clubImage}
                alt={club.clubName}
                className="w-full h-72 object-cover rounded-xl mb-6 shadow-xl border border-red-950/20"
              />
            )}

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-red-50">
              {club?.clubName}
            </h1>
            <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              {club?.description}
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate(`/clubs/${club._id}/members`)}
                className="bg-red-950/40 hover:bg-red-900/40 border border-red-900/40 text-red-200 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md shadow-black/40"
              >
                View Members
              </button>
            </div>
          </div>

        
          <div ref={announcementRef} className="pt-2">
            <AnnouncementSection
              clubId={club._id}
              canManageClub={canManageClub}
              canEditDelete={canEditDelete}
            />
          </div>

          <div ref={discussionRef} className="pt-2">
            <ChatSection clubId={club._id} />
          </div>

          <div ref={taskRef} className="pt-2">
            <TaskSection
              clubId={club._id}
              canManageClub={canManageClub}
              canEditDelete={canEditDelete}
              clubMembers={club?.members || []}
            />
          </div>

          <div ref={eventRef} className="pt-2">
            <EventSection
              clubId={club._id}
              canManageClub={canManageClub}
              canEditDelete={canEditDelete}
            />
          </div>

          
          <div ref={resourceRef} className="pt-2">
            <ResourceSection 
              clubId={club._id} 
              canManageClub={canManageClub}
              canEditDelete={canEditDelete}
            />
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default SingleClub;