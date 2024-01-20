// torens.jsx
import React, { useState } from 'react';
import './../style/components/basicForm.scss';
import './../style/components/torens.scss';
import './../style/components/dialog.scss';

const Torens = () => {
  const [torens, setTorens] = useState([
    { id: 1, naam: 'Toren 1', locatie: 'Amsterdam' },
    { id: 2, naam: 'Toren 2', locatie: 'Utrecht' },
    { id: 3, naam: 'Toren 3', locatie: 'Den Bosch' },
    { id: 4, naam: 'Toren 4', locatie: 'Den Bosch' },
  ]);

  const [editToren, setEditToren] = useState(null);
  const [nieuweToren, setNieuweToren] = useState({ naam: '', locatie: '' });

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTorenNaam, setDeleteTorenNaam] = useState(null);

  const isNieuweTorenValid = () => {
    return nieuweToren.naam.trim() !== '' && nieuweToren.locatie.trim() !== '';
  };

  const handleToevoegen = () => {
    if (isNieuweTorenValid()) {
      setTorens([...torens, { id: Date.now(), ...nieuweToren }]);
      setNieuweToren({ naam: '', locatie: '' });
    } else {
      alert('Vul alle velden in om een nieuwe toren toe te voegen.');
    }
  };


  const handleBijwerken = () => {
    const updatedTorens = torens.map(toren =>
      toren.id === editToren.id ? { ...toren, ...editToren } : toren
    );
    setTorens(updatedTorens);
    setEditToren(null);
  };

  const handleVerwijderen = naam => {
    setDeleteTorenNaam(naam);
    setShowDeleteDialog(true);
  };

  const handleConfirmVerwijderen = () => {

    const torenToDelete = torens.find(toren => toren.naam === deleteTorenNaam);

    if (torenToDelete) {
      const inputNaam = document.getElementById('torenInput').value.trim();

      if (inputNaam === deleteTorenNaam) {
        const gefilterdeTorens = torens.filter(toren => toren.naam !== deleteTorenNaam);
        setTorens(gefilterdeTorens);
        setShowDeleteDialog(false);
        setDeleteTorenNaam(null);
      } else {
        alert('De ingevoerde torennaam komt niet overeen. Probeer opnieuw.');
      }
    }
  };

    const handleCancelVerwijderen = () => {
      setShowDeleteDialog(false);
      setDeleteTorenNaam(null);
    };

    return (
      <>
        <div className="container torens-container">
          <div className="row">

            {/* View */}
            <div className="col-12">
              <h1>Torens</h1>
              <div className="torens-list">
                {torens.map(toren => (
                  <div key={toren.id} className="toren-item">
                    <span><b>{toren.naam}</b></span>
                    <span>{toren.locatie}</span>
                    <button onClick={() => setEditToren(toren)}>Bijwerken</button>
                    <button onClick={() => handleVerwijderen(toren.naam)}>Verwijderen</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr />

          {/* Toren toevoegen */}
          <div className="row">
            <div className="col-12">
              <div className="form toren-form">
                <h2>{editToren ? 'Toren bijwerken' : 'Toren toevoegen'}</h2>
                <label>Naam:</label>
                <input
                  type="text"
                  value={editToren ? editToren.naam : nieuweToren.naam}
                  onChange={e => (editToren ? setEditToren({ ...editToren, naam: e.target.value }) : setNieuweToren({ ...nieuweToren, naam: e.target.value }))}
                />
                <label>Locatie:</label>
                <input
                  type="text"
                  value={editToren ? editToren.locatie : nieuweToren.locatie}
                  onChange={e => (editToren ? setEditToren({ ...editToren, locatie: e.target.value }) : setNieuweToren({ ...nieuweToren, locatie: e.target.value }))}
                />
                {editToren ? (
                  <>
                    <button onClick={handleBijwerken}>Bijwerken</button>
                    <button onClick={() => setEditToren(null)}>Annuleren</button>
                  </>                
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
              <h2>U staat op het punt om "{deleteTorenNaam}" te verwijderen</h2>
              <p>Voer de naam van de toren in om het te verwijderen.
                Alle bijbehorende meet data van deze toren worden ook verwijderd.</p>
              <input className="select" type="text" name="toren" id="torenInput" /><br />
              <button onClick={handleConfirmVerwijderen}>Ja</button>
              <button onClick={handleCancelVerwijderen}>Nee</button>
            </dialog>
          </>
        )
        };
      </>
    );
  };


  export default Torens;

