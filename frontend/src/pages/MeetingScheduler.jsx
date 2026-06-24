import { useState } from "react";

export default function MeetingScheduler() {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const email = localStorage.getItem("userEmail");

  const requestMeeting = async () => {

    await fetch(
      "http://127.0.0.1:5000/api/request-meeting",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          date: date,
          time: time,
        }),
      }
    );

    alert("Meeting Request Sent");

    setDate("");
    setTime("");

  };

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        📅 Meeting Scheduler
      </h1>

      <div className="max-w-xl">

        <label className="block mb-2">
          Meeting Date
        </label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-900 rounded-xl"
        />

        <label className="block mb-2">
          Meeting Time
        </label>

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-3 mb-6 bg-gray-900 rounded-xl"
        />

        <button
          onClick={requestMeeting}
          className="px-6 py-3 rounded-xl bg-green-600"
        >
          Request Meeting
        </button>

      </div>

    </div>

  );

}