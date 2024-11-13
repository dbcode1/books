import React, { useState, useContext } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  const state = {
    loading: false,
    error: "",
    author: "",
    results: [],
    dateResults: [],
    ISBN: "",
    busy: true,
  };

  const [data, setData] = useState(state);

  const update = (data) => {
    setData(data);
  };

  return (
    <Context.Provider value={{ data, setData, update }}>
      {children}
    </Context.Provider>
  );
};
