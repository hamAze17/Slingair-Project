"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
  getReservationUser,
} = require("./handlers");
express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  //ADD ALL THE ENDPOINTS HERE
  //4 get endpoints
  .get("/reservations", getReservations)
  .get("/flights", getFlights)
  .get("/flight/:id", getFlight) //.get("/flights/:id", getFlight) //flights
  .get("/reservations/:_id", getSingleReservation) //_id
  .get("/userReservation/:email", getReservationUser)
  //1 post to add reservation
  .post("/reservations", addReservations)

  //1 put to update the reservations
  .patch("/reservations/", updateReservation) //put]
  // delete the reservation
  .delete("/reservations/:_id", deleteReservation) //_id

  //
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
