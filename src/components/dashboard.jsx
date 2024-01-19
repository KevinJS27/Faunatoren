import "./../style/components/dashboard.scss";
import Chart from 'chart.js/auto'; // https://stackoverflow.com/questions/67727603/error-category-is-not-a-registered-scale
import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

function Dashboard() {

    const initialDatasetState = {
        labels: ["Loading..."],
        datasets: [
            {
                label: "Loading data",
                borderColor: "black",
                data: [],
            },
        ],
    };

    let [state, setState] = useState({
        temperature: { ...initialDatasetState },
        CO2: { ...initialDatasetState },
        pressure: { ...initialDatasetState },
    });

    useEffect(() => {
        getData();
    }, []); // Empty dependency array to run only on mount

    // Fetch data from the API
    function getData() {
        fetch("http://avans.duckdns.org:1880/sensor?limit=20")
            // Change response to JSON
            .then((response) => response.json())

            .then((result) => {
                
                // Reverse the array so that it makes more sense in the line graph
                result.reverse();

                // Create empty arrays
                let time = [];
                let temperatures = [];
                let pressure = [];
                let CO2 = [];

                result.forEach((currentItem) => {
                    // Change time format
                    const timeString = changeDateFormat(currentItem.time);
                    time.push(timeString);
    
                    // Fill the arrays with data
                    temperatures.push(currentItem.decoded_payload.temperature_2 / 10);
                    pressure.push(currentItem.decoded_payload.luminosity_3 / 100);
                    CO2.push(currentItem.decoded_payload.luminosity_5 * 10);
                });

                // Update the state
                newUpdateDataset("temperature", "temperatuur", time, temperatures);
                newUpdateDataset("pressure", "Druk", time, pressure);
                newUpdateDataset("CO2", "CO2", time, CO2);
            });
    }

    // Changes date format
    function changeDateFormat(date) {
        let dateObject = new Date(date);
        let newDate = dateObject.getDate() + "/" + (dateObject.getMonth() + 1) + " " + dateObject.getHours() + ":" + dateObject.getMinutes()
        return newDate;
    }

    // Update a object in the state
    function newUpdateDataset(property, label, time, value) {
        setState((prevState) => ({
            ...prevState,
            [property]: {
                ...prevState[property],
                datasets: [
                    {
                        label: label,
                        data: value,
                    },
                ],
                labels: time,
            },
        }));
    }

    return (
        <>
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
                        <div className="wr-diagram diagram-temperature">
                            <h2>Temperatuur</h2>
                            <span className="wr-temperature"><span id="temperature">{state.temperature.datasets[0].data[0] || 0}</span><sup>C</sup></span>
                            <div className="wr-slider">
                                <div className="scale">
                                    <span>-10</span><span>40</span>
                                </div>
                                <input readOnly type="range" min="0" max="40" step="0.1" value={state.temperature.datasets[0].data[0] || 0} className="slider" id="myRange" />
                            </div>
                        </div>
                    </div>

                    {/* Pressure */}
                    <div className="col-md-4">
                        <div className="wr-diagram">
                            <h2>Druk</h2>
                            <span className="wr-pressure">{state.pressure.datasets[0].data[0]}<span>Bar</span></span>
                            <div className="wr-slider">
                                <div className="scale">
                                    <span>0.5</span><span>1.5</span>
                                </div>
                                <input readOnly type="range" min="0.5" max="1.5" step="0.1" value={state.pressure.datasets[0].data[0] || 0} className="slider" id="myRange" />
                            </div>
                        </div>
                    </div>

                    {/* CO2 */}
                    <div className="col-md-4">
                        <div className="wr-diagram">
                            <h2>Co2</h2>
                            <span className="wr-CO2">{state.CO2.datasets[0].data[0]}<span>PPM</span></span>
                            <div className="wr-slider">
                                <div className="scale">
                                    <span>0K</span><span>2K</span>
                                </div>
                                <input readOnly type="range" min="0" max="2000" step="0.1" value={state.CO2.datasets[0].data[0] || 0} className="slider" id="myRange" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="container">
                <div className="row">
                    {/* Temp line chart */}
                    <div className="col">
                        <div className="wr-diagram">
                            <h3>Temperatuur</h3>
                            <Line className="temperature" data={state.temperature} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
