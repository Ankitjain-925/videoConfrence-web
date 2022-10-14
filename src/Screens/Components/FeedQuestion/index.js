import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { getLanguage } from "translations/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { authy } from "Screens/Login/authy.js";
import { pure } from "recompose";
import { Settings } from "Screens/Login/setting";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import NotesEditor from "../Editor/index";
import SymptomQuestions from "../TimelineComponent/CovidSymptomsField/SymptomQuestions";
import axios from "axios";
import sitedata from "sitedata";
import { commonHeader } from "component/CommonHeader/index";
import { LoginReducerAim } from "Screens/Login/actions";
import { OptionList } from "Screens/Login/metadataaction";
import Loader from "Screens/Components/Loader/index";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item || {},
      openModal: this.props.openModal,
      settings: this.props.settings,
      comesFrom: this.props.comesFrom,
      allDoctorData: this.props.allDoctorData,
      allData: this.props.allData,
      showQuestion: {},
      errorMsg: "",
      loaderImage: false,
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
  };
  // Set the state of questions
  updateAllEntrySec = (e, name) => {
    var state = this.state.showQuestion;
    state[name] = e;
    this.setState({ showQuestion: state });
  };
  handleTaskSubmit = () => {
    const { allDoctorData, allData } = this.props;
    let translate = getLanguage(this.props.stateLanguageType);
    let { Something_went_wrong } = translate;
    var data = this.state.showQuestion;
    var patient_infos = {
      first_name: this.props.stateLoginValueAim?.user?.first_name,
      last_name: this.props.stateLoginValueAim?.user?.last_name,
      image: this.props.stateLoginValueAim?.user?.image,
      alies_id: this.props.stateLoginValueAim?.user?.alies_id,
      profile_id: this.props.stateLoginValueAim?.user?.profile_id,
    };
    var doctor_infos = {
      first_name: allDoctorData?.first_name,
      last_name: allDoctorData?.last_name,
      alies_id: allDoctorData?.alies_id,
      profile_id: allDoctorData?.profile_id,
      email: allDoctorData?.email,
      profile_image: allDoctorData?.image,
    };
    data.patient_info = patient_infos;
    data.doctor_info = doctor_infos;
    data.patient_id = this.props.stateLoginValueAim?.user?._id;
    data.doctor_id = allDoctorData?.user_id;
    this.setState({ loaderImage: true });
    axios
      .post(
        sitedata.data.path + "/vchat/givefeedback",
        data,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed) {
          axios
            .put(
              sitedata.data.path + "/vh/AddTask/" + allData?._id,
              {
                isFeedback: true,
                feedback_rating: this.state.showQuestion.rating,
                feedback_comment: this.state.showQuestion.Comment,
              },
              commonHeader(this.props.stateLoginValueAim.token)
            )
            .then((responce) => {
              if (responce.data.hassuccessed) {
                this.props.allgetData();
                this.closeFullQues();
                this.setState({ showQuestion: {}, loaderImage: false });
              } else {
                this.closeFullQues();
                this.setState({ showQuestion: {}, loaderImage: false });
              }
            });
        } else {
          this.setState({ errorMsg: Something_went_wrong, loaderImage: false });
        }
      });
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      FeedBack,
      feedback_is_already_given_for_this_Request,
      Submit,
      Give_Comment_Doctor,
      Give_rating_Doctor,
    } = translate;
    const { allData } = this.props;
    return (
      <Grid>
        {this.state.loaderImage && <Loader />}
        {/* Model setup */}
        <Modal
          open={this.state.openModal}
          onClose={() => this.closeFullQues()}
          className={
            this.props.settings &&
              this.props.settings.setting &&
              this.props.settings.setting.mode &&
              this.props.settings.setting.mode === "dark"
              ? "homeBg darkTheme"
              : "homeBg"
          }
        >
          <Grid className="creatTaskModel3 creatTaskModel11">
            <Grid className="creatTaskCntnt">
              <Grid>
                <div className="err_message">
                  {allData && allData.isFeedback
                    ? feedback_is_already_given_for_this_Request
                    : null}
                </div>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  className="addSpeclLbl"
                >

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
                    value={allData?.feedback_rating ?
                      allData?.feedback_rating:
                       this.state.showQuestion?.rating}
                  />
                </Grid>
                <Grid className="setDetail-eval">
                  <Grid className="fillDiaAll2 ">
                    <label>{Give_Comment_Doctor}</label>
                    <NotesEditor
                      name="Comment"
                      onChange={(e) => this.updateAllEntrySec(e, 'Comment')}
                      value={allData?.feedback_comment ?
                        allData?.feedback_comment: 
                        this.state.showQuestion || ""}
                    />
                  </Grid>
                </Grid>
                <Grid className="setDetail-eval">
                  <Grid item xs={12} md={12} className="saveTasks">
                    <Button
                      disabled={allData && allData.isFeedback}
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
    );
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
