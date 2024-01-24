import React, { useState, useEffect } from "react";
import torensDAL from "./../DAL/torensDAL.js";
import "./../style/components/basicForm.scss";
import "./../style/components/torens.scss";
import "./../style/components/dialog.scss";

const Torens = () => {
  const [torensArray, setTorensArray] = useState([]);

  const [editToren, setEditToren] = useState(null);
  const [nieuweToren, setNieuweToren] = useState({ torenNaam: "", torenLocatie: "" });

  // A text to display message to the usser
  const [error, setError] = useState({ errorType: "", errorText: "" });

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTorenNaam, setDeleteTorenNaam] = useState(null);

  // Current toren that the user wants to delete
  const [torenToDelete, setTorenToDelete] = useState(null);

  // On page load
  useEffect(() => {
    const fetchTorens = async () => {
      try {
        // Use the Read function from huisjeDAL
        const torensDALInstance = new torensDAL();

        // Use the functions from the torensDAL class
        torensDALInstance.readData().then((result) => {
          console.log(result);
          setTorensArray(result);
        });
      }
      catch (e) {
        setError({ errorType: "global", errorText: "Er is een fout opgetreden bij het ophalen van de gegevens. Probeer het later nog eens." });
      }
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
      setError({ errorType: "add", errorText: "Vul alle velden in om een nieuwe toren toe te voegen." });
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
      setError({ errorType: "add", errorText: "Vul alle velden in om een nieuwe toren toe te voegen." });
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
      const torenLocatie = nieuweToren.locatie;

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
      setNieuweToren({ naam: "", locatie: "" });
    };
  };

  const handleTorenVerwijderen = (toren) => {
    setError({ errorType: "", errorText: "" });
    setTorenToDelete(toren);
    setShowDeleteDialog(true);
  };

  const handleConfirmVerwijderen = (torenToDeleteParameter) => {
    // If no valid toren is passed as an argument return
    if (!torenToDeleteParameter) {
      return;
    }

    // Get the user inputed torennaam
    const inputNaam = document.getElementById("torenInput").value.trim();

    // check if input is the same as the selected torennaam
    if (inputNaam !== torenToDeleteParameter.torenNaam) {
      setError({ errorType: "dialog", errorText: "De ingevoerde huisjesnaam komt niet overeen. Probeer opnieuw" });
      return;
    }

    const torensDALInstance = new torensDAL();
    if (torenToDeleteParameter.count === 0) {
      torensDALInstance.deleteData(torenToDeleteParameter.torenNaam, torenToDeleteParameter.torenLocatie).then((result) => {

        // Use the functions from the torensDAL class
        torensDALInstance.readData().then((result) => {
          setTorensArray(result);
        });
      });

    } else {
      setError({ errorType: "global", errorText: "Er zitten nog vogelhuisjes in deze toren verwijder deze eerst." });
    }

    setShowDeleteDialog(false);
    setTorenToDelete(null);
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
                  <button onClick={() => { setEditToren(toren); setError({ errorType: "", errorText: "" }); }}>Bijwerken</button>
                  <button onClick={() => handleTorenVerwijderen(toren)}>Verwijderen</button>
                </div >
              ))}
              {error.errorType === "global" ? (<p className="error">{error.errorText}</p>) : null}
            </div >
          </div >
        </div >
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

              {error.errorType === "add" ? (<p className="error">{error.errorText}</p>) : null}

              {editToren ? (
                <>
                  <button onClick={handleTorenBijwerken}>Bijwerken</button>
                  <button onClick={() => { setEditToren(null); setError({ errorType: "", errorText: "" }); }}>Annuleren</button>
                </>
              ) : (
                <button onClick={handleNieuweTorenToevoegen}>Toevoegen</button>
              )}
            </div >
          </div >
        </div >
      </div >
      {showDeleteDialog && (
        <>
          <div className="dialog-backdrop" />
          <dialog open={showDeleteDialog}>
            <h2>U staat op het punt om "{torenToDelete.torenNaam}" te verwijderen</h2>
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
            <button onClick={() => handleConfirmVerwijderen(torenToDelete)}>Ja</button>
            <button onClick={handleCancelVerwijderen}>Nee</button>
          </dialog >
        </>
      )}
      ;
    </>
  );
};

export default Torens;
