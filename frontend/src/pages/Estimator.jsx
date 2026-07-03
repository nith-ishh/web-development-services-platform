import { useState } from "react";

export default function Estimator() {
  const [websiteType, setWebsiteType] = useState("Portfolio");
  const [pages, setPages] = useState(5);

  const [login, setLogin] = useState(false);
  const [adminDashboard, setAdminDashboard] = useState(false);
  const [payment, setPayment] = useState(false);
  const [chatbot, setChatbot] = useState(false);
  const [database, setDatabase] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  const [cost, setCost] = useState(null);
  const [days, setDays] = useState(null);

  const calculate = async () => {

  const response = await fetch(
    "https://web-development-services-platform.onrender.com/api/estimate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        website_type: websiteType,
        pages: pages,
        login: login,
        payment: payment,
        chatbot: chatbot
      }),
    }
  );

  const data = await response.json();

  setCost(data.estimated_cost);
  setDays(data.estimated_days);

};

const generatePDF = async () => {

  const response = await fetch(
    "https://web-development-services-platform.onrender.com/api/generate-pdf",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_name: "Nithish",
        website_type: websiteType,
        pages: pages,
        cost: cost,
        days: days
      }),
    }
  );

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "quotation.pdf";

  document.body.appendChild(a);

  a.click();

  a.remove();

};

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-8">
        Project Cost Estimator
      </h1>

      <div className="max-w-3xl bg-white/5 border border-gray-700 rounded-3xl p-8">

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2">Website Type</label>
            <select
            value={websiteType}
            onChange={(e) => setWebsiteType(e.target.value)}
            className="w-full p-4 bg-black border border-gray-700 rounded-xl"
            >
              <option>Portfolio</option>
              <option>Business</option>
              <option>E-commerce</option>
              <option>School</option>
              <option>Hospital</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Number of Pages</label>
            <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="w-full p-4 bg-black border border-gray-700 rounded-xl"
            placeholder="5"
            />
          </div>

        </div>

        <div className="mt-6">

          <label className="block mb-3">
            Additional Features
          </label>

          <div className="grid md:grid-cols-2 gap-3">

            <label>
            <input
            type="checkbox"
            checked={login}
            onChange={() => setLogin(!login)}
            />
            Login System
            </label>

            <label><input type="checkbox"/> Admin Dashboard</label>

            <label>
            <input
            type="checkbox"
            checked={payment}
            onChange={() => setPayment(!payment)}
            />
            Payment Gateway
            </label>

            <label>
            <input
            type="checkbox"
            checked={chatbot}
            onChange={() => setChatbot(!chatbot)}
            />
            AI Chatbot
            </label>

            <label><input type="checkbox"/> Database</label>

            <label><input type="checkbox"/> Analytics</label>

          </div>

        </div>

        <button
          onClick={calculate}
          className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition"
        >
          Calculate Estimate
        </button>
        <button
        onClick={generatePDF}
        className="mt-4 w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition"
        >
        Generate PDF
        </button>

      </div>

      {cost && (
        <div className="max-w-3xl mt-10 bg-white/5 border border-gray-700 rounded-3xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Estimated Result
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <div className="bg-black/40 p-5 rounded-2xl">
              <h3 className="text-gray-400">Estimated Cost</h3>
              <p className="text-3xl font-bold text-cyan-400">
                ₹{cost} 
              </p>
            </div>

            <div className="bg-black/40 p-5 rounded-2xl">
              <h3 className="text-gray-400">Development Time</h3>
              <p className="text-3xl font-bold text-green-400">
                {days}
              </p>
            </div>

            <div className="bg-black/40 p-5 rounded-2xl">
              <h3 className="text-gray-400">Tech Stack</h3>
              <p>
                React
                <br />
                Flask
                <br />
                MySQL
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}