import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Login/ Auth0
import { Auth0Provider } from '@auth0/auth0-react';
import LoginButton from './style/components/auth/loginBtn';
import LogoutButton from './style/components/auth/logoutBtn';
import Profile from './style/components/auth/profile';

// components
import MenuBar from './components/menuBar';
import Dashboard from './components/dashboard';
import DashboardToren from './components/torens';

// css
import './style/index.scss';
import './style/grid/_index.scss';

const root = createRoot(document.getElementById('root'));

function App() {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenu(menuItem);
  };

  return (
    <Auth0Provider
      domain="kjschollen.eu.auth0.com"
      clientId="cernTRpK8SxCXwI69sA594JLHc6FlrU4"
      authorizationParams={{
        redirect_uri: window.location.origin,
        // audience: "http://localhost:3000/",
        // scope: "read:current_user update:current_user_metadata"
      }}
    >
      {/* Menu */}
      <MenuBar onMenuItemClick={handleMenuItemClick} />

      {/* Conditionally render components based on selected menu item */}
      {selectedMenu === 'dashboard' && <Dashboard />}
      {selectedMenu === 'torens' && <DashboardToren />}

      {/* Login buttons*/}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <LoginButton />
            <LogoutButton />
            <Profile />
          </div>
        </div>
      </div>
    </Auth0Provider>
  );
}

root.render(<App />);