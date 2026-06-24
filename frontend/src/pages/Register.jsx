import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  

  const handleRegister = async (e) => {

  e.preventDefault();

  const userData = {
  name,
  email,
  password
};

  const response = await fetch(
    "http://127.0.0.1:5000/api/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();

  alert(data.message);

  navigate("/login");
};

  
  return (
    
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-500/20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            Create Account
          </h1>

          <p className="text-gray-400 text-center mb-8">
            Join our platform
          </p>

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Full Name */}

            <div>
              <label className="block mb-2 text-gray-300">
                Full Name
              </label>

              <div className="flex items-center bg-white/5 border border-gray-700 rounded-xl px-4">
                <User size={18} className="text-cyan-400" />

                <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none px-3 py-4"
                />
              </div>
            </div>

            {/* Email */}

            <div>
              <label className="block mb-2 text-gray-300">
                Email
              </label>

              <div className="flex items-center bg-white/5 border border-gray-700 rounded-xl px-4">
                <Mail size={18} className="text-cyan-400" />

                <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none px-3 py-4"
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="block mb-2 text-gray-300">
                Password
              </label>

              <div className="flex items-center bg-white/5 border border-gray-700 rounded-xl px-4">
                <Lock size={18} className="text-cyan-400" />

                <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none px-3 py-4"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}

            <div>
              <label className="block mb-2 text-gray-300">
                Confirm Password
              </label>

              <div className="flex items-center bg-white/5 border border-gray-700 rounded-xl px-4">
                <Lock size={18} className="text-cyan-400" />

                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  placeholder="Confirm password"
                  className="w-full bg-transparent outline-none px-3 py-4"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:scale-105 transition duration-300"
            >
              Create Account
            </button>

          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-b border-gray-700"></div>
            <span className="px-4 text-gray-500">
              OR
            </span>
            <div className="flex-1 border-b border-gray-700"></div>
          </div>

          <button className="w-full py-3 border border-gray-700 rounded-xl hover:bg-white/5 transition mb-3">
            Continue with Google
          </button>

          <button className="w-full py-3 border border-gray-700 rounded-xl hover:bg-white/5 transition">
            Continue with GitHub
          </button>

          <p className="text-center mt-6 text-gray-400">
            Already have an account?
            <Link
            to="/login"
            className="text-cyan-400 ml-2 hover:underline"
            >
                Login
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
  
}