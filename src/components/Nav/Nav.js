import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  function Item({ name, path }) {
    return (
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "link pending" : isActive ? "link active" : ""
        }
        to={path}
      >
        {name}
      </NavLink>
    );
  }
  // render nav based on route
  let location = useLocation();
  const home = location.pathname == "/";

  return (
    <ul className="nav">
      <li >
        <Item name="Home" path="/"></Item>
      </li>
      <li>
        <Item name="Current" path="/best"></Item>
      </li>
      <li>
        <Item name="Archive" path="/best-by-date"></Item>
      </li>
      <li>
        <Item name="Library" path="/library"></Item>
      </li>
    </ul>
  );
};

export default Nav;
