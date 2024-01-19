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
  const [deleteTorenId, setDeleteTorenId] = useState(null);

  const isNieuweTorenValid = () => {
    return nieuweToren.naam.trim() !== '' && nieuweToren.locatie.trim() !== '';
  };

  const handleToevoegen = () => {
    if (isNieuweTorenValid()) {
      setTorens([...torens, { id: Date.now(), ...nieuweToren }]);
      setNieuweToren({ naam: '', locatie: ''});
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

  const handleVerwijderen = id => {
    setDeleteTorenId(id);
    setShowDeleteDialog(true);
    setDeleteTorenId(null);
  };

  const handleConfirmVerwijderen = () => {
    const gefilterdeTorens = torens.filter(toren => toren.id !== deleteTorenId);
    setTorens(gefilterdeTorens);
    setShowDeleteDialog(false);
    setDeleteTorenId(null);
  };

  const handleCancelVerwijderen = () => {
    setShowDeleteDialog(false);
    setDeleteTorenId(null);
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
                  <button onClick={() => setEditToren(toren)}>Bewerken</button>
                  <button onClick={() => handleVerwijderen(toren.id)}>Verwijderen</button>
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
            {console.log(torens)}
            {console.log(deleteTorenId)}
            <h2>U staat op het punt om "{deleteTorenId.naam}" te verwijderen</h2>
            <p>Voer de naam van de toren in om het te verwijderen.
              Alle bijbehorende meet data van deze toren worden ook verwijderd.</p>
            <input className="select" type="text" name="toren" id="" /><br />
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

