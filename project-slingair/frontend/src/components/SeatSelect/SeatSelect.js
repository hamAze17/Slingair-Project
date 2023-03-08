import React from "react";
import Plane from "./Plane";
import { ContextFlight } from "../ContextFlights";
import User from "../User";
import styled from "styled-components";

const SeatSelect = ({}) => {
  return (
    <Wrapper>
      <Title>Select your seat and Provide your information!</Title>
      <Plane />
      <User />
    </Wrapper>
  );
};

const Title = styled.h2`
  font-size: 15px;
  margin-left: 300px;
  //position: absolute;
`;
const Wrapper = styled.div`
  display: flex;
  margin-left: -300px;
`;

export default SeatSelect;
