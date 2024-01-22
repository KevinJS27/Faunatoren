import React, { useState, useEffect } from "react";
import torensDAL from "./../DAL/torensDAL.js";
import "./../style/components/basicForm.scss";
import "./../style/components/torens.scss";
import "./../style/components/dialog.scss";

const Torens = () => {
  const [torensArray, setTorensArray] = useState([
    // { id: 1, naam: 'Toren 1', locatie: 'Amsterdam' },
    // { id: 2, naam: 'Toren 2', locatie: 'Utrecht' },
    // { id: 3, naam: 'Toren 3', locatie: 'Den Bosch' },
    // { id: 4, naam: 'Toren 4', locatie: 'Den Bosch' },
  ]);

  const [editToren, setEditToren] = useState(null);
  const [nieuweToren, setNieuweToren] = useState({ torenNaam: "", torenLocatie: "" });

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTorenNaam, setDeleteTorenNaam] = useState(null);

  // On page load
  useEffect(() => {
    const fetchTorens = async () => {
      // Use the Read function from huisjeDAL
      const torensDALInstance = new torensDAL();

      // Use the functions from the torensDAL class
      torensDALInstance.readData().then((result) => {
        console.log(result);
        setTorensArray(result);
      });
    };

    fetchTorens();
  }, []);

  // Check if input is valid and not an empty string
  const isNieuweTorenValid = () => {
    return nieuweToren.torenNaam.trim() !== "" && nieuweToren.torenLocatie.trim() !== "";
  };

  const handleNieuweTorenToevoegen = () => {
    // If input not valid, return
    if (!isNieuweTorenValid()) {
      alert("Vul alle velden in om een nieuwe toren toe te voegen.");
      return;
    }

    // nieuweToren
    const torenNaam = nieuweToren.torenNaam;
    const torenLocatie = nieuweToren.torenLocatie;

    const torensDALInstance = new torensDAL();
    torensDALInstance.insertData(torenNaam, torenLocatie).then((result) => {
      console.log(result);
    });

    // Use the functions from the torensDAL class
    torensDALInstance.readData().then((result) => {
      console.log(result);
      setTorensArray(result);
    });

    // Empty the user input forms
    setNieuweToren({ torenNaam: "", torenLocatie: "" });
  };

  const handleTorenBijwerken = async () => {
    // If editToren is null, return
    if (!editToren) {
      return;
    }

    // If input not valid, return
    if (editToren.torenNaam.trim() === "" || editToren.torenLocatie.trim() === "") {
      alert("Vul alle velden in om de toren bij te werken.");
      return;
    }

    // Find the index of the edited tower in the torensArray
    const editedTorenIndex = torensArray.findIndex((toren) => toren._id === editToren._id);

    // If the tower is found, create a new object with updated values
    if (editedTorenIndex === -1) {
      return;
    }

    // Make a new object that contains the old and new values of the toren
    const updatedToren = {
      ...torensArray[editedTorenIndex],
      newTorenNaam: editToren.torenNaam,
      newTorenLocatie: editToren.torenLocatie,
    };

    try {
      // Update database with new huisjes information
      const torensDALInstance = new torensDAL();
      await torensDALInstance.updateData(updatedToren.torenNaam, updatedToren.torenLocatie, updatedToren.newTorenLocatie, updatedToren.newTorenNaam);

      // Fetch and update huisjesArray after the state has been updated
      torensDALInstance.readData().then((result) => {
        setTorensArray(result);
      });

      // Reset the values in the input forms
      setEditToren(false);
    } catch (e) {
      console.log(e);
      setError({
        errorType: "add",
        errorText:
          "Er is een fout opgetreden bij het toevoegen van het huisje. Probeer het later nog eens.",
      });
    }
  };

  const handleTorenVerwijderen = (naam) => {
    setDeleteTorenNaam(naam);
    setShowDeleteDialog(true);
  };

  const handleConfirmVerwijderen = () => {
    const torenToDelete = torensArray.find(
      (toren) => toren.naam === deleteTorenNaam
    );

    if (torenToDelete) {
      const inputNaam = document.getElementById("torenInput").value.trim();

      if (inputNaam === deleteTorenNaam) {
        const gefilterdeTorens = torensArray.filter(
          (toren) => toren.naam !== deleteTorenNaam
        );
        setTorensArray(gefilterdeTorens);
        setShowDeleteDialog(false);
        setDeleteTorenNaam(null);
      } else {
        alert("De ingevoerde torennaam komt niet overeen. Probeer opnieuw.");
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
              {torensArray.map((toren) => (
                <div key={toren.id} className="toren-item">
                  <span>
                    <b>{toren.torenNaam}</b>
                  </span>
                  <span>{toren.torenLocatie}</span>
                  <span>Aantal huisjes: {toren.count}</span>
                  <button onClick={() => setEditToren(toren)}>Bijwerken</button>
                  <button onClick={() => handleTorenVerwijderen(toren.torenNaam)}>
                    Verwijderen
                  </button>
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
              <h2>{editToren ? "Toren bijwerken" : "Toren toevoegen"}</h2>

              <div className="wr-inputs">
                <div>
                  <label>Naam:</label>
                  <input
                    type="text"
                    value={editToren ? editToren.torenNaam : nieuweToren.torenNaam}
                    onChange={(e) =>
                      editToren
                        ? setEditToren({ ...editToren, torenNaam: e.target.value })
                        : setNieuweToren({ ...nieuweToren, torenNaam: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label>Locatie:</label>
                  <input
                    type="text"
                    value={editToren ? editToren.torenLocatie : nieuweToren.torenLocatie}
                    onChange={(e) =>
                      editToren
                        ? setEditToren({ ...editToren, torenLocatie: e.target.value })
                        : setNieuweToren({
                          ...nieuweToren, torenLocatie: e.target.value,
                        })
                    }
                  />
                </div>
              </div>

              {editToren ? (
                <>
                  <button onClick={handleTorenBijwerken}>Bijwerken</button>
                  <button onClick={() => setEditToren(null)}>Annuleren</button>
                </>
              ) : (
                <button onClick={handleNieuweTorenToevoegen}>Toevoegen</button>
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
            <p>
              Voer de naam van de toren in om het te verwijderen. Alle
              bijbehorende meet data van deze toren worden ook verwijderd.
            </p>
            <input
              className="select"
              type="text"
              name="toren"
              id="torenInput"
            />
            <br />
            <button onClick={handleConfirmVerwijderen}>Ja</button>
            <button onClick={handleCancelVerwijderen}>Nee</button>
          </dialog>
        </>
      )}
      ;
    </>
  );
};

export default Torens;
