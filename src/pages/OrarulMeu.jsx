import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, parseISO, addMinutes } from 'date-fns';
import ro from 'date-fns/locale/ro';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import API_BASE_URL from "../config";

const locales = {
  'ro': ro,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function OrarulMeu() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get(`${API_BASE_URL}/api/appointments/${user.id}`);

        const mapped = res.data.appointments.map(app => {
          const start = parseISO(`${app.date}T${app.time}`);
          const durationMinutes = app.duration_minutes || 30;
          const end = addMinutes(start, durationMinutes);

          const formatTime = (date) => {
            return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
          };

          let title = `${formatTime(start)} - ${formatTime(end)}`;

          // ✅ Adăugăm tooltip pe "?"
          if (!app.confirmed) {
            title += ` `;  // spațiu
            title = (
              <span>
                {`${formatTime(start)} - ${formatTime(end)} `}
                <span title="Această programare nu este confirmată" style={{ cursor: 'help',color: 'white' }}>?</span>
              </span>
            );
          }

          return {
            title,
            start,
            end,
            confirmed: app.confirmed,
          };
        });

        setEvents(mapped);
      } catch (err) {
        console.error('Eroare la preluarea programărilor:', err);
      }
    };

    fetchAppointments();
  }, []);

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.confirmed ? '#3174ad' : '#ff4d4d',
      borderRadius: '5px',
      opacity: 0.9,
      color: 'white',
      border: '0',
      display: 'block',
    };
    return {
      style,
    };
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Orarul Meu (Vizualizare Lunară)</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={['month']}
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        eventPropGetter={eventStyleGetter}
      />
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '16px' }}>
        <p>
          <span style={{ color: '#ff4d4d', fontWeight: 'bold' }}>🔴 Neconfirmate:</span> Aceste programări necesită aprobarea cabinetului.
        </p>
        <p>
          <span style={{ color: '#3174ad', fontWeight: 'bold' }}>🔵 Confirmate:</span> Aceste programări sunt confirmate și valabile.
        </p>
      </div>
    </div>
  );
}

export default OrarulMeu;
