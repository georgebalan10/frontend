import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config";

function UploadImages() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [files, setFiles] = useState([]);
  const [descriptions, setDescriptions] = useState({});
  const [status, setStatus] = useState(null);
  const [myUploads, setMyUploads] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleDescriptionChange = (index, value) => {
    setDescriptions({ ...descriptions, [index]: value });
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append("images", file);
      formData.append(`desc_${index}`, descriptions[index] || '');
    });
    formData.append("user_id", user.id);

    try {
      await axios.post(`${API_BASE_URL}/api/uploads`, formData);
      setStatus("success");
      setFiles([]);
      setDescriptions({});
      fetchMyUploads(); // refresh uploads after successful upload
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const fetchMyUploads = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/uploads/by-user/${user.id}`);
      setMyUploads(res.data.uploads);
    } catch (err) {
      console.error("Eroare la preluarea pozelor proprii:", err);
    }
  };
	
const handleDeleteImage = async (id) => {
  const confirm1 = window.confirm("Sigur vrei să ștergi această poză?");
  if (!confirm1) return;
  const confirm2 = window.confirm("Această acțiune este permanentă. Ștergi poza?");
  if (!confirm2) return;

  try {
    await axios.delete(`${API_BASE_URL}/api/uploads/${id}`);
    fetchMyUploads(); // Refresh list
  } catch (err) {
    console.error("Eroare la ștergerea imaginii:", err);
    alert("A apărut o eroare la ștergere.");
  }
};

  useEffect(() => {
    if (user && user.id) {
      fetchMyUploads();
    }
  }, [user]);

  return (
    <div style={{ maxWidth: 600, margin: "30px auto", padding: 20 }}>
      <h2>Încărcare imagini și notițe</h2>

      <h3 style={{ marginTop: 30 }}>🖼️ Pozele mele încărcate:</h3>
      {myUploads.length === 0 ? (
        <p>Nu ai încă poze încărcate.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: 30 }}>
          {myUploads.map((img) => (
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
    <button
      onClick={() => handleDeleteImage(img.id)}
      style={{
        marginTop: "10px",
        padding: "5px 10px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "13px",
        cursor: "pointer"
      }}
    >
      🗑️ Șterge poza
    </button>
  </div>
))}

        </div>
      )}

      <h2>Încarcă poze medicale</h2>
      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      <div style={{ marginTop: 20 }}>
        {files.map((file, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            <p><b>{file.name}</b></p>
            <input
              type="text"
              placeholder="Descriere (ex: durere umăr)"
              value={descriptions[index] || ""}
              onChange={(e) => handleDescriptionChange(index, e.target.value)}
              style={{ width: '100%', padding: '6px' }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleUpload}
        style={{
          marginTop: 15,
          backgroundColor: '#1976d2',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Trimite pozele
      </button>

      {status === "success" && <p style={{ color: "green", marginTop: 10 }}>✅ Pozele au fost încărcate!</p>}
      {status === "error" && <p style={{ color: "red", marginTop: 10 }}>❌ Eroare la trimitere!</p>}
    </div>
  );
}

export default UploadImages;
