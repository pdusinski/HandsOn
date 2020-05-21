import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    admin: false
  });
  let { name, email, password, password2, admin } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      if (admin === "true") {
        admin = true;
      } else {
        admin = false;
      }
      register({ name, email, password, admin });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <section className="inner-container">
        <section className="auth-container">
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead">
            <i className="fas fa-user" /> Create Your Account
          </p>
          <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
              <input
                className="form-input"
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-input"
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
              />
              <small className="form-text">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar email
              </small>
            </div>
            <div className="form-group">
              <input
                className="form-input"
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-input"
                type="password"
                placeholder="Confirm Password"
                name="password2"
                minLength="6"
                value={password2}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-radio-container">
              <div className="radio-box">
                <input
                  className="form-input"
                  type="radio"
                  name="admin"
                  value={true}
                  onChange={e => onChange(e)}
                />
                <label>Owner</label>
              </div>
              <div className="radio-box">
                <input
                  className="form-input"
                  type="radio"
                  name="admin"
                  value={false}
                  onChange={e => onChange(e)}
                  defaultChecked
                />
                <label>Emploee </label>
              </div>
            </div>

            <input type="submit" className="btn btn-primary" value="Register" />
          </form>
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </section>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, register })(Register);
