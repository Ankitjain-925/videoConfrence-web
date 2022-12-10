
import LinearStepper from "./LinearStepper";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import React, { useState } from "react"
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import Notification from 'Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications';
import AppBar from '@material-ui/core/AppBar';
import { getLanguage } from 'translations/index';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Main from './Main';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from 'Screens/actions';
import { Settings } from "Screens/Login/setting";
import ButtJoin from "Screens/Components/Button/index";


function RegisterVC(props) {
  const [value, setValue] = useState(0)
  let translate = getLanguage(props.stateLanguageType);
  let {
    sick_leave_certificate,
    you_have_a_headache,
    you_have_stomach_problems,
    you_have_diarrhea,
    Submit,
    NotAvailable,
    holiday,
    slct_time_slot,
    you_have_cardiac_problems,
    you_feel_depressed,
    you_have_back_pain,
    you_have_cough_and_snees,
    rules_and_regulations_of_aimedis,
    you_have_fever,
    book_appointment
  } = translate;
  let {
    my_profile,
    Security
  } = translate;
  const myst1 = {
    position: "relative",
    left: "10px"
  };

  if (props?.stateLoginValueAim.token !== 401 &&
    props?.stateLoginValueAim.token !== 450 &&
    props?.stateLoginValueAim?.user?.type === 'patient' &&
    !props?.stateLoginValueAim?.isVideoLoggedIn) {
    return <Redirect to={'/patient/video_login'} />;
  }
  else {
  return (
    <Grid
      className={
        props.settings &&
          props.settings.setting &&
          props.settings.setting.mode &&
          props.settings.setting.mode === 'dark'
          ? 'homeBg darkTheme homeBgDrk'
          : 'homeBg'
      }>
      <Grid className="homeBgIner">
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12}>
            <Grid container direction="row">
              {/* Website Menu */}
              <LeftMenu isNotShow={true} currentPage="appointments" />
              <LeftMenuMobile isNotShow={true} currentPage="appointments" />
              <Notification />
              {/* Website Mid Content */}
              <Grid item xs={12} md={11} lg={10}>
                <div className="settingPage 77">
                  <Grid container direction="row">
                    <Grid item xs={12} sm={12} md={10} lg={8}>
                      <Grid container direction="row">
                         <Grid item xs={12} sm={6} md={6} lg={6}><h5 className="setting-h5">{book_appointment}</h5></Grid>
                         <Grid item xs={12} sm={6} md={6} lg={6}><ButtJoin /></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container direction="row">
                    <Grid item xs={12} sm={12} md={10} lg={8}><Main /></Grid>
                  </Grid>
                </div>
              </Grid>
              {/* End of Website Right Content */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
    }
}
const mapStateToProps = (state) => {
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    stateLoginValueAim,
    settings,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings
  })(RegisterVC)
);




