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
export const Dashboard = (props) => {

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
              <LeftMenu isNotShow={true} currentPage="dashboard" />
              <LeftMenuMobile isNotShow={true} currentPage="dashboard" />
              <Grid item xs={12} md={10} lg={8}>
                <div className="settingPage">
              <h5 className="setting-h5">Settings</h5>
<div className='settingbox'>
  <div>
    <p>Your Aimedis Credit</p>
    <b>24Min</b>
  </div>
  <div>
    <Button variant='contained' className="topupButton">Top Up</Button>
  </div>
</div>


<p className='settingbox-heading'>Account Settings</p>

<div className="last-sec-setting">
  <div className='middle-setting-items'><img src={require("assets/virtual_images/Account.png")}  /><div >Account</div></div>
  <div className='middle-setting-items'><img src={require("assets/virtual_images/Language.png")}  /><div >Language</div></div>
  <div className='middle-setting-items'><img src={require("assets/virtual_images/Units.png")}  /><div >Units</div></div>
  <div className='middle-setting-items'><img src={require("assets/virtual_images/Privactandnotifications.png")}  /><div >Privactandnotification</div></div>


</div>
<p className='settingbox-heading'>Other</p>

<div className="last-sec-setting">
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