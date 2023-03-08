import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ContextFlight } from "./ContextFlights";

const Flight = () => {
  const [flights, setFlights] = useState({ listFlights: [] });
  // const [reservation, setReservation] = useState();
  const { reservationInfo, setReservationInfo } = useContext(ContextFlight);
  useEffect(() => {
    fetch("/flights") //reservation.flight
      .then((res) => res.json())
      .then((json) => {
        setFlights(json.data); //json
      });
  }, []);
  // console.log(flights);
  // console.log(Object.keys(flights));
  // console.log(flights.listFlights);
  console.log(reservationInfo);
  return (
    <Wrapper>
      <Title>Flight Number :</Title>
      <Options
        name="Select Flight"
        onChange={(e) => {
          console.log(e.target.value);
          setReservationInfo({ ...reservationInfo, flight: e.target.value }); //spread operator //disabled  ...reservationInfo,
        }}
      >
        <option value="default">Select flight</option>
        {/* <option>SA231</option> */}
        <>
          {flights.listFlights.map((flight) => {
            return <option id={flight._id}>{flight._id}</option>;
          })}
        </>
      </Options>
    </Wrapper>
  );
};
const Options = styled.select`
  //margin-right: 500px;
`;
const Wrapper = styled.div`
  background-color: red;
  height: 50px;
  margin: 0;
  display: flex;
`;
const Title = styled.h2``;

export default Flight;
