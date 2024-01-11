import "./../style/components/dashboard.scss"
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import React,{ useState,useEffect } from "react";

let labels = ["January", "February", "March", "April", "May", "June"];

let airPressure = [];
let CO2 = [];
let weight = [];
let humidity = [];
let presences = [];
let temperature = [];

function Dashboard() {

    let [state, setState] = useState({
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 10, 5, 2, 20, 30, 45],
            },
        ],
    });

    console.log(state);


    function click() {
        console.log("es");
        setState({
            labels: labels,
            datasets: [
                {
                    label: "My First ejiofjwier",
                    backgroundColor: "rgb(1, 1, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: [100, 10, 5, 25, 23, 50, 55],
                },
            ],
        });
        console.log(state);
    }

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
            <Line data={state} />
            {getData()}
            <button onClick={click}>
                Click me!
            </button>
        </div>
    )
};

function getData() {

    fetch('http://avans.duckdns.org:1880/sensor?limit=10')
        .then(
            response => response.json()
        )
        .then(result => {

            result.forEach(r => {
                airPressure.push(r.decoded_payload.luminosity_3 / 100);
                CO2.push(r.decoded_payload.luminosity_5 * 10);
                weight.push(r.decoded_payload.luminosity_6 / 10);
                humidity.push(r.decoded_payload.relative_humidity_1)
                presences.push(r.decoded_payload.relative_humidity_4);
                temperature.push({ key: r.time, value: r.decoded_payload.temperature_2 / 10 });
            });

            console.table(temperature);
        });
}

export default Dashboard