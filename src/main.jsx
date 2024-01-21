import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Login/ Auth0
import { Auth0Provider } from '@auth0/auth0-react';
import LoginButton from './components/auth/loginBtn';
import LogoutButton from './components/auth/logoutBtn';
import Profile from './components/auth/profile';
import Roles from './components/auth/Roles';

// components
import MenuBar from './components/menuBar';
import Dashboard from './components/dashboard';
import DashboardToren from './components/torens';
import DashboardHuisjes from './components/huisjes';

// css
import './style/index.scss';
import './style/grid/_index.scss';

const root = createRoot(document.getElementById('root')).render(<App/>);

function App() {
    // State for menuitems
    const [selectedMenu, setSelectedMenu] = useState("dashboard");

    // State for the user
    const [user, setUser] = useState({ name: "test", email: "email" });

    // State for the user menu visibility
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // Function that handles the menu clicks
    const handleMenuItemClick = (menuItem) => {
        // If the user clicks on the user icon
        if (menuItem === "user") {
            // Toggle the menu visibility
            console.log("test");
            setUserMenuOpen((prevOpen) => !prevOpen);
        } else {
            setSelectedMenu(menuItem);
            // Optionally close the user menu when clicking on other menu items
            setUserMenuOpen(false);
        }
    };

  return (
    <Auth0Provider
      domain="kjschollen.eu.auth0.com"
      clientId="cernTRpK8SxCXwI69sA594JLHc6FlrU4"
      authorizationParams={{
        redirect_uri: window.location.origin,
        // audience: "https://localhost:3000/",
        // scope: "read:current_user update:current_user_metadata"
      }}
    >
      {/* Menu */}
      <MenuBar onMenuItemClick={handleMenuItemClick} user={user} setUserMenuOpen={setUserMenuOpen} />      {/* Conditionally render components based on selected menu item */}
      {selectedMenu === 'dashboard' && <Dashboard />}
      {selectedMenu === 'torens' && <DashboardToren />}
      {selectedMenu === 'huisjes' && <DashboardHuisjes />}

      <hr />
      {/* Login buttons*/}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <LoginButton />
            <LogoutButton />
            <Profile user={setUser}/>
            <Roles />
          </div>
        </div>
      </div>
    </Auth0Provider>
  );
}