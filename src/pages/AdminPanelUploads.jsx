import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";

function AdminPanelUploads() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/uploads`)
      .then(res => setData(res.data.uploads))
      .catch(() => alert("Eroare la preluarea datelor"));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>📁 Datele încărcate de clienți</h2>
      <ul style={{ marginTop: "20px" }}>
        {data.map((item, idx) => (
          <li key={idx} style={{ marginBottom: "10px" }}>
            <Link to={`/admin/uploads/${item.user}`} style={{ fontWeight: "bold" }}>
              {item.user}
            </Link>{" "}
            – {item.count} fișiere încărcate
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanelUploads;
