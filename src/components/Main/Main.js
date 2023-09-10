import "./Main.css";
import React from "react";
import Paginator from "../Paginator/Paginator";
import Navigation from "../Navigation/Navigation";
import ElementsList from "../ElementsList/ElementsList";

function Main() {
  return (
    <div className="main">
      <Navigation />
      <ElementsList />
      <Paginator />
    </div>
  );
}

export default Main;
