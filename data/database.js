const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        database = client;
        console.log('Connected to MongoDB!');
        callback(null, database);
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        callback(err);
    });
};


const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};