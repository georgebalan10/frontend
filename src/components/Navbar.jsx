import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css'; // Importăm fișierul CSS

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();  // Folosim useLocation pentru a verifica ruta curentă
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div>
        <h2 style={{ marginBottom: '20px' }}>Meniu</h2>
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Acasa</Link>
          <Link to="/staf" className={location.pathname === '/staf' ? 'active' : ''}>Staf</Link>
          <Link to="/servicii" className={location.pathname === '/servicii' ? 'active' : ''}>Servicii</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>

          {user && user.is_admin ? (
            <>
              <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Rezervările clienților</Link>
              <Link to="/admin/reviews" className={location.pathname === '/admin/reviews' ? 'active' : ''}>Review-urile clienților</Link>
              <Link to="/admin/date-clienti" className={location.pathname === '/admin/date-clienti' ? 'active' : ''}>Datele introduse de clienți</Link>
	      <Link to="/admin/reports-ai" className={location.pathname === '/admin/reports-ai' ? 'active' : ''}>Rapoarte AI</Link>
            </>
          ) : user ? (
            <>
              <Link to="/rezervari" className={location.pathname === '/rezervari' ? 'active' : ''}>Rezervările mele</Link>
		<Link to="/orarul-meu" className={location.pathname === '/orarul-meu' ? 'active' : ''}>Orarul Meu</Link>
              <Link to="/reviewurile-mele" className={location.pathname === '/reviewurile-mele' ? 'active' : ''}>Review-urile mele</Link>
              <Link to="/user-settings" className={location.pathname === '/user-settings' ? 'active' : ''}>Datele mele</Link>
	     <Link to="/form-ai" className={location.pathname === '/form-ai' ? 'active' : ''}>Formular AI</Link>
            </>
          ) : null}
        </nav>
      </div>

      <div>
        <b>Contul meu</b>
        {user ? (
          <div style={{ marginTop: '10px', fontSize: '14px' }}>
            <div><b>{user.name}</b></div>
            <div>{user.email}</div>
            <button
              onClick={handleLogout}
              className="logout"
            >
              Logout
            </button>
          </div>
        ) : (
          <div style={{ fontSize: '12px', color: 'gray', marginTop: '10px' }}>
            <button className="login" onClick={() => navigate('/login')}>Conectare</button>
            <button className="register" onClick={() => navigate('/register')}>Înregistrare</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
