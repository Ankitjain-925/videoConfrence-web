import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
// import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
// import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import { pure } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from "Screens/actions";
import { getLanguage } from "translations/index";
import axios from "axios";
import { Redirect, Route } from 'react-router-dom';
import { commonHeader } from "component/CommonHeader/index";
import sitedata from "sitedata";
import { useHistory } from "react-router-dom";
import { Settings } from "Screens/Login/setting";
import Loader from 'Screens/Components/Loader/index';

const path = sitedata.data.path;

const LoginVideo = (props) => {
    let history = useHistory();
    const [_username, set_UserName] = useState("");
    const [_newPassword, set_NewPassword] = useState("");
    const [_confPassword, set_ConfPassword] = useState("");
    const [hidden, setHidden] = useState(true);
    const [error, setError] = useState(false);
    const [errormsg, setErrormsg] = useState("");
    const [loaderImage, setloaderImage] = useState(false);
    let translate = getLanguage(props.stateLanguageType);
    let { back_sec, forget_credentials, new_password, confirm_password, change_crendential, username
    } =
        translate;

    const toggleShow = () => {
        setHidden(!hidden);
    }

    const BtnSubmit = () => {
        if (_username && _newPassword && _confPassword && _newPassword.localeCompare(_confPassword)) {
            setErrormsg("Confirm Passward must same as New passward");
            setError(true);
        }
        else if (_username !== "" && _newPassword !== "" && _confPassword !== "") {
            confirmSubmit();
        }
        else {
            setErrormsg("Username & New Password & Confirm Password not empty");
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
            password: _newPassword,
            patient_id: props?.stateLoginValueAim?.user?._id
        };
        setloaderImage(true);
        axios
            .put(path + "/vchat/ChangePassword", _data, commonHeader(props.stateLoginValueAim?.token))
            .then((response) => {
                if (response.data.hassuccessed) {
                    //         props.LoginReducerAim(props?.stateLoginValueAim?.user?.email, '', props.token, () => { }, props.stateLoginValueAim, true, response?.data?.data);
                    props.history.push({
                        pathname: "/patient/video_login",
                    });
                    setloaderImage(false);
                }
            });
    };
    if (
        props?.stateLoginValueAim.user === 'undefined' ||
        props?.stateLoginValueAim.token === 450 ||
        props?.stateLoginValueAim.token === 'undefined' ||
        props?.stateLoginValueAim.user.type !== 'patient'
    ) {
        return <Redirect to={'/'} />;
    }
    else if (
        props?.stateLoginValueAim.token !== 401 &&
        props?.stateLoginValueAim.token !== 450 &&
        props?.stateLoginValueAim?.user?.type === 'patient' &&
        !props?.stateLoginValueAim.is_vedio_registered
    ) {
        return <Redirect to={'/patient/video_register'} />;
    }
    else if (props?.stateLoginValueAim.token !== 401 &&
        props?.stateLoginValueAim.token !== 450 &&
        props?.stateLoginValueAim?.user?.type === 'patient' &&
        props?.stateLoginValueAim?.isVideoLoggedIn) {
        return <Redirect to={'/patient/settings'} />;
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
                {loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                {/* Website Menu */}
                                {/* <LeftMenu isNotShow={true} currentPage="register_video" />
                                <LeftMenuMobile isNotShow={true} currentPage="register_video" /> */}
                                <Notification />
                                <Grid item xs={12} md={12} lg={12}>
                                    <Grid className="docsOpinion">
                                        <Grid container direction="row" className="docsOpinLbl">
                                            <Grid item xs={8} md={8} lg={8}>
                                                <Grid
                                                    className="backFlow backFlowVideo"
                                                    onClick={() => {
                                                        props.history.push('/patient/video_login')
                                                    }}
                                                >
                                                    <a>
                                                        <img
                                                            src={require('assets/virtual_images/rightArrow.png')}
                                                            alt=""
                                                            title=""
                                                        />
                                                        {back_sec}
                                                    </a>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12} lg={12}>
                                                <label>{forget_credentials}</label>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <Grid container direction="row" justify="center">
                                            <Grid item xs={12} md={4} lg={2}>
                                            </Grid>
                                            <Grid item xs={12} md={10} lg={7}>
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
                                                                    name="userName"
                                                                    onKeyDown={(e) => onKeyDownlogin(e)}
                                                                    onChange={(e) => {
                                                                        set_UserName(e.target.value);
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </Grid>



                                                        <Grid className="logRow">
                                                            <Grid>
                                                                <label>{new_password}</label>
                                                            </Grid>
                                                            <Grid>
                                                                <input
                                                                    type="text"
                                                                    value={_newPassword}
                                                                    name="newPassward"
                                                                    onKeyDown={(e) => onKeyDownlogin(e)}
                                                                    onChange={(e) => {
                                                                        set_NewPassword(e.target.value);
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </Grid>

                                                        <Grid className="logRow logpassInst">
                                                            <Grid container direction="row">
                                                                <Grid item xs={11} sm={6} md={6}>
                                                                    <label>{confirm_password}</label>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid className="logPass">
                                                                <input
                                                                    type={hidden ? "password" : "text"}
                                                                    name="confirmPassward"
                                                                    onKeyDown={(e) => onKeyDownlogin(e)}
                                                                    value={_confPassword}
                                                                    onChange={(e) => set_ConfPassword(e.target.value)}
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

                                                        <Grid className="infoShwSave3">
                                                            <input
                                                                type="submit"
                                                                value={change_crendential}
                                                                onClick={() => BtnSubmit()}
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                </Grid>


                                            </Grid>
                                            <Grid item xs={12} md={4} lg={2}>
                                            </Grid>
                                        </Grid>
                                    </Grid>   </Grid>
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
