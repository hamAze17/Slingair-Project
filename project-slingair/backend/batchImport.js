// import the info on data.js on the database
//const fs = require("file-system");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const assert = require("assert");
const { MONGO_URI, MONGO_URI_RESERVATIONS } = process.env;
const { flights, reservations } = require("./data");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mappedFlights = flights.SA231.map((flight) => {
  return flight;
});

const mappedReservations = reservations.map((reservation) => {
  return reservation;
});
//const flight = JSON.parse(fs.readFileSync("/backend/data"));

const batchImport = async (dbName) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db(dbName);
    await db.collection("SA231").insertMany(mappedFlights); //2 databases

    client.close();
    console.log(flights);
  } catch (err) {
    console.log(err);
  }
};

const batchImportReservation = async (dbName) => {
  try {
    const clientTwo = new MongoClient(MONGO_URI_RESERVATIONS, options);
    await clientTwo.connect();
    const dbTwo = clientTwo.db(dbName);
    await dbTwo.collection("reservation").insertMany(mappedReservations);
    clientTwo.close();
    console.log(reservations);
  } catch (err) {
    console.log(err);
  }
};

batchImport("flights");
batchImportReservation("reservations");
