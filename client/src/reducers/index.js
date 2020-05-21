import { combineReducers } from "redux";

import auth from "./auth";
import alert from "./alert";
import company from "./company";
import projects from "./project";
import team from "./team";
import notes from "./notes";
export default combineReducers({ auth, alert, company, projects, team, notes });
