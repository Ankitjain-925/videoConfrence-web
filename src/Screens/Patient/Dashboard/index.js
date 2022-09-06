import React, { useState } from "react"
import Grid from '@material-ui/core/Grid';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import Notification from 'Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications';
import AppBar from '@material-ui/core/AppBar';
import { getLanguage } from 'translations/index';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Button } from "@material-ui/core/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from 'Screens/actions';
import { Settings } from "Screens/Login/setting";

function TabContainer(props) {
  return (
    <Typography component="div" className="tabsCntnts">
      {props.children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
function Dashboard(props) {

  const [value, setValue] = useState(0)
  let translate = getLanguage(props.stateLanguageType);
  let {
    my_profile,
    Security
  } = translate;


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
              <LeftMenu isNotShow={true} currentPage="settings" />
              <LeftMenuMobile isNotShow={true} currentPage="settings" />
              <Grid item xs={12} md={10} lg={8}>
                <div className="settingPage">
                  <h5 className="setting-h5">Settings</h5>
                  <div className='settingbox form_full'>
                    <div >
                      <label>Your Aimedis Credit</label>
                      <p>24Min</p>
                    </div>
                    <div>
                      <Button variant='contained' className="topupButton">Top Up</Button>
                    </div>
                  </div>


                  <p className='settingbox-heading'>Account Settings</p>

                  <div className="last-sec-setting form_full">
                    <div className='middle-setting-items'><img src={require("assets/virtual_images/Account.png")} /><div ><label>Account</label></div></div>
                    <div className='middle-setting-items'><img src={require("assets/virtual_images/Language.png")} /><div ><label>Language</label></div></div>
                    <div className='middle-setting-items'><img src={require("assets/virtual_images/Units.png")} /><div ><label>Units</label></div></div>
                    <div className='middle-setting-items'><img src={require("assets/virtual_images/Privactandnotifications.png")} /><div ><label>Privactandnotification</label></div>
                    </div>


                  </div>
                  <p className='settingbox-heading'>Other</p>

                  <div className="last-sec-setting form_full">
                    <p className='middle-setting-items'>Amount</p>
                    <p>Terms & Conditions </p>
                    <p> Privact Policy</p>
                    <p> Rate Aimedies Diagnostics</p>
                  </div>
                </div>

                {/* <div className='logout' >Logout</div> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
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
  })(Dashboard)
);