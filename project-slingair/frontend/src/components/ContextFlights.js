// i see that the frontend is lacking things so i will add this context so i can have states that i will use on
//other components
import React, { useState } from "react";

export const ContextFlight = React.createContext();

export const ContextProvider = ({ children }) => {
  const [reservationInfo, setReservationInfo] = useState({
    seat: null,
    flight: null,
    firstName: "",
    lastName: "",
    email: "",
    //_id: null,
  });

  //   id: "88a33c23-3332-4ef2-bd71-be7a6430485f",
  //     flight: "SA231",
  //     seat: "4D",
  //     givenName: "Marty",
  //     surname: "McFly",
  //     email: "marty@backfuture.com",
  const [confirmation, setConfirmation] = useState({ data: "" });
  return (
    <ContextFlight.Provider
      value={{
        reservationInfo,
        setReservationInfo,
        confirmation,
        setConfirmation,
      }}
    >
      {children}
    </ContextFlight.Provider>
  );
};

export default ContextFlight;
