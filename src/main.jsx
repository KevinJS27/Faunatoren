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
import LogsComponent from './components/logs';

// css
import './style/index.scss';
import './style/grid/_index.scss';

const root = createRoot(document.getElementById('root')).render(<App />);

function App() {
  // State for menuitems
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  // State for the user
  const [user, setUser] = useState({name: "Naam",email:"email@gmail.com"});

  // State voor gebruikersrollen
  const [userRoles, setUserRoles] = useState([]);

  // Function that handles the menu clicks
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenu(menuItem);
  };

  let renderedComponent;
  switch (selectedMenu) {
    case 'dashboard':
      renderedComponent = <Dashboard />;
      break;
    case 'torens':
      renderedComponent = <DashboardToren />;
      break;
    case 'huisjes':
      renderedComponent = <DashboardHuisjes />;
      break;
    case 'logs':
      renderedComponent = /*userRoles.includes("Administrator", "Owner") ?*/ <LogsComponent /> /*: null*/;
      break;
  }

  return (
    <Auth0Provider
      domain="kjschollen.eu.auth0.com"
      clientId="cernTRpK8SxCXwI69sA594JLHc6FlrU4"
      authorizationParams={{
        redirect_uri: window.location.origin,
        //   // audience: "https://localhost:3000/",
        //   // scope: "read:current_user update:current_user_metadata"
      }}
    >
      {/* Menu */}
      <MenuBar onMenuItemClick={handleMenuItemClick} user={user} />      {/* Conditionally render components based on selected menu item */}

      {/* Conditionally render components based on selected menu item */}
      {user ? renderedComponent : <div className="container"><div className="row"><div className="col"><p>Log alstublieft in om gegevens in te zien.</p><br /><LoginButton /></div></div></div>}

      <hr />
      {/* Login buttons*/}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <LoginButton />
            <LogoutButton />
            <Profile setUser={setUser} />
            <Roles user={user} />
          </div>
        </div>
      </div>
    </Auth0Provider >
  );
}