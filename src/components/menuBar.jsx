import './../style/grid/_index.scss'
import './../style/components/menuBar.scss'
import faunaTorenLogo from './../assets/faunatoren_logo.png'
import userIcon from './../assets/userIcon.svg'


function MenuBar() {

    

    return (
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
                            <li><img onClick={userProfile()} src={userIcon} className="User" alt="Gebruiker informatie" /></li>
                        </menu>
                    </div>
                </div>
            </div>
        </div>
    )
    }

function userProfile(){
    console.log("few");
}



export default MenuBar
