class torensDAL {
  // Read
  readData = async () => {
    const response = await fetch("https://avans.duckdns.org:1880/torens");
    const result = await response.json();
    return result;
  };

  insertData = async (naamOfToren, locatieOfToren) => {
    try {
      const response = await fetch("https://avans.duckdns.org:1880/torens", {
        method: "POST",
        body: JSON.stringify({
          torenLocatie: locatieOfToren,
          torenNaam: naamOfToren
        })
      });
      if (response.ok) {
        console.log('Data updated successfully');
        return true;
      } else {
        console.error('Failed to update data:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Error updating data:', error);
      return false;
    }
  }

  // Function to update data
  updateData = async (towerNameCurrent, towerLocationCurrent, locationNew, towerNameNew) => {
    try {
      const response = await fetch("https://avans.duckdns.org:1880/torens", {
        method: "PUT",
        body: JSON.stringify({
          current_towername: towerNameCurrent,
          current_towerLocation: towerLocationCurrent,
          new_location: locationNew,
          new_towername: towerNameNew
        })
      });
      if (response.ok) {
        console.log('Data updated successfully');
        return true;
      } else {
        console.error('Failed to update data:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Error updating data:', error);
      return false;
    }
  };

  // Function to delete data
  deleteData = () => {
    // Implement your logic for deleting data
    console.log('Deleting data...');
  };
}

export default torensDAL;
