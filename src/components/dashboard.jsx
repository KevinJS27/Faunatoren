import "./../style/components/dashboard.scss"
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import React, { useState, useEffect } from "react";


let data = {
    airPressure: [],
    CO2: [],
    weight: [],
    humidity: [],
    presences: [],
    temperature: []
}

function Dashboard() {

    let [state, setState] = useState({
        labels: ["Loading..."],
        datasets: [
            {
                label: "Loading data",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 10, 5, 2, 20, 30, 45],
            },
        ],
    });

    function click() {
        getData(setState);

        // let labels = [];
        // let values = [];

        // console.log(data);
        // data.temperature.forEach(element => {
        //     console.log(element);

        //     // Key (time)
        //     let newDate = new Date(element.key);
        //     console.log(newDate);
        //     labels.push(newDate.getMonth() + " " + newDate.getDate());

        //     // Value
        //     values.push(element.value);

        // });

        // setState({
        //     labels: labels,
        //     datasets: [
        //         {
        //             label: "Temperatuur",
        //             backgroundColor: "rgb(1, 1, 132)",
        //             borderColor: "rgb(255, 99, 132)",
        //             data: [100, 10, 5, 25, 23, 50, 55],
        //         },
        //     ],
        // });
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
            <Line className="temperature" data={state} />
            <button onClick={click}>
                Click me!
            </button>
        </div>
    )
};

function getData(setState) {
    // Empty the arrays
    data.airPressure = [];
    data.CO2 = [];
    data.weight = [];
    data.humidity = [];
    data.presences = [];
    data.temperature = [];


    // Get the data from the API
    fetch('http://avans.duckdns.org:1880/sensor?limit=10')
        .then(
            response => response.json()
        )
        .then(result => {

            // Set the new data in the arrays
            result.forEach(r => {
                data.airPressure.push(r.decoded_payload.luminosity_3 / 100);
                data.CO2.push(r.decoded_payload.luminosity_5 * 10);
                data.weight.push(r.decoded_payload.luminosity_6 / 10);
                data.humidity.push(r.decoded_payload.relative_humidity_1)
                data.presences.push(r.decoded_payload.relative_humidity_4);
                data.temperature.push({ key: r.time, value: r.decoded_payload.temperature_2 / 10 });
            });

            // Set in temperature diagram
            // Transform the data
            let labels = [];
            let values = [];

            data.temperature.forEach(element => {
                console.log(element);

                // Key (time)
                let newDate = new Date(element.key);
                console.log(newDate);
                labels.push(newDate.getMonth() + " " + newDate.getDate());

                // Value
                values.push(element.value);
            });

            setState({
                labels: labels,
                datasets: [
                    {
                        label: "Temperatuur",
                        backgroundColor: "rgb(1, 1, 132)",
                        borderColor: "rgb(255, 99, 132)",
                        data: [100, 10, 5, 25, 23, 50, 55],
                    },
                ],
            });
        }
        );
    console.log(data);
}

export default Dashboard