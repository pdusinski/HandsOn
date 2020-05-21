import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addWorker } from "../../actions/company";
import { Redirect } from "react-router-dom";

const AddEmployee = ({ user, company, addWorker }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    accessKey: ""
  });
  //REDIRECT
  if (company.owenr === user._id) {
    return <Redirect to="/dashboard" />;
  }

  const { name, email, accessKey } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = e => {
    e.preventDefault();
    let id = 1;
    if (company) {
      id = company._id;
    }
    addWorker(name, email, accessKey, id);
    setFormData({ name: "", email: "", accessKey: "" });
  };

  return (
    <div className="AddEmployeeForm">
      <h3>Add Employee</h3>
      <div>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
              className="form-input2"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Email"
              name="email"
              value={email}
              type="email"
              onChange={e => onChange(e)}
              className="form-input2"
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Please provide a 4 character password "
              name="accessKey"
              value={accessKey}
              type="text"
              onChange={e => onChange(e)}
              className="form-input2"
            />
          </div>

          <input type="submit" className="btn btn-primary" value="add" />
        </form>
      </div>
    </div>
  );
};

AddEmployee.propTypes = {
  user: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  addWorker: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user,
  company: state.company.company
});

export default connect(mapStateToProps, { addWorker })(AddEmployee);
