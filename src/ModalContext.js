import React, { useState, useContext } from "react";

export const ShowContext = React.createContext();
export const Show = ({ children }) => {
  const state = {
    show: false,
    description: ""
  };

  const [data, setShowData] = useState(state);

  return (
    <ShowContext.Provider value={{ data, setShowData}}>
      {children}
    </ShowContext.Provider>
  );
};
