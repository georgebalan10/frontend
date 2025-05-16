import React, { useState } from 'react';
import axios from "axios";
import API_BASE_URL from "../config";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    message: ''
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/api/send-email`, {
        name: formData.name,
        email: formData.email,
        subject: formData.title,
        message: formData.message
      });

      setStatus("success");
      setFormData({ name: '', email: '', title: '', message: '' });
    } catch (err) {
      console.error("Eroare la trimitere:", err);
      setStatus("error");
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Contact</h2>

      <div style={{ marginBottom: '30px' }}>
        <p><b>Adresă:</b> Str. Exemplu 123, Cluj-Napoca, România</p>
        <p><b>Telefon:</b> +40 720 123 456</p>
        <p><b>Email:</b> balangeorgem@yahoo.com</p>
        <p><b>Program:</b> Luni - Vineri: 09:00 - 18:00</p>
        <p><b>Locație:</b></p>
        <iframe
          title="locatie"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2724.4651513605714!2d23.594843615600425!3d46.77121017913859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490c295a0a3b6f%3A0x7de03a72e8c71f2a!2sCluj-Napoca!5e0!3m2!1sen!2sro!4v1672486781234"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Nume</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Subiect</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Mesaj</label>
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', minHeight: '120px' }}
          ></textarea>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Trimite mesaj
        </button>
      </form>

      {status === "success" && (
        <p style={{ color: "green", marginTop: '15px' }}>✅ Mesajul a fost trimis!</p>
      )}
      {status === "error" && (
        <p style={{ color: "red", marginTop: '15px' }}>❌ Eroare la trimitere. Încearcă din nou.</p>
      )}
    </div>
  );
}

export default Contact;
