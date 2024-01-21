import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logsDAL from "../../DAL/logsDAL";

const Profile = ({ setUser }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const logsDALInstance = new logsDAL();

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        await logsDALInstance.create(user);
        setUser(user);
      } catch (e) {
        console.log(e);
      }
    };

    getUserMetadata();
  }, [user?.sub]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {console.log(user)}
      </div>
    )
  );
};

export default Profile;