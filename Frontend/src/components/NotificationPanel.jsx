import { useEffect, useState } from "react";
import socket from "../socket";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    socket.on("new_notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });
    return () => {
      socket.off("new_notification");
    };
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="bg-slate-800 px-4 py-2 rounded-lg flex items-center"
      >
        🔔
        {notifications.length > 0 && (
          <span className="ml-2 bg-red-500 px-2 rounded-full text-sm">
            {notifications.length}
          </span>
        )}
      </button>

      {showPanel && (
        <div className="absolute right-0 mt-3 w-[320px] bg-slate-800 rounded-xl p-4 shadow-xl z-50">
          <h2 className="text-lg font-bold mb-3">Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-gray-400">No notifications</p>
          ) : (
            <div className="flex flex-col gap-3">
              {notifications.map((item, index) => (
                <div key={index} className="bg-slate-700 p-3 rounded-lg">
                  {item.message}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;