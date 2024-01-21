import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logsDAL from "../../DAL/logsDAL";

const Profile = ({ setUser }) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const logsDALInstance = new logsDAL();

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "kjschollen.eu.auth0.com";


      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
        // console.log(user.sub);
        await logsDALInstance.create(user);

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
        setUser(user);
      } catch (e) {
        console.log(e);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
        {console.log(user)}
      </div>
    )
  );
};

export default Profile;