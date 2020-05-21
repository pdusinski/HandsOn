import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTeam } from "../../actions/company";
import { Redirect } from "react-router-dom";
import DashboardMenu from "../layout/DashboardMenu";
import ListOfTeams from "../ListOfTeams";
const Teams = ({ addTeam, company, user }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  //REDIRECT
  if (company.owner !== user._id) {
    return <Redirect to="/dashboard" />;
  }

  const { name, description } = formData;

  const onSubmit = e => {
    e.preventDefault();
    let id = company._id;
    addTeam(name, description, id);
    setFormData({
      name: "",
      description: ""
    });
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="dashContainer">
      <DashboardMenu user={user} />
      <div className="dashContent">
        <div className="outterBox">
          <div className="addTeam">
            <div className="numberBox w100">
              <div className="numberBox-logo">
                <i className="fas fa-users"></i>
              </div>
              <div className="numberBox-content">{company.teams.length}</div>
              <div className="numberBox-title">Teams</div>
            </div>
            <div className="listBox">
              <form className="form " onSubmit={e => onSubmit(e)}>
                <h3>Add Team:</h3>
                <div className="form-group2">
                  <input
                    className="form-input2"
                    type="text"
                    placeholder="Team's name"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)}
                  />
                </div>

                <div className="form-group2">
                  <textarea
                    className="form-input2"
                    type="text"
                    placeholder="Short description"
                    name="description"
                    value={description}
                    onChange={e => onChange(e)}
                    maxLength="30"
                    rows="4"
                  ></textarea>
                </div>

                <input type="submit" className="btn btn-primary" value="add" />
              </form>
            </div>
          </div>
          <div className="list-wrapper">
            <ListOfTeams teams={company.teams} link={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

Teams.propTypes = {
  addTeam: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  company: state.company.company,
  user: state.auth.user
});

export default connect(mapStateToProps, { addTeam })(Teams);
