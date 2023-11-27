// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     {/* <App /> */}
    
//   </React.StrictMode>,
// )
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import LoginButton from './loginBtn';
import LogoutButton from './logoutBtn';
import Profile from './profile';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="kjschollen.eu.auth0.com"
    clientId="cernTRpK8SxCXwI69sA594JLHc6FlrU4"
    authorizationParams={{
      redirect_uri: window.location.origin,
      // audience: "http://localhost:3000/",
      // scope: "read:current_user update:current_user_metadata"
    }}
  >
    <LoginButton />
    <LogoutButton />
    <Profile />
  </Auth0Provider>,
);