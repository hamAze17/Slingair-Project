import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ContextFlight } from "./ContextFlights";
import tombstone from "../assets/tombstone.png";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  // []; //listReservations: []
  const { reservationInfo, setReservationInfo, confirmation, setConfirmation } =
    useContext(ContextFlight);
  const [idres, setIdRes] = useState();
  useEffect(async () => {
    //    fetch("/reservations")
    //      .then((res) => res.json())
    //      .then((json) => {
    //        setReservations(json.data);
    //      }); //json
    //  }, []);
    await fetch(`/userReservation/${confirmation.data.email}`)
      .then((res) => res.json())
      .then((json) => {
        setReservations(json.data.result);
      });
    //   fetch(`/reservations/${confirmation.data._id}`)
    //     .then((res) => res.json())
    //     .then((json) => {
    //       setReservations(json.data);
    //     });
  }, [confirmation.data.email]);

  console.log(confirmation.data._id);
  //add a filter
  console.log(reservations);
  // Window.localStorage.setItem(
  //   "reservations",
  //   JSON.stringify(reservations.data)
  // );
  return (
    <Main>
      {/* {reservations.map((reservation) => {
        return <div id={reservation._id}>{reservation.flight}</div>;
      })} */}

      {reservations.map((reservation) => (
        <Wrapper>
          <Title>Reservation is confirmed : </Title>

          <Info>Email#:{reservation.email}</Info>
          <Info>
            Name#:{reservation.firstName} {reservation.lastName}
          </Info>
          <Info>Flight Num#:{reservation.flight}</Info>
          <Info>Seat#:{reservation.seat}</Info>
          <Info>Reservation#:{reservation._id}</Info>
        </Wrapper>
      ))}
    </Main>
    // {reservations.map((reservation)=>{
    //        return <div{reservation}</div>})
    // }
  );
};
const Main = styled.div`
  display: block;
  overflow: auto;
`;
const Title = styled.h2`
  color: var(--color-alabama-crimson);
`;
const Info = styled.div`
  text-align: center;
  color: black;
  padding: 10px;
`;

const Wrapper = styled.div`
  border: 4px var(--color-alabama-crimson) solid;
  //height: 100%;

  //display: block;
  //overflow: auto; //to remember
`;
const Image = styled.img`
  width: 100px;
  //position: ;
`;
export default Reservations;

//  {/* <Wrapper>
//         <Title>Reservation is confirmed : </Title>
//         {/* <input
//           onChange={(e) =>
//             setReservationInfo({ ...reservationInfo, _id: e.target.value })
//           }
//         /> */}
//         <Info>Email#:{reservationInfo.email}</Info>
//         <Info>
//           Name#:{reservationInfo.firstName} {reservationInfo.lastName}
//         </Info>
//         <Info>Flight Num#:{reservationInfo.flight}</Info>
//         <Info>Seat#:{reservationInfo.seat}</Info>
//         <Info>Reservation#:{confirmation.data._id}</Info>
//       </Wrapper> */}
