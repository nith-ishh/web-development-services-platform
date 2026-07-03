import { useState, useEffect } from "react";

export default function Deliverables() {

  const [files, setFiles] = useState([]);

  useEffect(() => {

    const email = localStorage.getItem("userEmail");

    fetch(
      `https://web-development-services-platform.onrender.com/api/deliverables/${email}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFiles(data.files);
      });

  }, []);

  return (

    <div className="min-h-screen p-8">

      <h1 className="text-4xl font-bold mb-8">
        📁 Project Deliverables
      </h1>

      {files.map((file, index) => (

        <div key={index} className="mb-4">

          <h2>
            {file[0]}
          </h2>

          <a
            href={`https://web-development-services-platform.onrender.com/uploads/${file[1]}`}
            target="_blank"
            rel="noreferrer"
          >
            📄 {file[1]}
          </a>

        </div>

      ))}

    </div>

  );

}