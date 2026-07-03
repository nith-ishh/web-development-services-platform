import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

  e.preventDefault();

  const response = await fetch(
    "https://web-development-services-platform.onrender.com/api/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    }
  );

  const data = await response.json();

  if (data.status === "success") {

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    alert(data.message);

    navigate("/dashboard");

  } else {

    alert(data.message);

  }
};

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* Background Blur */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:scale-[1.02] transition-all duration-500">

          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            Welcome Back
          </h1>

          <p className="text-gray-400 text-center mb-8">
            Login to your account
          </p>

          <form onSubmit={handleLogin}>

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
                placeholder="Enter email"
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
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
            </div>

            {/* Remember */}

            <div className="flex justify-between text-sm text-gray-400">

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember Me
              </label>

              <a href="#" className="hover:text-cyan-400">
                Forgot Password?
              </a>

            </div>

            {/* Login Button */}

            <button
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold hover:scale-105 transition duration-300"
            >
              Login
            </button>

          </form>

          {/* Divider */}

          <div className="flex items-center my-6">
            <div className="flex-1 border-b border-gray-700"></div>
            <span className="px-4 text-gray-500">
              OR
            </span>
            <div className="flex-1 border-b border-gray-700"></div>
          </div>

          {/* Social */}

          <div className="space-y-3">

            <button className="w-full py-3 border border-gray-700 rounded-xl hover:bg-white/5 transition">
              Continue with Google
            </button>

            <button className="w-full py-3 border border-gray-700 rounded-xl hover:bg-white/5 transition">
              Continue with GitHub
            </button>

          </div>

          <p className="text-center mt-6 text-gray-400">
            Don't have an account?
            <Link
            to="/register"
            className="text-cyan-400 cursor-pointer ml-2 hover:underline"
            >
                Register
            </Link>
        </p>

        </div>

      </div>

    </div>
  );
}