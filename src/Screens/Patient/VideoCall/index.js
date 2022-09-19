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
import { APIs, APIs1, APIs2 } from "Screens/APIcall/index";
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
  const [value, setValue] = useState(0);
  const stateLoginValueAim = useAllLoginReducerAim();
  const [startCall, setStartCall] = useState(false);
  const [loaderImage, setLoaderImage] = useState(false);
  const settings = useAllSetting();

  let translate = getLanguage(props.stateLanguageType);
  let { my_profile, Security } = translate;

  useEffect(() => {
    callCometChat();
    axios
      .get(
        APIs.getfeedbackfordoctor + "/62a41f1ec627873603accc6c",
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
  }, []);


  const callCometChat = () => {
    var profile_id = stateLoginValueAim?.user?.profile_id;
    let callType = 'DIRECT';
    setLoaderImage(true);
    CometChat.login(profile_id, COMETCHAT_CONSTANTS.AUTH_KEY)
      .then((resp) => {
        axios
          .post(APIs1.cometUserList, {
            profile_id: profile_id,
          })
          .then((response) => {
            if (response && response.data && response.data.hassuccessed) {
              var sesion_id = "1112";
              axios
                .get(APIs2.linktime + "/" + sesion_id)
                .then((response) => {
                  setLoaderImage(false);
                  setStartCall(true);
                  // if (response && response.data && response.data.hassuccessed) {
                  //   if (response.data.message === 'link active') {
                  //     this.setState({
                  //       sectionValue: 1,
                  //       allTasks: response.data.data.Task,
                  //       gender: response.data.data.gender,
                  //       loaderImage: false,
                  //     });
                  //     this.startTimer(response.data.data.Task)
                  //   }
                  // } else {
                  //   if (
                  //     response.data.message === 'Link will active soon' ||
                  //     response.data.message === 'link start soon'
                  //   ) {
                  //     this.setState({ sectionValue: 2, loaderImage: false });
                  //   } else if (response.data.message === 'Link Expire') {
                  //     this.setState({ sectionValue: 3, loaderImage: false });
                  //   } else {
                  //     this.setState({ sectionValue: 5, loaderImage: false });
                  //   }
                  // }
                })
                .catch((err) => {
                  console.log('err', err);
                  // this.setState({ sectionValue: 5, loaderImage: false });
                });
            }
          })
          .catch((err) => {
          });
      })
      .catch((err) => { });
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
                {startCall &&
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
                              <Grid item xs={12} md={10} lg={9}>
                                <Grid className="cssCall">
                                  {/* {startCall && */}
                                  <>
                                    <Grid>
                                      <TimerIcon className="timerIcon" />
                                      <label className="formviewhead"> h : m</label>
                                    </Grid>
                                    <CometChatOutgoingDirectCall
                                      open
                                      // userListCall={(userList) =>
                                      //   this.userListCall(userList)
                                      // }
                                      // endCallScreen={(value) => this.endCallScreen(value)}
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
                              <Grid item xs={12} md={12} lg={3}>
                                <Grid className="profileImagePat">
                                  {/* <S3Image imgUrl="allTasks?.patient?.image" /> */}
                                </Grid>
                                <Grid className="topTxtVideoSec">
                                  <p>Ankit Jain</p>
                                  <label className="formviewhead">P43nbnj65_4</label>
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

                {/* <div className='logout' >Logout</div> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};


export default VideoCallPat;
