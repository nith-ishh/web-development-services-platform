import { useEffect, useState } from "react";

export default function MyProjects() {

  const [projects, setProjects] = useState([]);
  const [animate, setAnimate] = useState(false);
  const updateProgress = async (projectId, progress) => {

  await fetch(
    `https://web-development-services-platform.onrender.com/api/update-progress/${projectId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progress,
      }),
    }
  );

  alert("Progress Updated");

window.location.reload();

};

 useEffect(() => {

  const email = localStorage.getItem("userEmail");

  setAnimate(false);

  fetch(
  `https://web-development-services-platform.onrender.com/api/assigned-projects/${email}`
)
    .then((response) => response.json())
    .then((data) => {

      setProjects(data.projects);

      setTimeout(() => {
        setAnimate(true);
      }, 500);

    });

}, []);




  return (

    <div className="min-h-screen bg-black text-white p-8">
      

      <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-10">
        My Projects
      </h1>

      <div className="space-y-6">

        {projects.map((project) => (

          <div
  key={project[0]}
  className="max-w-6xl mx-auto bg-gray-900 border border-cyan-500 rounded-3xl p-8 shadow-2xl"
>

            <h2 className="text-3xl font-bold text-cyan-400">
  {project[1]}
</h2>

            <p className="mt-3">
  Budget : ₹{project[2]}
</p>

            <p className="mt-3">
  Description : {project[3]}
</p>

            <div className="mt-4">

<span className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600">

Status : {project[4]}

</span>

</div>

<div className="mt-4 flex gap-3">

  <button
    onClick={() => updateProgress(project[0], 20)}
    className="bg-blue-600 px-3 py-2 rounded"
  >
    20%
  </button>

  <button
    onClick={() => updateProgress(project[0], 40)}
    className="bg-blue-600 px-3 py-2 rounded"
  >
    40%
  </button>

  <button
    onClick={() => updateProgress(project[0], 60)}
    className="bg-blue-600 px-3 py-2 rounded"
  >
    60%
  </button>

  <button
    onClick={() => updateProgress(project[0], 80)}
    className="bg-blue-600 px-3 py-2 rounded"
  >
    80%
  </button>

  <button
    onClick={() => updateProgress(project[0], 100)}
    className="bg-green-600 px-3 py-2 rounded"
  >
    100%
  </button>

</div>
            <div className="mt-4">

  <p className="mb-2 font-bold">
    Project Progress
  </p>

  <div className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full h-6">

    <div
      className="bg-gradient-to-r from-cyan-500 to-purple-600 h-6 rounded-full text-center text-white transition-all duration-[2000ms] ease-in-out"
      style={{
  width: "20%"
}}
    >
      20%
    </div>

  </div>

</div>
<div className="mt-6 bg-black/40 border border-purple-500 rounded-2xl p-4">

  <h2 className="text-xl font-bold text-cyan-400">
    Current Stage
  </h2>

  <p className="text-2xl mt-2">
    {project[4]}
  </p>

</div>
<div className="mt-8">

<h2 className="text-2xl font-bold mb-8">
Project Timeline
</h2>

<div className="relative flex justify-between items-center py-6">
{/* Background Line */}

<div className="absolute top-5 left-10 right-10 h-1 bg-gray-700 rounded-full"></div>

{/* Progress Line */}

<div
  key={project[0] + "-" + animate}
  className="absolute top-5 left-10 h-1 bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 rounded-full transition-all duration-[2500ms] ease-in-out"
  style={{
    width: animate
      ? (
          project[5] >= 100
            ? "94%"
            : project[5] >= 80
            ? "70%"
            : project[5] >= 60
            ? "47%"
            : project[5] >= 40
            ? "24%"
            : project[5] >= 20
            ? "2%"
            : "0%"
        )
      : "0%"
  }}
></div>

{/* Requirement */}

<div className="relative z-10 flex flex-col items-center">

<div className={`w-10 h-10 rounded-full flex items-center justify-center
${project[5] >= 20 ? "bg-green-500" : "bg-gray-700"}`}>

✓

</div>

<p className="mt-3 text-sm">
Requirement
</p>

</div>

{/* UI */}

<div className="relative z-10 flex flex-col items-center">

<div className={`w-10 h-10 rounded-full flex items-center justify-center
${project[5] >= 40 ? "bg-green-500" : "bg-gray-700"}`}>

✓

</div>

<p className="mt-3 text-sm">
UI Design
</p>

</div>

{/* Development */}

<div className="relative z-10 flex flex-col items-center">

<div className={`w-10 h-10 rounded-full flex items-center justify-center
${project[5] >= 100
 ? "bg-green-500"
 : project[5] >= 60
 ? "bg-yellow-500"
 : "bg-gray-700"}`}>

🛠

</div>

<p className="mt-3 text-sm">
Development
</p>

</div>

{/* Testing */}

<div className="relative z-10 flex flex-col items-center">

<div className={`w-10 h-10 rounded-full flex items-center justify-center
${project[5] >= 100
 ? "bg-green-500"
 : project[5] >= 80
 ? "bg-cyan-500"
 : "bg-gray-700"}`}>

🧪

</div>

<p className="mt-3 text-sm">
Testing
</p>

</div>

{/* Completed */}

<div className="relative z-10 flex flex-col items-center">

<div className={`w-10 h-10 rounded-full flex items-center justify-center
${project[5] >= 100 ? "bg-green-500" : "bg-gray-700"}`}>

✓

</div>

<p className="mt-3 text-sm">
Completed
</p>

</div>

</div>

</div>

          </div>

        ))}

      </div>

    </div>

  );

}