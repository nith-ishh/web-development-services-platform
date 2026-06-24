import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  FolderKanban,
  Users,
  Clock,
  CheckCircle,
  FileText,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [totalProjects, setTotalProjects] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeClients, setActiveClients] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  

useEffect(() => {
  fetch(
  "http://127.0.0.1:5000/api/unread-count/nithish@gmail.com"
)
  .then((response) => response.json())
  .then((data) => {
    setUnreadCount(data.count);
  });

  fetch("http://127.0.0.1:5000/api/projects")
    .then((response) => response.json())
    .then((data) => {
      setTotalProjects(data.projects.length);
    });

  fetch("http://127.0.0.1:5000/api/users")
    .then((response) => response.json())
    .then((data) => {
      setActiveClients(data.users.length);
    });
    const email = localStorage.getItem("userEmail");

fetch(
  `http://127.0.0.1:5000/api/notifications/${email}`
)
  .then((response) => response.json())
  .then((data) => {
    setNotificationCount(data.notifications.length);
  });

}, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <div className="flex justify-between items-center mb-10">

  <div>
    <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
      Welcome Back
    </h1>
  </div>

  <div className="flex items-center gap-4">

    <Link to="/notifications">

  <button className="relative p-3 rounded-full bg-white/10 hover:bg-white/20 transition">

    🔔

    {notificationCount > 0 && (

      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">

        {notificationCount}

      </span>

    )}

  </button>

</Link>

    <button
      onClick={handleLogout}
      className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:scale-105 transition"
    >
      Logout
    </button>
    <div className="relative">

  <button className="text-3xl">
    🔔
  </button>

  {unreadCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white px-2 rounded-full text-xs">
      {unreadCount}
    </span>
  )}

</div>

  </div>

</div>

      {/* Statistics Cards */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white/5 border border-gray-700 rounded-3xl p-6 hover:scale-105 transition">
          <FolderKanban
            className="text-cyan-400 mb-4"
            size={35}
          />
          <h2 className="text-4xl font-bold">
          {totalProjects}
          </h2>
          <p className="text-gray-400">
            Total Projects
          </p>
        </div>

        <div className="bg-white/5 border border-gray-700 rounded-3xl p-6 hover:scale-105 transition">
          <Users
            className="text-green-400 mb-4"
            size={35}
          />
          <h2 className="text-4xl font-bold">
          {activeClients}
          </h2>
          <p className="text-gray-400">
            Active Clients
          </p>
        </div>

        <div className="bg-white/5 border border-gray-700 rounded-3xl p-6 hover:scale-105 transition">
          <Clock
            className="text-yellow-400 mb-4"
            size={35}
          />
          <h2 className="text-4xl font-bold">4</h2>
          <p className="text-gray-400">
            Pending Requests
          </p>
        </div>

        <div className="bg-white/5 border border-gray-700 rounded-3xl p-6 hover:scale-105 transition">
          <CheckCircle
            className="text-purple-400 mb-4"
            size={35}
          />
          <h2 className="text-4xl font-bold">20</h2>
          <p className="text-gray-400">
            Completed Projects
          </p>
        </div>

      </div>

      {/* Quick Actions */}

<div className="mt-12">

  <h2 className="text-2xl font-bold mb-6">
    Quick Actions
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

    <Link to="/estimator">
      <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 p-5 rounded-2xl hover:scale-105 transition">
        New Estimate
      </button>
    </Link>

    <Link to="/request">
      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 p-5 rounded-2xl hover:scale-105 transition">
        Client Requests
      </button>
    </Link>

    <Link to="/portfolio-manager">
      <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 p-5 rounded-2xl hover:scale-105 transition">
        Portfolio
      </button>
    </Link>

    <Link to="/my-projects">
    <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 p-5 rounded-2xl hover:scale-105 transition">
    My Projects
    </button>
    </Link>

    <Link to="/profile">
      <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 p-5 rounded-2xl hover:scale-105 transition">
        Profile
      </button>
    </Link>

    <Link to="/admin-dashboard">
      <button className="w-full bg-gradient-to-r from-red-500 to-orange-600 p-5 rounded-2xl hover:scale-105 transition">
        Admin Dashboard
      </button>
    </Link>

    <Link to="/test-api">
      <button className="w-full bg-gradient-to-r from-indigo-500 to-cyan-600 p-5 rounded-2xl hover:scale-105 transition">
        Test API
      </button>
    </Link>

    <Link to="/analytics">
  <button className="w-full bg-gradient-to-r from-indigo-500 to-cyan-600 p-5 rounded-2xl hover:scale-105 transition">
    Analytics Dashboard
  </button>
</Link>

<Link to="/ai-proposal">
  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 p-5 rounded-2xl hover:scale-105 transition">
    🤖 AI Proposal Generator
  </button>
</Link>

<Link to="/chat">
  <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 p-5 rounded-2xl hover:scale-105 transition">
    💬 Chat Support
  </button>
</Link>

<button
  onClick={() => navigate("/meeting")}
  className="px-4 py-2 rounded-xl bg-green-600"
>
  📅 Book Meeting
</button>

<button
  onClick={() => navigate("/my-meetings")}
  className="px-4 py-2 rounded-xl bg-blue-600"
>
  📅 My Meetings
</button>

<button
  onClick={() => navigate("/deliverables")}
  className="px-4 py-2 rounded-xl"
>
  📁 Deliverables
</button>

<button
  onClick={() => navigate("/review")}
>
  ⭐ Feedback
</button>

<button
  onClick={() => navigate("/my-payments")}
  className="px-4 py-2 rounded-xl bg-green-600"
>
  💰 My Payments
</button>

<Link to="/place-bid">
  <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 p-5 rounded-2xl hover:scale-105 transition">
    💼 Freelancer Bidding
  </button>
</Link>

<div
  onClick={() => navigate("/my-bids")}
  className="
    cursor-pointer
    bg-white/[0.04]
    border border-white/10
    rounded-3xl
    p-6
    hover:border-purple-500/40
    hover:bg-purple-500/5
    transition-all
    duration-300
  "
>
  <div className="flex items-center gap-4">

    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
      <FileText className="text-purple-400" size={28} />
    </div>

    <div>
      <h3 className="text-lg font-bold text-white">
        My Bids
      </h3>

      <p className="text-gray-400 text-sm">
        Track your submitted bids
      </p>
    </div>

  </div>
</div>



  </div>

</div>

<Link to="/view-bids">
  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 p-5 rounded-2xl">
    📋 View Bids
  </button>
</Link>


      {/* Recent Activity */}

      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-6">
          Recent Activity
        </h2>

        <div className="bg-white/5 border border-gray-700 rounded-3xl p-6">

          <ul className="space-y-4 text-gray-300">

            <li>
              ✔ New client requested an E-commerce website.
            </li>

            <li>
              ✔ Portfolio updated successfully.
            </li>

            <li>
              ✔ New quotation generated.
            </li>

            <li>
              ✔ AI estimator completed a project analysis.
            </li>

          </ul>

        </div>

      </div>

    </div>
  );
}