// UserRolesComponent.jsx
import React, { useEffect, useState } from 'react';
import auth0 from 'auth0-js';

const domain = "kjschollen.eu.auth0.com";
const auth0Client = new auth0.WebAuth({
    domain: 'kjschollen.eu.auth0.com',
    clientID: 'cernTRpK8SxCXwI69sA594JLHc6FlrU4',
    redirectUri: 'http://localhost:3000',
    audience: `https://kjschollen.eu.auth0.com/api/v2/`,
    responseType: 'token id_token',
    scope: 'openid profile email',
});

const UserRolesComponent = ({ userId }) => {
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        auth0Client.checkSession({}, (err, authResult) => {
          if (authResult) {
            const accessToken = authResult.accessToken;
            auth0Client.client.userInfo(accessToken, (err, user) => {
              if (user && user.sub === userId) {
                const roles = user['https://Faunatoren/roles']; // Vervang met jouw namespace
                setUserRoles(roles || []);
              }
            });
          }
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserRoles();
  }, [userId]);

  return (
    <div>
      <h2>User Roles:</h2>
      <ul>
        {userRoles.map((role, index) => (
          <li key={index}>{role}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserRolesComponent;
