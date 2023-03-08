import React, { useContext } from "react";
import styled from "styled-components";

import tombstone from "../assets/tombstone.png";
import { ContextFlight } from "./ContextFlights";

const Confirmation = () => {
  const { reservationInfo, setReservationInfo, confirmation, setConfirmation } =
    useContext(ContextFlight);
  return (
    <>
      <Wrapper>
        <Title>Confirmation Flight:</Title>
        <Divider />
        <Info>Reservation#:{confirmation.data._id}</Info>
        <Info>Email#:{reservationInfo.email}</Info>
        <Info>
          Name#:{reservationInfo.firstName} {reservationInfo.lastName}
        </Info>
        <Info>Flight Num#:{reservationInfo.flight}</Info>
        <Info>Seat#:{reservationInfo.seat}</Info>
        {/* <Info>Reservation#:{reservationInfo._id}</Info> */}
      </Wrapper>
      <Image src={tombstone} />
    </>
  ); // this needs to be done like the screenshot confirmation
};
//we need to style the confirmation as well the result of the confirmation
const Info = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: var(--color-alabama-crimson);
`;

const Divider = styled.div`
  border-bottom: 5px solid white;
`;
const Title = styled.h2``;
const Image = styled.img`
  width: 150px;
  margin-left: 500px;
`;
const Wrapper = styled.div`
  border: 2px red solid;
`;

export default Confirmation;
