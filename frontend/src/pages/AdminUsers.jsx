import { useEffect, useState } from "react";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch("https://web-development-services-platform.onrender.com/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      });

  }, []);
  const deleteUser = async (id) => {

  const response = await fetch(
    `https://web-development-services-platform.onrender.com/api/delete-user/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  alert(data.message);

  window.location.reload();

};

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-10">
        Registered Users
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-700">

          <thead>

            <tr className="bg-cyan-700">

              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user[0]}
                className="border border-gray-700 text-center"
              >

                <td className="p-4">{user[0]}</td>
                <td className="p-4">{user[1]}</td>
                <td className="p-4">{user[2]}</td>
                <td className="p-4">

                <button
                onClick={() => deleteUser(user[0])}
                className="bg-red-600 px-4 py-2 rounded-xl hover:scale-105 transition"
                >
                Delete
                </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}