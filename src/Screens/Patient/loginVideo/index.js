import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import { pure } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index";
import axios from "axios";
import { commonHeader } from "component/CommonHeader/index";
import sitedata from "sitedata";
import { useHistory } from "react-router-dom";
import { Settings } from "Screens/Login/setting";

const path = sitedata.data.path;

const LoginVideo = (props) => {

  let history = useHistory();

  const [_username, set_username] = useState("");
  const [_password, setPassword] = useState("");
  const [hidden, setHidden] = useState(true);
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  let translate = getLanguage(props.stateLanguageType);
  let { login_video_confrence, username, password, login_LOGIN_btn } =
    translate;

  const BtnSubmit = () => {
    if (_username !== "" && _password !== "") {
      confirmSubmit();
    } else {
      setErrormsg("Username && password not empty");
      setError(true);
    }
  };
  const onKeyDownlogin = (e) => {
    if (e.key === "Enter") {
      BtnSubmit();
    }
  };
  const confirmSubmit = () => {
    setErrormsg("");
    setError(false);
    let _data = {
      username: _username,
      password: _password,
    };
    axios
      .post(path + "/vchat/UsernameLogin", _data, commonHeader(props.token))
      .then((response) => {
        if (response.data.hassuccessed === true) {
          props.LoginReducerAim("", "", "", "", props.stateLoginValueAim, true);
          history.push({
            pathname: "/patient/settings",
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
              <Grid item xs={12} md={11} lg={10}>
                <Grid className="docsOpinion">
                  <Grid container direction="row" className="docsOpinLbl">
                    <Grid item xs={12} md={6}>
                      <label>{login_video_confrence}</label>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={10} lg={8}>

                  {/* <Grid className="profilePkg"> */}
                  <Grid className="profilePkgIner3 border-radious-10">
                    <Grid className="logForm form_full">
                      {error && <div className="err_message">{errormsg}</div>}
                      <Grid className="logRow">
                        <Grid>
                          <label>{username}</label>
                        </Grid>
                        <Grid>
                          <input
                            type="text"
                            value={_username}
                            name="username"
                            onKeyDown={(e) => onKeyDownlogin(e)}
                            onChange={(e) => {
                              set_username(e.target.value);
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid className="logRow">
                        <Grid>
                          <label>{password}</label>
                        </Grid>
                        <Grid>
                          <input
                            type={hidden ? "password" : "text"}
                            name="pass"
                            onKeyDown={(e) => onKeyDownlogin(e)}
                            value={_password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Grid>
                      </Grid>

                      <Grid className="infoShwSave3">
                        <input
                          type="submit"
                          value={login_LOGIN_btn}
                          onClick={() => BtnSubmit()}
                        />
                      </Grid>
                    </Grid>

                    {/* <Grid className="infoShwSave3">
                      <input
                        type="submit"
                        value={login_LOGIN_btn}
                        onClick={() => BtnSubmit()}
                      />
                    </Grid> */}
                  </Grid>


                </Grid>
                {/* </Grid> */}
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
  return {
    stateLanguageType,
    settings,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  };
};
export default pure(
  withRouter(
    connect(mapStateToProps, {
      LoginReducerAim,
      Settings,
      LanguageFetchReducer,
    })(LoginVideo)
  )
);
