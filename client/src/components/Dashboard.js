import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./layout/Spinner";
import WorkerDash from "./layout/worker/WorkerDash";
import DashboardMenu from "./layout/DashboardMenu";
import { loadUser } from "../actions/auth";
import NoCompany from "./NoCompany";
import Company from "./Company";
import ConnectWithCompany from "./ConnectWithCompany";
const Dashboard = ({ user, loading }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="dashContainer">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <DashboardMenu user={user} />
          <div className="dashContent">
            {user.admin ? (
              user.owns.length < 1 ? (
                <NoCompany user={user} />
              ) : (
                <Company />
              )
            ) : user.worksFor.length > 0 ? (
              <WorkerDash />
            ) : (
              <ConnectWithCompany />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};
Dashboard.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  user: state.auth.user,
  company: state.company
});
export default connect(mapStateToProps)(Dashboard);
