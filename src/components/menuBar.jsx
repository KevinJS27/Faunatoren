// import './../style/grid/_index.scss'
// import './../style/components/menubar.scss'
import faunaTorenLogo from './../assets/faunatoren_logo.png'
import userIcon from './../assets/userIcon.svg'


function MenuBar() {

    return (
        <>
            <div className="container-fluid menubar">
                <div className="row">
                    <div className="container">
                        <div className="row">
                            <menu className="col-sm menu">
                                <img src={faunaTorenLogo} className="logo" alt="Faunatoren logo" />
                                <li>Dashboard</li>
                                <li>Torens</li>
                                <li>Huisjes</li>
                                <li>icon</li>
                                <li><img src={userIcon} className="User" alt="Gebruiker informatie" /></li>
                            </menu>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">Lorem ipsum dolor sit.</div>
                    <div className="col-md-6">Lorem ipsum dolor sit amet.</div>
                </div>
            </div>
        </>
    )
}

export default MenuBar
