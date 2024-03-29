// Huisjes.jsx
import React, { useState, useEffect } from "react";
import torensDAL from "./../DAL/torensDAL.js";
import huisjesDAL from "./../DAL/huisjesDAL.js";
import "./../style/components/basicForm.scss";
import "./../style/components/huisjes.scss";
import "./../style/components/dialog.scss";

const Huisjes = () => {
  // A list with all the huisjes
  const [huisjesArray, setHuisjesArray] = useState([]);

  // A text to display message to the user
  const [error, setError] = useState({ errorType: "", errorText: "" });

  // Current huisje that is being edited
  const [editHuisje, setEditHuisje] = useState(null);

  // A list of all the torens for in the select box
  const [torensArray, setTorensArray] = useState([]);

  // confirm delete dialog 
  const [showDeleteDialog, setShowDeleteDialog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const torensDALInstance = new torensDAL();
      const huisjesDALInstance = new huisjesDAL();

      try {
        const torensResult = await torensDALInstance.readData();
        setTorensArray(torensResult);

        const huisjesResult = await huisjesDALInstance.readData();
        setHuisjesArray(huisjesResult);
      } catch (e) {
        console.error(e);
        setError({ errorType: "global", errorText: "Er is een fout opgetreden bij het ophalen van de gegevens. Probeer het later nog eens." });
      }
    };

    fetchData();
  }, []);

  const resetSelectBoxes = () => {
    // If a huisje is being edited do not try to reset UID (The select box does not exists)
    if (!editHuisje) {
      document.getElementById("UIDSelect").value = "";
    }
    document.getElementById("torenSelect").value = "";
    document.getElementById("naamSelect").value = "";
  }

  const handleHuisjeToevoegen = async () => {

    // Get the data from the inputs
    const UID = document.getElementById("UIDSelect");
    const toren = document.getElementById("torenSelect");
    const naam = document.getElementById("naamSelect");

    // Return if there are any values empty
    if (UID.value === "" || toren.value === "" || naam.value === "") {
      setError({ errorType: "add", errorText: "Vul alle velden in voordat u een nieuw huisje toevoegt." });
      return;
    }

    try {
      const huisjesDALInstance = new huisjesDAL();
      await huisjesDALInstance.updateData(UID.value, toren.value, naam.value);

      // Fetch and update huisjesArray after the state has been updated
      huisjesDALInstance.readData().then((result) => {
        setHuisjesArray(result);
      });

      // Reset the values in the input forms
      resetSelectBoxes();
    } catch (e) {
      console.log(e);
      setError({ errorType: "add", errorText: "Er is een fout opgetreden bij het toevoegen van het huisje. Probeer het later nog eens." });
    }
  };

  // Onclick on bijwerken button in the view
  const handleBijwerken = async (huisjeToEdit) => {

    // If no new torennaam and huisjesnaam naam has been entered, do nothing
    if (!(huisjeToEdit.toren || huisjeToEdit.naam)) {
      setError({ errorType: "add", errorText: "Vul ten minste 1 veld in voordat u een huisje bewerkt." });
      return;
    }

    // Get the values for the update of the huisje
    const uid = huisjeToEdit.device_id;
    const naamHuisje = huisjeToEdit.naam ? huisjeToEdit.naam : huisjeToEdit.huisjesNaam;
    const naamToren = huisjeToEdit.toren ? huisjeToEdit.toren : huisjeToEdit.torenNaam;

    try {
      // Update database with new huisjes information
      const huisjesDALInstance = new huisjesDAL();
      await huisjesDALInstance.updateData(uid, naamToren, naamHuisje);

      // Fetch and update huisjesArray after the state has been updated
      huisjesDALInstance.readData().then((result) => {
        setHuisjesArray(result);
      });

      // Reset the values in the input forms
      resetSelectBoxes();
      setError({ errorType: "", errorText: "" });
      setEditHuisje(false);
    } catch (e) {
      console.log(e);
      setError({ errorType: "add", errorText: "Er is een fout opgetreden bij het toevoegen van het huisje. Probeer het later nog eens." });
    }
  };

  const handleAnnulerenBijwerken = () => {
    setEditHuisje(null);
    resetSelectBoxes();
  }

  const handleVerwijderen = (huis) => {
    setError({ errorType: "", errorText: "" });

    // Pass the huisje directly to the showDeleteDialog function
    setShowDeleteDialog(huis);
  };

  const handleConfirmVerwijderen = (huisjeToDeleteParameter) => {
    // If no valid huisje is passed as an argument
    if (!huisjeToDeleteParameter) {
      return;
    }

    // Get the input of the deleteDialog and check if it matches
    const inputNaam = document.getElementById("huisInput").value.trim();
    if (!(inputNaam === huisjeToDeleteParameter.huisjesNaam)) {
      setError({ errorType: "dialog", errorText: "De ingevoerde huisjesnaam komt niet overeen. Probeer opnieuw" });
      return;
    }

    // delete the huisje from the database
    const huisjesDALInstance = new huisjesDAL();
    huisjesDALInstance.deleteData(huisjeToDeleteParameter)
      .then((result) => {

        if (!result) {
          return;
        }

        // Fetch and update huisjesArray after the state has been updated
        huisjesDALInstance.readData().then((result) => {
          setHuisjesArray(result);
        });
      })

    setShowDeleteDialog(false);
  };

  const handleCancelVerwijderen = () => {
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="container huisjes-container">

        {/* View */}
        <div className="row">
          <div className="col-12">
            <h1>Huisjes</h1>
            <div className="huisjes-list">
              {huisjesArray
                // Exclude huisjes without huisjesNaam or torenNaam
                .filter((huis) => huis.huisjesNaam && huis.torenNaam)
                .map((huis) => (
                  <div key={huis.device_id} className="huisje-item">
                    <span>
                      <b>{huis.torenNaam}</b>
                    </span>
                    <span>{huis.huisjesNaam}</span>

                    <button onClick={() => {
                      setError({ errorType: "", errorText: "" });

                      const torenSelectBox = document.getElementById("torenSelect");
                      torenSelectBox.value = huis.torenNaam;

                      const naamTextField =
                        document.getElementById("naamSelect");
                      naamTextField.value = huis.huisjesNaam;

                      setEditHuisje(huis);
                    }}>
                      Bijwerken
                    </button>
                    <button onClick={() => handleVerwijderen(huis)}>Verwijderen</button>
                  </div >
                ))}
              {error.errorType === "global" ? (<p className="error">{error.errorText}</p>) : null}
            </div >
          </div >
        </div >

        <hr />

        {/* form */}
        <div className="row">
          <div className="col-12">

            <div className="form huisje-form">
              <h2> {editHuisje ? "Vogelhuisje bijwerken" : "Vogelhuisje toevoegen"} </h2>
              <div className="wr-inputs">

                {/* Select UID (Only on add/create) */}
                {editHuisje ? null : (
                  <div>
                    <label for="UIDSelect">UID:</label>
                    <select id="UIDSelect" type="text" >
                      <option selected value="" disabled>Selecteer een Huisje</option>

                      {/* Show only the available UIDs */}
                      {huisjesArray
                        .filter((huisje) => !(huisje.huisjesNaam || huisje.torenNaam))
                        .map((huisje, index) => (
                          <option key={index} value={huisje.device_id}>
                            {huisje.device_id}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {/* Select torens */}
                <div>
                  <label for="torenSelect">Toren:</label>
                  <select id="torenSelect"
                    onChange={(e) => editHuisje ? setEditHuisje({ ...editHuisje, toren: e.target.value }) : null}>
                    <option selected value="" disabled>Selecteer een toren</option>

                    {torensArray.map((toren, index) => (
                      <option key={index} value={toren.torenNaam}>
                        {toren.torenNaam}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name for het huisje */}
                <div>
                  <label>Naam:</label>
                  <input id="naamSelect" type="text"
                    value={editHuisje ? editHuisje.naam : null}
                    onChange={(e) => editHuisje ? setEditHuisje({ ...editHuisje, naam: e.target.value }) : null}
                  />
                </div >
              </div >

              {/* Show a error to the user */}
              {error.errorType === "add" || error.type === "edit" ? (<p className="error">{error.errorText}</p>) : null}

              {/* Buttons to add or edit */}
              {
                editHuisje ? (
                  <div className="Buttons">
                    <button onClick={() => handleBijwerken(editHuisje)}>Bijwerken</button>
                    <button onClick={() => handleAnnulerenBijwerken()}>Annuleren</button>
                  </div>
                ) : (
                  <button onClick={() => handleHuisjeToevoegen()}>
                    Toevoegen
                  </button>
                )
              }
            </div >
          </div >
        </div >

        {/* Delete Dialog */}
        {
          showDeleteDialog ? <>
            <div className="dialog-backdrop" />
            <dialog open={true}>
              <h2> U staat op het punt om "{showDeleteDialog.huisjesNaam}" te verwijderen</h2>
              <p> Voer de naam van het huisje in om het te verwijderen. Alle bijbehorende meet data van dit huisje worden ook verwijderd.</p>
              <input className="select" type="text" name="huisje" id="huisInput" />
              <br />

              {/* Show a error to the user */}
              {error.errorType === "dialog" ? (<p className="error">{error.errorText}</p>) : null}

              <button onClick={() => handleConfirmVerwijderen(showDeleteDialog)}> Ja </button>
              <button onClick={handleCancelVerwijderen}>Nee</button>
            </dialog>
          </> : null
        }
      </div >
    </>
  );
};

export default Huisjes;
