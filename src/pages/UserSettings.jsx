import React, { useState } from 'react';
import axios from 'axios';
import UploadImages from './UploadImages'; // ✅ Import componentă upload
import API_BASE_URL from "../config";

function UserSettings() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [email, setEmail] = useState(storedUser?.email || '');
  const [password, setPassword] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/user/${storedUser.id}/update`, {
        email,
        password
      });

      localStorage.setItem("user", JSON.stringify({ ...storedUser, email }));
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
    setShowConfirm(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px' }}>
      <h2>Datele mele</h2>

      <div style={{ marginBottom: '15px' }}>
        <label>Email nou</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Parolă nouă</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px' }}
        />
      </div>

      <button
        onClick={() => setShowConfirm(true)}
        style={{
          backgroundColor: '#1976d2',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Confirmă modificările
      </button>

      {status === "success" && (
        <p style={{ color: "green", marginTop: "15px" }}>✅ Datele au fost actualizate cu succes!</p>
      )}
      {status === "error" && (
        <p style={{ color: "red", marginTop: "15px" }}>❌ Eroare la actualizare. Încearcă din nou.</p>
      )}

      {showConfirm && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f5f5f5',
          border: '1px solid gray',
          borderRadius: '8px'
        }}>
          <p>Ești sigur că vrei să modifici emailul sau parola?</p>
          <button
            onClick={handleSubmit}
            style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Da, confirm
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            style={{ padding: '8px 16px', backgroundColor: 'gray', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Anulează
          </button>
        </div>
      )}

      <hr style={{ margin: '30px 0' }} />

      <h3>📁 Încărcare imagini și notițe</h3>
      <UploadImages userId={storedUser?.id} />
    </div>
  );
}

export default UserSettings;
