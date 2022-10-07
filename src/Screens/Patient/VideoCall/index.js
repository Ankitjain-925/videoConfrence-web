import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import Notification from "Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications";
import AppBar from "@material-ui/core/AppBar";
import Select from "react-select";
import { commonHeader } from "component/CommonHeader/index";
import { getLanguage } from "translations/index";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { Button, TextField, Card } from "@material-ui/core/index";
import Item from "./SliderItem";
import Carousel from "react-material-ui-carousel";
import { APIs, APIs1, APIs2, APIs3 } from "Screens/APIcall/index";
import axios from "axios";
import { pure } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import { OptionList } from "Screens/Login/metadataaction";
import { authy } from "Screens/Login/authy.js";
import {
  CometChatOutgoingDirectCall,
} from '../../VideoCall/Calls/index';
import { CometChat } from '@cometchat-pro/chat';
import { COMETCHAT_CONSTANTS } from '../../Components/CometChat/consts';
import useAllLoginReducerAim from "../../Hooks/LoginReducerAim";
import Loader from 'Screens/Components/Loader/index';
import { S3Image } from 'Screens/Components/GetS3Images/index';
import useAllSetting from '../../Hooks/Setting';
import TimerIcon from '@material-ui/icons/Timer';
import PainPoint from 'Screens/Components/PointPain/index';
import { useHistory } from "react-router-dom";
import FeedQuestion from '../../Components/FeedQuestion/index';

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

const VideoCallPat = (props) => {
  const [slideItems, setSlideItems] = useState([]);
  const [allDoctorData, setallDoctorData] = useState({});
  const [time, setTime] = useState({});
  const [timer, setTimer] = useState([]);
  const [allTasks, setTaskData] = useState({});
  const [uniqueUser, setUniqueUser] = useState({});
  const [gender, setGender] = useState({});
  const stateLoginValueAim = useAllLoginReducerAim();
  const [startCall, setStartCall] = useState(0);
  const [loaderImage, setLoaderImage] = useState(false);
  const settings = useAllSetting();
  const history = useHistory();


  let translate = getLanguage(props.stateLanguageType);
  let { my_profile,
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
    welcome,
    activate_very_soon,
    link_has_been_expired,
    meeting_time_out,
    You_dont_have_an_access_of_this_meeting,
    Oops,
    check_your_meeting_key_or_link_again,
    meeting_has_ended
  } = translate;

  useEffect(() => {
    if (props.location?.state?.code) {
      var accessKey = props.location?.state?.code;
    }
    callCometChat(accessKey);
  }, [time]);

  const getFeedbackIssue = (allTasks) => {
    console.log('allTasks', allTasks)
    axios
      .get(
        APIs.getfeedbackfordoctor + "/" + allTasks?.doctor_info?.user_id,
        commonHeader(stateLoginValueAim.token)
      )
      .then((response) => {
        let { data, hassuccessed } = response.data;
        if (hassuccessed) {
          const sliderItems = data.length > 2 ? 2 : data.length;
          const items = [];
          for (let i = 0; i < data.length; i += sliderItems) {
            if (i % sliderItems === 0) {
              items.push(
                <Card raised className="Banner" key={i.toString()}>
                  <Grid container spacing={0} className="BannerGrid">
                    {data.slice(i, i + sliderItems).map((da, index) => {
                      return <Item key={index.toString()} item={da} />;
                    })}
                  </Grid>
                </Card>
              );
            }
          }
          setSlideItems(items)
        }
      });
  }
  const callCometChat = (accessKey) => {
    var profile_id = stateLoginValueAim?.user?.profile_id;
    let callType = 'DIRECT';
    setLoaderImage(true);
    axios
      .get(APIs2.linktime + "/" + accessKey)
      .then((response) => {
        if (response && response.data && response.data.hassuccessed) {
          if (response.data.message === 'link active') {
            if (response?.data?.data.doctor_info?.user_id === stateLoginValueAim?.user?._id || response?.data?.data?.Session?.patient_id === stateLoginValueAim?.user?._id) {
              setallDoctorData(response?.data?.data.doctor_info);
              var taskData = response.data.data.Task;
              var gender = response.data.data.gender;
              getFeedbackIssue(response?.data?.data);
              CometChat.login(profile_id, COMETCHAT_CONSTANTS.AUTH_KEY)
                .then((resp) => {
                  axios
                    .post(APIs1.cometUserList, {
                      profile_id: profile_id,
                    })
                    .then((response) => {
                      setLoaderImage(false);
                      setStartCall(1);
                      setTaskData(taskData);
                      setGender(gender);
                      // startTimer(taskData);
                    })
                    .catch((err) => {
                      setLoaderImage(false);
                    });
                }).catch((err) => {
                  setLoaderImage(false);
                });
            } else {
              setStartCall(7);
              setLoaderImage(false);
            }
          }
        }
        else {
          if (
            response.data.message === 'Link will active soon' ||
            response.data.message === 'link start soon'
          ) {
            setLoaderImage(false);
            setStartCall(2);
          } else if (response.data.message === 'Link Expire') {
            setLoaderImage(false);
            setStartCall(3);
          } else {
            setLoaderImage(false);
            setStartCall(5);
          }
        }
      })
      .catch((err) => {
        console.log('err', err);
        setLoaderImage(false);
        setStartCall(5);
      });
  }

  // For End call
  const endCallScreen = (value) => {
    let task_id = allTasks?._id;
    setStartCall(value);
    if (uniqueUser && uniqueUser?.length === 2) {
      setLoaderImage(true);
      axios
        .put(APIs3.joinmeeting + task_id)
        .then((responce) => {
          setLoaderImage(false);
        })
        .catch(() => {
          setLoaderImage(false);
        });
    }
  };

  // Count unique users
  const userListCall = (userList) => {
    let unique =
      userList &&
      userList?.length > 0 &&
      userList
        .map((item) => item?.uid)
        .filter((value, index, self) => self.indexOf(value) === index);
    setUniqueUser(unique);
  };


  // const startTimer = (data) => {
  //   console.log("data", data)
  //   setTimer(countDown(data));
  // }


  // const countDown = (data) => {

  // setInterval(() => {
  //   let [t0, t1] = data?.end.split(':');
  //   let date = new Date().setHours(t0, t1)
  //   var countDownDate = new Date(date).getTime();
  //   var now = new Date().getTime();
  //   var distance = countDownDate - now;
  //   let distance1 = distance - 1;
  //   setTime(secondsToTime(distance1)
  //     , () => {
  //       if (distance1 < 0) {
  //         setStartCall(6);
  //         clearInterval(timer);
  //       }
  //     }, 1000)
  // })
  //     this.setState({
  //       time: ,
  //       distance1: distance1,
  //     }, () => {
  //       if (distance1 < 0) {
  //         this.setState({ sectionValue: 6 });
  //         clearInterval(timer);
  //       }
  //     });
  //   }, 1000)
  // }

  const secondsToTime = (distance) => {
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let obj = {
      "h": hours,
      "m": minutes,
    };
    return obj;
  }

  return (
    <Grid
      className={
        settings &&
          settings.setting &&
          settings.setting.mode &&
          settings.setting.mode === "dark"
          ? "homeBg darkTheme homeBgDrk"
          : "homeBg"
      }
    >
      {loaderImage && <Loader />}
      <Grid className="homeBgIner">
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12}>
            <Grid container direction="row">
              {/* <LeftMenu isNotShow={true} currentPage="settings" /> */}
              {/* <LeftMenuMobile isNotShow={true} currentPage="settings" /> */}
              <Grid item xs={12} md={12} lg={12}>
                {startCall === 1 &&
                  <div className="settingPage">
                    <>
                      <div>
                        <div className="call-page-card form_full">
                          <div className="heading-status-call">
                            <div className="inprogress-call">

                              <span className="inprogress-call-text">
                                In progress
                              </span>

                            </div>
                            <div className="">
                              {/* <span className="call-review-text">
                                {" "}
                                Latest review for
                              </span> */}
                              {/* <Grid className="infoShwSave3 label_1 ">
                                <input
                                  type="button"
                                  value="Review For Doctor"
                                  onClick={() => history.push({ pathname: "/patient/Feed-back", state: true })}

                                />
                              </Grid> */}
                            </div>
                          </div>


                          {/* <div className="video-page">
                          <div className="call-popup">
                            <div className="call-pop-title">Out Of Credit</div>
                            <div className="call-pop-body">
                              You run out of credit. Please top up your account
                              and make another call.
                            </div>

                            <div className="option-call-move">
                              <div className="call-out-top-up">Top Up</div>
                              <div className="call-close-btn">Close</div>
                            </div>
                          </div>
                        </div>
                        <div className="heading-status-call">
                          <div className="">
                            <img
                              src={require("assets/virtual_images/speaker.png")}
                              alt="speaker"
                            />
                          </div>
                          <div className="heading-status-call">
                            <img
                              src={require("assets/virtual_images/video_23.png")}
                            />
                            <div className="call-end-button">End Call</div>
                            <img
                              src={require("assets/virtual_images/mute.png")}
                              alt="mute"
                            />
                          </div>
                          <div>
                            <img
                              src={require("assets/virtual_images/expand.png")}
                              alt="speaker"
                            />
                          </div>
                        </div> */}

                          <Grid item xs={12} md={12} lg={12}>
                            <Grid container direction="row">
                              <Grid item xs={12} md={10} lg={8}>
                                <Grid className="cssCall">
                                  <>
                                    <Grid>
                                      <TimerIcon className="timerIcon" />
                                      <label className="formviewhead"> {time.h}h : {time.m}m</label></Grid>
                                    <CometChatOutgoingDirectCall
                                      open
                                      userListCall={(userList) =>
                                        userListCall(userList)
                                      }
                                      endCallScreen={(value) => endCallScreen(value)}
                                      sessionID="12345"
                                      // theme={props.theme}
                                      // item={state.item}
                                      // type={state.type}
                                      // lang={state.lang}
                                      callType={CometChat.CALL_TYPE.VIDEO}
                                    // joinDirectCall={joinDirectCall}
                                    // loggedInUser={loggedInUser}
                                    // actionGenerated={actionHandler}
                                    />
                                  </>
                                  {/* } */}
                                </Grid>
                              </Grid>
                              {/* <Grid item xs={12} md={12} lg={3}>
                                <Grid className="profileImagePat">
                                  <S3Image imgUrl="allTasks?.patient?.image" />
                                </Grid>
                                <Grid className="topTxtVideoSec">
                                  <p>Ankit Jain</p>
                                  <label className="formviewhead">P43nbnj65_4</label>
                                </Grid>
                              </Grid> */}


                              <Grid item xs={12} md={4} lg={4}>
                                <Grid>
                                  <Grid className="allWebVideoSec">
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
                                                    {/* {allTasks &&
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
                                                      )} */}
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
                                                  gender={gender}
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
                                                  gender={gender}
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
                                                          {/* {allTasks &&
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
                                                            )} */}
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
                                              {/* <p>
                                                {getDate(
                                                  allTasks &&
                                                  allTasks?.diarrhea_symptoms_begin,
                                                  this.props.settings &&
                                                  this.props.settings?.setting &&
                                                  this.props.settings?.setting
                                                    ?.date_format
                                                )}
                                              </p> */}
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
                                                {/* {getDate(
                                                  allTasks &&
                                                  allTasks?.fever_symptoms_begin,
                                                  this.props.settings &&
                                                  this.props.settings?.setting &&
                                                  this.props.settings?.setting
                                                    ?.date_format
                                                )} */}
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
                                                {/* {getDate(
                                                  allTasks &&
                                                  allTasks?.back_pain_symptoms_begin,
                                                  this.props.settings &&
                                                  this.props.settings?.setting &&
                                                  this.props.settings?.setting
                                                    ?.date_format
                                                )} */}
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
                                                        {/* {allTasks &&
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
                                                          )} */}
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
                                                {/* {getDate(
                                                  allTasks &&
                                                  allTasks?.cough_symptoms_begin,
                                                  this.props.settings &&
                                                  this.props.settings?.setting &&
                                                  this.props.settings?.setting
                                                    ?.date_format
                                                )} */}
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
                                                {/* {getDate(
                                                  allTasks &&
                                                  allTasks?.depressed_symptoms_begin,
                                                  this.props.settings &&
                                                  this.props.settings?.setting &&
                                                  this.props.settings?.setting
                                                    ?.date_format
                                                )} */}
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

                          <div className="call-feedback-part">
                            <Carousel>{slideItems}</Carousel>
                          </div>

                          <div>
                            At vero eos et accusamus et iusto odio dignissimos
                            ducimus qui blanditiis praesentium voluptatum deleniti
                            atque corrupti quos dolores et quas molestias
                            excepturi sint{" "}
                            <a href="">occaecati cupiditate non provident.</a>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                }
              </Grid>
              {startCall === 2 && (
                <Grid className="msgSectionCss">
                  <label className="formviewhead">{welcome}</label>
                  <p>{activate_very_soon}</p>
                </Grid>
              )}
              {startCall === 3 && (
                <Grid className="msgSectionCss">
                  <label className="formviewhead">{Oops}</label>
                  <p>{link_has_been_expired}</p>
                </Grid>
              )}
              {startCall === 4 && (
                <Grid className="msgSectionCss">
                  <p>{meeting_has_ended}</p>
                </Grid>
              )}
              {startCall === 5 && (
                <Grid className="msgSectionCss">
                  <label className="formviewhead">{Oops}</label>
                  <p>
                    {check_your_meeting_key_or_link_again}
                  </p>
                </Grid>
              )}
              {startCall === 6 && (
                <Grid className="msgSectionCss">
                  <label className="formviewhead">{Oops}</label>
                  <p>
                    {meeting_time_out}
                  </p>
                </Grid>
              )}
              {startCall === 7 && (
                <Grid className="msgSectionCss">
                  {/* <label className="formviewhead"></label> */}
                  <p>{You_dont_have_an_access_of_this_meeting}</p>
                </Grid>
              )}

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};


export default VideoCallPat;
