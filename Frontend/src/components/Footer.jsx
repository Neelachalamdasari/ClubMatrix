import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-black border-t border-red-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent mb-2">
              ClubMatrix
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              A Collaborative Ecosystem for Student Organizations — connect,
              collaborate, and grow your campus communities.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-3 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/dashboard" className="hover:text-red-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/clubs" className="hover:text-red-400 transition-colors">
                  Explore Clubs
                </Link>
              </li>
              <li>
                <Link to="/joined-clubs" className="hover:text-red-400 transition-colors">
                  Joined Clubs
                </Link>
              </li>
              <li>
                <Link to="/create-club" className="hover:text-red-400 transition-colors">
                  Create Club
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-3 uppercase tracking-wider">
              Connect
            </h4>
            <p className="text-sm text-gray-400">
              Built for student leaders, club coordinators, and campus innovators.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              © {year} ClubMatrix. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
