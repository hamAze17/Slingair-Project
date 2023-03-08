"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, MONGO_URI_RESERVATIONS } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

const getFlights = async (req, res) => {
  //return flights;
  // const listFlights = flights.SA231;
  // res.status(200).json({ status: 200, data: { listFlights }, message: {} });
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("flights");
  //find() – learn how to query documents from a collection.
  // toArray() method returns an array that contains all the documents from a cursor.
  const listFlights = await db.collection("flightNum").find().toArray(); //SA231
  //SA231
  console.log(listFlights);
  if (listFlights.length > 0) {
    //flightNum
    return res
      .status(200)
      .json({ status: 200, data: { listFlights }, message: "Success Flights" });
  } else {
    return res.status(404).json({ status: 404, message: "Does not exist" });
  }
};
//res.status(200).json({ status: 200, data: {}, message: {} }); request response

const getFlight = async (req, res) => {
  // flights.map((flight) => {
  //   return flight;
  // });
  const flight = req.params.id; //request flight  //req.params.flight
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("flights"); //SA231 `${flight}`
  const oneFlight = await db.collection(`${flight}`).find().toArray(); //i think i have to specify one flight depending on what the user choose
  console.log(oneFlight);
  if (oneFlight.length > 0) {
    //
    return res.status(200).json({
      status: 200,
      data: { oneFlight },
      message: `Success ${flight} Flight`,
    });
  } else {
    return res.status(404).json({ status: 404, message: "Does not exist" });
  }
};

const addReservations = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("flights");

  const clientTwo = new MongoClient(MONGO_URI_RESERVATIONS, options);
  await clientTwo.connect();
  const dbTwo = clientTwo.db("reservations");

  const reservationInfo = req.body;
  const data = {
    _id: uuidv4(),
    seat: reservationInfo.seat, //it will be seat id ,info ,firstname
    flight: reservationInfo.flight, //flightNum
    firstName: reservationInfo.firstName,
    lastName: reservationInfo.lastName,
    email: reservationInfo.email,
  };
  // we have the change available to false in flights
  const update = await db
    .collection(`${reservationInfo.flight}`) //flightNum
    .updateOne({ id: reservationInfo.seat }, { $set: { isAvailable: false } }); //we need to update each flightNumber
  //
  if (update) {
    // we have to update database 2
    dbTwo.collection("reservation").insertOne(data);
    return res.status(200).json({
      status: 200,
      data: { data },
      message: "Successful reservation",
    });
  } else {
    return res.status(404).json({
      status: 404,
      message: "Reservation exist already",
    });
  }
};

const getReservations = async (req, res) => {
  //return reservations;
  const clientTwo = new MongoClient(MONGO_URI_RESERVATIONS, options);
  await clientTwo.connect();
  const dbTwo = clientTwo.db("reservations");
  const listReservations = await dbTwo
    .collection("reservation")
    .find()
    .toArray();
  console.log(listReservations);
  if (listReservations.length > 0) {
    return res.status(200).json({
      status: 200,
      data: { listReservations },
      message: "Success result reservations",
    });
  } else {
    return res.status(404).json({ status: 404, message: "Does not exist" });
  }
};
const getReservationUser = async (req, res) => {
  const email = req.params.email;
  const clientTwo = new MongoClient(MONGO_URI_RESERVATIONS, options);
  await clientTwo.connect();
  const dbTwo = clientTwo.db("reservations");
  console.log(email);
  const result = await dbTwo
    .collection("reservation")
    .find({ email })
    .toArray();
  if (result) {
    res.status(200).json({
      status: 200,
      data: { result },
      message: "Success result reservations",
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "failed",
    });
  }
};
const getSingleReservation = async (req, res) => {
  // reservations.map((reservation) => {
  //   return reservation;
  // });
  //const _id = req.params._id;
  const _id = req.params._id;
  const clientTwo = new MongoClient(MONGO_URI_RESERVATIONS, options);
  await clientTwo.connect();
  const dbTwo = clientTwo.db("reservations");
  //await
  console.log({ _id });
  const result = await dbTwo.collection("reservation").findOne({ _id });
  console.log(result);
  if (result) {
    res.status(200).json({
      status: 200,
      data: { result },
      message: "Success result reservations",
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "failed",
    });
  }
  // !result
  //   ? res.status(200).json({
  //       status: 200,
  //       data: { _id },
  //       message: "Success result reservations",
  //     })
  //   : res.status(404).json({
  //       status: 404,
  //       message: "failed",
  //     });

  // if (listReservation.length > 0) {
  //   return res.status(200).json({
  //     status: 200,
  //     data: {},
  //     message: "Success result reservations",
  //   });
  // } else {
  //   return res.status(404).json({ status: 404, message: "Does not exist" });
  // }
};

const deleteReservation = async (req, res) => {
  //now it deletes ,but the body res does not show anything
  const info = req.body;
  const _id = req.params._id;
  console.log({ _id });
  try {
    const clientTwo = new MongoClient(MONGO_URI_RESERVATIONS, options);
    await clientTwo.connect();
    const dbTwo = clientTwo.db("reservations");
    const result = await dbTwo.collection("reservation").deleteOne({ _id });
    console.log(result);
    if (result.deletedCount === 1) {
      res.status(204).json({
        status: 204,
        data: { _id },
        message: "deleted reservation",
      });

      res.status(404).json({
        status: 404,
        message: "failed",
      });
    }
    //   !result
    //     ? res.status(204).json({
    //         status: 204,
    //         data: { _id },
    //         message: "deleted reservations",
    //       })
    //     : res.status(404).json({
    //         status: 404,
    //         message: "failed",
    //       });
    //   console.log({ result });
    // });
  } catch (err) {
    console.log({ err });
  }

  // await dbTwo.collection("reservation").deleteOne({ _id }, (result) => {
  //   result
  //     ? res.status(204).json({
  //         status: 204,
  //         data: { result },
  //         message: "deleted reservations",
  //       })
  //     : res.status(404).json({
  //         status: 404,
  //         message: "failed",
  //       });
  // });
};

const updateReservation = async (req, res) => {
  //   need to update isAvailable on the flights db
  // So change the seat number on the actual reservation and then update the availability of the seats on the flight database
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("flights");

    const clientTwo = new MongoClient(MONGO_URI_RESERVATIONS, options);
    await clientTwo.connect();
    const dbTwo = clientTwo.db("reservations");

    const updateInfo = req.body;
    const data = {
      _id: updateInfo._id, //id
      seat: updateInfo.seat,
      oldSeat: updateInfo.oldSeat,
      flight: updateInfo.flight, //flightNum
    };
    console.log(updateInfo);
    console.log(data.oldSeat);
    // in flights database
    //we have to change the old seat to available and the new seat to unavailable so 2 updates
    // { _id: reservationInfo.seat }, { $set: { isAvailable: true } } //old
    //{ _id: reservationInfo.seat }, { $set: { isAvailable: false } }//new
    // const updateNewSeat =

    const updateOldSeatId = { id: updateInfo.oldSeat };
    const updOld = { $set: { isAvailable: true } };
    const updateNewSeatId = { id: updateInfo.seat };
    const updNew = { $set: { isAvailable: false } };
    await db
      .collection(`${updateInfo.flight}`) //id
      .updateOne(updateNewSeatId, updNew);

    //const updateOldSeat =
    await db
      .collection(`${updateInfo.flight}`)
      .updateOne(updateOldSeatId, updOld);

    //in reservation database seat will change
    const result = await dbTwo
      .collection("reservation")
      .updateOne({ _id: updateInfo._id }); //id before
    if (result) {
      //result
      return res.status(200).json({
        status: 200,
        data: { data },
        message: "Successful update",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "does not exist",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
  getReservationUser,
};
