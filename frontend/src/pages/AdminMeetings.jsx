import { useState, useEffect } from "react";

export default function AdminMeetings() {

  const [meetings, setMeetings] = useState([]);

  useEffect(() => {

    fetch(
      "http://127.0.0.1:5000/api/meetings"
    )
      .then((response) => response.json())
      .then((data) => {
        setMeetings(data.meetings);
      });

  }, []);
  const updateMeeting = async (
  meetingId,
  status
) => {

  await fetch(
    `http://127.0.0.1:5000/api/update-meeting/${meetingId}/${status}`
  );

  window.location.reload();

};

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-8">
        📅 Meeting Requests
      </h1>

      {meetings.map((meeting) => (

        <div
          key={meeting[0]}
          className="p-5 mb-4 bg-gray-900 rounded-xl"
        >

          <h2>
            Client: {meeting[1]}
          </h2>

          <p>
            Date: {meeting[2]}
          </p>

          <p>
            Time: {meeting[3]}
          </p>

          <p>
            Status: {meeting[4]}
          </p>
          {meeting[4] === "Pending" ? (

  <div className="mt-3 flex gap-3">

    <button
      onClick={() =>
        updateMeeting(
          meeting[0],
          "Approved"
        )
      }
      className="px-4 py-2 bg-green-600 rounded-lg"
    >
      Approve
    </button>

    <button
      onClick={() =>
        updateMeeting(
          meeting[0],
          "Rejected"
        )
      }
      className="px-4 py-2 bg-red-600 rounded-lg"
    >
      Reject
    </button>

  </div>

) : (

  <div className="mt-3">

    <strong>
      Final Status: {meeting[4]}
    </strong>

  </div>

)}

        </div>

      ))}

    </div>

  );

}