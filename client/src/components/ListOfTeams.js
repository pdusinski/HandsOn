import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const ListOfTeams = ({ teams, user, company, link }) => {
  let count = 0;

  const increment = () => {
    count = count + 1;
  };
  return (
    <Fragment>
      <ul className="team-list positionRelative">
        {teams.map(e => {
          if (e.members.includes(user.email) || company.owner === user._id) {
            increment();
            return (
              <li className="team-list-item" key={e._id}>
                <div className="team-box">
                  <div className="team-name">
                    <Link to={`team/${e._id}`}>{e.name}</Link>
                  </div>
                  <div className="team-desc">{e.description}</div>
                </div>

                <div className="project-box">
                  <div className="project-number">{e.numberOfProjects}</div>
                  <div className="project-title">
                    {" "}
                    <i className="fas fa-tasks"></i>
                  </div>
                </div>
              </li>
            );
          }
        })}
        {user._id !== company.owner && count === 0 && (
          <p className="info-msg">You are not a member of any team yet.</p>
        )}

        {teams.length === 0 && (
          <Fragment>
            <p className="noTeamsMsg">
              Currently you don't have any teams added to your company. Please
              add at least one team / department to your team.
            </p>
            {link && (
              <p className="addTeamLink">
                <Link to="/teams">Add a team </Link> to your Company{" "}
              </p>
            )}
          </Fragment>
        )}
        {teams.length > 0 && link === true && (
          <li>
            <p className="addTeamLink">
              <Link to="/teams">Add a team </Link> to your Company{" "}
            </p>
          </li>
        )}
      </ul>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  company: state.company.company
});

export default connect(mapStateToProps)(ListOfTeams);
