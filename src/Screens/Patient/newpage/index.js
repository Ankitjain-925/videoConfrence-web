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
import { handleEvalSubmit } from "../SickLeaveForm/api";
import useAllSetting from '../../Hooks/Setting'
import useAllLanguage from '../../Hooks/Language'
import { useHistory } from "react-router-dom";



const Index = (props) => {
    const [codeValue, setcodeValue] = useState({});
    const settings = useAllSetting();
    const history = useHistory();
    const [error, setError] = useState('');
    const language =useAllLanguage();


    const handleChange = (e) => {
        const state = codeValue;
        state[e.target.name] = e.target.value;
        setcodeValue(state);
    }

    const handleSubmit = () => {
        if (codeValue && codeValue?.code) {
            history.push({
                pathname: "/patient/video-call",
                state: codeValue,
            });
            setcodeValue({ code: '' });
        }
        else {
            setError("Please enter Access Key first");
        }

    }
    let translate = getLanguage(language);
    let {
        my_profile,
        Security,
        confirmation_access_key,
        enter_access_key,
        enter_key,
        join_call,
        please_enter_access_key,
    } = translate;


    return (
        <Grid
            className={
                settings &&
                    settings.setting &&
                    settings.setting.mode &&
                    settings.setting.mode === 'dark'
                    ? 'homeBg darkTheme homeBgDrk'
                    : 'homeBg'
            }
        >
            <Grid className="homeBgIner">
                <Grid container direction="row">
                    <Grid item xs={12} sm={12} md={12}>
                        <Grid container direction="row">
                            <LeftMenu isNotShow={true} currentPage="settings" />
                            <LeftMenuMobile isNotShow={true} currentPage="settings" />
                            <Grid item xs={12} md={11} lg={10}>
                                <Grid className="docsOpinion">
                                    <Grid container direction="row" className="docsOpinLbl">
                                        <Grid item xs={12} md={6} className="label_1">
                                            <label>{confirmation_access_key}</label>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6}>
                                    {/* <Grid className="profilePkgIner2"> */}
                                    <Grid className="logForm accessForm">
                                        <Grid className="logRow">
                                            <Grid className="label_1">
                                                <div className="err_message">{error}</div>
                                                <label>{enter_access_key}</label>
                                            </Grid>
                                            <Grid>
                                                <input
                                                    type="text"
                                                    name="code"
                                                    value={codeValue?.code}
                                                    placeholder={enter_key}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid className="infoShwSave3 label_1 ">
                                            <input
                                                type="button"
                                                value={join_call}
                                                onClick={() => handleSubmit()}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Index;