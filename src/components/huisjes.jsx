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

  // A text to display message to the usser
  const [error, setError] = useState({ errorType: "", errorText: "" });

  // Current huisje that is being edited
  const [editHuisje, setEditHuisje] = useState(null);

  // Object huisjes that is being added
  const [nieuwHuisje, setNieuwHuisje] = useState({ uid: "", toren: "", naam: "", });

  // Current huisje that the user wants to delete
  const [huisjeToDelete, setHuisjeToDelete] = useState(null);

  // A list of all the torens for in the select box
  const [torensArray, setTorensArray] = useState([]);

  // If the Dialog needs to be shown or not
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchTorens = async () => {
      // Use the Read function from huisjeDAL
      const torensDALInstance = new torensDAL();

      // Use the functions from the torensDAL class
      torensDALInstance.readData().then((result) => {
        setTorensArray(result);
      });
    };

    const fetchHuisjes = async () => {
      // Use the Read function from huisjeDAL
      const huisjesDALInstance = new huisjesDAL();

      // Use the functions from the torensDAL class
      huisjesDALInstance.readData().then((result) => {
        setHuisjesArray(result);
      });
    };

    fetchTorens();
    fetchHuisjes();
  }, []);

  const handleToevoegen = async (newHuisje) => {
    if (nieuwHuisje.toren === "" || nieuwHuisje.naam === "" || nieuwHuisje.uid === ""
    ) {
      setError({ errorType: "add", errorText: "Vul alle velden in voordat u een nieuw huisje toevoegt." });
      return;
    }

    try {
      const huisjesDALInstance = new huisjesDAL();
      await huisjesDALInstance.updateData(newHuisje.uid, newHuisje.toren, newHuisje.naam);

      // Fetch and update huisjesArray after the state has been updated
      huisjesDALInstance.readData().then((result) => {
        setHuisjesArray(result);
      });

      // Reset the values in the input forms
      setNieuwHuisje({ uid: "", toren: "", naam: "" });
    } catch (e) {
      console.log(e);
      setError({ errorType: "add", errorText: "Er is een fout opgetreden bij het toevoegen van het huisje. Probeer het later nog eens." });
    }
  };

  // Onclick on bijwerken button in the view
  const handleBijwerken = () => {
    const bijgewerkteHuisjes = huisjesArray.map((huis) =>
      huis.id === editHuisje.id ? { ...huis, ...editHuisje } : huis
    );
    setHuisjesArray(bijgewerkteHuisjes);
    setEditHuisje(null);
  };

  const handleVerwijderen = (huis) => {
    setError({ errorType: "", errorText: "" });
    setHuisjeToDelete(huis);
    setShowDeleteDialog(true);
  };

  const handleConfirmVerwijderen = (huisjeToDeleteParameter) => {
    // If no valid huisje is passed as an argument
    if (!huisjeToDeleteParameter) {
      return;
    }

    const inputNaam = document.getElementById("huisInput").value.trim();

    // If the user input does not match the name of the huisje
    if (!(inputNaam === huisjeToDeleteParameter.huisjesNaam)) {
      setError({ errorType: "dialog", errorText: "De ingevoerde huisjesnaam komt niet overeen. Probeer opnieuw" });
      return;
    }

    // delete the huisje from the database
    const huisjesDALInstance = new huisjesDAL();
    const result = huisjesDALInstance.deleteData(huisjeToDeleteParameter);
    if (!result) {
      return;
    }

    // Fetch and update huisjesArray after the state has been updated
    huisjesDALInstance.readData().then((result) => {
      console.log(result);
      setHuisjesArray(result);
    });

    setShowDeleteDialog(false);
    setHuisjeToDelete(null);
  };

  const handleCancelVerwijderen = () => {
    setShowDeleteDialog(false);
    setHuisjeToDelete(null);
  };

  return (
    <>
      <div className="container huisjes-container">
        <div className="row">

          {/* View */}
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
                      const torenSelectBox = document.getElementById("torenSelect");
                      torenSelectBox.value = huis.torenNaam;

                      const naamTextField = document.getElementById("naamSelect");
                      naamTextField.value = huis.huisjesNaam;

                      setEditHuisje(huis);
                    }}>
                      Bijwerken
                    </button>
                    <button onClick={() => handleVerwijderen(huis)}>
                      Verwijderen
                    </button>
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
              <h2>
                {editHuisje ? "Vogelhuisje bijwerken" : "Vogelhuisje toevoegen"}
              </h2>
              <div className="wr-inputs">
                {/* Select UID (Only on add/create) */}
                {editHuisje ? null : (
                  <div>
                    <label>UID:</label>
                    <select
                      value={nieuwHuisje.uid}
                      onChange={(e) =>
                        setNieuwHuisje({ ...nieuwHuisje, uid: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        Selecteer een Huisje
                      </option>
                      {huisjesArray
                        .filter(
                          (huisje) => !(huisje.huisjesNaam || huisje.torenNaam)
                        )
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
                  <label>Toren:</label>
                  <select
                    id="torenSelect"
                    value={editHuisje ? editHuisje.toren : nieuwHuisje.toren}
                    onChange={(e) =>
                      editHuisje
                        ? setEditHuisje({
                          ...editHuisje,
                          toren: e.target.value,
                        })
                        : setNieuwHuisje({
                          ...nieuwHuisje,
                          toren: e.target.value,
                        })
                    }
                  >
                    <option value={""} disabled>
                      Selecteer een toren
                    </option>
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
                  <input
                    id="naamSelect"
                    type="text"
                    value={editHuisje ? editHuisje.naam : nieuwHuisje.naam}
                    onChange={(e) =>
                      editHuisje
                        ? setEditHuisje({ ...editHuisje, naam: e.target.value })
                        : setNieuwHuisje({
                          ...nieuwHuisje,
                          naam: e.target.value,
                        })
                    }
                  />
                </div>
              </div>

              {/* Show a error to the user */}
              {error.errorType === "add" || error.type === "edit" ? <p className="error">{error.errorText}</p> : null}

              {/* Buttons to add or edit */}
              {editHuisje ? (
                <div className='Buttons'>
                  <button onClick={handleBijwerken}>Bijwerken</button>
                  <button onClick={() => setEditHuisje(null)}>Annuleren</button>
                </div>
              ) : (
                <button onClick={() => handleToevoegen(nieuwHuisje)}>
                  Toevoegen
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
      {showDeleteDialog && (
        <>
          <div className="dialog-backdrop" />
          <dialog open={showDeleteDialog}>
            <h2>
              U staat op het punt om "{huisjeToDelete.huisjesNaam}" te
              verwijderen
            </h2>
            <p>
              Voer de naam van het huisje in om het te verwijderen. Alle
              bijbehorende meet data van dit huisje worden ook verwijderd.
            </p>
            <input className="select" type="text" name="huisje" id="huisInput" />
            <br />

            {/* Show a error to the user */}
            {error.errorType === "dialog" ? <p className="error">{error.errorText}</p> : null}

            <button onClick={() => handleConfirmVerwijderen(huisjeToDelete)}>
              Ja
            </button>
            <button onClick={handleCancelVerwijderen}>Nee</button>
          </dialog>
        </>
      )}
      ;
    </>
  );
};

export default Huisjes;
