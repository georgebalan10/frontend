import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../config";


function ReviewurileMele() {
  const [user, setUser] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
    } else {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      fetchReviews(parsed.id);
    }
  }, [navigate]);

  const fetchReviews = async (userId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/reviews/${userId}`);
      setReviews(res.data.reviews);
    } catch (err) {
      console.error("Eroare la preluarea review-urilor");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/reviews`, {
        user_id: user.id,
        content: reviewText,
        rating: rating
      });
      setReviewText('');
      setRating(0);
      fetchReviews(user.id);
    } catch (err) {
      alert("Eroare la trimiterea review-ului");
    }
  };

  const renderStars = (count) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  if (!user) return <p>Se încarcă...</p>;

  return (
    <div style={{ padding: '30px' }}>
      <h2>Review-urile mele</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <h3>Lasă un review</h3>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          placeholder="Scrie impresiile tale despre serviciile oferite..."
          style={{ width: '100%', minHeight: '80px', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />

        <div style={{ marginTop: '10px' }}>
          <label><b>Nota (1 - 5):</b></label><br />
          {[1, 2, 3, 4, 5].map((val) => (
            <span
              key={val}
              style={{
                cursor: 'pointer',
                fontSize: '24px',
                color: val <= rating ? '#f39c12' : '#ccc'
              }}
              onClick={() => setRating(val)}
            >
              ★
            </span>
          ))}
        </div>

        <button
          type="submit"
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Trimite review
        </button>
      </form>

      <h3>Istoric review-uri</h3>
      {reviews.length === 0 ? (
        <p>Nu ai adăugat niciun review încă.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {reviews.map((r) => (
            <div key={r.id} style={{
              backgroundColor: '#f5f5f5',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}>
              <div style={{ fontSize: '18px', color: '#f39c12' }}>{renderStars(r.rating)}</div>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewurileMele;
