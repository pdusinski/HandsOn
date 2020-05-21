import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCompanyById, deleteWorker } from "../actions/company";
import Spinner from "./layout/Spinner";
import DashboardMenu from "./layout/DashboardMenu";
import { Redirect } from "react-router-dom";
import AddEmployee from "./functional/AddEmployee";
const Employees = ({
  user,
  getCompanyById,
  company,
  loading,
  deleteWorker
}) => {
  useEffect(() => {
    getCompanyById(user.owns[0]);
  }, [getCompanyById, user.owns]);

  //REDIRECT
  if (company.owner !== user._id) {
    return <Redirect to="/dashboard" />;
  }

  const deleteItem = email => {
    let id = 1;
    if (company) {
      id = company._id;
    }
    deleteWorker(id, email);
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="dashContainer">
          <DashboardMenu user={user} />

          <div className="dashContent">
            <div className="outterBox">
              <div className="addTeam">
                <div className="numberBox w100">
                  <div className="numberBox-logo">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="numberBox-content">
                    {company.workers.length}
                  </div>
                  <div className="numberBox-title">Employees</div>
                </div>
                <div className="listBox">
                  <AddEmployee />
                </div>
              </div>

              <div className="list-wrapper">
                {company.workers.length === 0 && (
                  <div className="positionRelative">
                    <div className="info-msg">"No Employees found"</div>
                  </div>
                )}
                <ul className="team-list">
                  {company.workers.map(worker => {
                    return (
                      <li className="team-list-item" key={worker._id}>
                        <div className="team-box">
                          <div className="team-name">{worker.name}</div>
                          <div className="team-desc">{worker.email}</div>
                        </div>

                        <div className="project-box">
                          <button
                            className="btn delete-btn"
                            onClick={e => deleteItem(worker.email)}
                          >
                            Delete Employee
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Employees.propTypes = {
  user: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  getCompanyById: PropTypes.func.isRequired,
  deleteWorker: PropTypes.func.isRequired,
  loading: PropTypes.bool
};
const mapStateToProps = state => ({
  user: state.auth.user,
  company: state.company.company,
  loading: state.company.loading
});

export default connect(mapStateToProps, { getCompanyById, deleteWorker })(
  Employees
);
