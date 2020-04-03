const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'snake';

const client = new MongoClient(dbUrl);
let dbConnection;

async function createConnection() {
   const clientConnected = await client.connect();
   dbConnection = await clientConnected.db(dbName);
}
async function getConnection() {
   if(!dbConnection){
      await createConnection();
   }
   return dbConnection;
}

module.exports = getConnection;
