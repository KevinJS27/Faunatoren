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
import LoginButton from './button';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="kjschollen.eu.auth0.com"
    clientId="cernTRpK8SxCXwI69sA594JLHc6FlrU4"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <LoginButton />

  </Auth0Provider>,
);