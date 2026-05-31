import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllClubs, joinClub } from "../services/clubService";
import Layout from "../components/Layout";

function ClubPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClubs = async () => {
    try {
      const data = await getAllClubs();
      const filteredClubs = data.clubs.filter(
        (club) => !club.members.some((member) => member._id === user._id)
      );
      setClubs(filteredClubs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleJoinClub = async (clubId) => {
    try {
      await joinClub(clubId);
      alert("Club Joined Successfully");
      fetchClubs();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-50 mb-2">
          Explore Clubs
        </h1>
        <p className="text-gray-400 mb-8">
          Discover student organizations and join communities
        </p>

        {loading ? (
          <p className="text-gray-400">Loading Clubs...</p>
        ) : clubs.length === 0 ? (
          <div className="text-center py-16 bg-[#161010] border border-red-900/30 rounded-2xl">
            <p className="text-gray-400">No new clubs available to join.</p>
            <button
              onClick={() => navigate("/create-club")}
              className="mt-4 text-red-400 hover:text-red-300 text-sm"
            >
              Create your own club →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => (
              <div
                key={club._id}
                className="bg-[#161010] border border-red-900/30 p-6 rounded-2xl hover:border-red-700/40 transition-all"
              >
                <h2 className="text-xl font-bold text-red-100">
                  {club.clubName}
                </h2>
                <p className="mt-3 text-gray-400 text-sm line-clamp-3">
                  {club.description}
                </p>
                <p className="mt-3 text-sm text-gray-500">
                  Members: {club.members.length}
                </p>
                <button
                  onClick={() => handleJoinClub(club._id)}
                  className="mt-5 bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
                >
                  Join Club
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ClubPage;
