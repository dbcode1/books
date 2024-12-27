import React, { useState, useContext } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  const state = {
    loading: true,
    error: "",
    author: "",
    results: [],
    dateResults: [],
    libraryResults: [],
    ISBN: "",
    busy: true,
  };

  const [data, setData] = useState(state);

  return (
    <Context.Provider value={{ data, setData }}>{children}</Context.Provider>
  );
};
