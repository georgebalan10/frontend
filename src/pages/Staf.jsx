// Staf.jsx
import React from 'react';

const staff = [
  {
    name: "Dr. Andrei Radu",
    title: "Kinetoterapeut senior",
    desc: "Peste 10 ani de experiență în recuperare medicală și terapie manuală.",
    img: "https://images.pexels.com/photos/6749771/pexels-photo-6749771.jpeg"
  },
  {
    name: "Elena Voicu",
    title: "Specialist masaj terapeutic",
    desc: "Ajută pacienții să-și recapete mobilitatea și starea de bine prin terapii personalizate.",
    img: "https://images.pexels.com/photos/3997983/pexels-photo-3997983.jpeg"
  },
  {
    name: "Bogdan Gimnastix",
    title: "Asistent fiziokinetoterapie",
    desc: "Specializat în recuperare sportivă și gimnastică medicală.",
    img: "https://images.pexels.com/photos/7659570/pexels-photo-7659570.jpeg"
  },
  {
    name: "Irina Stancu",
    title: "Nutriționist",
    desc: "Oferă planuri alimentare personalizate pentru susținerea recuperării și sănătății generale.",
    img: "https://images.pexels.com/photos/4498157/pexels-photo-4498157.jpeg"
  },
  {
    name: "Mihai Dumitrescu",
    title: "Fizioterapeut",
    desc: "Experiență vastă în tratamente post-operatorii și reabilitare ortopedică.",
    img: "https://images.pexels.com/photos/8442155/pexels-photo-8442155.jpeg"
  },
  {
    name: "Cristina Dobre",
    title: "Psiholog",
    desc: "Sprijină pacienții în procesul de recuperare prin consiliere psihologică.",
    img: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg"
  },
  {
    name: "Radu Marinescu",
    title: "Antrenor personal",
    desc: "Ghidează pacienții în exerciții fizice adaptate nevoilor lor specifice.",
    img: "https://images.pexels.com/photos/949129/pexels-photo-949129.jpeg"
  },
  {
  name: "Sorina Georgescu",
  title: "Specialist electroterapie",
  desc: "Aplică tratamente cu curenți terapeutici pentru reducerea durerilor și inflamațiilor.",
  img: "https://images.pexels.com/photos/8376295/pexels-photo-8376295.jpeg"

},
{
  name: "Larisa Mihailescu",
  title: "Consultant recuperare",
  desc: "Coordonează planurile de recuperare și relația cu pacienții.",
  img: "https://images.pexels.com/photos/4498231/pexels-photo-4498231.jpeg"  // Nouă imagine profesională
}
,
  {
    name: "Adrian Neagu",
    title: "Asistent medical",
    desc: "Asigură suport medical zilnic și monitorizarea pacienților.",
    img: "https://images.pexels.com/photos/8460092/pexels-photo-8460092.jpeg"
  }
];

function Staf() {
  return (
    <div style={{ padding: '40px' }}>
      <h2>Echipa noastră</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {staff.map((person, index) => (
          <div key={index} style={{ maxWidth: '300px', border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
            <img src={person.img} alt={person.name} style={{ width: '100%', borderRadius: '8px', marginBottom: '15px' }} />
            <h3>{person.name}</h3>
            <p><b>{person.title}</b></p>
            <p>{person.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Staf;
