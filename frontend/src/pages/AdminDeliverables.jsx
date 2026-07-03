import { useState } from "react";

export default function AdminDeliverables() {

  const [clientEmail, setClientEmail] = useState("");
  const [projectName, setProjectName] = useState("");

  const uploadDeliverable = async (file) => {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("client_email", clientEmail);
    formData.append("project_name", projectName);

    await fetch(
      "https://web-development-services-platform.onrender.com/api/upload-deliverable",
      {
        method: "POST",
        body: formData
      }
    );

    alert("Deliverable Uploaded");

  };

  return (

    <div className="p-8">

      <h1>Admin Deliverables</h1>

      <input
        type="text"
        placeholder="Client Email"
        value={clientEmail}
        onChange={(e) => setClientEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      <br /><br />

      <input
        type="file"
        onChange={(e) =>
          uploadDeliverable(e.target.files[0])
        }
      />

    </div>

  );

}