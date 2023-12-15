import "./../style/components/dashboard.scss"

function Dashboard() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Dashboard</h1>
                    {/* Select torens */}
                    <select name="Torens" id="torens" className="select">
                        <option value="toren1">toren</option>
                        <option value="toren2">toren2</option>
                        <option value="toren3">toren3</option>
                        <option value="toren4">toren4</option>
                    </select>

                    {/* Select huisjes */}
                    <select name="Huisjes" id="huisjes" className="select">
                        <option value="Huisje1">Huisje1</option>
                        <option value="Huisje2">Huisje2</option>
                        <option value="Huisje3">Huisje3</option>
                        <option value="Huisje4">Huisje4</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Dashboard