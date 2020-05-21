import React from "react";
import AddCompany from "./functional/AddCompany";

const NoCompany = ({ user }) => {
  return (
    <div className="col-1">
      <div className="welcomeBox">
        <h3 className="contentTitle">Welcome to TaskManager!</h3>

        <p>Hi {user.name}, </p>
        <p>We are glad you have chosen us to help you manage your tasks. </p>
        <br />
        <p>To get started you need to add a company.</p>
      </div>
      <div className="addTeam">
        <AddCompany />
      </div>
    </div>
  );
};

export default NoCompany;
