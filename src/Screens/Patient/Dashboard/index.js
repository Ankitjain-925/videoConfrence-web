import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import Notification from 'Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications';
import AppBar from '@material-ui/core/AppBar';
import { getLanguage } from 'translations/index';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import sitedata from 'sitedata';
import { commonHeader } from 'component/CommonHeader/index'
import PropTypes from 'prop-types';
import { Button } from "@material-ui/core/index";
import { useHistory } from "react-router-dom";
import SetLanguage from "Screens/Components/SetLanguage/index.js";
import { pure } from "recompose";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { withRouter } from "react-router-dom";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import { OptionList } from "Screens/Login/metadataaction";
import { authy } from "Screens/Login/authy.js";
import MiddleTopup from "./middleTopup";
import ButtJoin from "Screens/Components/Button/index";


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
  const [openFancyLanguage, setOpenFancyLanguage] = useState(false)

  let translate = getLanguage(props.stateLanguageType);
  let {
    my_profile,
    Security,
    settings,
    account_settings,
    account,
    language,
    units,
    privact_and_notification,
    other,
    about,
    terms_conditions,
    privact_policy,
    rate_aimedies_diagnostics,
    logout_sec,
  } = translate;
  

  const profileLink = () => {
    history.push("/patient");
  };
  // componentDidMount
  useEffect(() => {
    getSetting()
  }, [])

  const LogoutDashClick = () => {
    var forUpdate = { value: true, token: props?.stateLoginValueAim?.token, user: props?.stateLoginValueAim?.user }
    props.LoginReducerAim(props?.stateLoginValueAim?.user?.email, '', props?.stateLoginValueAim?.token, () => { }, forUpdate, false, false, true);
  }
  const getSetting = () => {
    axios
      .get(
        sitedata.data.path + '/UserProfile/updateSetting',
        commonHeader(props?.stateLoginValueAim.token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed && responce.data.data) {
          props.Settings(responce.data.data);
        } else {
          props.Settings({
            user_id: props?.stateLoginValueAim?.user?._id,
          });
        }
        var languageValue = responce.data.data && responce.data.data.language
          ? responce.data.data.language
          : 'en';
        setLanguageValue(languageValue);
        props.LanguageFetchReducer(languageValue);
      });
  };


  //For open the model
  const openLanguageModel = () => {
    setOpenFancyLanguage(true);
  };

  //For close Model
  const handleCloseFancyLanguage = () => {
    setOpenFancyLanguage(false);
  };

  if (
    props?.stateLoginValueAim.user === 'undefined' ||
    props?.stateLoginValueAim.token === 450 ||
    props?.stateLoginValueAim.token === 'undefined' ||
    props?.stateLoginValueAim.user.type !== 'patient'
  ) {
    return <Redirect to={'/'} />;
  }
  else if (props?.stateLoginValueAim.token !== 401 &&
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
                    <Grid container direction="row" justify="center">
                      <Grid item xs={3} md={3} lg={3}>
                        <h5 className="setting-h5">{settings}</h5>

                      </Grid>
                      <Grid item xs={6} md={5} lg={5}>

                      </Grid>
                      <Grid item xs={3} md={4} lg={4}>

                        <ButtJoin />
                      </Grid>
                    </Grid>


                    <MiddleTopup btnShow={true} />

                    <p className='settingbox-heading'>{account_settings}</p>
                    <div className="last-sec-setting form_full">
                      <div className='middle-setting-items'><img src={require("assets/virtual_images/Account.png")} /><div ><a onClick={profileLink}>{account}</a></div></div>
                      <div className='middle-setting-items'><img src={require("assets/virtual_images/Language.png")} /><div ><a onClick={openLanguageModel}>{language}</a></div></div>
                      <div className='middle-setting-items'><img src={require("assets/virtual_images/Units.png")} /><div >{units}</div></div>
                      <div className='middle-setting-items'><img src={require("assets/virtual_images/Privactandnotifications.png")} /><div >{privact_and_notification}</div></div>
                    </div>
                    <p className='settingbox-heading'>{other}</p>
                    <div className="last-sec-setting form_full">
                      <p className='middle-setting-items'>{about}</p>
                      <p>{terms_conditions}</p>
                      <p>{privact_policy}</p>
                      <p>{rate_aimedies_diagnostics}</p>
                    </div>
                  </div>

                  <div className='logoutdash' onClick={() => LogoutDashClick()}>{logout_sec}</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <SetLanguage
          getSetting={() => getSetting()}
          openFancyLanguage={openFancyLanguage}
          languageValue={languageValue}
          handleCloseFancyLanguage={() => handleCloseFancyLanguage()}
          openLanguageModel={() => openLanguageModel()}

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
  ));
