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

const TopUpdetail = (props) => {
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [languageValue, setLanguageValue] = useState(null);
  const [openFancyLanguage, setOpenFancyLanguage] = useState(false)
  console.log("props?.stateLoginValueAim?.VideoData?.prepaid_talktime_min", props?.stateLoginValueAim?.VideoData?.prepaid_talktime_min)
  let translate = getLanguage(props.stateLanguageType);
  let {
    my_profile,
    Security,
    your_aimedis_credit,
    top_up,
  } = translate;

  if (
    props?.stateLoginValueAim.user === 'undefined' ||
    props?.stateLoginValueAim.token === 450 ||
    props?.stateLoginValueAim.token === 'undefined' ||
    props?.stateLoginValueAim.user.type !== 'patient'
  ) {
    return <Redirect to={'/'} />;
  }
  else {
    return (
      <Grid>
        <div className='settingbox form_full'>
          <div >
            <label>{your_aimedis_credit}</label>
            <p>{props?.stateLoginValueAim?.VideoData?.prepaid_talktime_min || 0}{' '}{'Min'}</p>
          </div>
          <div>
            {props.btnShow && <Button variant='contained' className="topupButton" onClick={() => { props.history.push('/patient/top-up') }}>{top_up}</Button>}
          </div>
        </div>
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
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    metadata,
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
    })(TopUpdetail)
  ));
