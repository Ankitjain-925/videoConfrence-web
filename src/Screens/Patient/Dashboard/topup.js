import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import Notification from 'Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications';
import AppBar from '@material-ui/core/AppBar';
import Select from 'react-select';
import { getLanguage } from 'translations/index';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Button, TextField, Card } from "@material-ui/core/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from 'Screens/actions';
import { Settings } from "Screens/Login/setting";
import { S3Image } from "Screens/Components/GetS3Images/index";

var options = [{}]
function TabContainer(props) {
  return (
    <Typography component="div" className="tabsCntnts">
      {this.props.children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
class TopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }

  render() {
    const { dataa } = this.props;
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      my_profile,
      Security
    } = translate;
    return (
      <>
       <Grid
      className={
        this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === 'dark'
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
                      <label>Your Aimedis Credit :</label>
                      <p>24 Min</p>
                    </div>
                    <div>
                      <Button variant='contained' className="topupButton">Top Up</Button>
                    </div>
                  </div>
                  <p className='settingbox-heading'>Account Settings</p>
                  <div className="last-sec-setting form_full">
                    <div className='middle-setting-items'><img src={require("assets/virtual_images/Account.png")}  /><div ><a onClick={profileLink}>Account</a></div></div>
                    <div className='middle-setting-items'><img src={require("assets/virtual_images/Language.png")}  /><div ><a onClick={openLanguageModel}>Language</a></div></div>
                    <div className='middle-setting-items'><img src={require("assets/virtual_images/Units.png")}  /><div >Units</div></div>
                    <div className='middle-setting-items'><img src={require("assets/virtual_images/Privactandnotifications.png")}  /><div >Privactandnotification</div></div>
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
      <SetLanguage
        getSetting={() => getSetting(this)}
        openFancyLanguage={openFancyLanguage}
        languageValue={languageValue}
        handleCloseFancyLanguage={()=>openLanguageModel()}
        openLanguageModel={()=>setOpenFancyLanguage(false)}
      />
    </Grid></>
        
    );
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
  })(TopUp)
);