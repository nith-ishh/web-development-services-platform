export default function ProjectTracking() {
  const stages = [
    {
      title: "Requirement Gathering",
      status: "Completed",
    },
    {
      title: "UI / UX Design",
      status: "Completed",
    },
    {
      title: "Frontend Development",
      status: "Completed",
    },
    {
      title: "Backend Development",
      status: "In Progress",
    },
    {
      title: "Testing",
      status: "Pending",
    },
    {
      title: "Deployment",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-8">
        Project Tracking
      </h1>

      <div className="bg-white/5 border border-gray-700 rounded-3xl p-8">

        <div className="mb-8">

          <h2 className="text-2xl font-bold">
            Overall Progress
          </h2>

          <div className="w-full bg-gray-800 rounded-full h-5 mt-4">
            <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-5 rounded-full w-[65%]"></div>
          </div>

          <p className="mt-3 text-cyan-400">
            65% Completed
          </p>

        </div>

        <div className="space-y-5">

          {stages.map((stage, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-black/30 p-5 rounded-2xl border border-gray-700"
            >
              <h3 className="text-xl">
                {stage.title}
              </h3>

              <span
                className={
                  stage.status === "Completed"
                    ? "text-green-400"
                    : stage.status === "In Progress"
                    ? "text-yellow-400"
                    : "text-gray-400"
                }
              >
                {stage.status}
              </span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}