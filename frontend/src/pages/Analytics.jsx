import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Bar,
  Doughnut,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {

  const pieData = {
    labels: [
      "Completed",
      "Pending",
      "In Progress"
    ],

    datasets: [
      {
        data: [10, 6, 4],
        backgroundColor: [
          "#22c55e",
          "#eab308",
          "#3b82f6"
        ],
        borderWidth: 0,
      },
    ],
  };
  const pieOptions = {
  plugins: {
    legend: {
      labels: {
        color: "white",
      },
    },
  },
};

  const barData = {
    labels: [
      "Web Development",
      "AI",
      "Mobile Apps",
      "IoT",
      "Blockchain"
    ],

    datasets: [
      {
        label: "Projects",
        data: [15, 11, 8, 5, 3],
        backgroundColor: [
          "#06b6d4",
          "#8b5cf6",
          "#22c55e",
          "#f97316",
          "#ef4444"
        ],
        borderRadius: 15,
      },
    ],
  };
  const barOptions = {

  responsive: true,

  plugins: {
    legend: {
      labels: {
        color: "white",
      },
    },
  },

  scales: {

    x: {
      ticks: {
        color: "white",
      },
      grid: {
        color: "#333",
      },
    },

    y: {
      ticks: {
        color: "white",
      },
      grid: {
        color: "#333",
      },
    },

  },

};

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
        Analytics Dashboard
      </h1>

      {/* Top Cards */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 rounded-3xl">
          <h2 className="text-3xl font-bold">25</h2>
          <p>Total Users</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-3xl">
          <h2 className="text-3xl font-bold">18</h2>
          <p>Total Projects</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-3xl">
          <h2 className="text-3xl font-bold">10</h2>
          <p>Completed</p>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 rounded-3xl">
          <h2 className="text-3xl font-bold">6</h2>
          <p>Pending</p>
        </div>

      </div>

      {/* Charts */}

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-gray-900 border border-cyan-500 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl text-black font-bold mb-5">
            Project Status
          </h2>

          <div className="w-[350px] h-[350px] mx-auto">
          <Doughnut
          data={pieData}
          options={{
            maintainAspectRatio: false,
          }}
          />
        </div>
        </div>

        <div className="bg-gray-900 border border-purple-500 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl text-black font-bold mb-5">
            Service Analytics
          </h2>

          <div className="h-[350px]">
          <Bar
          data={barData}
          options={{
            maintainAspectRatio: false,
          }}
        />
        </div>
        </div>

      </div>

    </div>

  );

}