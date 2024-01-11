import "./../style/components/dashboard.scss";
import Chart from 'chart.js/auto'; // https://stackoverflow.com/questions/67727603/error-category-is-not-a-registered-scale
import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

let data = {
    airPressure: [],
    CO2: [],
    weight: [],
    humidity: [],
    presences: [],
    temperature: [],
};

function Dashboard() {
    let [state, setState] = useState({
        temperature: {
            labels: ["Loading..."],
            datasets: [
                {
                    label: "Loading data",
                    borderColor: "black",
                    data: [0, 10, 5, 2, 20, 30, 45],
                },
            ],
        },
        CO2: {
            labels: ["Loading..."],
            datasets: [
                {
                    label: "Loading data",
                    borderColor: "black",
                    data: [0, 10, 5, 2, 20, 30, 45],
                },
            ],
        },
    });

    useEffect(() => {
        getData();
    }, []); // Empty dependency array to run only on mount

    // Fetch data from the API
    function getData() {
        // Empty the arrays
        data.airPressure = [];
        data.CO2 = [];
        data.weight = [];
        data.humidity = [];
        data.presences = [];
        data.temperature = [];

        // Get the data from the API
        fetch("http://avans.duckdns.org:1880/sensor?limit=10")
            .then((response) => response.json())
            .then((result) => {
                // Set the new data in the arrays
                result.forEach((r) => {
                    data.airPressure.push(r.decoded_payload.luminosity_3 / 100);
                    data.CO2.push(r.decoded_payload.luminosity_5 * 10);
                    data.weight.push(r.decoded_payload.luminosity_6 / 10);
                    data.humidity.push(r.decoded_payload.relative_humidity_1);
                    data.presences.push(r.decoded_payload.relative_humidity_4);
                    data.temperature.push({
                        key: r.time,
                        value: r.decoded_payload.temperature_2 / 10,
                    });
                });

                // Update the temperature diagram
                temperatureDiagramUpdate();
            });
    }

    // Update the temperature diagram
    function temperatureDiagramUpdate() {
        // Transform the data
        let labels = [];
        let values = [];

        data.temperature.forEach((element) => {
            // Key (time)
            let newDate = new Date(element.key);
            labels.push(
                newDate.getDate() +
                "/" +
                newDate.getMonth() +
                1 +
                " " +
                newDate.getHours() +
                ":" +
                newDate.getMinutes()
            );

            // Value
            values.push(element.value);
        });

        // Update the state
        setState((prevState) => ({
            ...prevState,
            temperature: {
                ...prevState.temperature,
                labels: labels,
                datasets: [
                    {
                        label: "Temperatuur",
                        data: values,
                    },
                ],
            },
        }));
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

            <div className="row">
                {/* temp */}
                <div className="col-md-4">
                    <div className="wr-diagram">
                        <h3>Temperatuur</h3>
                        <div class="slidecontainer">
                            <input type="range" min="1" max="100" value="80" class="slider" id="myRange"/>
                        </div>
                    </div>
                </div>

                {/* Pressure */}
                <div className="col-md-4">
                    <div className="wr-diagram">
                        <h3>Druk</h3>
                    </div>
                </div>

                {/* CO2 */}
                <div className="col-md-4">
                    <div className="wr-diagram">
                        <h3>Co2</h3>
                    </div>
                </div>

            </div>

            <div className="row">
                {/* Temp line chart */}
                <div className="col-xl-6 col-sm-12">
                    <div className="wr-diagram">
                        <h3>Temperatuur</h3>
                        <Line className="temperature" data={state.temperature} />
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Dashboard;
