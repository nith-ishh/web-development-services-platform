import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
export default function MyBids() {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");

    fetch(`https://web-development-services-platform.onrender.com/api/my-bids/${email}`)
      .then((res) => res.json())
      .then((data) => setBids(data.bids))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>My Bids</h1>

      {bids.map((bid) => (
  <div
    key={bid[0]}
    className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4"
  >
    <h3 className="text-xl font-bold mb-2">
      Project #{bid[1]}
    </h3>

    <p>💰 Amount: ₹{bid[2]}</p>

    <p>📅 Delivery Days: {bid[3]}</p>

    <p className="mt-2 text-gray-300">
      {bid[4]}
    </p>

    <div className="mt-3">
      Status:
      <span
        className={`ml-2 font-bold ${
          bid[5] === "Accepted"
            ? "text-green-400"
            : bid[5] === "Rejected"
            ? "text-red-400"
            : "text-yellow-400"
        }`}
      >
        {bid[5]}
      </span>
    </div>
  </div>
))}
    </div>
  );
}