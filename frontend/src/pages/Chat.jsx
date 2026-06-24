import { useState, useEffect } from "react";

export default function Chat() {

  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const email = localStorage.getItem("userEmail");

  

  useEffect(() => {

  loadMessages();

  const interval = setInterval(() => {
    loadMessages();
  }, 2000);

  return () => clearInterval(interval);

}, []);

  const loadMessages = () => {

  fetch(
  `http://127.0.0.1:5000/api/messages/${email}`
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Server Error");
    }
    return response.json();
  })
    .then((data) => {
  setMessages(data.messages);

  fetch(
    `http://127.0.0.1:5000/api/chat-files/${email}`
  )
    .then((response) => response.json())
    .then((data) => {
      setFiles(data.files);
    });

})
    .catch((error) => {
      console.log("Backend not running", error);
    });

};

useEffect(() => {

  loadMessages();

  const interval = setInterval(() => {
    loadMessages();
  }, 2000);

  return () => clearInterval(interval);

}, []);

const uploadFile = async (file) => {

  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "sender",
    email
  );

  formData.append(
    "receiver",
    "nithish@gmail.com"
  );

  await fetch(
    "http://127.0.0.1:5000/api/upload-chat-file",
    {
      method: "POST",
      body: formData,
    }
  );

  alert("File Uploaded");

};


  const deleteFile = async (fileId) => {

  await fetch(
    `http://127.0.0.1:5000/api/delete-chat-file/${fileId}`
  );

  window.location.reload();

};

  const sendMessage = async () => {

    await fetch(
      "http://127.0.0.1:5000/api/send-message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        sender: email,
        receiver: "nithish@gmail.com",
        message: message,
        }),
      }
    );

    window.location.reload();

  };

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-8">
        💬 Chat Support
      </h1>

      <div className="bg-white/5 rounded-3xl p-6 h-[500px] overflow-y-auto">

        {messages.map((msg, index) => (

          <div
            key={index}
            className="mb-4 p-3 rounded-xl bg-cyan-600"
          >
            <strong>{msg[0]}</strong>

            <p>{msg[1]}</p>

          </div>

        ))}

      </div>
      <div className="mt-4">

  <h2 className="text-xl font-bold mb-2">
    Uploaded Files
  </h2>

  {files.map((file, index) => (

  <div
    key={index}
    className="flex items-center gap-3 mb-2"
  >

    <a
      href={`http://127.0.0.1:5000/uploads/${file[1]}`}
      target="_blank"
      rel="noreferrer"
      className="text-cyan-400 underline"
    >
      📄 {file[1]}
    </a>

    <button
      onClick={() => {

        if (
          window.confirm(
            "Are you sure you want to delete this file?"
          )
        ) {
          deleteFile(file[0]);
        }

      }}
      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm"
    >
      🗑 Delete
    </button>

  </div>

))}

</div>

      <div className="flex gap-3 mt-5">

  <input
    type="file"
    onChange={(e) =>
      uploadFile(e.target.files[0])
    }
    className="p-2"
  />

  <input
    type="text"
    value={message}
    onChange={(e) =>
      setMessage(e.target.value)
    }
    placeholder="Type your message..."
    className="flex-1 p-4 rounded-xl bg-gray-900 border border-gray-700"
  />

  <button
    onClick={sendMessage}
    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600"
  >
    Send
  </button>

</div>

    </div>

  );

}