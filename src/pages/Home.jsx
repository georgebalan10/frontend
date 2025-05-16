import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Bine ai venit la Clinica Fictivă!</h1>
      <p>
        Înființată în 2020, Clinica Fictivă este un punct de referință în terapiile alternative și recuperarea medicală.
        Suntem printre puținii din România care oferă servicii complete de acupunctură, susținute de atestate și formări internaționale,
        cu personal certificat și echipamente moderne.
      </p>
      <p>
        La noi găsești o abordare personalizată și empatică, indiferent dacă ai nevoie de recuperare post-operatorie, echilibrare energetică
        sau pur și simplu relaxare profundă.
      </p>

      <h2>Ce este acupunctura?</h2>
      <p>
        Acupunctura este o practică medicală tradițională chinezească ce presupune stimularea anumitor puncte de pe corp, de-a lungul
        meridianelor energetice, prin înțepare cu ace fine. Scopul este restabilirea echilibrului energetic și îmbunătățirea sănătății
        fizice și mentale.
      </p>
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
  <h3>🎥 Videoclipuri explicative despre acupunctură</h3>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/lUMuhXq7D0M"
      title="Video 1"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/XAq-Y_R_0Ic?start=1215"
      title="Video 2"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</div>


      <h2>Nu știi de unde să începi?</h2>
      <p>
        Dacă ești curios/curioasă să încerci acupunctura sau alte terapii, dar nu știi exact cum funcționează, îți oferim mai multe opțiuni:
      </p>
      <ul>
        <li>
          👤{' '}
          <Link to="/register">
            Creează-ți un cont
          </Link>{' '}
          – vei avea acces la programări, orarul tău și recomandări personalizate.
        </li>
        <li>
          ✉️{' '}
          <Link to="/contact">
            Contactează-ne
          </Link>{' '}
          și te vom apela noi pe email pentru detalii suplimentare.
        </li>
        <li>
          📞 Sau ne poți suna direct – numărul nostru de telefon este vizibil pe site și suntem disponibili în timpul programului cabinetului.
        </li>
      </ul>

      <p style={{ marginTop: '30px', fontStyle: 'italic' }}>
        Clinica Fictivă – pentru o viață echilibrată, din interior spre exterior.
      </p>
    </div>
  );
}

export default Home;
