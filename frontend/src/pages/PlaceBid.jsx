import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  IndianRupee,
  CalendarDays,
  FileText,
  Shield,
  Star,
  BadgeCheck,
  Clock3,
  MessageSquare,
} from "lucide-react";

export default function PlaceBid() {
  const [projectId, setProjectId] = useState("");
  const [amount, setAmount] = useState("");
  const [days, setDays] = useState("");
  const [proposal, setProposal] = useState("");

  const navigate = useNavigate();

  const submitBid = async () => {
    try {
      await fetch("https://web-development-services-platform.onrender.com/api/place-bid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: projectId,
          freelancer_email: localStorage.getItem("userEmail"),
          bid_amount: amount,
          delivery_days: days,
          proposal,
        }),
      });

      alert("Bid Submitted Successfully");
    } catch (error) {
      console.error(error);
      alert("Error submitting bid");
    }
  };

  return (
    <div className="min-h-screen text-white p-8 bg-[radial-gradient(circle_at_top_right,#4f46e520,transparent_35%),radial-gradient(circle_at_top_left,#9333ea20,transparent_35%),#020617]">

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-8 px-6 py-3 rounded-xl border border-purple-500 bg-purple-500/10 hover:bg-purple-500/20 transition"
      >
        ← Back to Dashboard
      </button>

      {/* Main Container */}
      <div className="max-w-[1450px] mx-auto rounded-[36px] border border-white/10 bg-gradient-to-br from-slate-950/80 via-blue-950/40 to-purple-950/40 backdrop-blur-3xl shadow-[0_0_80px_rgba(99,102,241,0.15)] p-12">

        <div className="grid lg:grid-cols-[64%_1px_36%] gap-8 items-start">

          {/* LEFT SIDE */}
          <div>

            {/* Header */}
            <div className="flex items-center gap-5 mb-10">

              <div className="w-24 h-24 rounded-3xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Briefcase size={42} className="text-purple-400" />
              </div>

              <div>
                <h1 className="text-[56px] font-bold leading-none tracking-tight">
                  Place Your Bid
                </h1>

                <p className="text-gray-400 text-lg mt-3">
                  Submit a competitive bid and win this project
                </p>
              </div>
            </div>

            <div className="border-b border-white/10 mb-8"></div>

            {/* Bid Details */}
            <div className="flex items-center gap-3 mb-8">
              <BadgeCheck size={24} className="text-purple-400" />

              <h2 className="text-xl font-semibold text-purple-300">
                Bid Details
              </h2>
            </div>

            <div className="space-y-7">

              {/* Project ID */}
              <div>
                <label className="block mb-3 font-medium">
                  Project ID
                </label>

                <div className="flex gap-3">

                  <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <FileText size={22} className="text-purple-400" />
                  </div>

                  <input
                    type="number"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    placeholder="Enter Project ID"
                    className="flex-1 h-14 px-5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-500 outline-none"
                  />
                </div>

                <p className="text-gray-500 text-sm mt-2">
                  Enter the ID of the project you want to bid on
                </p>
              </div>

              {/* Amount */}
              <div>
                <label className="block mb-3 font-medium">
                  Your Bid Amount (₹)
                </label>

                <div className="flex gap-3">

                  <div className="w-14 h-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <IndianRupee size={22} className="text-green-400" />
                  </div>

                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter your bid amount"
                    className="flex-1 h-14 px-5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-green-500 outline-none"
                  />
                </div>

                <p className="text-gray-500 text-sm mt-2">
                  Enter the amount you want to bid
                </p>
              </div>

              {/* Days */}
              <div>
                <label className="block mb-3 font-medium">
                  Delivery Time (Days)
                </label>

                <div className="flex gap-3">

                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <CalendarDays size={22} className="text-blue-400" />
                  </div>

                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    placeholder="Enter estimated days"
                    className="flex-1 h-14 px-5 rounded-xl bg-white/[0.04] border border-white/10 focus:border-blue-500 outline-none"
                  />
                </div>

                <p className="text-gray-500 text-sm mt-2">
                  How many days will it take to complete?
                </p>
              </div>

              {/* Proposal */}
              <div>
                <label className="block mb-3 font-medium">
                  Your Proposal
                </label>

                <div className="flex gap-3 items-start">

                  <div className="w-14 h-14 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                    <MessageSquare size={22} className="text-yellow-400" />
                  </div>

                  <textarea
                    rows="6"
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    placeholder="Write your proposal for the client..."
                    className="flex-1 p-4 rounded-xl bg-white/[0.04] border border-white/10 outline-none resize-none"
                  />
                </div>

                <p className="text-gray-500 text-sm mt-2">
                  Explain why you're the best fit for this project
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={submitBid}
                className="w-full h-16 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-500 to-blue-600 text-xl font-bold hover:scale-[1.02] transition"
              >
                🚀 Submit Bid
              </button>

              <p className="text-center text-gray-500">
                🔒 Your bid is secure and only visible to the client
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-white/10 self-stretch"></div>

          {/* RIGHT SIDE */}
           
{/* RIGHT SIDE */}
<div className="flex flex-col gap-6 pt-2">

  {/* Tips Card */}
  <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6">

    <div className="flex items-center gap-3 mb-5">
      <Star size={24} className="text-purple-400" />

      <h2 className="text-[22px] font-bold text-purple-300">
        Tips for Winning
      </h2>
    </div>

    <div className="space-y-4">

      {/* Be Competitive */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shrink-0">
            <IndianRupee size={20} className="text-white" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              Be Competitive
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Research the project and submit a competitive bid amount.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
            <Clock3 size={20} className="text-white" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              Realistic Timeline
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Provide a realistic delivery time to build client trust.
            </p>
          </div>
        </div>
      </div>

      {/* Proposal */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center shrink-0">
            <MessageSquare size={20} className="text-white" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              Write a Great Proposal
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Explain your approach and relevant experience.
            </p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center shrink-0">
            <BadgeCheck size={20} className="text-white" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              Highlight Your Skills
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              Show how your skills and experience match the project requirements.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>

  {/* Safe Bidding Card */}
  <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6">

    <div className="flex gap-4 items-center">

      <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
        <Shield size={26} className="text-green-400" />
      </div>

      <div>
        <h2 className="text-[20px] font-bold text-green-400">
          100% Safe Bidding
        </h2>

        <p className="text-gray-300 mt-1 text-sm">
          Your bid is secure and only the project owner can see your details.
        </p>
      </div>

    </div>

  </div>

</div>
        </div>
      </div>
    </div>
  );
}