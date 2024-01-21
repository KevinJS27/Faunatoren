import React, { useState } from 'react';
import LogoutButton from './auth/logoutBtn';
import faunaTorenLogo from './../assets/icons/faunatorenLogo.png';
import userIcon from './../assets/icons/userIcon.svg';
import noUserIcon from './../assets/icons/noUserIcon.png';
import './../style/components/menuBar.scss';
import './../style/grid/_index.scss';

function MenuBar({ onMenuItemClick, user, stateUserRoles }) {
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleMenuItemClick = (menuItem) => {
        if (menuItem === 'user') {
            setUserMenuOpen((prevUserMenuOpen) => !prevUserMenuOpen);
        } else {
            // Optionally close the user menu when clicking on other menu items
            setUserMenuOpen(false);
            onMenuItemClick(menuItem);
        }
    };

    // Handle click inside userMenu to prevent closing
    const handleUserMenuClick = (event) => {
        event.stopPropagation(); // Prevent the click event from reaching the document and closing the menu
    };

    const isBeheerder = stateUserRoles.some(rol => rol.name === "Beheerder");
    const isAdmin = stateUserRoles.some(rol => rol.name === "Administrator");
    const isOwner = stateUserRoles.some(rol => rol.name === "Owner");

    console.log("MenuBar Roles: " + JSON.stringify(stateUserRoles, null, 2));
    return (
        <div className="container-fluid menubar">
            <div className="row">
                <div className="container">
                    <div className="row">
                        <menu className="col-sm menu">
                            <img src={faunaTorenLogo} className="logo" alt="Faunatoren logo" />
                            {console.log(isOwner)}
                            {console.log(isAdmin)}
                            {console.log(isBeheerder)}
                            {/* laat alleen menu items zien op basis van rechten van ingelogde gebruiker */}
                            <li onClick={() => handleMenuItemClick('dashboard')}>Dashboard</li>
                            {(isOwner || isAdmin) &&
                                <li onClick={() => handleMenuItemClick('torens')}>Torens</li>
                            }
                            {(isOwner || isAdmin || isBeheerder) &&
                                <li onClick={() => handleMenuItemClick('huisjes')}>Huisjes</li>
                            }
                            {(isOwner || isAdmin) &&
                                <li onClick={() => handleMenuItemClick('logs')}>Logs</li>
                            }
                            <li id="user" onClick={() => handleMenuItemClick('user')} data-open={userMenuOpen}>
                                <img src={userIcon} className="User" alt="Gebruiker informatie" />
                                {userMenuOpen && user ? (
                                    <div className='userMenu' onClick={handleUserMenuClick}>                                        <>
                                        <img src={noUserIcon} alt="profiel foto" />
                                        <div>
                                            {/* Display user info */}
                                            <p><b>Gebruikersnaam:</b> {user.name}</p>
                                            <p><b>Email:</b> {user.email}</p>
                                            <LogoutButton />
                                        </div>
                                    </>
                                    </div>
                                ) : null}
                            </li>
                        </menu>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuBar;
