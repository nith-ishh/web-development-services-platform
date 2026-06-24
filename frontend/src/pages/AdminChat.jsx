import { useState, useEffect } from "react";

export default function AdminChat() {

  const [messages, setMessages] = useState([]);
  
  const [message, setMessage] = useState("");
  const [clients, setClients] = useState([]);
  const [files, setFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
const [selectedClient, setSelectedClient] = useState("");

useEffect(() => {
  fetch("http://127.0.0.1:5000/api/all-chat-files")
  .then((response) => response.json())
  .then((data) => {
    setAllFiles(data.files);
  });

  fetch(
  "http://127.0.0.1:5000/api/all-chat-files"
)
  .then((response) => response.json())
  .then((data) => {
    setAllFiles(data.files);
  });

  fetch("http://127.0.0.1:5000/api/chat-clients")
    .then((response) => response.json())
    .then((data) => {
      setClients(data.clients);
    });

}, []);

useEffect(() => {

  if (!selectedClient) return;

  fetch(
    `http://127.0.0.1:5000/api/messages/${selectedClient}`
  )
    .then((response) => response.json())
    .then((data) => {
      setMessages(data.messages);
      fetch(
  `http://127.0.0.1:5000/api/chat-files/${selectedClient}`
)
  .then((response) => response.json())
  .then((data) => {
    setFiles(data.files);
  });
      fetch(
  `http://127.0.0.1:5000/api/chat-files/${selectedClient}`
)
  .then((response) => response.json())
  .then((data) => {
    setFiles(data.files);
  });
    });

  fetch(
    `http://127.0.0.1:5000/api/chat-files/${selectedClient}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("FILES:", data.files);
      setFiles(data.files);
    });

  fetch(
    "http://127.0.0.1:5000/api/mark-read/nithish@gmail.com"
  );

}, [selectedClient]);
  const sendReply = async () => {

    await fetch(
      "http://127.0.0.1:5000/api/send-message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: "nithish@gmail.com",
          receiver: selectedClient,
          message: message,
        }),
      }
    );

    window.location.reload();

  };

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-500 text-transparent bg-clip-text mb-8">
        💬 Admin Chat
      </h1>

      
<p className="mb-4 text-cyan-400 font-bold">
  Selected Client: {selectedClient}
</p>


      <div className="mb-6">

  

  {clients.map((client, index) => (

    <button
  key={index}
  onClick={() => {
    console.log("Selected:", client[0]);
    setSelectedClient(client[0]);
  }}
  className={`block w-full text-left p-3 mb-2 rounded-xl ${
    selectedClient === client[0]
      ? "bg-cyan-600"
      : "bg-gray-800"
  }`}
>
  {client[0]}
</button>
  ))}

</div>

      <div className="bg-white/5 rounded-3xl p-6 h-[500px] overflow-y-auto">

        {messages.map((msg, index) => (

          <div
            key={index}
            className="mb-4 p-3 rounded-xl bg-purple-600"
          >
            <strong>{msg[0]}</strong>
            <p>{msg[1]}</p>

          </div>

        ))}
        <h2 className="text-xl font-bold mt-6 mb-2">
  Uploaded Files
</h2>

{files.map((file, index) => (

  <a
  href={`http://127.0.0.1:5000/uploads/${file[1]}`}
  target="_blank"
  rel="noreferrer"
>
  📄 {file[1]}
</a>

))}

      </div>

      <div className="flex gap-3 mt-5">

        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Reply to client..."
          className="flex-1 p-4 rounded-xl bg-gray-900 border border-gray-700"
        />

        <button
          onClick={sendReply}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-600"
        >
          Send
        </button>
        </div>



<div className="flex gap-3 mt-5">

      </div>

    </div>

  );

}