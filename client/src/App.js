import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard";
import Teams from "./components/functional/Teams";
import AddProject from "./components/functional/AddProject";
import Team from "./components/Team";
import Task from "./components/Task";
import Project from "./components/Project";
import Login from "./components/auth/Login";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import "./App.css";
import PrivateRoute from "./components/route/PrivateRoute";
import AddEmployee from "./components/functional/AddEmployee";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utilis/setAuthToken";
import Employees from "./components/Employees";
import Setting from "./components/layout/Setting";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <section className="container">
            <Alert />

            <Navbar />
            <Route exact path="/" component={Landing} />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/teams" component={Teams} />
              <PrivateRoute
                exact
                path="/add_project/:_id"
                component={AddProject}
              />

              <PrivateRoute exact path="/team/:_id" component={Team} />
              <PrivateRoute exact path="/employees" component={Employees} />
              <PrivateRoute
                exact
                path="/task/:project_id/:_id"
                component={Task}
              />
              <PrivateRoute
                exact
                path="/add_employee"
                component={AddEmployee}
              />

              <PrivateRoute
                exact
                path="/team/project/:_id"
                component={Project}
              />

              <PrivateRoute exact path="/settings" component={Setting} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
