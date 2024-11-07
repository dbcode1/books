import React, { useState, useContext } from "react";

export const ShowContext = React.createContext();
export const Show = ({ children }) => {
  const state = {
    show: false,
    description: "",
    title: ""
  };

  const [showData, setShowData] = useState(state);

  return (
    <ShowContext.Provider value={{ showData, setShowData}}>
      {children}
    </ShowContext.Provider>
  );
};
