import './../style/grid/_index.scss';
import './../style/components/menuBar.scss';
import faunaTorenLogo from './../assets/faunatoren_logo.png';
import userIcon from './../assets/userIcon.svg';

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
                            <li id="user" onClick={() => handleMenuItemClick('user')} data-open="false">
                                <img src={userIcon} className="User" alt="Gebruiker informatie" />
                                {user ? (
                                    <div className='userMenu'>
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
