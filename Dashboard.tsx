import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

type Summary = {
  total_revenue: number;
  num_employees: number;
  departments: string[];
  avg_performance: number;
};

export default function Dashboard() {
  const [summary, setSummary] = useState<Summary>();
  const [finance, setFinance] = useState([]);
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/summary").then(res => setSummary(res.data));
    axios.get("http://localhost:8000/api/finance").then(res => setFinance(res.data));
    axios.get("http://localhost:8000/api/operations").then(res => setOperations(res.data));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Wayne Enterprises BI Dashboard</h1>

      {summary && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Total Revenue</h2>
            <p className="text-2xl text-green-600">${summary.total_revenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Employees</h2>
            <p className="text-2xl">{summary.num_employees}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Departments</h2>
            <p>{summary.departments.join(", ")}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Avg. Performance</h2>
            <p className="text-2xl text-blue-600">{summary.avg_performance}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-2">Revenue Trends</h3>
          <ResponsiveContainer width="50%" height={250}>
            <LineChart data={finance}>
              <XAxis dataKey="Year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Revenue" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-bold mb-2">Department Performance</h3>
          <ResponsiveContainer width="50%" height={250}>
            <BarChart data={operations}>
              <XAxis dataKey="Supply_Chain_Disruptions" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Inventory_Turnoverzz" fill="#82ca9d" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">📊 Wayne's Winning Formula</h2>
        {summary && (
          <p>
            Wayne Enterprises has demonstrated robust financial growth with over <strong>${summary.total_revenue.toLocaleString()}</strong> in revenue.
            Our top-performing departments such as <strong>{summary.departments[0]}</strong> and <strong>{summary.departments[1]}</strong> are driving results.
            With an average performance score of <strong>{summary.avg_performance}</strong>, we are committed to operational excellence and workforce strength.
          </p>
        )}
      </div>
    </div>
  );
}
