// Huisjes.jsx
import React, { useState } from 'react';
import './../style/components/huisjes.scss';

const Huisjes = () => {
  const [huisjes, setHuisjes] = useState([
    { id: 1, toren: 'Toren 1', naam: 'Huisje 1' },
    { id: 2, toren: 'Toren 2', naam: 'Huisje 2' },
  ]);

  const [editHuisje, setEditHuisje] = useState(null);
  const [nieuwHuisje, setNieuwHuisje] = useState({ toren: '', naam: '' });

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteHuisjeId, setDeleteHuisjeId] = useState(null);

  const handleToevoegen = () => {
    setHuisjes([...huisjes, { id: Date.now(), ...nieuwHuisje }]);
    setNieuwHuisje({ toren: '', naam: '' });
  };

  const handleBijwerken = () => {
    const bijgewerkteHuisjes = huisjes.map(huis =>
      huis.id === editHuisje.id ? { ...huis, ...editHuisje } : huis
    );
    setHuisjes(bijgewerkteHuisjes);
    setEditHuisje(null);
  };

  const handleVerwijderen = id => {
    setDeleteHuisjeId(id);
    setShowDeleteDialog(true);
  };

  const handleConfirmVerwijderen = () => {
    const gefilterdeHuisjes = huisjes.filter(huis => huis.id !== deleteHuisjeId);
    setHuisjes(gefilterdeHuisjes);
    setShowDeleteDialog(false);
    setDeleteHuisjeId(null);
  };

  const handleCancelVerwijderen = () => {
    setShowDeleteDialog(false);
    setDeleteHuisjeId(null);
  };

  return (
    <>
      <div className="container huisjes-container">
        <div className="row">

          {/* View */}
          <div className="col-12">
            <h1>Huisjes</h1>
            <div className="huisjes-list">
              {huisjes.map(huis => (
                <div key={huis.id} className="huisje-item">
                  <span>{huis.toren}</span>
                  <span>{huis.naam}</span>
                  <button onClick={() => setEditHuisje(huis)}>Bewerken</button>
                  <button onClick={() => handleVerwijderen(huis.id)}>Verwijderen</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <div className="row">

          {/* View */}
          <div className="col-12">
            <div className="huisje-form">
              <h2>{editHuisje ? 'Bewerk Huisje' : 'Voeg Huisje Toe'}</h2>
              <label>Toren:</label>
              <select
                value={editHuisje ? editHuisje.toren : nieuwHuisje.toren}
                onChange={e => (editHuisje ? setEditHuisje({ ...editHuisje, toren: e.target.value }) : setNieuwHuisje({ ...nieuwHuisje, toren: e.target.value }))}
              >
                {beschikbareTorens.map(toren => (
                  <option key={toren.id} value={toren.naam}>
                    {toren.naam}
                  </option>
                ))}
              </select>
              <label>Naam:</label>
              <input
                type="text"
                value={editHuisje ? editHuisje.naam : nieuwHuisje.naam}
                onChange={e => (editHuisje ? setEditHuisje({ ...editHuisje, naam: e.target.value }) : setNieuwHuisje({ ...nieuwHuisje, naam: e.target.value }))}
              />
              {editHuisje ? (
                <button onClick={handleBijwerken}>Bijwerken</button>
              ) : (
                <button onClick={handleToevoegen}>Toevoegen</button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showDeleteDialog && (
        <>
          <div className="dialog-backdrop" />
          <dialog open={showDeleteDialog}>
            <p>Weet je zeker dat je dit huisje wilt verwijderen?</p>
            <button onClick={handleConfirmVerwijderen}>Ja</button>
            <button onClick={handleCancelVerwijderen}>Nee</button>
          </dialog>
        </>
      )};

    </>
  );
};

export default Huisjes;
