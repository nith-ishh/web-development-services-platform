import { User, Mail, Phone, Building } from "lucide-react";

export default function Profile() {
  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
        My Profile
      </h1>

      <div className="max-w-4xl mt-10 bg-white/5 border border-gray-700 rounded-3xl p-8">

        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-5xl font-bold">
            N
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-black/30 p-5 rounded-2xl">
            <User className="mb-3 text-cyan-400"/>
            <h3 className="text-gray-400">Full Name</h3>
            <p className="text-xl">Nithish</p>
          </div>

          <div className="bg-black/30 p-5 rounded-2xl">
            <Mail className="mb-3 text-cyan-400"/>
            <h3 className="text-gray-400">Email</h3>
            <p className="text-xl">nithish@example.com</p>
          </div>

          <div className="bg-black/30 p-5 rounded-2xl">
            <Phone className="mb-3 text-cyan-400"/>
            <h3 className="text-gray-400">Phone</h3>
            <p className="text-xl">+91 9876543210</p>
          </div>

          <div className="bg-black/30 p-5 rounded-2xl">
            <Building className="mb-3 text-cyan-400"/>
            <h3 className="text-gray-400">Company</h3>
            <p className="text-xl">Freelance Client</p>
          </div>

        </div>

        <button className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition">
          Edit Profile
        </button>

      </div>

    </div>
  );
}