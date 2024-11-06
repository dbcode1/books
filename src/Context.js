import React, { useState, useContext } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
  const state = {
    loading: false,
    error: "",
    author: "",
    results: [],
    // description: "",
    // show: false,
    ISBN: "",
    title: "",
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
