import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { getLanguage } from 'translations/index';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { S3Image } from "Screens/Components/GetS3Images/index";
import SymptomQuestions from '../../Components/TimelineComponent/CovidSymptomsField/SymptomQuestions';
import { pure } from "recompose";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { withRouter } from "react-router-dom";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    joinmeet = () => {
        console.log("1")
        this.props.history.push("/patient/access-key");

    };

    render() {
        const { dataa } = this.props;
        let translate = getLanguage(this?.props?.redux_st?.stateLanguageType);
        let {
            my_profile,
            Security
        } = translate;
        return (
            <Grid>
                <Grid className="Meetlabel_2">
                    <button onClick={() => this.joinmeet()}>
                    <b>Join Meeting</b>
                  </button>
                </Grid>
            </Grid>

        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
      state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    const { settings } = state.Settings;


    // const { Doctorsetget } = state.Doctorset;
    // const { catfil } = state.filterate;
    return {
      stateLanguageType,
      stateLoginValueAim,
      loadingaIndicatoranswerdetail,
      settings,


      //   Doctorsetget,
      //   catfil
    };
  };
  export default pure(
    withRouter(
      connect(mapStateToProps, {
        LoginReducerAim,
        LanguageFetchReducer,
        Settings,
      })(Index)
    ));





























