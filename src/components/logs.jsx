import React, { useEffect, useState } from 'react';
import { Auth0Client } from '@auth0/auth0-spa-js';
import "./../style/components/logs.scss";

const LogsComponent = () => {
    const [mbdLogs, setMBDLogs] = useState([]);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch("https://avans.duckdns.org:1880/auth0-logs?limit=10")
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setLogs(result);
            })

        fetch("https://avans.duckdns.org:1880/log?limit=10")
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setMBDLogs(result);
            })
    }, []);



    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>MongoDB Logs</h2>
                    <table className='logsTable MBD' cellspacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>IP</th>
                                <th>Username</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mbdLogs.map((log, index) => (
                                <tr>
                                    <td>
                                        <p key={index}>{log._id}</p>
                                    </td>
                                    <td>
                                        <p key={index}>{log.ip}</p>
                                    </td>
                                    <td>
                                        <p key={index}>{log.username}</p>
                                    </td>
                                    <td>
                                        <p key={index}>{log.action}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2>Auth0 Logs</h2>
                    <table className='logsTable AUTH0' cellspacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>IP</th>
                                <th>User ID</th>
                                <th>User Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log, index) => (
                                <tr>
                                    <td>
                                        <p key={index}>{log._id}</p>
                                    </td>
                                    <td>
                                        <p key={index}>{log.type}</p>
                                    </td>
                                    <td>
                                        <p key={index}>{log.date}</p>
                                    </td>
                                    <td>
                                        <p key={index}>{log.description}</p>
                                    </td>
                                    <td>
                                        <p key={index}>{log.ip}</p>
                                    </td>
                                    <td>
                                        <p key={index}>{log.user_id}</p>
                                    </td>
                                    <td>
                                        <p key={index}>{log.user_name}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LogsComponent;