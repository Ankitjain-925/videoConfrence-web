import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Register from "Screens/Register";
import Login from "Screens/Login";
import ForgotPass from "Screens/ChangePassword";
import ChangePass from "Screens/ChangePassword/changepassword";
import NotFound from "Screens/Components/NotFound";
import RegSuccuss from "Screens/Components/RegSuccess/index";
import AppointmentList from "Screens/Patient/RequestList/index";
import PatientProfile from "Screens/Patient/Profile/index";
import Payment from "Screens/Patient/RequestList/Payment/index";
import ArchiveRequest from "Screens/Patient/ArchiveRequest/index";

import Dashboard from "../../Screens/Patient/Dashboard";
// import { SelectDoctor } from "Screens/Patient/Dashboard/selectdoctor";
import Newpage from "Screens/Patient/newpage/index";
import VideoCallPat from "Screens/Patient/VideoCall/index"

import RegisterVideo from "Screens/Patient/RegisterVideo";
import LoginVideo from "Screens/Patient/loginVideo";
import VideoGuideLine from "Screens/Patient/VideoGuideLine";
import RegisterVC from "Screens/Patient/RegisterVC/index";
import TopUp from "Screens/Patient/Dashboard/topup"
import FeedBack from "Screens/Patient/FeedBack";
import Card from "Screens/Patient/RegisterVC/PaymentSection/CardPayment";
// import TopUp from "Screens/Patient/Dashboard/topup"
class Routermain extends Component {
  render() {
    return (
      <Router basename={"/video-conference"}>
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
              path="/patient/access-key"
              render={(props) => <Newpage {...props} />}
            />

            <Route
              exact
              path="/patient/video-call"
              render={(props) => <VideoCallPat {...props} />}
            />
            <Route
              exact
              path="/patient/settings"
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              exact
              path="/patient/top-up"
              render={(props) => <TopUp {...props} />}
            />
            <Route
              exact
              path="/video-guideline"
              render={(props) => <VideoGuideLine {...props} />}
            />

            <Route
              exact
              path="/patient/video_register"
              render={(props) => <RegisterVideo {...props} />}
            />

            <Route exact path='/video_login' render={(props) => <LoginVideo {...props} />} />
            <Route exact path='/patient/video_login' render={(props) => <LoginVideo {...props} />} />
            <Route
              exact
              path="/patient/video_login"
              render={(props) => <LoginVideo {...props} />}
            />
            <Route
              exact
              path="/patient/card-payment"
              render={(props) => <Card
                {...props}
              />}
            />

            <Route
              path="/patient/new-request"
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
              path="/patient/Feed-back"
              render={(props) => <FeedBack {...props} />}
            />

            {/* Need to route required component */}
            <Route
              path="*"
              exact={true}
              render={(props) => <NotFound {...props} />}
            />
          </Switch >
        </Grid >
      </Router >
    );
  }
}
export default Routermain;
