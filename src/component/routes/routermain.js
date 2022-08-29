
import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Register from "Screens/Register";
import Login from "Screens/Login";
import ForgotPass from "Screens/ChangePassword";
import ChangePass from "Screens/ChangePassword/changepassword";
import NotFound from "Screens/Components/NotFound";
import RegSuccuss from "Screens/Components/RegSuccess/index";
import Form from "Screens/Patient/SickLeaveForm/index";
import AppointmentList from "Screens/Patient/RequestList/index";
import PatientProfile from "Screens/Patient/Profile/index";
import VideoCall from "Screens/VideoCall/index";
import Payment from "Screens/Patient/RequestList/Payment/index";
import ArchiveRequest from "Screens/Patient/ArchiveRequest/index";
import { Dashboard } from "Screens/Patient/Dashboard";
import RegisterVideo from "Screens/Patient/RegisterVideo";
import VideoGuideLine from 'Screens/Patient/VideoGuideLine'
import RegisterVC from 'Screens/Patient/RegisterVC/index'

class Routermain extends Component {
  render() {
    return (
      <Router basename={"/video-confrance"}>
        <Grid>
          <Switch>
            <Route exact path="/" render={(props) => <Login {...props} />} />
            <Route
              exact
              path="/register"
              render={(props) => <Register {...props} />}
            />

            <Route
              exact
              path="/dashboard"
              render={(props) => <Dashboard {...props} />}
            />

            <Route
              exact
              path="/video-guideline"
              render={(props) => <VideoGuideLine {...props} />}
            />

            <Route
              exact
              path="/video_register"
              render={(props) => <RegisterVideo {...props} />}
            />

            <Route
              exact
              path="/patient/register-VC"
              render={(props) => <RegisterVC {...props} />}
            />


          <Route
              exact
              path="/appointment-list"
              render={(props) => <AppointmentList {...props} />}
            />
            
         <Route
              exact
              path="/patient"
              render={(props) => <PatientProfile {...props} />}
            />
            <Route
              exact
              path="/forgot-password"
              render={(props) => <ForgotPass {...props} />}
            />
            <Route
              exact
              path="/change-password"
              render={(props) => <ChangePass {...props} />}
            />
            <Route
              exact
              path="/register-successfull"
              render={(props) => <RegSuccuss {...props} />}
            />
            <Route
              exact
              path="/patient/sick-request"
              render={(props) => <Form {...props} />}
            />

            {/* Need to route required component */}
            <Route
              path="*"
              exact={true}
              render={(props) => <NotFound {...props} />}
            />
          </Switch>
        </Grid>
      </Router>
    );
  }
}
export default Routermain;
