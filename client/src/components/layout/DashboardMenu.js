import React, { Fragment } from "react";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

const DashboardMenu = ({ user }) => {
  return (
    <Fragment>
      {!user ? (
        <Spinner />
      ) : (
        <div className="dashboardMenu">
          <input
            type="checkbox"
            className="navigation__checkbox"
            id="navi-toggle"
          />
          <label htmlFor="navi-toggle" className="navigation__button">
            <span className="navigation__icon">&nbsp;</span>
          </label>
          <section className="dashboardMenu-nav">
            <div className="avatarBox">
              <img className="round-img avatarImg" src={user.avatar} alt="" />
              <p className="name">{user.name}</p>
            </div>
            <div className="menu">
              <ul>
                <li>
                  <Link className="menu_links" to="/">
                    <i className="fas fa-user" /> <span>Dashboard</span>
                  </Link>
                </li>
                {user.owns.length !== 0 && user.admin === true && (
                  <Fragment>
                    <li>
                      <Link className="menu_links" to="/teams">
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Company</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="menu_links" to="/employees">
                        <i className="fas fa-wallet"></i>

                        <span>Employees</span>
                      </Link>
                    </li>
                  </Fragment>
                )}

                <li>
                  <Link className="menu_links" to="/settings">
                    <i className="fas fa-wallet"></i>

                    <span>Setting</span>
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </Fragment>
  );
};

export default DashboardMenu;
