import { useEffect, useState } from "react";

export default function ViewBids() {
  const [bids, setBids] = useState([]);

  const fetchBids = () => {
  fetch("https://web-development-services-platform.onrender.com/api/bids")
    .then((res) => res.json())
    .then((data) => {
      setBids(data.bids);
    });
};

useEffect(() => {
  fetchBids();
}, []);

const acceptBid = async (id) => {
  await fetch(
    `https://web-development-services-platform.onrender.com/api/accept-bid/${id}`,
    {
      method: "POST",
    }
  );

  alert("Bid Accepted");

  fetchBids();
};

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold mb-6">
        View Bids
      </h1>

      {bids.map((bid) => (
        <div
          key={bid[0]}
          className="border p-4 rounded-xl mb-4"
        >
          <p>Project ID: {bid[1]}</p>
          <p>Email: {bid[2]}</p>
          <p>Amount: ₹{bid[3]}</p>
          <p className="mt-2">
  Status:
  <span
    className={
      bid[6] === "Accepted"
        ? "text-green-400 font-bold ml-2"
        : "text-yellow-400 font-bold ml-2"
    }
  >
    {bid[6]}
  </span>
</p>

          <button
  onClick={() => acceptBid(bid[0])}
  className="bg-green-600 px-4 py-2 rounded mt-3"
>
  Accept Bid
</button>
        </div>
      ))}
    </div>
  );
}