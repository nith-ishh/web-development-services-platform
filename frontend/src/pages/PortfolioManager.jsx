import { useState } from "react";

export default function PortfolioManager() {
  const [projects] = useState([
    {
      title: "E-Commerce Website",
      tech: "React + Flask",
    },
    {
      title: "Hospital Management",
      tech: "React + MySQL",
    },
    {
      title: "AI Traffic Monitoring",
      tech: "Python + OpenCV",
    },
  ]);

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
          Portfolio Manager
        </h1>

        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition">
          Add Project
        </button>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {projects.map((project, index) => (

          <div
            key={index}
            className="bg-white/5 border border-gray-700 rounded-3xl p-6 hover:scale-105 transition"
          >

            <h2 className="text-2xl font-bold">
              {project.title}
            </h2>

            <p className="text-gray-400 mt-3">
              {project.tech}
            </p>

            <div className="flex gap-3 mt-6">

              <button className="flex-1 py-2 rounded-lg bg-green-600">
                Edit
              </button>

              <button className="flex-1 py-2 rounded-lg bg-red-600">
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}