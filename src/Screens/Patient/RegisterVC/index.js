
import LinearStepper from "./LinearStepper";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import React, { useState } from "react"
import Grid from '@material-ui/core/Grid';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import Notification from 'Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications';
import AppBar from '@material-ui/core/AppBar';
import { getLanguage } from 'translations/index';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Main from './Main';

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
  return (
    <Grid
      className={
        props.settings &&
          props.settings.setting &&
          props.settings.setting.mode &&
          props.settings.setting.mode === 'dark'
          ? 'homeBg darkTheme homeBgDrk'
          : 'homeBg'
      }
    >
      <Grid className="homeBgIner">
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12}>
            <Grid container direction="row">
              {/* Website Menu */}
              <LeftMenu isNotShow={true} currentPage="dashboard" />
              <LeftMenuMobile isNotShow={true} currentPage="dashboard" />
              <Notification />
              {/* Website Mid Content */}
              <Grid item xs={12} md={11} lg={10}>
                <Grid className="docsOpinion">
                  <Grid container direction="row" className="docsOpinLbl">
                    <Grid item xs={12} md={6} className= "label_1">
                      <label>{book_appointment}</label>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={10} lg={8}>

                  {/* <Grid className="profilePkgIner1"> */}
                  {/* Tabs  */}
                  {/* <AppBar position="static" className="profileTabsUpr">
                    <lable>Register </lable>
                  </AppBar> */}
                  {/* </Grid> */}
                  <Grid className="profilePkgIner2">

                    <Main />
                  </Grid>
                  {/* End of Tabs */}


                </Grid>
                {/* Website Right Content */}
                <Grid item xs={12} md={3}></Grid>
                {/* End of Website Right Content */}
              </Grid>
              {/* End of Website Right Content */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RegisterVC;



