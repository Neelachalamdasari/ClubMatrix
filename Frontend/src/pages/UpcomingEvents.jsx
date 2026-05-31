import { useEffect, useState } from "react";
import { getUpcomingEvents } from "../services/eventService";
import Layout from "../components/Layout";

function UpcomingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getUpcomingEvents();
        setEvents(data.events);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-50 mb-8">
          Upcoming Events
        </h1>

        {events.length === 0 ? (
          <div className="text-center py-16 bg-[#161010] border border-red-900/30 rounded-2xl">
            <p className="text-gray-400">No upcoming events scheduled.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-[#161010] border border-red-900/30 p-5 sm:p-6 rounded-2xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="text-center min-w-[60px] bg-red-950/40 border border-red-800/30 rounded-xl p-3">
                    <p className="text-red-400 text-xs font-semibold uppercase">
                      {new Date(event.date).toLocaleDateString(undefined, { month: "short" })}
                    </p>
                    <p className="text-2xl font-bold text-red-100">
                      {new Date(event.date).getDate()}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-red-100">
                      {event.title}
                    </h2>
                    <p className="mt-2 text-gray-400 text-sm">
                      {event.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                      <span>Club: {event.club?.clubName}</span>
                      <span>Venue: {event.venue}</span>
                      <span>
                        {new Date(event.date).toLocaleString(undefined, {
                          weekday: "short",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default UpcomingEvents;
