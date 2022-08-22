import React, { useState } from "react"
import Grid from '@material-ui/core/Grid';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import Notification from 'Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications';
import AppBar from '@material-ui/core/AppBar';
import { getLanguage } from 'translations/index';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

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
export const Dashboard =(props)=>{

    const [value, setValue] = useState(0)
    let translate = getLanguage(props.stateLanguageType);
    let {
      my_profile,
      Security
    } = translate;

      
    return(
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
                <Grid item xs={12} md={10} lg={8}>
                  <Grid className="profilePkg ">
                    <Grid className="profilePkgIner1">
                      {/* Tabs  */}
                      <AppBar position="static" className="profileTabsUpr">
                        <label>Patient DashBoard</label>
                      </AppBar>
                    </Grid>
                    <Grid className="profilePkgIner2">
                     
                    <h2>This is dashboard</h2>
                    </Grid>
                    {/* End of Tabs */}
                  </Grid>
                </Grid>
                {/* Website Right Content */}
                <Grid item xs={12} md={3}></Grid>
                {/* End of Website Right Content */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
}