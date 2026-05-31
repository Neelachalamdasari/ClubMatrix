import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function Welcome() {
  return (
    <Layout showFooter={true}>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/40 via-transparent to-transparent pointer-events-none" />

        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-red-800/50 bg-red-950/30 text-red-300 text-sm font-medium">
            Student Organization Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-orange-400 bg-clip-text text-transparent">
              ClubMatrix
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-4">
            A Collaborative Ecosystem for Student Organizations
          </p>

          <p className="text-gray-400 max-w-xl mx-auto mb-10 text-sm sm:text-base leading-relaxed">
            Discover clubs, manage events, assign tasks, share resources, and
            collaborate in real time — all in one powerful platform built for
            campus communities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-900/30 hover:shadow-red-800/40 hover:scale-[1.02]"
            >
              Get Started — Sign Up Free
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-3 border border-red-800/60 hover:border-red-600 text-gray-200 hover:text-white font-semibold rounded-xl transition-all hover:bg-red-950/30"
            >
              Already a member? Login
            </Link>
          </div>
        </section>

        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🏛️",
                title: "Explore Clubs",
                desc: "Browse and join student organizations across campus.",
              },
              {
                icon: "📋",
                title: "Manage Tasks",
                desc: "Assign, track, and complete club tasks efficiently.",
              },
              {
                icon: "📅",
                title: "Plan Events",
                desc: "Schedule and promote upcoming club events.",
              },
              {
                icon: "🤖",
                title: "AI Assistant",
                desc: "Get smart help for club planning and collaboration.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-[#161010] border border-red-900/30 hover:border-red-700/50 transition-all hover:shadow-lg hover:shadow-red-950/20"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Welcome;
