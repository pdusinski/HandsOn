import React, { Fragment, useState } from "react";
import { addMember } from "../actions/company";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./layout/Spinner";

const AddMember = ({ company, addMember, team, loading }) => {
  const [formData, setFormData] = useState({
    email: ""
  });
  const { email } = formData;
  const team_id = team._id;
  const company_id = company._id;

  const onChange = e => {
    setFormData({ ...formData, email: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    addMember(email, company_id, team_id);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <h3>Add a new member</h3>

            <select
              value={email}
              onChange={e => onChange(e)}
              className="form-input2"
            >
              <option key="1" value="" value disabled hidden>
                Choose from your employees
              </option>
              {company.workers.map(worker => (
                <option key={worker._id} value={worker.email}>
                  {worker.name}
                </option>
              ))}
            </select>
            <input
              type="submit"
              value="Add"
              onSubmit={e => onSubmit(e)}
              className="btn btn-primary"
            />
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

AddMember.propTypes = {
  addMember: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  team: state.team.team,
  loading: state.team.loading
});
export default connect(mapStateToProps, { addMember })(AddMember);
