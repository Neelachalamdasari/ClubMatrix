import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { getNotifications, markAsRead } from "../services/notificationService";
import Layout from "../components/Layout";

function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    socket.on("new_notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n) => !n.read);
    if (unread.length === 0) return;

    try {
      await Promise.all(unread.map((n) => markAsRead(n._id)));
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const getNotificationDetails = (message) => {
    const lower = message.toLowerCase();
    if (lower.includes("task")) {
      return { icon: "📋", bgClass: "bg-red-500/10 border-red-500/30 text-red-400", label: "Task" };
    }
    if (lower.includes("event")) {
      return { icon: "📅", bgClass: "bg-orange-500/10 border-orange-500/30 text-orange-400", label: "Event" };
    }
    if (lower.includes("announcement")) {
      return { icon: "📢", bgClass: "bg-amber-500/10 border-amber-500/30 text-amber-400", label: "Announcement" };
    }
    return { icon: "🔔", bgClass: "bg-gray-500/10 border-gray-500/30 text-gray-400", label: "General" };
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "Just now";
    return new Date(dateStr).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#161010] hover:bg-[#1f1515] border border-red-900/30 transition-all"
              title="Back to Dashboard"
            >
              ←
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-red-50">
                Notifications
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Stay updated with your club activities
              </p>
            </div>
          </div>

          <button
            onClick={handleMarkAllRead}
            disabled={!hasUnread}
            className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
              hasUnread
                ? "bg-red-700 hover:bg-red-600 text-white border-red-600/30"
                : "bg-[#161010] text-gray-500 border-red-900/20 cursor-not-allowed"
            }`}
          >
            Mark All as Read
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-[#161010] border border-red-900/30 rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-200 mb-1">All caught up!</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              You have no notifications. Any new updates from your clubs will show up here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {notifications.map((item) => {
              const details = getNotificationDetails(item.message);
              return (
                <div
                  key={item._id}
                  onClick={() => !item.read && handleMarkRead(item._id)}
                  className={`flex items-start gap-4 p-5 rounded-2xl border transition-all ${
                    item.read
                      ? "bg-[#0d0808] border-red-950/30 text-gray-400 opacity-75"
                      : "bg-[#161010] hover:bg-[#1f1515] border-red-900/40 text-white cursor-pointer hover:border-red-700/50"
                  }`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl border text-xl flex-shrink-0 ${details.bgClass}`}>
                    {details.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold tracking-wider uppercase opacity-80">
                        {details.label}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTime(item.createdAt)}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${!item.read ? "text-gray-200" : "text-gray-400"}`}>
                      {item.message}
                    </p>
                  </div>

                  {!item.read && (
                    <div className="flex-shrink-0 self-center">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Notifications;
