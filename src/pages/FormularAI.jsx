import React, { useState } from 'react';
import { Bot, Send, HelpCircle } from 'lucide-react';
import './FormularAI.css'; // Stiluri doar pentru pagina asta
import API_BASE_URL from "../config";

function FormularAI() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Bun venit! Sunt asistentul AI al clinicii noastre de acupunctură. Cum te pot ajuta?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickQuestions = [
    'Ce tratează acupunctura?',
    'Cât durează o ședință?',
    'Este dureroasă acupunctura?',
    'Care sunt beneficiile acupuncturii?',
    'Există contraindicații?'
  ];

  const handleSend = async (text) => {
    if (!text) return;
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setLoading(true);

    try {
      const userId = localStorage.getItem('user_id'); // sau 'userId', în funcție de implementarea ta

const res = await fetch(`${API_BASE_URL}/api/chatbot`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: text, user_id: userId }),
});

      const data = await res.json();
      setMessages((prev) => [...prev, { from: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Eroare la conectare cu serverul.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="ai-page">
      <div className="ai-chat-container">
        <div className="ai-header">
          <Bot className="ai-bot-icon" />
          <h2>Chat AI - Consultanță rapidă</h2>
        </div>

        <div className="ai-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`ai-message ${msg.from}`}>
              <div className="ai-message-content">{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="ai-message bot">
              <div className="ai-message-content">Scriu răspunsul...</div>
            </div>
          )}
        </div>

        <div className="ai-quick-questions">
          {quickQuestions.map((q, idx) => (
            <button key={idx} onClick={() => handleSend(q)}>
              <HelpCircle className="ai-help-icon" /> {q}
            </button>
          ))}
        </div>

        <div className="ai-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrie întrebarea ta aici..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend(input);
                setInput('');
              }
            }}
          />
          <button
            onClick={() => {
              handleSend(input);
              setInput('');
            }}
          >
            <Send className="ai-send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormularAI;
