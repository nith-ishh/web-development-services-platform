import { useState, useEffect } from "react";

export default function MyMeetings() {

  const [meetings, setMeetings] = useState([]);

  const email = localStorage.getItem("userEmail");

  useEffect(() => {

    fetch(
      `http://127.0.0.1:5000/api/my-meetings/${email}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMeetings(data.meetings);
      });

  }, []);

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        📅 My Meetings
      </h1>

      {meetings.map((meeting) => (

        <div
          key={meeting[0]}
          className="p-5 mb-4 bg-white/5 rounded-2xl"
        >

          <p>
            Date: {meeting[2]}
          </p>

          <p>
            Time: {meeting[3]}
          </p>

          <p>
            Status: {meeting[4]}
          </p>

        </div>

      ))}

    </div>

  );

}