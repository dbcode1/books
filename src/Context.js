import React, { useState, useContext } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  const state = {
    loading: false,
    error: "",
    author: "",
    results: [],
    description: "",
    show: false,
    ISBN: "",
  };

  const [data, setData] = useState(state);

  return (
    <Context.Provider value={{ data, setData }}>{children}</Context.Provider>
  );
};
