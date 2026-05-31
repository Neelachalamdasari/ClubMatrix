import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { getNotifications } from "../services/notificationService";

function NotificationBell() {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const data = await getNotifications();
        const unread = (data.notifications || []).filter((n) => !n.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchUnreadCount();

    socket.on("new_notification", () => {
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);

  return (
    <button
      onClick={() => navigate("/notifications")}
      className="
        bg-[#161010]
        hover:bg-[#1f1515]
        border border-red-900/30
        transition-all
        px-3
        py-1.5
        rounded-lg
        flex
        items-center
        relative
        cursor-pointer
      "
    >
      🔔
      {unreadCount > 0 && (
        <span
          className="
            absolute
            -top-1
            -right-1
            bg-red-500
            text-white
            px-2
            py-0.5
            rounded-full
            text-xs
            font-bold
            shadow-lg
          "
        >
          {unreadCount}
        </span>
      )}
    </button>
  );
}

export default NotificationBell;