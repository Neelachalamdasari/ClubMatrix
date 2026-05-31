import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClub } from "../services/clubService";
import Layout from "../components/Layout";

function CreateClub() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clubName: "",
    description: "",
    category: ""
  });

  const [clubImage, setClubImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = new FormData();
      data.append("clubName", formData.clubName);
      data.append("description", formData.description);
      data.append("category", formData.category);
      
      if (clubImage) {
        data.append("clubImage", clubImage);
      }

      await createClub(data);
      
      alert("Club Created Successfully");
      navigate("/clubs");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Club creation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-[#070404] px-4 py-10 text-white!">
        <form
          onSubmit={handleSubmit}
          className="bg-[#120a0a]! border border-red-900/40 p-8 rounded-2xl w-full max-w-[450px] shadow-xl shadow-black/40 flex flex-col gap-5"
        >
          <div>
            <h1 className="text-3xl font-bold text-red-50">Create Club</h1>
            <p className="text-xs text-gray-500 mt-1">Register a brand new student community workspace</p>
          </div>

          {error && (
            <div className="p-3 bg-red-950/30 border border-red-900/40 rounded-xl text-red-400 text-xs font-medium">
              ⚠️ {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="clubName"
              placeholder="Club Name"
              value={formData.clubName}
              className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/40 text-white! placeholder-gray-500! outline-none focus:border-red-700/80 text-sm"
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              rows={4}
              className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/40 text-white! placeholder-gray-500! outline-none focus:border-red-700/80 text-sm resize-none"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category (e.g. Tech, Arts, Sports)"
              value={formData.category}
              className="w-full p-3 rounded-xl bg-[#1e1414]! border border-red-900/40 text-white! placeholder-gray-500! outline-none focus:border-red-700/80 text-sm"
              onChange={handleChange}
            />

            <div className="flex flex-col gap-1 border border-dashed border-red-950/60 p-3 rounded-xl bg-[#0a0505]">
              <label className="text-xs text-gray-500 font-semibold ml-1 mb-1">Club Cover Image Banner</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setClubImage(e.target.files[0])}
                className="text-xs text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-red-950/40 file:text-red-300 hover:file:bg-red-900/40 file:cursor-pointer cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-red-900/80 hover:bg-red-800 border border-red-700/50 text-red-100 font-bold p-3 rounded-xl transition-all text-sm shadow-md mt-2 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Club"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default CreateClub;