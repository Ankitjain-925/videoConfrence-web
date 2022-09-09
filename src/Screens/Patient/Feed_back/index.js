import React, { useState } from "react"
import Grid from '@material-ui/core/Grid';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import { getLanguage } from 'translations/index';
import { withRouter } from 'react-router-dom';
import { LoginReducerAim } from 'Screens/Login/actions';
import { LanguageFetchReducer } from 'Screens/actions';
import { Settings } from 'Screens/Login/setting';
import { connect } from 'react-redux';
import { Component } from "react";
import Loader from 'Screens/Components/Loader/index';
import ShowQuestion from '../../Components/ShowQuestion/index';




class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false

        };
    }
    openbutton = () => {
        this.setState({ openModal: true });
        
    }
    closeFullQues = () => {
        this.setState({ openModal: false });
    }
   
   render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {FeedBack
    } = translate;
        return (
            <Grid
                className={
                    this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark"
                        ? "homeBg darkTheme"
                        : "homeBg"
                }
            >
                {this.state.loaderImage && <Loader />}
                <Grid className="homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                <LeftMenu isNotShow={true} currentPage="feedback" />
                                <LeftMenuMobile isNotShow={true} currentPage="feedback" />
                                <Grid item xs={12} md={11} lg={10}>
                                    <Grid className="docsOpinion docsAllOption">
                                        <Grid container direction="row" className="docsOpinLbl">
                                            <Grid item xs={12} md={6}>
                                                <label>{FeedBack}</label>
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                            <Grid className="formopen label_1 ">
                                                <input
                                                    type="button"
                                                    value={FeedBack}
                                                    onClick={() =>
                                                        this.openbutton()
                                                    }

                                                />
                                            </Grid>
                                        </Grid>
                                        <ShowQuestion
                                            closeFullQues={() => this.closeFullQues()}
                                            openModal={this.state.openModal}
                                           
                                        />
                                        </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
        state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { House } = state.houseSelect;
    const { settings } = state.Settings;
    const { verifyCode } = state.authy;
    const { speciality } = state.Speciality;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        verifyCode,
        House,
        speciality,
    };
};
export default withRouter(
    connect(mapStateToProps, {
        LoginReducerAim,
        LanguageFetchReducer,
        Settings,
    })(Index)
);