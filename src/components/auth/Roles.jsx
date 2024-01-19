import React from 'react';
import UserRolesComponent from './UserRolesComponent';
import Profile from './profile';

const Roles = () => {
  const userIdToCheck = Profile.userIdToCheck;

  return (
    <div>
      <h1>React App met Auth0 User Roles</h1>
      <UserRolesComponent userId={userIdToCheck || 0} />
    </div>
  )
}

export default Roles
