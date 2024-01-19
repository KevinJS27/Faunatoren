class torensDAL {
    // Read
    readData = async () => {
      const response = await fetch("http://avans.duckdns.org:1880/uids");
      const result = await response.json();
      return result;
    };
  
    // Function to update data
    updateData = () => {
      // Implement your logic for updating data
      console.log('Updating data...');
    };
  
    // Function to delete data
    deleteData = () => {
      // Implement your logic for deleting data
      console.log('Deleting data...');
    };
  }
  
  export default torensDAL;
  