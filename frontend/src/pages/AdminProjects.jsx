import { useEffect, useState } from "react";

export default function AdminProjects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    fetch("https://web-development-services-platform.onrender.com/api/projects")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.projects);
      });

  }, []);

  const updateStatus = async (id) => {

  const response = await fetch(
    `https://web-development-services-platform.onrender.com/api/update-status/${id}`,
    {
      method: "PUT",
    }
  );

  const updateStage = async (id, stage, email) => {

  await fetch(
    `https://web-development-services-platform.onrender.com/api/update-stage/${id}/${stage}`
  );

  await fetch(
    "https://web-development-services-platform.onrender.com/api/add-notification",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        message: `Your project has moved to ${stage} stage.`,
      }),
    }
  );

  window.location.reload();

};




  const data = await response.json();

  alert(data.message);

  window.location.reload();

};

const updateStage = async (id, stage) => {

  await fetch(
    `https://web-development-services-platform.onrender.com/api/update-stage/${id}/${stage}`
  );

  window.location.reload();

};

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-10">
        Project Requests
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-700">

          <thead>

            <tr className="bg-cyan-700">

              <th className="p-4">ID</th>
              <th className="p-4">Client</th>
              <th className="p-4">Email</th>
              <th className="p-4">Project Type</th>
              <th className="p-4">Budget</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
              <th className="p-4">File</th>

            </tr>

          </thead>

          <tbody>

            {projects.map((project) => (

              <tr
                key={project[0]}
                className="border border-gray-700 text-center"
              >

                <td className="p-4">{project[0]}</td>
                <td className="p-4">{project[1]}</td>
                <td className="p-4">{project[2]}</td>
                <td className="p-4">{project[3]}</td>
                <td className="p-4">{project[4]}</td>
                <td className="p-4">{project[5]}</td>
                <td className="p-4">
                    {project[6]}
                    </td>

                    <td className="p-4">

<div className="flex flex-col gap-2">

<button
onClick={() =>
updateStage(
project[0],
"requirement",
project[2]
)}
className="bg-green-600 px-3 py-1 rounded-lg"
>
Requirement
</button>

<button
onClick={() =>
updateStage(
project[0],
"ui",
project[2]
)}
className="bg-blue-600 px-3 py-1 rounded-lg"
>
UI Design
</button>

<button
onClick={() =>
updateStage(
project[0],
"Development",
project[2]
)}
>
Development
</button>

<button
onClick={() =>
updateStage(
project[0],
"testing",
project[2]
)}
className="bg-cyan-600 px-3 py-1 rounded-lg"
>
Testing
</button>

<button
onClick={() =>
updateStage(
project[0],
"completed",
project[2]
)}
className="bg-purple-600 px-3 py-1 rounded-lg"
>
Completed
</button>

</div>

</td>
                    <td className="p-4">

                    <a
                    href={`https://web-development-services-platform.onrender.com/api/download/${project[7]}`}
                    target="_blank"
                    rel="noreferrer"
                    >
                    <button className="bg-blue-600 px-4 py-2 rounded-xl hover:scale-105 transition">
                    Download
                    </button>
                    </a>

                    </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}