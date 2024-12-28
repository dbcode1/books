import React, { useState, useContext } from "react";
import { useLocation, NavLink } from "react-router-dom";
import "./Nav.css";
import { Context } from "../../Context";

const Nav = () => {
  const { data, setData } = useContext(Context);

  function Item({ name, path }) {
    return (
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "link pending" : isActive ? "link active" : ""
        }
        to={path}
        viewTransition
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
      {/* <li>
        <Item className="nav-link"name="Home" path="/home">
          ITEM
        </Item>
      </li> */}
      <li>
        <Item name="Current" path="/best" viewTransition>
          ITEM
        </Item>
      </li>
      <li>
        <Item name="Archive" path="/best-by-date" viewTransition></Item>
      </li>
      <li>
        <Item name="Library" path="/library"></Item>
      </li>
    </ul>
  );
};

export default Nav;
