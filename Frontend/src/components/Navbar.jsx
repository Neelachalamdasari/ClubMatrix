import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

function Navbar() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-red-900/40 shadow-lg shadow-red-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to={token ? "/dashboard" : "/"}
            className="flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0"
          >
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent truncate">
              ClubMatrix
            </span>
            <span className="hidden md:inline text-xs text-gray-400 truncate">
              {/* A Collaborative Ecosystem for Student Organizations */}
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to={token ? "/dashboard" : "/"}
              className="px-3 py-1.5 text-sm font-medium text-gray-200 hover:text-red-400 transition-colors rounded-lg hover:bg-red-950/30"
            >
              Home
            </Link>

            {token ? (
              <>
                <NotificationBell />
                {user?.name && (
                  <span className="hidden sm:inline text-sm text-gray-400 truncate max-w-[120px]">
                    {user.name}
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm font-medium bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-sm font-medium text-gray-200 hover:text-red-400 transition-colors rounded-lg hover:bg-red-950/30"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-sm font-medium bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
