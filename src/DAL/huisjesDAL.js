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
    const response = await fetch("https://avans.duckdns.org:1880/uids", {
      method: "PUT",
      body: JSON.stringify({
        uid: huisjesUid,
        torenNaam: huisjesTorenNaam,
        huisjesNaam: naamHuisje
      })
    });

    console.log('Updating data: ', response);

    if(response) {
      return true;
    }
    return false;
  };

  // Function to delete data
  deleteData = async (huisjeToDelete) => {
    const response = await fetch("https://avans.duckdns.org:1880/uids", {
      method: "DELETE",
      body: JSON.stringify({
        uid: huisjeToDelete.device_id
      })
    });

    console.log('Deleting data: ', response);
    
  };
}

export default huisjesDAL;
