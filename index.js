import { MongoClient } from "mongodb";

const uri = "mongodb+srv://Faunatoren:KutVogels69@cluster0.zveuwkr.mongodb.net/";
const client = new MongoClient(uri);
var allLogs = null;

async function run() {
  try {
    const database = client.db('Logs');
    const logsCollection = database.collection('Logs');

    // Geen specifieke voorwaarden voor de query (selecteer alles)
    const query = {};
    
    // Zoek alle documenten in de collectie
    allLogs = await logsCollection.find(query).toArray();
    
    console.log(allLogs);
  } finally {
    // Zorg ervoor dat de client wordt gesloten wanneer je klaar bent of er een fout optreedt
    await client.close();
  }
}

run().catch(console.dir);