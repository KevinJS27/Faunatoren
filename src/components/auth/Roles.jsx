import React, { useState, useEffect } from 'react';
import Profile from './profile';

const Roles = (user) => {
  const api = "https://avans.duckdns.org:1880/auth0-userroles?userid=google-oauth2|105279969498319760361";
  const [Roles, setRoles] = useState([]);

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setRoles(result);
      })
  }, []);

  return (
    <div>
      <h1>React App met Auth0 User Roles</h1>
      <table>
        {Roles.map((rol, index) => (
          <tr>
            <td>
              <p key={index}>{rol.name}</p>
            </td>
          </tr>
        ))}
      </table>
      <pre>{JSON.stringify(Roles, null, 2)}</pre>
    </div>
  )
}

export default Roles
