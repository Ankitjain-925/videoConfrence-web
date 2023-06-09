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
import { Redirect, Route } from 'react-router-dom';
import queryString from "query-string";
import {
  commonNoTokentHeader,
  commonHeader,
} from "component/CommonHeader/index";
import Payment from "Screens/Patient/RequestList/Payment/index";
import axios from "axios";
import sitedata, { data } from "sitedata";
import { pure } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import { OptionList } from "Screens/Login/metadataaction";
import { authy } from "Screens/Login/authy.js";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
  const [userData, setUserData] = useState(props.stateLoginValueAim.user);
  const [value, setValue] = useState(0);
  const [email, setEmail] = useState("");
  const [_password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [error2, setError2] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [ITGuideline, setITGuideline] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  let translate = getLanguage(props.stateLanguageType);
  let history = useHistory();

  let {
    register_video_confrance,
    sick_leave_certificate,
    click_on_accept_it_guidline,
    view_guidelines,
    password,
    username,
  } = translate;
  const BtnSubmit = (paymentData) => {
    if (email !== "" && _password !== "") {
      confirmSubmit(paymentData);
    } else {
      setErrormsg("Username & password not empty");
      setError(true);
    }
  };
  const onKeyDownlogin = (e) => {
    if (e.key === "Enter") {
      onPayment();
    }
  };

  const toggleShow = () => {
    setHidden(!hidden);
  }

  const confirmSubmit = (paymentData) => {
    let _data = {
      email: userData.email || "",
      username: email,
      password: _password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      profile_id: userData.profile_id,
      isITGuideLineAccepted: ITGuideline,
      patient_id: userData._id,
      status: true,
    };
    if (paymentData?.data?.message == "Payment Success") {
      _data["is_payment"] = true;
      _data["payment_data"] = paymentData?.data?.paymentData;
    }

    axios
      .post(
        path + "/vchat/AddVideoUserAccount",
        _data,
        commonHeader(props?.stateLoginValueAim.token)
      )
      .then((response) => {
        if (response.data.hassuccessed) {
          var user_token = props.stateLoginValueAim.token
          var forUpdate = { value: true, token: user_token, user: props?.stateLoginValueAim?.user }
          props.LoginReducerAim(props?.stateLoginValueAim?.user?.email, '', props?.stateLoginValueAim?.user_token, () => { }, forUpdate, false, {}, true);

          history.push({
            pathname: "/patient/video_login",
          });
        }
        else if (
          !response.data.hassuccessed &&
          response.data.data !== "User Already Register"
        ) {
          setErrormsg("Already exist in system");
        } else {
          setErrormsg("Something went wrong please try with another user name");
        }
      });
  };
  const SetVa = (e) => {
    if (e.target.name == "email") {
      if (e.target.value == "") {
        setEmail();
        setOpenPayment(false);
      }
      else {
        setEmail(e.target.value);
      }
    }
    if (e.target.name == "pass") {
      if (e.target.value == "") {
        setPassword();
        setOpenPayment(false);
      }
      else {
        setPassword(e.target.value);
      }
    }
    if (e.target.name == "ITGuideline") {
      if (e.target.checked == false) {
        setITGuideline(!ITGuideline);
        setOpenPayment(false);
      }
      else {
        setITGuideline(!ITGuideline);
      }
    }
  };
  const onPayment = () => {
    if (!email) {
      setErrormsg("Username shouldn't be empty");
      setError(true);
    }
    else if (!_password) {
      setErrormsg("Password shouldn't be empty");
      setError(true);
    } else if (!ITGuideline) {
      setErrormsg("Please accept IT Guideline");
      setError(true);
    } else {
      setErrormsg("");
      setError(false);
      setOpenPayment(true);
    }
  };

  const handleCancel = () => {
    setOpenPayment(false);
  };
  if ((props?.stateLoginValueAim?.token == 401 ||
    props?.stateLoginValueAim?.token == 450) &&
    props?.stateLoginValueAim?.user?.type !== 'patient') {
    return <Redirect to={'/'} />;
  }
  else if (
    props?.stateLoginValueAim?.token !== 401 &&
    props?.stateLoginValueAim?.token !== 450 &&
    props?.stateLoginValueAim?.user?.type === 'patient' &&
    props?.stateLoginValueAim.is_vedio_registered
  ) {
    return <Redirect to={'/patient/video_login'} />;
  }
  else {
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

                  <Grid item xs={12} md={12} lg={12}>
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
                              value={email}
                              name="email"
                              onKeyDown={(e) => onKeyDownlogin(e)}
                              onChange={(e) => {
                                SetVa(e);
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid className="logRow logpassInst">
                          <Grid container direction="row">
                            <Grid item xs={11} sm={6} md={6}>
                              <label>{password}</label>
                            </Grid>
                            {/* <Grid
                              item
                              xs={11}
                              sm={6}
                              md={6}
                              className="logFrgtpass"
                            >
                              <label>
                                <a
                                // onClick={forgotPassword}
                                >
                                  {login_Forgotpassword}
                                </a>
                              </label>
                            </Grid> */}
                          </Grid>
                          <Grid className="logPass">
                            {/* <Grid>
                              <label>{password}</label>
                            </Grid> */}
                            <input
                              type={hidden ? "password" : "text"}
                              name="pass"
                              onKeyDown={(e) => onKeyDownlogin(e)}
                              value={_password}
                              onChange={(e) => SetVa(e)}
                            />
                            {hidden && (
                              <a onClick={toggleShow}>
                                <img
                                  src={require('assets/images/showeye.svg')}
                                  alt=""
                                  title=""
                                />
                              </a>
                            )}
                            {!hidden && (
                              <a onClick={toggleShow}>
                                <img
                                  src={require('assets/images/hide.svg')}
                                  alt=""
                                  title=""
                                />
                              </a>
                            )}
                          </Grid></Grid>

                        <Grid className="aceptTermsPlcy">
                          <FormControlLabel
                            control={
                              <Checkbox
                              name="ITGuideline"
                                value="checkedB"
                                color="#00ABAF"
                                checked={ITGuideline}
                                onChange={(e) => {
                                  SetVa(e);
                                }}
                              />
                            }
                            label={click_on_accept_it_guidline}
                          />
                          <span
                            onClick={() => history.push("/video-guideline")}
                            className="guidline_text"
                          >
                            {view_guidelines}
                          </span>
                        </Grid>

                        <Grid className="infoShwSave3">
                          <input
                            type="submit"
                            value="submit"
                            onClick={() => onPayment()}
                          />
                        </Grid>
                      </Grid>

                      {/* </Grid> */}
                    </Grid>
                    {openPayment && (
                      <Payment
                        onCancel={handleCancel}
                        usedFor={"register_video"}
                        onSuccessPayment={BtnSubmit}
                      />
                    )}
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
    );
  }
};

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
    })(RegisterVideo)
  )
);
