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
                    <table className='logsTable MBD'>
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
                    </table>

                    <h2>Auth0 Logs</h2>
                    <table className='logsTable AUTH0'>
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
                    </table>
                    <pre>{JSON.stringify(logs, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
};

export default LogsComponent;