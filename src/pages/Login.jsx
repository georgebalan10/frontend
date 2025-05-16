import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config";
import { useNavigate } from 'react-router-dom'; // ✅ Adăugat

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Adăugat

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password
      });
      alert(response.data.message);

      localStorage.setItem("user", JSON.stringify({
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        is_admin: response.data.user.is_admin
      }));

      // ✅ Redirecționare în funcție de rol
      if (response.data.user.is_admin) {
	
	navigate("/admin");
window.location.reload(); // ⬅️ Adaugă asta imediat după navigate
	
      } else {
        navigate("/rezervari");
window.location.reload();

      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Email sau parolă incorecte.");
      } else {
        alert("Eroare la autentificare.");
      }
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '60px auto',
      padding: '30px',
      border: '1px solid #ccc',
      borderRadius: '10px'
    }}>
      <h2 style={{ textAlign: 'center' }}>Autentificare</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Parolă</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Conectare
        </button>
      </form>
      <p style={{ marginTop: '20px', fontSize: '14px' }}>
        Nu ai cont? <a href="/register">Creează unul aici</a>
      </p>
    </div>
  );
}

export default Login;
