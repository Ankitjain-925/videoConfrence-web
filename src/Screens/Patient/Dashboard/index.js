import React, { useState } from "react"
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import Notification from 'Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications';
import AppBar from '@material-ui/core/AppBar';
import { getLanguage } from 'translations/index';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Button } from "@material-ui/core/index";
import { useHistory } from "react-router-dom";
import SetLanguage from "Screens/Components/SetLanguage/index.js";
import { getSetting } from "Screens/Components/Menus/api";
import { pure } from "recompose";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { withRouter } from "react-router-dom";


import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import { OptionList } from "Screens/Login/metadataaction";
import { authy } from "Screens/Login/authy.js";


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

const Dashboard = (props) => {
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [languageValue, setLanguageValue] = useState(null);
  const [openFancyLanguage , setOpenFancyLanguage ] = useState(false)

  let translate = getLanguage(props.stateLanguageType);
  let {
    my_profile,
    Security
  } = translate;

  const profileLink = () => {
    history.push("/patient");
  };
  
  //For open the model
  const openLanguageModel = () => {
    setOpenFancyLanguage(true);
  };

  //For close Model
  const handleCloseFancyLanguage = () => {
    setOpenFancyLanguage(false);
  };
  if(!props.stateLoginValueAim.isVideoLoggedIn){
    return <Redirect to={'/patient/video_login'} />;
  }else{
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
    </Grid>
  )
  }

}


const mapStateToProps = (state) => {
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  const { metadata } = state.OptionList;
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    metadata,
    //   Doctorsetget,
    //   catfil
  };
};
export default pure(
  withRouter(
    connect(mapStateToProps, {
      LoginReducerAim,
      OptionList,
      LanguageFetchReducer,
      Settings,
      authy,
    })(Dashboard)
  ))
