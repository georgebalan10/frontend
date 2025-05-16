import React from 'react';


function Servicii() {
  const servicii = [
    {
      titlu: "Consult Acupunctură",
      descriere: "Evaluare inițială, stabilirea punctelor de tratament și recomandări personalizate.",
      pret: "150 RON"
    },
    {
      titlu: "Ședință Acupunctură",
      descriere: "Tratament standard cu ace pentru echilibrarea energiei Qi și reducerea durerii.",
      pret: "180 RON"
    },
    {
      titlu: "Moxibustie (Terapie prin căldură)",
      descriere: "Aplicarea de căldură pe puncte energetice cu ajutorul pelinului ars.",
      pret: "130 RON"
    },
    {
      titlu: "Presopunctură",
      descriere: "Masaj terapeutic pe punctele de acupunctură fără utilizarea acelor.",
      pret: "120 RON"
    },
    {
      titlu: "Electro-Acupunctură",
      descriere: "Stimulare electrică ușoară aplicată acelor de acupunctură pentru rezultate amplificate.",
      pret: "200 RON"
    },
    {
      titlu: "Auriculopunctură",
      descriere: "Aplicarea acelor în punctele reflexogene ale urechii – eficientă pentru stres, slăbit, renunțare la fumat.",
      pret: "140 RON"
    },
    {
      titlu: "Terapie cu soft-laser",
      descriere: "Stimulare blândă cu laser pe punctele de acupunctură, fără durere – potrivit pentru copii și vârstnici.",
      pret: "160 RON"
    },
    {
      titlu: "Homeosiniatrie",
      descriere: "Injectarea unor substanțe homeopate în punctele de acupunctură – tehnică avansată.",
      pret: "190 RON"
    },
    {
      titlu: "Reflexoterapie plantară",
      descriere: "Masaj al punctelor reflexe de pe talpă pentru stimularea organelor interne.",
      pret: "110 RON"
    },
    {
      titlu: "Hipno-Acupunctură",
      descriere: "Combinație între sugestie hipnotică și acupunctură, utilizată pentru anxietate sau adicții.",
      pret: "210 RON"
    }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
      <h2>Serviciile noastre</h2>
      <p style={{ marginBottom: '30px' }}>
        Oferim servicii profesionale de acupunctură și terapii complementare, adaptate nevoilor individuale ale fiecărui pacient.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {servicii.map((s, index) => (
          <div key={index} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>{s.titlu}</h3>
            <p>{s.descriere}</p>
            <p><b>Preț:</b> {s.pret}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicii;
