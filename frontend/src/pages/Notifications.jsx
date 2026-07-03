import { useEffect, useState } from "react";

export default function Notifications() {

  const [notifications, setNotifications] = useState([]);
  const markAsRead = async (id) => {

  await fetch(
    `https://web-development-services-platform.onrender.com/api/mark-notification-read/${id}`
  );

  window.location.reload();

};

  useEffect(() => {

    const email = localStorage.getItem("userEmail");

    fetch(
      `https://web-development-services-platform.onrender.com/api/notifications/${email}`
    )
      .then((response) => response.json())
      .then((data) => {
  console.log("Notifications API:", data);
  setNotifications(data.notifications);
});

  }, []);
  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-8">
        Notifications
      </h1>

      <div className="space-y-5">
        <p>Total Notifications: {notifications.length}</p>

  {notifications.length === 0 && (
    <p>No Notifications</p>
  )}
        <h2>Total Notifications: {notifications.length}</h2>
        {notifications.map((item, index) => (

          <div
            key={index}
            className="bg-white/5 border border-gray-700 rounded-3xl p-6 hover:scale-[1.02] transition"
          >

            <h2 className="text-2xl font-semibold">
  🔔 {item[1]}
</h2>
<button
  onClick={() => markAsRead(item[0])}
  className="mt-3 px-4 py-2 rounded-xl bg-green-600"
>
  ✓ Mark as Read
</button>

<p className="text-gray-400 mt-2">
  New Activity
</p>

          </div>

        ))}

      </div>

    </div>
  );
}