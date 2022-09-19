import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { getLanguage } from "translations/index"
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { authy } from 'Screens/Login/authy.js';
import { pure } from "recompose";
import { Settings } from 'Screens/Login/setting';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from "@material-ui/core";
import NotesEditor from "../Editor/index";
import SymptomQuestions from '../TimelineComponent/CovidSymptomsField/SymptomQuestions'; 
import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { LoginReducerAim } from 'Screens/Login/actions';
import { OptionList } from 'Screens/Login/metadataaction';




class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item || {},
            openModal: this.props.openModal,
            settings: this.props.settings,
            comesFrom: this.props.comesFrom,
            showQuestion: {},
            loaderImage: false,
            errorMsg: "",
            
        };
    }
  
   componentDidUpdate = (prevProps) => {
        if (prevProps.openModal !== this.props.openModal) {
            this.setState({ openModal: this.props.openModal });
        }

    };

    closeFullQues = () => {
        this.props.closeFullQues();
        this.setState({ showQuestion: {} });
       
    }
    // Set the state of questions
    updateAllEntrySec = (e, name) => {
       var state = this.state.showQuestion;
      state[name] = e;
        this.setState({ showQuestion: state });
    };
    handleTaskSubmit =()=>{
        console.log('data',this.state.showQuestion)
        let translate = getLanguage(this.props.stateLanguageType);
        let { Something_went_wrong } = translate;
        var data = this.state.showQuestion;
        var patient_infos = {
            first_name: this.props.stateLoginValueAim?.user?.first_name,
            last_name: this.props.stateLoginValueAim?.user?.last_name,
            image: this.props.stateLoginValueAim?.user?.image,
            alies_id: this.props.stateLoginValueAim?.user?.alies_id,
            profile_id: this.props.stateLoginValueAim?.user?.profile_id,
         }
         var doctor_infos
         = {
            first_name: "Ankit",
            last_name: "jain",
            alies_id: "D_QRW7IAGTg",
            profile_id: "D_QRW7IAGTg",
            email:"ankitjain.webnexus@gmail.com",
            profile_image:"https://aimedis-0001.s3.amazonaws.com/D_QRW7IAGTg/1660719470481-doctor image.jpg.jpg&bucket=aimedis-0001"
         }
          data.patient_info = patient_infos;
          data.doctor_info = doctor_infos;
          data.patient_id =this.props.stateLoginValueAim?.user?._id;
          data.doctor_id="62a41f1ec627873603accc6c"
          this.setState({ loaderImage: true });
        axios
      .post(
        sitedata.data.path + "/vchat/givefeedback",
       data,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        this.setState({ loaderImage: false });
        if (responce.data.hassuccessed) {
            this.closeFullQues();
            this.setState({ showQuestion: {}});
         
        } else {
          this.setState({ errorMsg:Something_went_wrong});
        }
      });
       
    }
  
  
    render() {
        let translate = getLanguage(this.props.stateLanguageType)
        let {
            FeedBack,
            Submit,
            Give_Comment_Doctor,
            Give_rating_Doctor
        } = translate;

    return (
            <Grid>
                {/* Model setup */}
                <Modal
                    open={this.state.openModal}
                    onClose={() => this.closeFullQues()}
                    className={
                        this.props.settings &&
                            this.props.settings.setting &&
                            this.props.settings.setting.mode &&
                            this.props.settings.setting.mode === 'dark'
                            ? 'homeBg darkTheme'
                            : 'homeBg'
                    }
                >
                    <Grid className="creatTaskModel3 creatTaskModel11">
                        <Grid className="creatTaskCntnt">
                            <Grid>
                                <Grid container direction="row" justify="center" className="addSpeclLbl">
                                    <Grid item xs={8} md={8} lg={8}>
                                        <label>{FeedBack}</label>
                                    </Grid>
                                    <Grid item xs={4} md={4} lg={4}>
                                        <Grid>
                                            <Grid className="entryCloseBtn">
                                                <a onClick={() => this.closeFullQues()}>
                                                    <img
                                                        src={require("assets/images/close-search.svg")}
                                                        alt=""
                                                        title=""
                                                    />
                                                </a>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* <Grid
                                    container
                                    direction="row"
                                    className="setDetail-eval"
                                >
                                    <SymptomQuestions
                                        updateEntryState1={(e) =>
                                            this.updateAllEntrySec(
                                                e,
                                                'headache_quality_of_pain'
                                            )
                                        }
                                        comesFrom="Feedback"
                                        label="How would you describe the quality of pain?"
                                        value={this.state.showQuestion?.headache_quality_of_pain}
                                    />

                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    className="setDetail-eval"
                                >
                                    <SymptomQuestions
                                        updateEntryState1={(e) =>
                                            this.updateAllEntrySec(
                                                e,
                                                'headache_need_to_vomit'
                                            )
                                        }
                                        comesFrom="Feedback"
                                        label="Do you need to vomit?"
                                        value={this.state.showQuestion?.headache_need_to_vomit}
                                    />

                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    className="setDetail-eval"
                                >
                                    <SymptomQuestions
                                        updateEntryState1={(e) =>
                                            this.updateAllEntrySec(
                                                e,
                                                'back_pain_symptoms_begin'
                                            )
                                        }
                                        comesFrom="Feedback"
                                        label="when_did_the_symptoms_begin?"
                                        value={this.state.showQuestion?.back_pain_symptoms_begin}
                                    />

                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    className="setDetail-eval"
                                >
                                    <SymptomQuestions
                                        updateEntryState1={(e) =>
                                            this.updateAllEntrySec(
                                                e,
                                                'back_pain_been_injured'
                                            )
                                        }
                                        comesFrom="Feedback"
                                        label="Have you been injured?"
                                        value={this.state.showQuestion?.back_pain_been_injured}
                                    />

                                </Grid> */}
                                <Grid
                                    container
                                    direction="row"
                                    className="setDetail-eval">
                                    <SymptomQuestions
                                        updateEntryState1={(e) =>
                                            this.updateAllEntrySec(
                                                e,
                                                'rating'
                                            )
                                        }
                                        comesFrom="Feedback"
                                        label={Give_rating_Doctor}
                                        value={this.state.showQuestion?.rating}
                                    />

                                </Grid>
                                <Grid className="setDetail-eval">
                                    <Grid className="fillDiaAll2 ">
                                    <label>{Give_Comment_Doctor}</label>
                                        <NotesEditor
                                            name="Comment"
                                            onChange={(e) => this.updateAllEntrySec(e,'Comment')}
                                            value={this.state.showQuestion || "" }
                                        />
                                     </Grid>
                              </Grid>
                                <Grid className="setDetail-eval">
                                    <Grid item xs={12} md={12} className="saveTasks">
                                        <Button
                                          onClick={() =>
                                            this.handleTaskSubmit()
                                          }
                                        >
                                            {Submit}
                                        </Button>
                                  </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
                {/* End of Model setup */}
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
  export default withRouter(
    connect(mapStateToProps, {
      LoginReducerAim,
      LanguageFetchReducer,
      Settings,
      authy,
      OptionList,
    })(Index)
  );