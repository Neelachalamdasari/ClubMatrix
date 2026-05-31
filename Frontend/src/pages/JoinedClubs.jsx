import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJoinedClubs } from "../services/clubService";
import Layout from "../components/Layout";

function JoinedClubs() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const data = await getJoinedClubs();
        setClubs(data.clubs);
      } catch (error) {
        console.error("Failed to fetch joined clubs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClubs();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-50 mb-8">
          Your Joined Clubs
        </h1>

        {loading ? (
          <p className="text-gray-400">Loading your clubs...</p>
        ) : clubs.length === 0 ? (
          <div className="text-center py-16 bg-[#161010] border border-red-900/30 rounded-2xl">
            <p className="text-gray-400">You have not joined any clubs yet.</p>
            <button
              onClick={() => navigate("/clubs")}
              className="mt-4 bg-red-700 hover:bg-red-600 px-5 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Explore Clubs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => (
              <div
                key={club._id}
                onClick={() => navigate(`/clubs/${club._id}`)}
                className="bg-[#161010] border border-red-900/30 p-6 rounded-2xl cursor-pointer hover:border-red-600/50 hover:shadow-lg hover:shadow-red-950/20 transition-all"
              >
                <h2 className="text-xl font-bold text-red-100 hover:text-red-300">
                  {club.clubName}
                </h2>
                <p className="mt-3 text-gray-400 text-sm line-clamp-2">
                  {club.description}
                </p>
                <p className="mt-3 text-sm text-gray-500">
                  Members: {club.members?.length || 0}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default JoinedClubs;
