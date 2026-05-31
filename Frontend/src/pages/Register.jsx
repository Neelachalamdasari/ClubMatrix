import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      const data = await registerUser(formData);
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4">
        <div className="bg-[#161010] border border-red-900/30 p-8 rounded-2xl w-full max-w-[400px] shadow-xl shadow-red-950/20">
          <h1 className="text-3xl font-bold mb-2 text-red-50">
            Join ClubMatrix
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            Create your account to get started
          </p>

          {error && (
            <p className="text-red-400 mb-4 text-sm">{error}</p>
          )}

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="p-3 rounded-lg bg-gray-200 text-gray-900 placeholder:text-gray-500"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 rounded-lg bg-gray-200 text-gray-900 placeholder:text-gray-500"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-3 rounded-lg bg-gray-200 text-gray-900 placeholder:text-gray-500"
              onChange={handleChange}
              required
            />

            <button
              className="bg-red-700 hover:bg-red-600 p-3 rounded-lg text-white font-medium transition-colors"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-gray-400 mt-4 text-sm">
            Already have an account?
            <Link
              to="/login"
              className="text-red-400 hover:text-red-300 ml-2"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
