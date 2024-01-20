import React, { useState, useEffect } from "react";
import Chart from 'chart.js/auto'; // https://stackoverflow.com/questions/67727603/error-category-is-not-a-registered-scale
import { Line } from "react-chartjs-2";
import huisjeDAL from "./../DAL/huisjesDAL.js";
import "./../style/components/dashboard.scss";
import torensDAL from "../DAL/torensDAL.js";


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

    // sensorData
    const [sensorData, setSensorData] = useState({
        temperature: { ...initialDatasetState },
        CO2: { ...initialDatasetState },
        pressure: { ...initialDatasetState },
    });

    // Current huisjes/torens for in the select boxes
    const [huisjes, setHuisjes] = useState();
    const [torens, setTorens] = useState();

    // Selected items in the select boxes
    const [selectedToren, setSelectedToren] = useState("");
    const [selectedHuisje, setSelectedHuisje] = useState("");

    // Onchange event huisje Select
    function onHuisjeChange(currentHuisje) {
        setSelectedHuisje(currentHuisje)
        
        const huisjesDALInstance = new huisjeDAL();
        huisjesDALInstance.readSingleHuisje(currentHuisje)
            .then(result => {
                transformData(result);
            });
    }

    // Onchange event torens Select
    function onTorenChange(currentToren) {
        setSelectedToren(currentToren);

        const huisjesDALInstance = new huisjeDAL();
        huisjesDALInstance.readHuisjesPerToren(currentToren)
            .then(result => {
                setHuisjes(result);
            });
    }

    useEffect(() => {
        const fetchTorens = async () => {
            // Use the Read function from huisjeDAL
            const torensDALInstance = new torensDAL();

            // Use the functions from the HuisjesDAL component
            const TorensData = await torensDALInstance.readData();
            setTorens(TorensData);
        };

        fetchTorens();
    }, []); // Empty dependency array to run only on mount

    // Helper function to transform data
    function transformData(result) {
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
        UpdateSensorDataset("temperature", "temperatuur", time, temperatures);
        UpdateSensorDataset("pressure", "Druk", time, pressure);
        UpdateSensorDataset("CO2", "CO2", time, CO2);
    }

    // Changes date format
    function changeDateFormat(date) {
        let dateObject = new Date(date);
        let newDate = dateObject.getDate() + "/" + (dateObject.getMonth() + 1) + " " + dateObject.getHours() + ":" + dateObject.getMinutes()
        return newDate;
    }

    // Update a object in the state
    function UpdateSensorDataset(property, label, time, value) {
        setSensorData((prevState) => ({
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
                        <p>Selecteer een toren en huisje waar je de gegevens van wilt.</p>
                        {/* Select Toren */}
                        {torens && torens.length > 0 ? (
                        {torens && torens.length > 0 ? (
                            <select
                                name="Torens"
                                id="torens"
                                className="select"
                                value={selectedToren}
                                onChange={(e) => onTorenChange(e.target.value)}
                            >
                                <option value="">selecteer een Toren</option>
                                {torens.map((toren, index) => (
                                    <option key={index} value={toren.torenNaam}>
                                        {toren.torenNaam}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>Er was een probleem met het inladen van de torens</p>
                        ) : (
                            <p>Er was een probleem met het inladen van de torens</p>
                        )}

                        {/* Select huisjes */}
                        {huisjes && huisjes.length > 0 ? (
                        {huisjes && huisjes.length > 0 ? (
                            <select
                                name="Huisjes"
                                id="huisjes"
                                className="select"
                                value={selectedHuisje}
                                onChange={(e) => onHuisjeChange(e.target.value)}
                            >
                                <option value="">selecteer een Huisje</option>
                                {huisjes.map((huisje, index) => (
                                    <option key={index} value={huisje.device_id}>
                                        {huisje.device_id}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>Er was een probleem met het inladen van de huisjes.</p>
                        ) : (
                            <p>Er was een probleem met het inladen van de huisjes.</p>
                        )}
                    </div>
                </div>

                <div className="row">
                    {/* temp */}
                    <div className="col-md-4">
                        <div className="wr-diagram diagram-temperature">
                            <h2>Temperatuur</h2>
                            <span className="wr-temperature"><span id="temperature">{sensorData.temperature.datasets[0].data[0] || 0}</span><sup>C</sup></span>
                            <div className="wr-slider">
                                <div className="scale">
                                    <span>-10</span><span>40</span>
                                </div>
                                <input readOnly type="range" min="0" max="40" step="0.1" value={sensorData.temperature.datasets[0].data[0] || 0} className="slider" id="myRange" />
                            </div>
                        </div>
                    </div>

                    {/* Pressure */}
                    <div className="col-md-4">
                        <div className="wr-diagram">
                            <h2>Druk</h2>
                            <span className="wr-pressure">{sensorData.pressure.datasets[0].data[0]}<span>Bar</span></span>
                            <div className="wr-slider">
                                <div className="scale">
                                    <span>0.5</span><span>1.5</span>
                                </div>
                                <input readOnly type="range" min="0.5" max="1.5" step="0.1" value={sensorData.pressure.datasets[0].data[0] || 0} className="slider" id="myRange" />
                            </div>
                        </div>
                    </div>

                    {/* CO2 */}
                    <div className="col-md-4">
                        <div className="wr-diagram">
                            <h2>Co2</h2>
                            <span className="wr-CO2">{sensorData.CO2.datasets[0].data[0]}<span>PPM</span></span>
                            <div className="wr-slider">
                                <div className="scale">
                                    <span>0K</span><span>2K</span>
                                </div>
                                <input readOnly type="range" min="0" max="2000" step="0.1" value={sensorData.CO2.datasets[0].data[0] || 0} className="slider" id="myRange" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Temperature line chart */}
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="wr-diagram">
                            <h3>Temperatuur</h3>
                            <Line className="temperature" data={sensorData.temperature} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
