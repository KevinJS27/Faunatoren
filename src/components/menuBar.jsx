import './../style/grid/_index.scss';
import './../style/components/menuBar.scss';
import faunaTorenLogo from './../assets/icons/faunatorenLogo.png';
import userIcon from './../assets/icons/userIcon.svg';
import noUserIcon from './../assets/icons/noUserIcon.png';
import { useState } from 'react';

function MenuBar({ onMenuItemClick, user }) {
    const handleMenuItemClick = (menuItem) => {
        onMenuItemClick(menuItem);
    };

    return (
        <div className="container-fluid menubar">
            <div className="row">
                <div className="container">
                    <div className="row">
                        <menu className="col-sm menu">
                            <img src={faunaTorenLogo} className="logo" alt="Faunatoren logo" />
                            <li onClick={() => handleMenuItemClick('dashboard')}>Dashboard</li>
                            <li onClick={() => handleMenuItemClick('torens')}>Torens</li>
                            <li onClick={() => handleMenuItemClick('huisjes')}>Huisjes</li>
                            <li onClick={() => handleMenuItemClick('logs')}>Logs</li>
                            <li id="user" onClick={() => handleMenuItemClick('user')} data-open="false">
                                <img src={userIcon} className="User" alt="Gebruiker informatie" />
                                {user ? (
                                    <div className='userMenu'>
                                    {console.log(user)}
                                        <>
                                            <img src={noUserIcon} alt="profiel foto" />
                                            <div>
                                                {/* Display user info */}
                                                <p><b>Gebruikersnaam:</b> {user.name}</p>
                                                <p><b>Email:</b> {user.email}</p>
                                                <button>Uitloggen</button>
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
    )
    }



export default MenuBar
