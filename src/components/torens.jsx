// torens.jsx
import React, { useState } from 'react';
import './../style/components/torens.scss';

const Torens = () => {
  const [torens, setTorens] = useState([
    { id: 1, naam: 'Toren 1', huisjes: 5, locatie: 'Amsterdam' },
    { id: 2, naam: 'Toren 2', huisjes: 8, locatie: 'Utrecht' },
    // ... voeg meer torens toe zoals nodig
  ]);

  const [editToren, setEditToren] = useState(null);
  const [nieuweToren, setNieuweToren] = useState({ naam: '', huisjes: 0, locatie: '' });

  const handleToevoegen = () => {
    setTorens([...torens, { id: Date.now(), ...nieuweToren }]);
    setNieuweToren({ naam: '', huisjes: 0, locatie: '' });
  };

  const handleBijwerken = () => {
    const updatedTorens = torens.map(toren =>
      toren.id === editToren.id ? { ...toren, ...editToren } : toren
    );
    setTorens(updatedTorens);
    setEditToren(null);
  };

  const handleVerwijderen = id => {
    const filteredTorens = torens.filter(toren => toren.id !== id);
    setTorens(filteredTorens);
  };

  return (
    <div className="torens-container">
      <h1>Torens</h1>
      <div className="torens-list">
        {torens.map(toren => (
          <div key={toren.id} className="toren-item">
            <span>{toren.naam}</span>
            <span>{toren.huisjes} huisjes</span>
            <span>{toren.locatie}</span>
            <button onClick={() => setEditToren(toren)}>Bewerken</button>
            <button onClick={() => handleVerwijderen(toren.id)}>Verwijderen</button>
          </div>
        ))}
      </div>
      <div className="toren-form">
        <h2>{editToren ? 'Bewerk Toren' : 'Voeg Toren Toe'}</h2>
        <label>Naam:</label>
        <input
          type="text"
          value={editToren ? editToren.naam : nieuweToren.naam}
          onChange={e => (editToren ? setEditToren({ ...editToren, naam: e.target.value }) : setNieuweToren({ ...nieuweToren, naam: e.target.value }))}
        />
        <label>Aantal Huisjes:</label>
        <input
          type="number"
          value={editToren ? editToren.huisjes : nieuweToren.huisjes}
          onChange={e => (editToren ? setEditToren({ ...editToren, huisjes: parseInt(e.target.value) }) : setNieuweToren({ ...nieuweToren, huisjes: parseInt(e.target.value) }))}
        />
        <label>Locatie:</label>
        <input
          type="text"
          value={editToren ? editToren.locatie : nieuweToren.locatie}
          onChange={e => (editToren ? setEditToren({ ...editToren, locatie: e.target.value }) : setNieuweToren({ ...nieuweToren, locatie: e.target.value }))}
        />
        {editToren ? (
          <button onClick={handleBijwerken}>Bijwerken</button>
        ) : (
          <button onClick={handleToevoegen}>Toevoegen</button>
        )}
      </div>
    </div>
  );
};

export default Torens;

