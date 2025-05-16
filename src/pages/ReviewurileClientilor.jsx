import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config";

function ReviewurileClientilor() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      if (u.is_admin) {
        setUser(u);
        fetchAllReviews();
      }
    }
  }, []);

  const fetchAllReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/reviews`);
      setReviews(res.data.reviews);
    } catch (err) {
      console.error("Eroare la încărcarea review-urilor");
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const sortedFiltered = reviews
    .filter(r => r.rating >= minRating)
    .sort((a, b) => sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating);

  if (!user || !user.is_admin) {
    return <p>Acces restricționat.</p>;
  }

  return (
    <div style={{ padding: '30px' }}>
      <h2>Review-urile clienților</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
        <div>
          <label>Sortare după notă: </label>
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="desc">Descrescător</option>
            <option value="asc">Crescător</option>
          </select>
        </div>
        <div>
          <label>Filtrare de la nota minimă: </label>
          <select value={minRating} onChange={e => setMinRating(Number(e.target.value))}>
            {[0,1,2,3,4,5].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      {sortedFiltered.length === 0 ? (
        <p>Nu există review-uri pentru criteriile selectate.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {sortedFiltered.map((r) => (
            <div key={r.id} style={{
              backgroundColor: '#f9f9f9',
              padding: '15px',
              border: '1px solid #ccc',
              borderRadius: '8px'
            }}>
              <strong>{r.user_name}</strong> – <i>{r.date}</i>
              <div style={{ color: '#f39c12', fontSize: '18px' }}>
                {renderStars(r.rating)}
              </div>
              <p style={{ marginTop: '8px' }}>{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewurileClientilor;
