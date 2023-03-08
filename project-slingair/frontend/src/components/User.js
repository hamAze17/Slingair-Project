import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ContextFlight } from "./ContextFlights";
import { useHistory } from "react-router-dom";

const User = () => {
  let redirect = useHistory();
  const [error, setError] = useState(false);

  const { reservationInfo, setReservationInfo, confirmation, setConfirmation } =
    useContext(ContextFlight);
  const addNewReservation = async () => {
    try {
      const reservation = await fetch(`/reservations`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify(reservationInfo),
      });
      const json = await reservation.json();
      setConfirmation(json.data);
      if (json.status === 200) {
        //if the status is confirmed
        redirect.push("/confirmed");
      } else {
        setError(true);
      }
    } catch (err) {
      return err;
    }
  };
  console.log(confirmation);
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewReservation();
  };
  return (
    <Wrapper>
      {/* <input>First Name:</input> */}
      {/* <input>Last Name:</input>
      <input>Email:</input> */}

      {/* value="First Name"
value="Last Name"
value="Email" */}
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="FirstName"
          onChange={(e) =>
            setReservationInfo({
              ...reservationInfo,
              firstName: e.target.value,
            })
          }
        />
        <Input
          placeholder="LastName"
          onChange={(e) =>
            setReservationInfo({ ...reservationInfo, lastName: e.target.value })
          }
        />
        <Input
          placeholder="Email"
          onChange={(e) =>
            setReservationInfo({ ...reservationInfo, email: e.target.value })
          }
        />
        <Button>Confirm</Button>
      </Form>
      {error && <Msg>Reservation Not processed! try Again!</Msg>}
    </Wrapper>
  );
};
const Form = styled.form`
  //display: inline-block;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
`;
const Msg = styled.div`
  color: red;
`;
const Input = styled.input`
  width: 200px;
  text-align: center;
`;
const Wrapper = styled.div`
  margin-top: 100px;
  //margin-left: 600px;
   margin-right: 100px; */
  display: flex;
  flex-direction: column;
  border: 2px red solid;
  height: 300px;
  //top:100px;
`;
const Button = styled.button`
  background-color: red;
`;

//margin-right: 150px;

export default User;
