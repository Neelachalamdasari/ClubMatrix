import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUpcomingEvents } from "../services/eventService";
import { getMyTasks } from "../services/taskService";
import { useEffect, useState, useCallback } from "react";
import Layout from "../components/Layout";
import socket from "../socket";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  

  const fetchLiveData = useCallback(async () => {
    try {
      const [eventsData, tasksData] = await Promise.all([
        getUpcomingEvents(),
        getMyTasks()
      ]);

      setUpcomingEvents(eventsData.events.slice(0, 3));
      setTaskCount(tasksData.tasks?.length || 0);
      
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchLiveData();

    const dataInterval = setInterval(fetchLiveData, 30000);
    

    const handleNotification = () => {
      fetchLiveData();
    };

    socket.on("new_notification", handleNotification);

    return () => {
      clearInterval(dataInterval);
      socket.off("new_notification", handleNotification);
    };
  }, [fetchLiveData]);

  const joinedCount = user?.joinedClubs?.length || 0;

  const statCards = [
    {
      title: "Joined Clubs",
      value: joinedCount,
      desc: "Active memberships",
      icon: "🏛️",
      path: "/joined-clubs",
      accent: "from-red-600/20 to-red-900/10 border-red-800/40"
    },
    {
      title: "Upcoming Events",
      value: upcomingEvents.length,
      desc: "Events on your calendar",
      icon: "📅",
      path: "/upcoming-events",
      accent: "from-orange-600/20 to-red-900/10 border-orange-800/40"
    },
    {
      title: "Assigned Tasks",
      value: taskCount,
      desc: "Tasks awaiting action",
      icon: "📋",
      path: "/my-tasks",
      accent: "from-rose-600/20 to-red-900/10 border-rose-800/40"
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a0a0a] via-[#161010] to-[#0d0808] border border-red-900/40 p-6 sm:p-8 mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-red-400 text-sm font-medium uppercase tracking-wider mb-1">
                Live Dashboard
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-red-50">
                Welcome back, {user?.name?.split(" ")[0] || "Member"}
              </h1>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                Your collaborative hub for student organizations
              </p>
            </div>
            <div className="text-left sm:text-right">
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-900/20 border border-green-800/30">
    <span className="w-2 h-2 rounded-full bg-green-500"></span>
    <span className="text-green-300 text-sm font-medium">
      Activity Overview
    </span>
  </div>
</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {statCards.map((card) => (
            <div
              key={card.title}
              onClick={() => navigate(card.path)}
              className={`cursor-pointer group bg-gradient-to-br ${card.accent} border rounded-2xl p-5 sm:p-6 hover:scale-[1.02] transition-all duration-200 hover:shadow-lg hover:shadow-red-950/30`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{card.title}</p>
                  <p className="text-4xl font-bold text-red-50 mt-1">
                    {card.value}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">{card.desc}</p>
                </div>
                <span className="text-3xl opacity-70 group-hover:scale-110 transition-transform">
                  {card.icon}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Events Preview + Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#161010] border border-red-900/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-red-100">
                Upcoming Events
              </h2>
              <button
                onClick={() => navigate("/upcoming-events")}
                className="text-sm text-red-400 hover:text-red-300"
              >
                View all →
              </button>
            </div>

            {upcomingEvents.length === 0 ? (
              <p className="text-gray-500 text-sm py-6 text-center">
                No upcoming events — explore your clubs!
              </p>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event._id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-[#1f1515] border border-red-900/20"
                  >
                    <div className="text-center min-w-[48px]">
                      <p className="text-red-400 text-xs font-semibold uppercase">
                        {new Date(event.date).toLocaleDateString(undefined, { month: "short" })}
                      </p>
                      <p className="text-xl font-bold text-red-100">
                        {new Date(event.date).getDate()}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-100">{event.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {event.club?.clubName || "Club Event"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div
              onClick={() => navigate("/clubs")}
              className="bg-[#161010] border border-red-900/30 rounded-2xl p-6 cursor-pointer hover:border-red-700/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">🔍</span>
                <div>
                  <h3 className="text-xl font-semibold text-red-100 group-hover:text-red-300 transition-colors">
                    Explore Clubs
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Discover and join new student organizations
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => navigate("/create-club")}
              className="bg-gradient-to-r from-red-900/40 to-red-950/40 border border-red-700/40 rounded-2xl p-6 cursor-pointer hover:border-red-500/50 transition-all group"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">✨</span>
                <div>
                  <h3 className="text-xl font-semibold text-red-100 group-hover:text-red-300 transition-colors">
                    Create a Club
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Start your own student community today
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
