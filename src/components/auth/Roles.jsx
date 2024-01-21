import React, { useState, useEffect } from 'react';

const Roles = ({user, setStateUserRoles}) => {
  const api = "https://avans.duckdns.org:1880/auth0-userroles?userid=" + user.sub;
  const [roles, setRoles] = useState([]);

  console.log("Roles JSON: " + JSON.stringify(roles, null, 2));

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((result) => {
        console.log("API RESULT ################");
        console.log(result);
        setRoles(result);
        setStateUserRoles(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }, []);

  const handleClick = () => {
    console.log(user);
  };

  return (
    <>
    </>
  )
}

export default Roles
