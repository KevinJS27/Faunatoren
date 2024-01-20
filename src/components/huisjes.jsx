// Huisjes.jsx
import React, { useState, useEffect } from 'react';
import torenDAL from "./../DAL/torensDAL.js";
import './../style/components/basicForm.scss';
import './../style/components/huisjes.scss';
import './../style/components/dialog.scss';

const Huisjes = () => {
  const [huisjes, setHuisjes] = useState([
    { id: 1, toren: 'Toren 1', naam: 'Huisje 1' },
    { id: 2, toren: 'Toren 2', naam: 'Huisje 2' },
  ]);

  const [editHuisje, setEditHuisje] = useState(null);
  const [nieuwHuisje, setNieuwHuisje] = useState({ toren: '', naam: '' });
  const [torens, setTorens] = useState();

  const torenOpties = ['Toren 1', 'Toren 2', 'Toren 3', 'Toren 4'];


  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteHuisjeNaam, setDeleteHuisjeNaam] = useState(null);

  useEffect(() => {
    const fetchTorens = async () => {
      // Use the Read function from huisjeDAL
      const torensDALInstance = new torenDAL();

      // Use the functions from the HuisjesDAL component
      const TorensData = await torensDALInstance.readData();
      setTorens(TorensData);
    };

    fetchTorens();
  }, []); // Empty dependency array to run only on mount


  const handleToevoegen = () => {
    if (nieuwHuisje.toren === '') {
      alert('Selecteer eerst een toren!');
      return;
    }

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

  const handleVerwijderen = naam => {
    setDeleteHuisjeNaam(naam);
    setShowDeleteDialog(true);
  };

  const handleConfirmVerwijderen = () => {

    const huisjeToDelete = huisjes.find(huis => huis.naam === deleteHuisjeNaam)

    if (huisjeToDelete) {
      const inputNaam = document.getElementById('huisInput').value.trim();

      if (inputNaam === deleteHuisjeNaam) {
        const gefilterdeHuisjes = huisjes.filter(huis => huis.naam !== deleteHuisjeNaam);
        setHuisjes(gefilterdeHuisjes);
        setShowDeleteDialog(false);
        setDeleteHuisjeNaam(null);
      } else {
        alert('De ingevoerde huisjesnaam komt niet overeen. Probeer opnieuw')
      }
    }
  };

  const handleCancelVerwijderen = () => {
    setShowDeleteDialog(false);
    setDeleteHuisjeNaam(null);
    setDeleteHuisjeNaam(null);
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
                  <span><b>{huis.toren}</b></span>
                  <span>{huis.naam}</span>
                  <button onClick={() => setEditHuisje(huis)}>Bijwerken</button>
                  <button onClick={() => handleVerwijderen(huis.naam)}>Verwijderen</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <div className="row">

          {/* Add/Edit */}
          <div className="col-12">
            <div className="form huisje-form">
              <h2>{editHuisje ? 'Vogelhuisje bijwerken' : 'Vogelhuisje toevoegen'}</h2>
              <div className='wr-inputs'>
                <div>
                  <label>Toren:</label>
                  {console.log(torens)}
                  <select
                    value={editHuisje ? editHuisje.toren : nieuwHuisje.toren}
                    onChange={e => (editHuisje ? setEditHuisje({ ...editHuisje, toren: e.target.value }) : setNieuwHuisje({ ...nieuwHuisje, toren: e.target.value }))}
                  >
                    <option value="" disabled>Selecteer een toren</option>
                    {torenOpties.map(optie => (
                      <option key={optie} value={optie}>
                        {optie}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Naam:</label>
                  <input
                    type="text"
                    value={editHuisje ? editHuisje.naam : nieuwHuisje.naam}
                    onChange={e => (editHuisje ? setEditHuisje({ ...editHuisje, naam: e.target.value }) : setNieuwHuisje({ ...nieuwHuisje, naam: e.target.value }))}
                  />
                </div>
              </div>

              {editHuisje ? (
                <>
                  <button onClick={handleBijwerken}>Bijwerken</button>
                  <button onClick={() => setEditHuisje(null)}>Annuleren</button>
                </>
                ) : (
                <button onClick={handleToevoegen}>Toevoegen</button>
              )}
            </div>
          </div>
        </div>
      </div >
      {showDeleteDialog && (
        <>
          <div className="dialog-backdrop" />
          <dialog open={showDeleteDialog}>
            <h2>U staat op het punt om "{deleteHuisjeNaam}" te verwijderen</h2>
            <h2>U staat op het punt om "{deleteHuisjeNaam}" te verwijderen</h2>
            <p>Voer de naam van het huisje in om het te verwijderen.
              Alle bijbehorende meet data van dit huisje worden ook verwijderd.</p>
            <input className="select" type="text" name="huisje" id="huisInput" /><br />
            <input className="select" type="text" name="huisje" id="huisInput" /><br />
            <button onClick={handleConfirmVerwijderen}>Ja</button>
            <button onClick={handleCancelVerwijderen}>Nee</button>
          </dialog>
        </>
      )
      };

    </>
  );
};

export default Huisjes;
