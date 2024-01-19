import { MongoClient } from 'mongodb';
import { AuthenticationClient } from 'auth0';
import React, { useEffect, useState } from 'react';

// Verbind met MongoDB
const uri = 'mongodb://Faunatoren:KutVogels69@cluster0/Logs';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Functie om MongoDB logs op te halen
async function getMongoDBLogs() {
    try {
        await client.connect();
        const database = client.db('Logs');
        const logsCollection = database.collection('Logs');

        // Query om logs op te halen
        const logs = await logsCollection.find().toArray();

        return logs;
    } finally {
        await client.close();
    }
}

const auth0 = new AuthenticationClient({
    domain: 'kjschollen.eu.auth0.com',
    clientID: 'cernTRpK8SxCXwI69sA594JLHc6FlrU4',
    clientSecret: 'auo6YNpDJGBrPkVNqW0fiJDyzwbCLMXWi-ETPLw5ETIaE81O0kMNLqc97y8hxIKx',
});

// Functie om Auth0 logs op te halen
async function getAuth0Logs() {
    try {
        const logs = await auth0.getLogs();

        return logs;
    } catch (error) {
        console.error('Error retrieving Auth0 logs:', error);
        return [];
    }
}

const LogsComponent = () => {
    const [mongoDBLogs, setMongoDBLogs] = useState([]);
    const [auth0Logs, setAuth0Logs] = useState([]);

    useEffect(() => {
        // Ophaal MongoDB logs
        getMongoDBLogs().then((logs) => setMongoDBLogs(logs));

        // Ophaal Auth0 logs
        getAuth0Logs().then((logs) => setAuth0Logs(logs));
    }, []);

    return (
        <div>
            <h2>MongoDB Logs</h2>
            <pre>{JSON.stringify(mongoDBLogs, null, 2)}</pre>

            <h2>Auth0 Logs</h2>
            <pre>{JSON.stringify(auth0Logs, null, 2)}</pre>
        </div>
    );
};

export default LogsComponent;