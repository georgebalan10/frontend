import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RezervarileMele.css'; // Importăm fișierul CSS
import { Link } from 'react-router-dom';
import API_BASE_URL from "../config";

function RezervarileMele() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  const navigate = useNavigate();

  const calculateEndTime = (start, duration) => {
    const [h, m] = start.split(":").map(Number);
    const date = new Date();
    date.setHours(h);
    date.setMinutes(m + duration);
    return date.toTimeString().slice(0, 5);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchAppointments(parsedUser.id);
    }
  }, [navigate]);

  const getBusyHours = () => {
  if (!date) return [];
  return appointments
    .filter(a => a.date === date)
    .map(a => a.time);
};

  const fetchAppointments = async (userId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/appointments/${userId}`);
      setAppointments(res.data.appointments);
    } catch (err) {
      console.error("Eroare la preluarea rezervărilor");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/appointments`, {
        user_id: user.id,
        message,
        date,
        time
      });
      setMessage('');
      setDate('');
      setTime('');
      fetchAppointments(user.id);
    } catch (err) {
      alert("Eroare la trimiterea rezervării");
    }
  };

  const handleCancel = (appointmentId) => {
    setSelectedAppointment(appointmentId);
    setShowConfirmation(true);
  };

  const handleCancelConfirm = async () => {
    if (!cancelReason) {
      alert('Te rugăm să selectezi un motiv pentru anulare!');
      return;
    }

    try {
      // Dacă motivul selectat este pentru review, direcționează utilizatorul către pagina de review
      if (cancelReason === 'Vreau să adaug un review') {
        // Anulează rezervarea
        await axios.delete(`${API_BASE_URL}/api/appointments/${selectedAppointment}`);
        setAppointments(appointments.filter((a) => a.id !== selectedAppointment));
        setShowConfirmation(false);
        setCancelReason('');
        navigate('/reviewurile-mele'); // Redirecționăm către pagina de reviewuri
      }
      else {
        // Dacă nu se alege review, doar anulăm
        await axios.delete(`${API_BASE_URL}/api/appointments/${selectedAppointment}`);
        setAppointments(appointments.filter((a) => a.id !== selectedAppointment));
        setShowConfirmation(false);
      }
    } catch (err) {
      console.error("Eroare la anularea rezervării");
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Rezervările mele</h2>
      <p><strong>Bun venit,</strong> {user ? user.name : 'Se încarcă...'}</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <h3>Adaugă o rezervare</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>Mesaj suplimentar:</label><br />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Ex: dureri lombare, vreau consult inițial"
            style={{ width: '100%', padding: '8px', minHeight: '60px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Data:</label><br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Ora:</label><br />
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          >
           {[
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00"
].map((ora) => {
  const ocupat = getBusyHours().includes(ora);
  return (
    <option
      key={ora}
      value={ocupat ? "" : ora}
      disabled={ocupat}
      style={ocupat ? { color: "red", fontWeight: "bold" } : {}}
    >
      {ocupat ? `${ora} – Ocupat` : ora}
    </option>
  );
})}

          </select>
        </div>

        <button type="submit" className="submit">
          Trimite rezervare
        </button>
      </form>
	<div style={{ margin: '20px 0', textAlign: 'center' }}>
  <p>
    Vrei să îți vezi orarul programărilor pe următoarea perioadă?{' '}
    <Link to="/orarul-meu" style={{ color: '#1976d2', fontWeight: 'bold' }}>
      Vezi Orarul Meu
    </Link>
  </p>
</div>

      <h3>Lista rezervărilor tale</h3>
      <ul>
        {appointments.length === 0 ? (
          <li>Nu ai nicio rezervare momentan.</li>
        ) : (
          appointments.map((r) => (
            <li key={r.id} className="appointment">
              <div className="details">
                <span>{r.date} – {r.time} – "{r.message}" – 
                  <span style={{ color: r.confirmed ? "green" : "gray" }} >
                    {r.confirmed ? `Confirmată – ${r.time} → ${calculateEndTime(r.time, r.duration_minutes)}` : "Neconfirmată"}
                  </span>
                </span>
              </div>
              <button className="cancel" onClick={() => handleCancel(r.id)}>
                Anulează
              </button>
            </li>
          ))
        )}
      </ul>

      {showConfirmation && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
          <h3>Confirmă anularea</h3>
          <p>Selectează un motiv pentru anulare:</p>
          <select onChange={(e) => setCancelReason(e.target.value)} value={cancelReason} style={{ width: '100%', padding: '8px' }}>
            <option value="">-- Alege motivul --</option>
            <option value="Am selectat data/ora greșită">Am selectat data/ora greșită</option>
            <option value="Vreau să adaug un review">Vreau să adaug un review</option>
          </select>

          {cancelReason === 'Vreau să adaug un review' && (
            <button
              onClick={handleCancelConfirm}
              style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '5px' }}
            >
              Adaugă Review și Anulează
            </button>
          )}

          {cancelReason === 'Am selectat data/ora greșită' && (
            <button
              onClick={handleCancelConfirm}
              style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}
            >
              Confirmă anularea
            </button>
          )}

          <div style={{ marginTop: '15px' }}>
            <button onClick={() => setShowConfirmation(false)} style={{ padding: '10px 20px', backgroundColor: '#999', color: 'white', border: 'none', borderRadius: '5px', marginLeft: '10px' }}>
              Anulează
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RezervarileMele;
