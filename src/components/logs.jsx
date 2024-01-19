import React, { useEffect, useState } from 'react';
import { Auth0Client } from '@auth0/auth0-spa-js';

const LogsComponent = () => {
    const [auth0Logs, setAuth0Logs] = useState([]);
    const [auth0Client, setAuth0Client] = useState(null);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // Auth0 logs ophalen via Management API
        const getAuth0Logs = async () => {
            try {
                const accessToken = await auth0Client.getTokenSilently();

                const response = await fetch(`https://kjschollen.eu.auth0.com/api/v2/logs`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                const logs = await response.json();
                setAuth0Logs(logs);
            } catch (error) {
                console.error('Error retrieving Auth0 logs:', error);
                setAuth0Logs([]);
            }
        };

        if (auth0Client) {
            getAuth0Logs();
        }
    }, [auth0Client]);


    useEffect(() => {
        // Auth0 initialisatie
        const initializeAuth0 = async () => {
            const auth0 = new Auth0Client({
                domain: 'kjschollen.eu.auth0.com',
                client_id: 'cernTRpK8SxCXwI69sA594JLHc6FlrU4',
                audience: 'https://kjschollen.eu.auth0.com/api/v2/',
            });

            setAuth0Client(auth0);
        };

        initializeAuth0();
        fetch("http://avans.duckdns.org:1880/log?limit=10")
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setLogs(result);
            })
    }, []);



    return (
        <div>
            <h2>MongoDB Logs</h2>
            <table>
                {logs.map((log, index) => (
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
            <pre>{JSON.stringify(auth0Logs, null, 2)}</pre>
        </div>
    );
};

export default LogsComponent;