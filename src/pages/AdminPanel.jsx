import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import API_BASE_URL from "../config";

function AdminPanel() {
  const [appointments, setAppointments] = useState([]);
  const [durations, setDurations] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("day"); // 'day' or 'week'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || !storedUser.is_admin) {
      navigate("/");
    } else {
      fetchAppointments();
    }
  }, [navigate]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/appointments?date=${selectedDate.toISOString().split('T')[0]}`);
      setAppointments(res.data.appointments); // Get all appointments (confirmed and unconfirmed)
    } catch (err) {
      console.error("Eroare la preluarea rezervărilor:", err);
    }
  };

  const handleDayChange = (direction) => {
    let newDate = new Date(selectedDate);
    if (direction === 'next') {
      newDate.setDate(newDate.getDate() + 1); // Go to the next day
    } else {
      newDate.setDate(newDate.getDate() - 1); // Go to the previous day
    }
    setSelectedDate(newDate);
  };

  const handleWeekChange = (direction) => {
    let newDate = new Date(selectedDate);
    if (direction === 'next') {
      newDate.setDate(newDate.getDate() + 7); // Go to the next week
    } else {
      newDate.setDate(newDate.getDate() - 7); // Go to the previous week
    }
    setSelectedDate(newDate);
  };

  const groupByDate = (appointments) => {
    const grouped = {};
    appointments.forEach((a) => {
      if (!grouped[a.date]) {
        grouped[a.date] = [];
      }
      grouped[a.date].push(a);
    });

    return Object.keys(grouped)
      .sort((a, b) => new Date(a) - new Date(b))
      .map(date => ({
        date,
        items: grouped[date]
          .filter((a) => a.user_name.toLowerCase().includes(searchTerm.toLowerCase()))
          .sort((a, b) => a.time.localeCompare(b.time)),
      }));
  };

  const formatDateLabel = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ro-RO", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const confirmAppointment = async (id) => {
    const selectedDuration = durations[id];
    if (!selectedDuration) {
      alert("Te rog selectează o durată pentru această rezervare.");
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/api/admin/appointments/${id}`, {
        duration_minutes: parseInt(selectedDuration),
        confirmed: true, // Actualizare pentru a marca rezervarea ca fiind confirmată
      });
      fetchAppointments();
    } catch (err) {
      console.error("Eroare la confirmare:", err);
    }
  };

  const cancelAppointment = async (id) => {
    if (window.confirm("Sigur vrei să anulezi această rezervare?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/appointments/${id}`);
        fetchAppointments();
      } catch (err) {
        console.error("Eroare la anularea rezervării:", err);
      }
    }
  };

  const renderDayView = () => {
    const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    const filteredAppointments = appointments.filter(a => a.date === selectedDate.toISOString().split('T')[0] && a.confirmed === true); // Filter by the selected day

    return (
      <table className="daily-table">
        <thead>
          <tr>
            {hours.map(hour => <th key={hour}>{hour}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {hours.map(hour => {
              const appointment = filteredAppointments.find(a => a.time === hour); // Show only confirmed for the selected day
              return (
                <td key={hour} className={appointment ? 'occupied' : ''}>
                  {appointment ? `${appointment.user_name} - ${appointment.time}` : ''}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  };

  const renderWeekView = () => {
    const daysOfWeek = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'];
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1); // Set to Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Sunday

    // Filter appointments for the selected week (from Monday to Sunday)
    const filteredAppointments = appointments.filter(a => {
      const appointmentDate = new Date(a.date);
      return appointmentDate >= startOfWeek && appointmentDate <= endOfWeek && a.confirmed === true;
    });

    return (
      <table className="weekly-table">
        <thead>
          <tr>
            {daysOfWeek.map(day => <th key={day}>{day}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {daysOfWeek.map((day, idx) => {
              const appointmentsForDay = filteredAppointments.filter(a => {
                const appointmentDate = new Date(a.date);
                return appointmentDate.getDay() === (startOfWeek.getDay() + idx) % 7;
              });
              return (
                <td key={day}>
                  {appointmentsForDay.map(a => <div key={a.id}>{a.user_name} - {a.time}</div>)}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  };

  const formatWeekLabel = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Set to Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to Sunday

    const formatDate = (d) => {
      return d.toLocaleDateString("ro-RO", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    return `Săptămâna: ${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
  };

  return (
    <div style={{ padding: "30px" }}>
      <h3>
        {viewMode === 'day'
          ? `Ziua: ${formatDateLabel(selectedDate.toISOString())}`
          : formatWeekLabel(selectedDate)}
      </h3>
      <div>
        <button onClick={() => setViewMode('day')}>Vizualizare pe zi</button>
        <button onClick={() => setViewMode('week')}>Vizualizare pe săptămână</button>
      </div>
      <div>
        {viewMode === 'day' ? renderDayView() : renderWeekView()}
      </div>

      <div className="navigation-buttons">
        <button onClick={() => handleDayChange('prev')}>Ziua/Săptămâna anterioară</button>
        <button onClick={() => handleDayChange('next')}>Ziua/Săptămâna următoare</button>
      </div>

      <div className="search-box" style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Căută după nume client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <h3>Lista rezervărilor tale</h3>
      {groupByDate(appointments).map((group) => (
        <div key={group.date} className="appointments-day">
          <h3>{group.date}</h3>
          <ul>
            {group.items.length === 0 ? (
              <p>Nicio rezervare pentru acest client în această zi.</p>
            ) : (
              group.items.map((a) => {
                const startTime = new Date(`2025-01-01T${a.time}:00`);
                const endTime = new Date(startTime.getTime() + (a.duration_minutes * 60000)); // Add duration

                const endTimeStr = endTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <li key={a.id} className="appointment-item">
                    {a.time} – {endTimeStr} – "{a.message}" – <b>{a.user_name}</b> –{" "}
                    <strong>{a.confirmed ? 'Confirmată' : 'Neconfirmată'}</strong>
                    {!a.confirmed && (
                      <>
                        <select
                          value={durations[a.id] || ""}
                          onChange={(e) => setDurations({ ...durations, [a.id]: e.target.value })}
                          style={{ marginLeft: '10px' }}
                        >
                          <option value="">Durată</option>
                          <option value="30">30 min</option>
                          <option value="45">45 min</option>
                          <option value="60">60 min</option>
                        </select>
                        <button
                          onClick={() => confirmAppointment(a.id)}
                          style={{
                            marginLeft: '10px',
                            padding: '5px 12px',
                            backgroundColor: 'green',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                        >
                          Confirmă
                        </button>
                      </>
                    )}
                    <button onClick={() => cancelAppointment(a.id)} className="cancel-button">
                      Anulează
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
