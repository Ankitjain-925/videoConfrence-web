import React, { useState } from "react"
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

var options = [{}]
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
export const SelectDoctor = (props) => {

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
              <Grid item xs={12} md={11} lg={11}>
              <div className="settingPage">
              {/* <h5 className="setting-h5">Settings</h5> */}
<div className='last-sec-setting'>

   

      {/* Card Menu */}
      <Card className="cardDisplay-select">
        <div className='card-section'>
          <div className="card-header">
            <img src={require("assets/virtual_images/agedman.png")} alt='doctor' />

          
          <div>
            <h5 className="selectdoc-head"> Stacy Lee, MD </h5>
            <p className='selectdoc-content'>Thu, Feb 3-8:30 am EST</p>
            <div className='selectdoc-button'>
              <span>on-line</span>
            </div>
          </div>
        </div>
        <div className='card-content'>
             <Select
                value={''}
                onChange={(e) => {}}
                options={options}
                placeholder={"I would like to"}
                name="appointment"
                isSearchable={true}
                className="mr_sel"
            />
          {/* <TextField
            className="outlined-select-currency"
            select
            margin='dense'
            size='small'
            variant="filled"
            label="I would like to"
          >
            
          </TextField> */}
         

          <p className='card-label'>Your Aimedis credit : <b>Omin</b> </p>
  
          <a>+ Top up your account </a>
     
          <div>
            <Button variant='contained' className="doctor-select-btn">Start the call</Button>

          </div>
        </div>
        </div>
      </Card>
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