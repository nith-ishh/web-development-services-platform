import { useState } from "react";

export default function ProjectRequest() {
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState(null);
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {

  e.preventDefault();

  const formData = new FormData();

  formData.append("file", file);

  const uploadResponse = await fetch(
  "http://127.0.0.1:5000/api/upload",
  {
    method: "POST",
    body: formData,
  }
);

const uploadData = await uploadResponse.json();

console.log(uploadData);

alert(uploadData.message);

  const response = await fetch(
    "http://127.0.0.1:5000/api/project",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  client_name: clientName,
  email: email,
  project_type: projectType,
  budget: budget,
  description: description,
  file_name: file.name
}),
    }
  );

  const data = await response.json();

  alert(data.message);

  setSubmitted(true);
};
  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">

        <div className="bg-white/5 border border-gray-700 rounded-3xl p-10 text-center">

          <h1 className="text-5xl font-bold text-green-400">
            🎉 Success
          </h1>

          <p className="mt-5 text-gray-300">
            Your project request has been submitted.
          </p>

          <h2 className="mt-4 text-cyan-400 text-2xl">
            Reference ID
          </h2>

          <p className="text-3xl font-bold">
            WEB-2026-001
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-8">
        Start Your Project
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl bg-white/5 border border-gray-700 rounded-3xl p-8 space-y-5"
      >

        <input
        required
        placeholder="Full Name"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        className="w-full p-4 rounded-xl bg-black border border-gray-700"
        />

        <input
        required
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-4 rounded-xl bg-black border border-gray-700"
        />

        <input
          placeholder="Phone Number"
          className="w-full p-4 rounded-xl bg-black border border-gray-700"
        />

        <input
        placeholder="Project Type"
        value={projectType}
        onChange={(e) => setProjectType(e.target.value)}
        className="w-full p-4 rounded-xl bg-black border border-gray-700"
        />

        <input
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        className="w-full p-4 rounded-xl bg-black border border-gray-700"
        />

        <input
          type="date"
          className="w-full p-4 rounded-xl bg-black border border-gray-700"
        />

        <textarea
        rows="5"
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-4 rounded-xl bg-black border border-gray-700"
        />

        <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full p-4 rounded-xl bg-black border border-gray-700"
        />

        <button
          className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition"
        >
          Submit Project
        </button>

      </form>

    </div>
  );
}