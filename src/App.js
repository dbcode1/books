import "./App.css";
import { useEffect, useState, createContext, useContext } from "react";
import Root from "./components/Root/Root";

function App() {
  const context = createContext();
  const { data, setData } = useContext(Context);
  const update = (data) => {
    setData(data)
  }
  return (
    <context.Provider>
      <Root className="App"></Root>
    </context.Provider>
  );
}

export default App;
