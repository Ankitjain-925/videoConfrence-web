import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Loader from 'Screens/Components/Loader/index';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginReducerAim } from 'Screens/Login/actions';
import { LanguageFetchReducer } from 'Screens/actions';
import { Settings } from 'Screens/Login/setting';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from '../Components//CometChat/consts';
import sitedata from 'sitedata.js';
import axios from 'axios';
import {
  // CometChatIncomingCall,
  // CometChatIncomingDirectCall,
  CometChatOutgoingDirectCall,
} from './Calls/index.js';
import { getLanguage } from 'translations/index';
import { GetShowLabel1 } from 'Screens/Components/GetMetaData/index.js';
import { getMetadata, GetLanguageMetadata } from '../Patient/SickLeaveForm/api';
import PainPoint from 'Screens/Components/PointPain/index';
import {
  ConsoleCustom,
  getDate,
  getTime,
} from 'Screens/Components/BasicMethod/index';
import { S3Image } from 'Screens/Components/GetS3Images/index';
import moment from "moment"
import TimerIcon from '@material-ui/icons/Timer';
var situations = [
  {
    label: 'POSTPRANDIAL ',
    label_ar: 'ما بعد الأكل ',
    label_ch: '餐后 ',
    label_de: 'NACH DEM ESSEN',
    label_en: 'POSTPRANDIAL ',
    label_fr: 'POSTPRANDIAL ',
    label_nl: 'POSTPRANDIAAL ',
    label_pt: 'PÓS-PRANDIAL',
    label_rs: 'Постпрандиальная',
    label_sp: 'POSTPRANDIAL ',
    label_sw: 'Baada ya akula',
    label_tr: 'TOK KARNINA ',
    value: 'stress',
  },
  {
    label: 'EMPTY STOMACH',
    label_ar: 'معدة فارغة',
    label_ch: '空腹',
    label_de: 'NÜCHTERN',
    label_en: 'EMPTY STOMACH',
    label_fr: 'ESTOMAC VIDE',
    label_nl: 'LEGE MAAG',
    label_pt: 'ESTÔMAGO VAZIO',
    label_rs: 'Пустой желудок',
    label_sp: 'ESTOMAGO VACIO',
    label_sw: 'Tumbo kavu',
    label_tr: 'AÇ KARNINA',
    value: 'relaxed',
  },
];
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderImage: false,
      sectionValue: 0,
      Allsituation: situations,
      gender: false,
      AllIds: this.props.match.params,
      uniqueUser: {},
      time: {}
    };
  }

  componentDidMount = () => {
    const { AllIds } = this.state;
    let callType = 'DIRECT';
    this.setState({ loaderImage: true });
    CometChat.login(AllIds?.profile_id, COMETCHAT_CONSTANTS.AUTH_KEY)
      .then((resp) => {
        axios
          .post(sitedata.data.path + '/cometUserList', {
            profile_id: AllIds?.profile_id,
          })
          .then((response) => { this.setState({ loaderImage: false }); })
          .catch((err) => { this.setState({ loaderImage: false }); });
      })
      .catch((err) => { });
    this.getSessionId();
    getMetadata(this);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.stateLanguageType !== this.props.stateLanguageType) {
      GetLanguageMetadata(this);
    }
  };

  getSessionId = () => {
    var sesion_id = this.state.AllIds?.sesion_id;
    this.setState({ loaderImage: true });
    axios
      .get(sitedata.data.path + '/vactive/Linktime/' + sesion_id)
      .then((response) => {
        if (response && response.data && response.data.hassuccessed) {
          if (response.data.message === 'link active') {
            this.setState({
              sectionValue: 1,
              allTasks: response.data.data.Task,
              gender: response.data.data.gender,
              loaderImage: false,
            });
            this.startTimer(response.data.data.Task)
          }

        } else {
          if (
            response.data.message === 'Link will active soon' ||
            response.data.message === 'link start soon'
          ) {
            this.setState({ sectionValue: 2, loaderImage: false });
          } else if (response.data.message === 'Link Expire') {
            this.setState({ sectionValue: 3, loaderImage: false });
          } else {
            this.setState({ sectionValue: 5, loaderImage: false });
          }
        }
      })
      .catch((err) => {
        console.log('err', err);
        this.setState({ sectionValue: 5, loaderImage: false });
      });
  };

  endCallScreen = (value) => {
    let task_id = this.state.allTasks?._id;
    this.setState({ sectionValue: value });
    if (this.state.uniqueUser && this.state.uniqueUser?.length === 2) {
      this.setState({ loaderImage: true });
      axios
        .put(sitedata.data.path + '/vactive/joinmeeting/' + task_id)
        .then((responce) => {
          this.setState({ loaderImage: false });
        })
        .catch(() => {
          this.setState({ loaderImage: false });
        });
    }
  };

  userListCall = (userList) => {
    let unique =
      userList &&
      userList?.length > 0 &&
      userList
        .map((item) => item?.uid)
        .filter((value, index, self) => self.indexOf(value) === index);
    this.setState({ uniqueUser: unique });
  };

  secondsToTime(distance) {
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let obj = {
      "h": hours,
      "m": minutes,
    };
    return obj;
  }

  startTimer = (data) => {
    this.timer = this.countDown(data);
  }
  countDown(data) {

    setInterval(() => {
      let [t0, t1] = data?.end.split(':');
      let date = new Date().setHours(t0, t1)
      var countDownDate = new Date(date).getTime();
      var now = new Date().getTime();
      var distance = countDownDate - now;
      let distance1 = distance - 1;
      this.setState({
        time: this.secondsToTime(distance1),
        distance1: distance1,
      }, () => {
        if (distance1 < 0) {
          this.setState({ sectionValue: 6 });
          clearInterval(this.timer);
        }
      });
    }, 1000)
  }

  render() {
    const { allTasks } = this.state;
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      check_your_meeting_key_or_link_again,
      meeting_time_out,
      Headache,
      stomach_problems,
      diarrhea,
      fever,
      back_pain,
      cough_and_snees,
      feel_depressed,
      cardiac_problems,
      headache_undergoing_treatment,
      no,
      yes,
      headache_need_to_vomit,
      quality_of_pain,
      headache_onset_of_pain,
      headache_take_painkillers,
      pain_levelsss,
      diabetes,
      blood_sugar,
      Hba1c,
      situation,
      rr_systolic,
      RR_diastolic,
      body_temp,
      headache_hurtnow_left,
      headache_hurtnow_right,
      headache_hurtnow_top,
      blood_pressure,
      headache_painbegin_top,
      hurtnow,
      headache_hurtnow_back,
      headache_hurtnow_front,
      headache_painbegin_back,
      headache_painbegin_front,
      headache_painbegin_left,
      headache_painbegin_right,
      Pain_begin,
      stomach_temp,
      stomach_take_painkillers,
      stomach_intensity,
      stomach_undergoing_treatment,
      stomach_sternum,
      stomach_attack,
      stomach_failure,
      stomach_periodically,
      diarrhea_vomiting,
      diarrhea_body_temp,
      diarrhea_suffer_symtoms,
      diarrhea_liquids,
      diarrhea_symptoms_begin,
      cough,
      fever_cold,
      fever_hoarseness,
      fever_sputum,
      fever_symptoms_begin,
      fever_top_body_temp,
      fever_low_body_temp,
      fever_pain_intensity,
      back_strained,
      back_depression,
      back_attack,
      back_failure,
      back_symptoms_begin,
      back_injured,
      cough_symptoms_begin,
      cough_suffer_symtoms,
      cough_allergies,
      pain_level,
      depressed_do_you_sleep,
      depressed_suicidal_thoughts,
      depressed_hurt_yourself,
      depressed_symptoms_begin,
      cardiac_heart_attack,
      cardiac_heart_failure,
      cardiac_dizziness,
      cardiac_shoulder_pain,
      meeting_has_ended,
      link_has_been_expired,
      Oops,
      activate_very_soon,
      welcome,
    } = translate;
    return (
      <Grid
        className={
          this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode &&
            this.props.settings.setting.mode === 'dark'
            ? 'homeBg darkTheme homeBgDrk'
            : 'homeBg'
        }
      >
        {this.state.loaderImage && <Loader />}
        <Grid className="homeBgIner">
          <Grid container direction="row" justify="center">
            <Grid item xs={12} md={12}>
              {this.state.sectionValue == 1 && (
                <Grid container direction="row">
                  <Grid item xs={12} md={12} lg={12}>
                    <Grid container direction="row">
                      <Grid item xs={12} md={8} lg={8}>
                        <Grid className="manageVideoCall">
                          <Grid className="timerandLabel">
                            <TimerIcon className="timerIcon" />
                            <label className="formviewhead"> {this.state.time.h}h : {this.state.time.m}m</label></Grid>
                          <CometChatOutgoingDirectCall
                            open
                            userListCall={(userList) =>
                              this.userListCall(userList)
                            }
                            endCallScreen={(value) => this.endCallScreen(value)}
                            sessionID={this.state.AllIds?.sesion_id}
                            theme={this.props.theme}
                            item={this.state.item}
                            type={this.state.type}
                            lang={this.state.lang}
                            callType={CometChat.CALL_TYPE.VIDEO}
                            joinDirectCall={this.state.joinDirectCall}
                            loggedInUser={this.loggedInUser}
                            actionGenerated={this.actionHandler}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={4} lg={4}>
                        <Grid>
                          <Grid className="allWebVideoSec ">
                            <Grid className="allSickVideoSec">
                              <Grid className="topSickVideoSec">
                                <Grid className="profileImagePat">
                                  <S3Image imgUrl={allTasks?.patient?.image} />
                                </Grid>
                                <Grid className="topTxtVideoSec">
                                  <p>
                                    {allTasks?.patient?.first_name}{' '}
                                    {allTasks?.patient?.last_name}
                                  </p>
                                  <label className="formviewhead">{allTasks?.patient?.profile_id}</label>
                                </Grid>
                              </Grid>

                              {allTasks && allTasks?.headache === 'yes' && (
                                <Grid>
                                  <Grid>
                                    <h3>{Headache}</h3>
                                  </Grid>
                                  <Grid className="allHeadSection">
                                    <Grid>
                                      <Grid>
                                        <h3>{Pain_begin}</h3>
                                      </Grid>
                                      <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                      >
                                        <Grid item xs={12} md={12}>
                                          <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                          >
                                            <Grid item xs={4} sm={3} md={4} lg={3}>
                                              <label className="formviewhead">
                                                {headache_painbegin_back}
                                              </label>
                                              {allTasks &&
                                                allTasks?.headache_painbegin_back ===
                                                true ? (
                                                <p>{yes}</p>
                                              ) : (
                                                <p>{no}</p>
                                              )}
                                            </Grid>
                                            <Grid item xs={4} sm={3} md={4} lg={3}>
                                              <label className="formviewhead">
                                                {headache_painbegin_front}
                                              </label>
                                              {allTasks &&
                                                allTasks?.headache_painbegin_front ===
                                                true ? (
                                                <p>{yes}</p>
                                              ) : (
                                                <p>{no}</p>
                                              )}
                                            </Grid>
                                            <Grid item xs={4} sm={3} md={4} lg={3}>
                                              <label className="formviewhead">
                                                {headache_painbegin_left}
                                              </label>
                                              {allTasks &&
                                                allTasks?.headache_painbegin_left ===
                                                true ? (
                                                <p>{yes}</p>
                                              ) : (
                                                <p>{no}</p>
                                              )}
                                            </Grid>
                                            <Grid item xs={4} sm={3} md={4} lg={3}>
                                              <label className="formviewhead">
                                                {headache_painbegin_right}
                                              </label>
                                              {allTasks &&
                                                allTasks?.headache_painbegin_right ===
                                                true ? (
                                                <p>{yes}</p>
                                              ) : (
                                                <p>{no}</p>
                                              )}
                                            </Grid>
                                            <Grid item xs={4} sm={3} md={4} lg={3}>
                                              <label className="formviewhead">
                                                {headache_painbegin_top}
                                              </label>
                                              {allTasks &&
                                                allTasks?.headache_painbegin_top ===
                                                true ? (
                                                <p>{yes}</p>
                                              ) : (
                                                <p>{no}</p>
                                              )}
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid>
                                      <Grid>
                                        <h3>{hurtnow}</h3>
                                      </Grid>
                                      <Grid>
                                        <Grid
                                          container
                                          direction="row"
                                          justify="center"
                                        >
                                          <Grid item xs={12} md={12}>
                                            <Grid
                                              container
                                              direction="row"
                                              justify="center"
                                            >
                                              <Grid item xs={4} sm={3} md={4} lg={3}>
                                                <label className="formviewhead">
                                                  {headache_hurtnow_back}
                                                </label>
                                                {allTasks &&
                                                  allTasks?.headache_hurtnow_back ===
                                                  true ? (
                                                  <p>{yes}</p>
                                                ) : (
                                                  <p>{no}</p>
                                                )}
                                              </Grid>
                                              <Grid item xs={4} sm={3} md={4} lg={3}>
                                                <label className="formviewhead">
                                                  {headache_hurtnow_front}
                                                </label>
                                                {allTasks &&
                                                  allTasks?.headache_hurtnow_front ===
                                                  true ? (
                                                  <p>{yes}</p>
                                                ) : (
                                                  <p>{no}</p>
                                                )}
                                              </Grid>
                                              <Grid item xs={4} sm={3} md={4} lg={3}>
                                                <label className="formviewhead">
                                                  {headache_hurtnow_left}
                                                </label>
                                                {allTasks &&
                                                  allTasks?.headache_hurtnow_left ===
                                                  true ? (
                                                  <p>{yes}</p>
                                                ) : (
                                                  <p>{no}</p>
                                                )}
                                              </Grid>
                                              <Grid item xs={4} sm={3} md={4} lg={3}>
                                                <label className="formviewhead">
                                                  {headache_hurtnow_right}
                                                </label>
                                                {allTasks &&
                                                  allTasks?.headache_hurtnow_right ===
                                                  true ? (
                                                  <p>{yes}</p>
                                                ) : (
                                                  <p>{no}</p>
                                                )}
                                              </Grid>
                                              <Grid item xs={4} sm={3} md={4} lg={3}>
                                                <label className="formviewhead">
                                                  {headache_hurtnow_top}
                                                </label>
                                                {allTasks &&
                                                  allTasks?.headache_hurtnow_top ===
                                                  true ? (
                                                  <p>{yes}</p>
                                                ) : (
                                                  <p>{no}</p>
                                                )}
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid>
                                      <Grid>
                                        <h3>{blood_pressure}</h3>
                                      </Grid>
                                      <Grid container xs={12} md={12}>
                                        <Grid xs={6} md={6}>
                                          <label className="formviewhead">{rr_systolic}</label>
                                          <p>
                                            {allTasks &&
                                              allTasks?.headache_rr_systolic}
                                          </p>
                                        </Grid>
                                        <Grid xs={6} md={6}>
                                          <label className="formviewhead">{RR_diastolic}</label>
                                          <p>
                                            {allTasks &&
                                              allTasks?.headache_rr_diastolic}
                                          </p>
                                        </Grid>
                                      </Grid>
                                    </Grid>

                                    <Grid>
                                      <Grid>
                                        <h3>{body_temp}</h3>
                                      </Grid>
                                      <Grid>
                                        <p>
                                          {allTasks &&
                                            allTasks?.headache_body_temp}
                                        </p>
                                      </Grid>
                                    </Grid>

                                    <Grid>
                                      <Grid>
                                        <h3>{diabetes}</h3>
                                      </Grid>
                                      <Grid container xs={12} md={12}>
                                        <Grid xs={6} sm={4} md={4} lg={4}>
                                          <label className="formviewhead">{blood_sugar}</label>
                                          <p>
                                            {allTasks &&
                                              allTasks?.headache_blood_sugar}
                                          </p>
                                        </Grid>
                                        <Grid xs={6} sm={4} md={3} lg={4}>
                                          <label className="formviewhead">{Hba1c}</label>
                                          <p>
                                            {allTasks &&
                                              allTasks?.headache_Hba1c}
                                          </p>
                                        </Grid>
                                        <Grid xs={6} sm={4} md={5} lg={4}>
                                          <label className="formviewhead">{situation}</label>
                                          <p>
                                            {allTasks &&
                                              allTasks?.headache_situation &&
                                              allTasks?.headache_situation
                                                ?.value &&
                                              GetShowLabel1(
                                                this.state.Allsituation,
                                                allTasks?.headache_situation
                                                  ?.value,
                                                this.props.stateLanguageType,
                                                true,
                                                'anamnesis'
                                              )}
                                          </p>
                                        </Grid>
                                      </Grid>
                                    </Grid>

                                    <Grid>
                                      <Grid>
                                        <h3>{quality_of_pain}</h3>
                                        <p>
                                          {allTasks &&
                                            allTasks?.headache_quality_of_pain}
                                        </p>
                                      </Grid>
                                      <Grid>
                                        <h3>{headache_need_to_vomit}</h3>
                                        {allTasks &&
                                          allTasks?.headache_need_to_vomit ===
                                          'yes' ? (
                                          <p>{yes}</p>
                                        ) : (
                                          <p>{no}</p>
                                        )}
                                      </Grid>
                                      <Grid>
                                        <h3>{headache_onset_of_pain}</h3>
                                        {allTasks &&
                                          allTasks?.headache_onset_of_pain ===
                                          'yes' ? (
                                          <p>{yes}</p>
                                        ) : (
                                          <p>{no}</p>
                                        )}
                                      </Grid>
                                      <Grid>
                                        <h3>{headache_take_painkillers}</h3>
                                        {allTasks &&
                                          allTasks?.take_painkillers === 'yes' ? (
                                          <p>{yes}</p>
                                        ) : (
                                          <p>{no}</p>
                                        )}
                                      </Grid>
                                      <Grid>
                                        <h3>{headache_undergoing_treatment}</h3>
                                        {allTasks &&
                                          allTasks?.undergoing_treatment ===
                                          'yes' ? (
                                          <p>{yes}</p>
                                        ) : (
                                          <p>{no}</p>
                                        )}
                                      </Grid>
                                      <Grid>
                                        <h3>{pain_levelsss}</h3>
                                        <p>
                                          {allTasks &&
                                            allTasks?.headache_pain_intensity}
                                        </p>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              )}
                              {allTasks &&
                                allTasks?.stomach_problems === 'yes' && (
                                  <Grid>
                                    <Grid className="stomachVideoSec">
                                      <h3>{stomach_problems}</h3>
                                    </Grid>

                                    <Grid className="allHeadSection">
                                      <Grid>
                                        <h3>{Pain_begin}</h3>
                                        <PainPoint
                                          gender={this.state.gender}
                                          painPoint={
                                            allTasks &&
                                            allTasks?.stomach_painbegin_painPoint
                                          }
                                          isView={true}
                                        />
                                      </Grid>

                                      <Grid>
                                        <h3>{hurtnow}</h3>
                                        <PainPoint
                                          gender={this.state.gender}
                                          painPoint={
                                            allTasks &&
                                            allTasks?.stomach_hurtnow_painPoint
                                          }
                                          isView={true}
                                        />
                                      </Grid>

                                      <Grid container xs={12} md={12}>
                                        <Grid xs={4} md={4}>
                                          <label className="formviewhead">{stomach_sternum}</label>
                                          {allTasks &&
                                            allTasks?.stomach_behind_the_sternum ===
                                            'yes' ? (
                                            <p>{yes}</p>
                                          ) : (
                                            <p>{no}</p>
                                          )}
                                        </Grid>
                                        <Grid xs={4} md={4}>
                                          <label className="formviewhead">{stomach_attack}</label>
                                          {allTasks &&
                                            allTasks?.stomach_heart_attack ===
                                            'yes' ? (
                                            <p>{yes}</p>
                                          ) : (
                                            <p>{no}</p>
                                          )}
                                        </Grid>
                                        <Grid xs={4} md={4}>
                                          <label className="formviewhead">{stomach_failure}</label>
                                          {allTasks &&
                                            allTasks?.stomach_heart_failure ===
                                            'yes' ? (
                                            <p>{yes}</p>
                                          ) : (
                                            <p>{no}</p>
                                          )}
                                        </Grid>
                                      </Grid>

                                      <Grid>
                                        <Grid>
                                          <h3>{blood_pressure}</h3>
                                        </Grid>
                                        <Grid container xs={12} md={12}>
                                          <Grid xs={6} md={6}>
                                            <label className="formviewhead">{rr_systolic}</label>
                                            <p>
                                              {allTasks &&
                                                allTasks?.stomach_rr_systolic}
                                            </p>
                                          </Grid>
                                          <Grid xs={6} md={6}>
                                            <label className="formviewhead">{RR_diastolic}</label>
                                            <p>
                                              {allTasks &&
                                                allTasks?.stomach_rr_diastolic}
                                            </p>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      {allTasks &&
                                        allTasks?.stomach_have_diabetes ===
                                        'yes' && (
                                          <Grid>
                                            <Grid>
                                              <h3>{diabetes}</h3>
                                            </Grid>
                                            <Grid container xs={12} md={12}>
                                              <Grid xs={6} sm={4} md={4} lg={4}>
                                                <label className="formviewhead">{blood_sugar}</label>
                                                <p>
                                                  {allTasks &&
                                                    allTasks?.stomach_blood_sugar}
                                                </p>
                                              </Grid>
                                              <Grid xs={6} sm={4} md={3} lg={4}>
                                                <label className="formviewhead">{Hba1c}</label>
                                                <p>
                                                  {allTasks &&
                                                    allTasks?.stomach_Hba1c}
                                                </p>
                                              </Grid>
                                              <Grid xs={6} sm={4} md={5} lg={4}>
                                                <label className="formviewhead">{situation}</label>
                                                <p>
                                                  {allTasks &&
                                                    allTasks?.stomach_situation &&
                                                    allTasks?.stomach_situation
                                                      ?.value &&
                                                    GetShowLabel1(
                                                      this.state.Allsituation,
                                                      allTasks &&
                                                      allTasks
                                                        ?.stomach_situation
                                                        ?.value,
                                                      this.props
                                                        .stateLanguageType,
                                                      true,
                                                      'anamnesis'
                                                    )}
                                                </p>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        )}
                                      <Grid>
                                        <Grid className="sickAllMngSec">
                                          <label className="formviewhead">{stomach_periodically}</label>
                                          {allTasks &&
                                            allTasks?.stomach_continuously_or_periodically ===
                                            'yes' ? (
                                            <p>{yes}</p>
                                          ) : (
                                            <p>{no}</p>
                                          )}
                                        </Grid>
                                        <Grid>
                                          <h3>{body_temp}</h3>
                                        </Grid>
                                        <Grid>
                                          <label className="formviewhead">{stomach_temp}</label>
                                        </Grid>
                                        <p>
                                          {allTasks &&
                                            allTasks?.stomach_body_temp}
                                        </p>
                                        <Grid>
                                          <Grid className="sickAllMngSec">
                                            <label className="formviewhead">
                                              {stomach_take_painkillers}
                                            </label>
                                          </Grid>
                                          {allTasks &&
                                            allTasks?.stomach_take_painkillers ===
                                            'yes' ? (
                                            <p>{yes}</p>
                                          ) : (
                                            <p>{no}</p>
                                          )}
                                        </Grid>
                                        <Grid className="sickAllMngSec">
                                          <label className="formviewhead">{stomach_intensity}</label>
                                          <p>
                                            {allTasks &&
                                              allTasks?.stomach_pain_intensity}
                                          </p>
                                        </Grid>
                                        <Grid>
                                          <Grid className="sickAllMngSec">
                                            <label className="formviewhead">
                                              {stomach_undergoing_treatment}
                                            </label>
                                          </Grid>
                                          {allTasks &&
                                            allTasks?.stomach_undergoing_treatment ===
                                            'yes' ? (
                                            <p>{yes}</p>
                                          ) : (
                                            <p>{no}</p>
                                          )}
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                )}
                              {allTasks && allTasks?.diarrhea === 'yes' && (
                                <Grid>
                                  <Grid className="stomachVideoSec">
                                    <h3>{diarrhea}</h3>
                                  </Grid>
                                  <Grid className="allHeadSection">
                                    <Grid>
                                      <Grid className="sickAllMngSec">
                                        <label className="formviewhead">{diarrhea_symptoms_begin}</label>
                                      </Grid>
                                      <p>
                                        {getDate(
                                          allTasks &&
                                          allTasks?.diarrhea_symptoms_begin,
                                          this.props.settings &&
                                          this.props.settings?.setting &&
                                          this.props.settings?.setting
                                            ?.date_format
                                        )}
                                      </p>
                                    </Grid>
                                    <Grid className="sickAllMngSec">
                                      <label className="formviewhead">{diarrhea_vomiting}</label>

                                      {allTasks &&
                                        allTasks?.diarrhea_suffer_from_vomiting ===
                                        'yes' ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid>
                                      <Grid>
                                        <h3>{body_temp}</h3>
                                      </Grid>
                                      <Grid>
                                        <label className="formviewhead">{diarrhea_body_temp}</label>
                                      </Grid>
                                      <p>
                                        {allTasks &&
                                          allTasks?.diarrhea_body_temp}
                                      </p>
                                      <Grid className="sickAllMngSec">
                                        <label className="formviewHead">{diarrhea_suffer_symtoms}</label>

                                        {allTasks &&
                                          allTasks?.diarrhea_envi_suffer_symtoms ===
                                          'yes' ? (
                                          <p>{yes}</p>
                                        ) : (
                                          <p>{no}</p>
                                        )}
                                      </Grid>
                                      <Grid className="sickAllMngSec">
                                        <label className="formviewhead">{diarrhea_liquids}</label>

                                        {allTasks &&
                                          allTasks?.diarrhea_liquids_with_you ===
                                          'yes' ? (
                                          <p>{yes}</p>
                                        ) : (
                                          <p>{no}</p>
                                        )}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              )}
                              {allTasks && allTasks?.have_fever === 'yes' && (
                                <Grid>
                                  <Grid className="stomachVideoSec">
                                    <h3>{fever}</h3>
                                  </Grid>
                                  <Grid className="allHeadSection">
                                    <Grid>
                                      <Grid className="sickAllMngSec">
                                        <label className="formviewhead">{fever_symptoms_begin}</label>
                                      </Grid>
                                      <p>
                                        {getDate(
                                          allTasks &&
                                          allTasks?.fever_symptoms_begin,
                                          this.props.settings &&
                                          this.props.settings?.setting &&
                                          this.props.settings?.setting
                                            ?.date_format
                                        )}
                                      </p>
                                    </Grid>
                                    <Grid>
                                      <h3>{body_temp}</h3>
                                    </Grid>
                                    <Grid container xs={12} md={12}>
                                      <Grid xs={6} md={6}>
                                        <label className="formviewhead">{fever_top_body_temp}</label>
                                        <p>
                                          {allTasks &&
                                            allTasks?.fever_top_body_temp}
                                        </p>
                                      </Grid>
                                      <Grid xs={6} md={6}>
                                        <label className="formviewhead">{fever_low_body_temp}</label>
                                        <p>
                                          {allTasks &&
                                            allTasks?.fever_low_body_temp}
                                        </p>
                                      </Grid>
                                    </Grid>

                                    <Grid>
                                      <Grid className="sickAllMngSec">
                                        <label className="formviewhead">{fever_pain_intensity}</label>
                                      </Grid>
                                      <p>
                                        {allTasks &&
                                          allTasks?.fever_pain_intensity}
                                      </p>
                                    </Grid>
                                    {allTasks &&
                                      allTasks?.fever_have_a_cough ===
                                      'yes' && (
                                        <Grid>
                                          <Grid>
                                            <h3>{cough}</h3>
                                          </Grid>

                                          <Grid container xs={12} md={12}>
                                            <Grid xs={6} md={6}>
                                              <label className="formviewhead">{fever_cold}</label>
                                              {allTasks &&
                                                allTasks?.fever_cold === true ? (
                                                <p>{yes}</p>
                                              ) : (
                                                <p>{no}</p>
                                              )}
                                            </Grid>
                                            <Grid xs={6} md={6}>
                                              <label className="formviewhead">{fever_hoarseness}</label>

                                              {allTasks &&
                                                allTasks?.fever_hoarseness ===
                                                true ? (
                                                <p>{yes}</p>
                                              ) : (
                                                <p>{no}</p>
                                              )}
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      )}
                                    <Grid>
                                      <Grid className="sickAllMngSec">
                                        <label className="formviewhead">{fever_sputum}</label>
                                      </Grid>
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            allTasks && allTasks?.fever_sputum,
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              )}
                              {allTasks && allTasks?.back_pain === 'yes' && (
                                <Grid>
                                  <Grid className="stomachVideoSec">
                                    <h3>{back_pain}</h3>
                                  </Grid>
                                  <Grid className="allHeadSection">
                                    <Grid>
                                      <Grid className="sickAllMngSec">
                                        <label className="formviewhead">{back_symptoms_begin}</label>
                                      </Grid>
                                      <p>
                                        {getDate(
                                          allTasks &&
                                          allTasks?.back_pain_symptoms_begin,
                                          this.props.settings &&
                                          this.props.settings?.setting &&
                                          this.props.settings?.setting
                                            ?.date_format
                                        )}
                                      </p>
                                    </Grid>
                                    <Grid>
                                      <Grid className="sickAllMngSec">
                                        <label className="formviewhead">{back_injured}</label>
                                      </Grid>
                                      {allTasks &&
                                        allTasks?.back_pain_been_injured ===
                                        'yes' ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid className="sickAllMngSec">
                                      <label className="formviewhead">{back_strained}</label>

                                      {allTasks &&
                                        allTasks?.back_pain_physically_strained ===
                                        'yes' ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid className="sickAllMngSec">
                                      <label className="formviewhead">{back_depression}</label>

                                      {allTasks &&
                                        allTasks?.back_pain_stress_depression ===
                                        'yes' ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    {allTasks &&
                                      allTasks?.back_pain_have_diabetes ===
                                      'yes' && (
                                        <Grid>
                                          <Grid>
                                            <h3>{diabetes} </h3>
                                          </Grid>
                                          <Grid container xs={12} md={12}>
                                            <Grid xs={6} sm={4} md={4} lg={4}>
                                              <label className="formviewhead">{blood_sugar}</label>
                                              <p>
                                                {allTasks &&
                                                  allTasks?.back_pain_blood_sugar}
                                              </p>
                                            </Grid>
                                            <Grid xs={6} sm={4} md={3} lg={4}>
                                              <label className="formviewhead">{Hba1c}</label>
                                              <p>
                                                {allTasks &&
                                                  allTasks?.back_pain_Hba1c}
                                              </p>
                                            </Grid>

                                            <Grid xs={6} sm={4} md={5} lg={4}>
                                              <label className="formviewhead">{situation}</label>
                                              <p>
                                                {allTasks &&
                                                  allTasks?.back_pain_situation &&
                                                  allTasks &&
                                                  allTasks?.back_pain_situation
                                                    ?.value &&
                                                  GetShowLabel1(
                                                    this.state.Allsituation,
                                                    allTasks &&
                                                    allTasks
                                                      ?.back_pain_situation
                                                      ?.value,
                                                    this.props
                                                      .stateLanguageType,
                                                    true,
                                                    'anamnesis'
                                                  )}
                                              </p>
                                            </Grid>
                                          </Grid>
                                          <Grid className="sickAllMngSec">
                                            <label className="formviewhead">{back_attack}</label>
                                            {allTasks &&
                                              allTasks?.back_pain_heart_attack ===
                                              'yes' ? (
                                              <p>{yes}</p>
                                            ) : (
                                              <p>{no}</p>
                                            )}
                                          </Grid>
                                          <Grid className="sickAllMngSec">
                                            <label className="formviewhead">{back_failure}</label>
                                            {allTasks &&
                                              allTasks?.back_pain_heart_failure ===
                                              'yes' ? (
                                              <p>{yes}</p>
                                            ) : (
                                              <p>{no}</p>
                                            )}
                                          </Grid>
                                          <Grid>
                                            <Grid>
                                              <h3>{blood_pressure}</h3>
                                            </Grid>
                                            <Grid container xs={12} md={12}>
                                              <Grid xs={6} md={6}>
                                                <label className="formviewhead">{rr_systolic}</label>
                                                <p>
                                                  {allTasks &&
                                                    allTasks?.back_pain_rr_systolic}
                                                </p>
                                              </Grid>
                                              <Grid xs={6} md={6}>
                                                <label className="formviewhead">{RR_diastolic}</label>
                                                <p>
                                                  {allTasks &&
                                                    allTasks?.back_pain_rr_diastolic}
                                                </p>
                                              </Grid>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      )}
                                  </Grid>
                                </Grid>
                              )}
                              {allTasks && allTasks?.cough_and_snees === 'yes' && (
                                <Grid>
                                  <Grid className="stomachVideoSec">
                                    <h3>{cough_and_snees}</h3>
                                  </Grid>
                                  <Grid className="allHeadSection">
                                    <Grid>
                                      <Grid className="sickAllMngSec">
                                        <label className="formviewhead">{cough_symptoms_begin}</label>
                                      </Grid>
                                      <p>
                                        {getDate(
                                          allTasks &&
                                          allTasks?.cough_symptoms_begin,
                                          this.props.settings &&
                                          this.props.settings?.setting &&
                                          this.props.settings?.setting
                                            ?.date_format
                                        )}
                                      </p>
                                    </Grid>
                                    <Grid>
                                      <h3>{body_temp}</h3>
                                    </Grid>
                                    <Grid>
                                      {/* <Grid>
                                        <label className="formviewhead">{body_temp}</label>
                                      </Grid> */}
                                      <p>
                                        {allTasks && allTasks?.cough_body_temp}
                                      </p>
                                    </Grid>
                                    <Grid>
                                      <Grid className="sickAllMngSec">
                                        <label className="formviewhead">{cough_suffer_symtoms}</label>
                                      </Grid>
                                      {allTasks &&
                                        allTasks?.cough_envi_suffer_symtoms ===
                                        'yes' ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid>
                                      <Grid className="sickAllMngSec">
                                        <label className="formviewhead">{cough_allergies}</label>
                                      </Grid>
                                      <p
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            allTasks &&
                                            allTasks?.cough_suffer_from_allergies,
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              )}
                              {allTasks && allTasks?.feel_depressed === 'yes' && (
                                <Grid>
                                  <Grid className="stomachVideoSec">
                                    <h3>{feel_depressed}</h3>
                                  </Grid>
                                  <Grid className="allHeadSection">
                                    <Grid>
                                      <Grid className="sickAllMngSec">
                                        <label className="formviewhead">
                                          {depressed_symptoms_begin}
                                        </label>
                                      </Grid>
                                      <p>
                                        {getDate(
                                          allTasks &&
                                          allTasks?.depressed_symptoms_begin,
                                          this.props.settings &&
                                          this.props.settings?.setting &&
                                          this.props.settings?.setting
                                            ?.date_format
                                        )}
                                      </p>
                                    </Grid>
                                    <Grid>
                                      <Grid className="sickAllMngSec">
                                        <label className="formviewhead">{pain_level}</label>
                                      </Grid>
                                      <p>
                                        {allTasks &&
                                          allTasks?.depressed_pain_intensity}
                                      </p>
                                    </Grid>
                                    <Grid container xs={12} md={12}>
                                      <Grid
                                        xs={6}
                                        sm={4}
                                        md={6}
                                        lg={3}
                                        className="sickAllMngSec"
                                      >
                                        <label className="formviewhead">{depressed_do_you_sleep}</label>

                                        {allTasks &&
                                          allTasks?.depressed_do_you_sleep ===
                                          'yes' ? (
                                          <p>{yes}</p>
                                        ) : (
                                          <p>{no}</p>
                                        )}
                                      </Grid>
                                      <Grid
                                        xs={6}
                                        sm={4}
                                        md={6}
                                        lg={5}
                                        className="sickAllMngSec"
                                      >
                                        <label className="formviewhead">
                                          {depressed_suicidal_thoughts}
                                        </label>

                                        {allTasks &&
                                          allTasks?.depressed_suicidal_thoughts ===
                                          'yes' ? (
                                          <p>{yes}</p>
                                        ) : (
                                          <p>{no}</p>
                                        )}
                                      </Grid>
                                      <Grid
                                        xs={6}
                                        sm={4}
                                        md={6}
                                        lg={4}
                                        className="sickAllMngSec"
                                      >
                                        <label className="formviewhead">{depressed_hurt_yourself}</label>

                                        {allTasks &&
                                          allTasks?.depressed_hurt_yourself ===
                                          'yes' ? (
                                          <p>{yes}</p>
                                        ) : (
                                          <p>{no}</p>
                                        )}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              )}
                              {allTasks &&
                                allTasks?.cardiac_problems === 'yes' && (
                                  <Grid>
                                    <Grid className="stomachVideoSec">
                                      <h3>{cardiac_problems}</h3>
                                    </Grid>
                                    <Grid className="allHeadSection">
                                      <Grid>
                                        <h3>{blood_pressure}</h3>
                                      </Grid>
                                      <Grid container xs={12} md={12}>
                                        <Grid xs={6} md={6}>
                                          <label className="formviewhead">{rr_systolic}</label>
                                          <p>
                                            {allTasks &&
                                              allTasks?.cardiac_rr_systolic}
                                          </p>
                                        </Grid>
                                        <Grid xs={6} md={6}>
                                          <label className="formviewhead">{RR_diastolic}</label>
                                          <p>
                                            {allTasks &&
                                              allTasks?.cardiac_rr_diastolic}
                                          </p>
                                        </Grid>
                                      </Grid>

                                      <Grid container xs={12} md={12}>
                                        <Grid
                                          xs={4}
                                          sm={3}
                                          md={4}
                                          className="sickAllMngSec"
                                        >
                                          <label className="formviewhead">{cardiac_heart_attack}</label>

                                          {allTasks &&
                                            allTasks?.cardiac_heart_attack ===
                                            'yes' ? (
                                            <p>{yes}</p>
                                          ) : (
                                            <p>{no}</p>
                                          )}
                                        </Grid>
                                        <Grid
                                          xs={4}
                                          sm={3}
                                          md={4}
                                          className="sickAllMngSec"
                                        >
                                          <label className="formviewhead">{cardiac_heart_failure}</label>

                                          {allTasks &&
                                            allTasks?.cardiac_heart_failure ===
                                            'yes' ? (
                                            <p>{yes}</p>
                                          ) : (
                                            <p>{no}</p>
                                          )}
                                        </Grid>
                                        <Grid
                                          xs={4}
                                          sm={3}
                                          md={4}
                                          className="sickAllMngSec"
                                        >
                                          <label className="formviewhead">{cardiac_dizziness}</label>
                                          {allTasks &&
                                            allTasks?.cardiac_have_dizziness ===
                                            'yes' ? (
                                            <p>{yes}</p>
                                          ) : (
                                            <p>{no}</p>
                                          )}
                                        </Grid>
                                        <Grid
                                          xs={4}
                                          sm={3}
                                          md={4}
                                          className="sickAllMngSec"
                                        >
                                          <label className="formviewhead">{cardiac_shoulder_pain}</label>

                                          {allTasks &&
                                            allTasks?.cardiac_have_shoulder_pain ===
                                            'yes' ? (
                                            <p>{yes}</p>
                                          ) : (
                                            <p>{no}</p>
                                          )}
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {this.state.sectionValue == 2 && (
                <Grid className="msgSectionCss">
                  <label className="formviewhead">{welcome}</label>
                  <p>{activate_very_soon}</p>
                </Grid>
              )}
              {this.state.sectionValue == 3 && (
                <Grid className="msgSectionCss">
                  <label className="formviewhead">{Oops}</label>
                  <p>{link_has_been_expired}</p>
                </Grid>
              )}
              {this.state.sectionValue == 4 && (
                <Grid className="msgSectionCss">
                  <p>{meeting_has_ended}</p>
                </Grid>
              )}
              {this.state.sectionValue == 5 && (
                <Grid className="msgSectionCss">
                  <label className="formviewhead">{Oops}</label>
                  <p>
                    {check_your_meeting_key_or_link_again}
                  </p>
                </Grid>
              )}
              {this.state.sectionValue == 6 && (
                <Grid className="msgSectionCss">
                  <label className="formviewhead">{Oops}</label>
                  <p>
                    {meeting_time_out}
                  </p>
                </Grid>
              )}
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
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings,
  })(Index)
);
