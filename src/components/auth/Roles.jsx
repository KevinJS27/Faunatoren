import React, { useState, useEffect } from 'react';

const Roles = (user) => {
  console.log("------------------------------");
  console.log(user);
  console.log("------------------------------");
  const api = "https://avans.duckdns.org:1880/auth0-userroles?userid=google-oauth2|105279969498319760361";
  const [roles, setRoles] = useState([]);

  console.log("Roles JSON: " + JSON.stringify(roles, null, 2));

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setRoles(result);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }, []);

  const handleClick = () => {
    console.log(user);
  };

  return (
    <div>
      <h1>React App met Auth0 User Roles</h1>
      <table key="not-a-key">
        {console.log(roles)}
        {roles.map((rol, index) => (
          <tr key="not-a-key">
            <td>
              <p key={index}>{rol.name}</p>
            </td>
          </tr>
        ))}
      </table>
      <button onClick={handleClick}>
        Click me
      </button>
      {console.log("Roles JSON: " + JSON.stringify(roles, null, 2))}
    </div>
  )
}

export default Roles
