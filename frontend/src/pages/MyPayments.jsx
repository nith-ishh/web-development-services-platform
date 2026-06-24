import { useEffect, useState } from "react";

export default function MyPayments() {

  const [payments, setPayments] = useState([]);

  useEffect(() => {

    const email = localStorage.getItem("userEmail");

    fetch(
      `http://127.0.0.1:5000/api/payments/${email}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPayments(data.payments);
      });

  }, []);

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        💰 My Payments
      </h1>

      {payments.map((payment, index) => (

        <div
          key={index}
          className="bg-white/5 border border-gray-700 rounded-3xl p-6 mb-6"
        >

          <h2 className="text-2xl font-bold mb-3">
            {payment[2]}
          </h2>

          <p>💵 Total Amount: ₹{payment[3]}</p>
          <p>✅ Paid Amount: ₹{payment[4]}</p>
          <p>⏳ Remaining Amount: ₹{payment[5]}</p>

          <p className="mt-3 font-bold text-yellow-400">
            {payment[6]}
          </p>

        </div>

      ))}

    </div>

  );

}