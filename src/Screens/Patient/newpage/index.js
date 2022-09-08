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



const Index = (props) => {
    const [codeValue, setcodeValue] = useState({});
    const settings = useAllSetting();

    const handleChange = (e) => {
        const state = codeValue;
        state[e.target.name] = e.target.value;
        setcodeValue(state);
    }

    const handleSubmit = () => {
        console.log("codevalue", codeValue)
        setcodeValue({ code: '' });

    }
    let translate = getLanguage(props.stateLanguageType);
    let {
        my_profile,
        Security
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
                <Grid container direction="row" justify="center">
                    <Grid item xs={12} md={12}>
                        <Grid container direction="row">
                            <LeftMenu isNotShow={true} currentPage="settings" />
                            <LeftMenuMobile isNotShow={true} currentPage="settings" />


                            <Grid item xs={12} md={11} lg={6}>
                                {/* <Grid className="profilePkgIner2"> */}
                                <Grid className="logForm hhh">


                                    <Grid className="logRow ">
                                        <Grid className="label_1">
                                            <label>Confirmation code</label>
                                        </Grid>
                                        <Grid>
                                            <input
                                                type="text"
                                                name="code"
                                                value={codeValue?.code}
                                                placeholder="Enter code"
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </Grid>
                                    </Grid>


                                    <Grid className="infoShwSave3 label_1 ">
                                        <input
                                            type="button"
                                            value="Submit"
                                            onClick={() => handleSubmit()}

                                        />
                                    </Grid>
                                </Grid>
                                {/* </Grid> */}
                            </Grid>


                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Index;