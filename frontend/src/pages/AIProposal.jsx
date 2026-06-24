import { useState } from "react";
import { Link } from "react-router-dom";

export default function AIProposal() {

  const [requirements, setRequirements] = useState("");
  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateProposal = async () => {

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/api/generate-proposal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            requirements
          })
        }
      );

      const data = await response.json();

      console.log("API Response:", data);

      if (data.error) {

        setError(
          "AI request limit reached. Please wait 30 seconds and try again."
        );

        return;
      }

      setProposal(data.proposal);

    } catch (error) {

      setError(
        "Server Error. Please check Flask backend."
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        🤖 AI Proposal Generator
      </h1>

      <Link to="/dashboard">
        <button className="mb-6 bg-gray-700 px-4 py-2 rounded-xl hover:bg-gray-600 transition">
          ← Back to Dashboard
        </button>
      </Link>

      <textarea
        rows="8"
        placeholder="Describe project requirements..."
        value={requirements}
        onChange={(e) => setRequirements(e.target.value)}
        className="w-full p-4 bg-gray-900 rounded-xl border border-gray-700"
      />

      <button
        disabled={loading}
        onClick={generateProposal}
        className="mt-5 bg-cyan-600 px-6 py-3 rounded-xl disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Proposal"}
      </button>

      {error && (
        <div className="mt-6 bg-red-500/20 border border-red-500 p-4 rounded-xl text-red-300">
          {error}
        </div>
      )}

      {proposal && (
        <div className="mt-8 bg-white/5 border border-gray-700 p-6 rounded-2xl">

          <h2 className="text-2xl font-bold mb-4">
            AI Generated Proposal
          </h2>

          <pre className="whitespace-pre-wrap text-gray-200">
            {proposal}
          </pre>

        </div>
      )}

    </div>
  );
}