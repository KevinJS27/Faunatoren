import './sidebar.scss'
import BirdHouse from '../assets/icons/Birdhouse.svg'
import Dashboard from '../assets/icons/DashboardGraphs.svg'
import User from '../assets/icons/User.svg'
import Faunatoren from '../assets/icons/FaunaToren.svg'
// import viteLogo from '/vite.svg'



function sideBar() {

    return (
        <sidebar class="sidebar">
            <img src={ User } alt="Persoon gegevens" />
            <img src={ Dashboard } alt="Overzicht met torens en huisjes" />
            <img src={ BirdHouse } alt="Persoon gegevens" />
            <img src={ Faunatoren } alt="Overzicht met torens en huisjes" />
        </sidebar>
    )
}

export default sideBar