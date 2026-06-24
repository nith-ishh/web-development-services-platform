  import { Link } from "react-router-dom";
  export default function ClientDashboard() {
    return (
      <div className="min-h-screen bg-black text-white p-8">

        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          Client Dashboard
        </h1>

        <p className="text-gray-400 mt-3">
          Welcome back! Manage your projects here.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <div className="bg-white/5 border border-gray-700 rounded-3xl p-6">
            <h2 className="text-3xl font-bold">3</h2>
            <p className="text-gray-400">My Projects</p>
          </div>

          <div className="bg-white/5 border border-gray-700 rounded-3xl p-6">
            <h2 className="text-3xl font-bold">1</h2>
            <p className="text-gray-400">Pending Review</p>
          </div>

          <div className="bg-white/5 border border-gray-700 rounded-3xl p-6">
            <h2 className="text-3xl font-bold">2</h2>
            <p className="text-gray-400">Completed</p>
          </div>

          <div className="bg-white/5 border border-gray-700 rounded-3xl p-6">
            <h2 className="text-3xl font-bold">5</h2>
            <p className="text-gray-400">Notifications</p>
          </div>

        </div>

        <div className="mt-12">

          <h2 className="text-2xl font-bold mb-5">
            Quick Access
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <button className="p-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition">
              View Project Tracking
            </button>

            <button className="p-5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 hover:scale-105 transition">
              Request New Project
            </button>

            <button className="p-5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition">
              Get New Estimate
            </button>
            

  
            

            <button className="p-5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:scale-105 transition">
              My Profile
            </button>

          </div>

        </div>

      </div>
    );
  }