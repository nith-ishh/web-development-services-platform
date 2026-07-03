import { useState } from "react";

export default function AdminPayments() {

  const [clientEmail, setClientEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");

  const addPayment = async () => {

    await fetch(
      "https://web-development-services-platform.onrender.com/api/add-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_email: clientEmail,
          project_name: projectName,
          total_amount: totalAmount,
          paid_amount: paidAmount
        })
      }
    );

    alert("Payment Added");

    setClientEmail("");
    setProjectName("");
    setTotalAmount("");
    setPaidAmount("");

  };

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text mb-10">
        💰 Payment Management
      </h1>

      <div className="max-w-3xl mx-auto bg-white/5 border border-gray-700 rounded-3xl p-8">

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Client Email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-900 border border-gray-600 text-white"
          />

          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-900 border border-gray-600 text-white"
          />

          <input
            type="number"
            placeholder="Total Amount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-900 border border-gray-600 text-white"
          />

          <input
            type="number"
            placeholder="Paid Amount"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-900 border border-gray-600 text-white"
          />

          <button
            onClick={addPayment}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl font-bold hover:scale-105 transition"
          >
            💰 Save Payment
          </button>

        </div>

      </div>

    </div>

  );
}