import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from "../config";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.endsWith("@admin.com")) {
      alert("Acest email este rezervat pentru administrator.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Parolele nu coincid.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/register`, {
        name,
        email,
        password
      });

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert("Eroare la înregistrare");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
      <form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <h2 style={{ marginBottom: '20px' }}>Înregistrare</h2>

        <div style={{ marginBottom: '10px' }}>
          <label>Nume complet</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Parolă</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', paddingRight: '40px' }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#1976d2'
              }}
            >
              {showPassword ? "Ascunde" : "Afișează"}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Confirmă parola</label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2e7d32',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Creează cont
        </button>

        <p style={{ marginTop: '10px' }}>
          Ai deja cont? <a href="/login">Autentifică-te aici</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
