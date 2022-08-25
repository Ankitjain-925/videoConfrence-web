import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import AppBar from "@material-ui/core/AppBar";
import { getLanguage } from "translations/index";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import queryString from "query-string";
import { commonNoTokentHeader } from "component/CommonHeader/index";
import axios from "axios";
import sitedata from "sitedata";
import { pure } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginReducerAim } from 'Screens/Login/actions';
import { Settings } from 'Screens/Login/setting';
import { LanguageFetchReducer } from 'Screens/actions';
import { OptionList } from 'Screens/Login/metadataaction';
import { authy } from 'Screens/Login/authy.js';

const path = sitedata.data.path;

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

const RegisterVideo = (props) => {
  const [userData, setUserData] = useState(props.stateLoginValueAim.user)
  const [value, setValue] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState('');
  const [error2, setError2] = useState(false);
  const [hidden, setHidden] = useState(true)
  let translate = getLanguage(props.stateLanguageType);
  let { my_profile, Security } = translate;
  let history = useHistory();

  let {
    register_video_confrance,
    sick_leave_certificate,
  } = translate;
  const BtnSubmit = () => {
    if (email !== "" && password !== "") {
      confirmSubmit()
    } else {
      setErrormsg('Username && password not empty')
      setError(true)
    }
  }
  const onKeyDownlogin = (e) => {
    if (e.key === "Enter") {
      BtnSubmit();
    }
  };
  const confirmSubmit = () => {
    let _data = {
      email: email,
      password: password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      profile_id: userData.profile_id
    }
    axios
      .post(
        path + "/vchat/AddVideoUserAccount",
        _data,
        commonNoTokentHeader()
      )
      .then((response) => {
        if (response.data.hassuccessed === true) {
          history.push({
            pathname: '/dashboard',
          });
        } else {

        }
      });
  };
  return (
    <Grid
      className={
        props.settings &&
          props.settings.setting &&
          props.settings.setting.mode &&
          props.settings.setting.mode === "dark"
          ? "homeBg darkTheme homeBgDrk"
          : "homeBg"
      }
    >
      <Grid className="homeBgIner">
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12}>
            <Grid container direction="row">
              {/* Website Menu */}
              <LeftMenu isNotShow={true} currentPage="register_video" />
              <LeftMenuMobile isNotShow={true} currentPage="register_video" />
              <Notification />
              {/* Website Mid Content */}
              <Grid item xs={12} md={11} lg={10}>
                <Grid className="docsOpinion">
                  <Grid container direction="row" className="docsOpinLbl">
                    <Grid item xs={12} md={6}>
                      <label>{register_video_confrance}</label>
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


                  <Grid className="profilePkgIner2 logForm">
                  <Grid className="logf">
                    {error && (<div className="err_message" >
                      {errormsg}
                    </div>
                    )
                    }
                    <Grid className="logRow">
                      <Grid>
                        <label>Username</label>
                      </Grid>
                      <Grid>
                        <input
                          type="text"
                          value={email}
                          name="email"
                          onKeyDown={(e) => onKeyDownlogin(e)}
                          onChange={(e) => { setEmail(e.target.value) }
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid className="logRow">
                      <Grid>
                        <label>Password</label>
                      </Grid>
                      <Grid>
                        <input
                          type={hidden ? "password" : "text"}
                          name="pass"
                          onKeyDown={(e) => onKeyDownlogin(e)}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)
                          }
                        />
                      </Grid>
                    </Grid>

                    <Grid className="infoShwSave3">
                      <input
                        type="submit"
                        value="submit"
                        onClick={() => BtnSubmit()}

                      />
                    </Grid>
                    </Grid>
                  </Grid>
                  {/* End of Tabs */}


                </Grid>
                {/* Website Right Content */}
                <Grid item xs={12} md={3}></Grid>
                {/* End of Website Right Content */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};


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
    })(RegisterVideo)
  )
);