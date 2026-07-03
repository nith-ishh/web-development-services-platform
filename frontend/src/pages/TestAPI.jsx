import { useEffect, useState } from "react";

export default function TestAPI() {

  const [message, setMessage] = useState("");

  useEffect(() => {

    fetch("https://web-development-services-platform.onrender.com/api/test")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      });

  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-5xl font-bold text-cyan-400">
          Flask API Test
        </h1>

        <p className="text-2xl mt-8">
          {message}
        </p>

      </div>

    </div>
  );
}