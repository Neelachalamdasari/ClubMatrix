import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleClub } from "../services/clubService";
import Layout from "../components/Layout";

function MembersPage() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [clubName, setClubName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getSingleClub(clubId);
        setMembers(data.club.members);
        setClubName(data.club.clubName);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [clubId]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(`/clubs/${clubId}`)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#161010] hover:bg-[#1f1515] border border-red-900/30 transition-all"
          >
            ←
          </button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-red-50">
              Club Members
            </h1>
            {clubName && (
              <p className="text-gray-400 text-sm mt-1">{clubName}</p>
            )}
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading Members...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div
                key={member._id}
                className="bg-[#161010] border border-red-900/30 p-5 rounded-xl"
              >
                <h2 className="text-xl font-bold text-red-100">
                  {member.name}
                </h2>
                <p className="text-gray-400 mt-2 text-sm">
                  {member.email}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MembersPage;
