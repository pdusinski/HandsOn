import React, { Fragment } from "react";
import { deleteMember } from "../actions/company";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./layout/Spinner";

const DeleteMember = ({ deleteMember, company, team, loading, admin }) => {
  const team_id = team._id;
  const company_id = company._id;

  const deleteItem = email => {
    deleteMember(email, company_id, team_id);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <ul className="memberList">
          {team.members.map(member => {
            let workers = company.workers;
            let index = workers.findIndex(w => w.email === member);

            return (
              <li key={workers[index]._id}>
                <div className="memberList-item">
                  <img
                    className="round-img memberList-img"
                    src={workers[index].user_id.avatar}
                    alt=""
                  />
                  <span className="memberList-title">
                    {workers[index].name}
                  </span>
                  {admin && (
                    <button
                      className="btn btn-danger memberList-btn"
                      onClick={e => deleteItem(member)}
                    >
                      delete
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Fragment>
  );
};

DeleteMember.propTypes = {
  deleteMember: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  admin: PropTypes.bool
};

const mapStateToProps = state => ({
  team: state.team.team,
  loading: state.team.loading
});

export default connect(mapStateToProps, { deleteMember })(DeleteMember);
