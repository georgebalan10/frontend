import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

function DateleClientilor() {
  const [uploads, setUploads] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [userUploads, setUserUploads] = useState([]);

  useEffect(() => {
    fetchUploadSummary();
  }, []);

  const fetchUploadSummary = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/uploads/all`);
      setUploads(res.data.summary);
    } catch (err) {
      console.error("Eroare la încărcarea datelor încărcate:", err);
    }
  };

  const fetchUploadsForUser = async (userId, userName) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/uploads/by-user/${userId}`);
      setUserUploads(res.data.uploads);
      setSelectedUserId(userId);
      setSelectedUserName(userName);
    } catch (err) {
      console.error("Eroare la preluarea fișierelor utilizatorului:", err);
    }
  };

  const handleBack = () => {
    setSelectedUserId(null);
    setSelectedUserName("");
    setUserUploads([]);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>
        📸 Fișiere încărcate de clienți
      </h2>

      {!selectedUserId ? (
        <ul style={{ marginBottom: "30px", listStyle: "none", padding: 0 }}>
          {uploads.map((u) => (
            <li
              key={u.user_id}
              style={{
                marginBottom: "15px",
                backgroundColor: "#f8f8f8",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <strong>{u.name}</strong> ({u.email}) – {u.count} fișier(e)
              <button
                onClick={() => fetchUploadsForUser(u.user_id, u.name)}
                style={{
                  marginLeft: "15px",
                  padding: "6px 12px",
                  backgroundColor: "#1976d2",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Vezi fișiere
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <button
            onClick={handleBack}
            style={{
              marginBottom: "20px",
              padding: "8px 14px",
              backgroundColor: "#777",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            ← Înapoi la lista clienților
          </button>

          <h3 style={{ marginBottom: "20px" }}>📁 Fișierele lui {selectedUserName}</h3>
          {userUploads.length === 0 ? (
            <p>Nu sunt fișiere încărcate.</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {userUploads.map((img) => (
                <div
                  key={img.id}
                  style={{
                    width: "220px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    backgroundColor: "#fff",
                    padding: "10px",
                  }}
                >
                  <img
                    src={`${API_BASE_URL}/uploads/${img.filename}`}
                    alt="upload"
                    style={{ width: "100%", borderRadius: "6px" }}
                  />
                  <p style={{ marginTop: "10px", fontStyle: "italic", fontSize: "14px" }}>
                    {img.description || "Fără descriere"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DateleClientilor;
