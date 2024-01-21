class huisjesDAL {

  // Read
  readData = async () => {
    const response = await fetch("https://avans.duckdns.org:1880/uids");
    const result = await response.json();
    return result;
  };

  // Get the sensor data from one huisje
  readSingleHuisje = async (uid) => {
    const response = await fetch(`https://avans.duckdns.org:1880/sensor?uid=${uid}&limit=20`)
    const result = await response.json();
    return result;
  };

  // Get all huisjes from 1 toren
  readHuisjesPerToren = async (torenNaam) => {
    torenNaam = torenNaam.replace(" ","%%")
    const response = await fetch(`https://avans.duckdns.org:1880/uids?torennaam=${torenNaam}`)
    const result = await response.json();
    return result;
  };

  // Function to update data
  updateData = async (huisjesUid, huisjesTorenNaam, naamHuisje) => {
    const response = fetch("https://avans.duckdns.org:1880/uids", {
      method: "PATCH",
      body: JSON.stringify({
        uid: huisjesUid,
        torenNaam: huisjesTorenNaam,
        huisjesNaam: naamHuisje
      })
    });
    console.log('Updating data: ', response);
  };

  // Function to delete data
  deleteData = () => {
    // Implement your logic for deleting data
    console.log('Deleting data...');
  };
}

export default huisjesDAL;
