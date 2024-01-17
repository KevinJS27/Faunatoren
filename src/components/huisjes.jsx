// Huisjes.jsx
import React, { useState } from 'react';
import './../style/components/huisjes.scss';

const Huisjes = () => {
  const [huisjes, setHuisjes] = useState([
    { id: 1, toren: 'Toren 1', locatie: 'Amsterdam', aantal: 3 },
    { id: 2, toren: 'Toren 2', locatie: 'Utrecht', aantal: 5 },
  ]);

  const [editHuisje, setEditHuisje] = useState(null);
  const [nieuwHuisje, setNieuwHuisje] = useState({ toren: '', locatie: '', aantal: 0 });

  const handleToevoegen = () => {
    setHuisjes([...huisjes, { id: Date.now(), ...nieuwHuisje }]);
    setNieuwHuisje({ toren: '', locatie: '', aantal: 0 });
  };

  const handleBijwerken = () => {
    const bijgewerkteHuisjes = huisjes.map(huis =>
      huis.id === editHuisje.id ? { ...huis, ...editHuisje } : huis
    );
    setHuisjes(bijgewerkteHuisjes);
    setEditHuisje(null);
  };

  const handleVerwijderen = id => {
    const gefilterdeHuisjes = huisjes.filter(huis => huis.id !== id);
    setHuisjes(gefilterdeHuisjes);
  };

  return (
    <div className="huisjes-container">
      <h1>Huisjes</h1>
      <div className="huisjes-list">
        {huisjes.map(huis => (
          <div key={huis.id} className="huisje-item">
            <span>{huis.toren}</span>
            <span>{huis.locatie}</span>
            <span>{huis.aantal} huisjes</span>
            <button onClick={() => setEditHuisje(huis)}>Bewerken</button>
            <button onClick={() => handleVerwijderen(huis.id)}>Verwijderen</button>
          </div>
        ))}
      </div>
      <div className="huisje-form">
        <h2>{editHuisje ? 'Bewerk Huisje' : 'Voeg Huisje Toe'}</h2>
        <label>Toren:</label>
        <input
          type="text"
          value={editHuisje ? editHuisje.toren : nieuwHuisje.toren}
          onChange={e => (editHuisje ? setEditHuisje({ ...editHuisje, toren: e.target.value }) : setNieuwHuisje({ ...nieuwHuisje, toren: e.target.value }))}
        />
        <label>Locatie:</label>
        <input
          type="text"
          value={editHuisje ? editHuisje.locatie : nieuwHuisje.locatie}
          onChange={e => (editHuisje ? setEditHuisje({ ...editHuisje, locatie: e.target.value }) : setNieuwHuisje({ ...nieuwHuisje, locatie: e.target.value }))}
        />
        <label>Aantal Huisjes:</label>
        <input
          type="number"
          value={editHuisje ? editHuisje.aantal : nieuwHuisje.aantal}
          onChange={e => (editHuisje ? setEditHuisje({ ...editHuisje, aantal: parseInt(e.target.value) }) : setNieuwHuisje({ ...nieuwHuisje, aantal: parseInt(e.target.value) }))}
        />
        {editHuisje ? (
          <button onClick={handleBijwerken}>Bijwerken</button>
        ) : (
          <button onClick={handleToevoegen}>Toevoegen</button>
        )}
      </div>
    </div>
  );
};

export default Huisjes;
