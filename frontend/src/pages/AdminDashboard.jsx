import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  Users,
  FolderKanban,
  FileText,
  DollarSign,
} from "lucide-react";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [pendingProjects, setPendingProjects] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);

useEffect(() => {

  fetch("https://web-development-services-platform.onrender.com/api/analytics")
    .then((response) => response.json())
    .then((data) => {

      setTotalUsers(data.total_users);

      setTotalProjects(data.total_projects);

      setPendingProjects(
        data.pending_projects
      );

      setCompletedProjects(
        data.completed_projects
      );

    });

}, []);
  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
        Admin Dashboard
      </h1>

      <p className="text-gray-400 mt-3">
        Manage clients, projects and business operations.
      </p>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

        <div className="bg-white/5 p-6 rounded-3xl border border-gray-700">
          <Users size={35} className="text-cyan-400 mb-3"/>
          <h2 className="text-4xl font-bold">
          {totalUsers}
          </h2>
          <p className="text-gray-400">Total Clients</p>
        </div>

        <div className="bg-white/5 p-6 rounded-3xl border border-gray-700">
          <FolderKanban size={35} className="text-green-400 mb-3"/>
          <h2 className="text-4xl font-bold">
          {totalProjects} 
          </h2>
          <p className="text-gray-400">Active Projects</p>
        </div>

        <div className="bg-white/5 p-6 rounded-3xl border border-gray-700">
          <FileText size={35} className="text-yellow-400 mb-3"/>
          <h2 className="text-4xl font-bold">
          {pendingProjects}
          </h2>

          <p className="text-gray-400">
          Pending Requests
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-3xl border border-gray-700">
          <DollarSign size={35} className="text-purple-400 mb-3"/>
          <h2 className="text-4xl font-bold">
          {completedProjects}
          </h2>

          <p className="text-gray-400">
          Completed Projects
          </p>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-5">
          Admin Actions
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

          <Link to="/my-projects">
  <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 p-5 rounded-2xl hover:scale-105 transition">
    📁 My Projects
  </button>
</Link>

          <Link to="/admin-users">

          <button className="p-5 rounded-2xl bg-cyan-600 hover:scale-105 transition w-full">

          Manage Clients

          </button>

          </Link>

          <button className="p-5 rounded-2xl bg-purple-600 hover:scale-105 transition">
            Manage Portfolio
          </button>

<Link to="/admin-projects">

  <button className="p-5 rounded-2xl bg-green-600 hover:scale-105 transition w-full">
    Project Requests
  </button>

</Link>

<Link to="/admin-chat">

  <button className="p-5 rounded-2xl bg-pink-600 hover:scale-105 transition w-full">
    💬 Client Chat
  </button>

</Link>

<Link to="/admin-deliverables">

  <button className="p-5 rounded-2xl bg-blue-600 hover:scale-105 transition w-full">
    📁 Deliverables
  </button>

</Link>

<Link to="/admin-reviews">

  <button className="p-5 rounded-2xl bg-yellow-600 hover:scale-105 transition w-full">
    ⭐ Reviews
  </button>

</Link>

          <Link to="/admin-meetings">

  <button className="p-5 rounded-2xl bg-orange-600 hover:scale-105 transition w-full">

    📅 Meeting Requests

  </button>

</Link>

<Link to="/admin-payments">

  <button className="p-5 rounded-2xl bg-emerald-600 hover:scale-105 transition w-full">

    💰 Payments

  </button>

</Link>

<Link to="/ai-proposal">

  <button className="p-5 rounded-2xl bg-cyan-600 hover:scale-105 transition w-full">

    🤖 AI Proposal

  </button>

</Link>



        </div>

      </div>

      {/* Recent Activities */}

      <div className="mt-12 bg-white/5 border border-gray-700 rounded-3xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          Recent Activities
        </h2>

        <ul className="space-y-3 text-gray-300">
          <li>✔ New client registration</li>
          <li>✔ New website estimate generated</li>
          <li>✔ Project status updated</li>
          <li>✔ Portfolio project added</li>
        </ul>

      </div>

    </div>
  );
}