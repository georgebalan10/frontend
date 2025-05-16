import React, { useEffect, useState } from 'react';
import API_BASE_URL from "../config";
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA47BC',
  '#EF5350', '#29B6F6', '#66BB6A', '#FFA726', '#8D6E63'
];

function AdminPanelAIReports() {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/ai-question-stats`);
      console.log('Date primite:', response.data);  // LOG pentru debugging
      if (Array.isArray(response.data.stats)) {
        setStats(response.data.stats);
      } else {
        setError("Formatul datelor este greșit");
      }
    } catch (error) {
      console.error('Eroare la preluarea statisticilor:', error);
      setError("Nu s-au putut prelua datele");
    }
  };

  const handleReset = async () => {
  const confirm1 = window.confirm("Ești sigur că vrei să resetezi statisticile?");
  if (!confirm1) return;

  const confirm2 = window.confirm("Această acțiune va șterge definitiv toate întrebările AI. Confirmi din nou?");
  if (!confirm2) return;

  try {
    await axios.post(`${API_BASE_URL}/api/admin/reset-ai-questions`);
    fetchStats();
  } catch (error) {
    console.error('Eroare la resetarea statisticilor:', error);
  }
};


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Top 10 Întrebări Frecvente (AI)</h1>
        <button
          onClick={handleReset}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          Resetează statistici
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {stats.length === 0 ? (
        <p>Momentan nu există întrebări înregistrate.</p>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4">Distribuție întrebări</h2>
          <div style={{ width: '100%', height: 700 }} className="mb-12">

            <ResponsiveContainer width="100%" height={500}>
  <PieChart>
    <Pie
      data={stats}
      dataKey="count"
      nameKey="question"
      cx="50%"
      cy="50%"
      outerRadius={180}
      innerRadius={90}
      labelLine={true}
      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = 25 + outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
          <text
            x={x}
            y={y}
            fill="#333"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            style={{ fontSize: '12px' }}
          >
            {`${stats[index].question}: ${stats[index].count}`}
          </text>
        );
      }}
    >
      {stats.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend layout="vertical" verticalAlign="middle" align="right" />
  </PieChart>
</ResponsiveContainer>

          </div>

          <table className="min-w-full bg-white border border-gray-300" style={{ marginTop: '2rem' }}>
            <thead>
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Întrebare</th>
                <th className="border px-4 py-2">Număr apariții</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.question}</td>
                  <td className="border px-4 py-2">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default AdminPanelAIReports;
