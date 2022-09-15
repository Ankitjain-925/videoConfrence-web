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
import APIs from "Screens/APIcall/index";
import axios from "axios";
import { pure } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import { OptionList } from "Screens/Login/metadataaction";
import { authy } from "Screens/Login/authy.js";

// var data = [
//   {
//     name: "Stacy Lee, MD",
//     img: "patient.png",
//     description: "Probably the most random thing you have ever seen!",
//   },
//   {
//     name: "Michel K, MD",
//     img: "person1.jpg",
//     description: "Hello World!",
//   },
//   {
//     name: "Stacy Lee, MD",
//     img: "patient.png",
//     description: "Probably the most random thing you have ever seen!",
//   },
//   {
//     name: "Michel K, MD",
//     img: "person1.jpg",
//     description: "Hello World!",
//   },
// ];
var options = [{}];
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
  let translate = getLanguage(props.stateLanguageType);
  let { my_profile, Security } = translate;

  useEffect(() => {
    axios
      .get(
        APIs.getfeedbackfordoctor + "/62a41f1ec627873603accc6c",
        commonHeader(props.stateLoginValueAim.token)
      )
      .then((response) => {
        let { data, hassuccessed } = response.data;
        if (hassuccessed) {
          const sliderItems = data.length > 2 ? 2 : data.length;
          const items =[];
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
      <Grid className="homeBgIner">
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12}>
            <Grid container direction="row">
              <LeftMenu isNotShow={true} currentPage="settings" />
              <LeftMenuMobile isNotShow={true} currentPage="settings" />
              <Grid item xs={12} md={11} lg={11}>
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
                            <span className="call-review-text">
                              {" "}
                              Latest review for
                            </span>
                          </div>
                        </div>

                        <div className="video-page">
                          <div className="call-popup Card_1">
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
                        </div>

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

                {/* <div className='logout' >Logout</div> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  const { verifyCode } = state.authy;
  const { metadata } = state.OptionList;
  // const { Doctorsetget } = state.Doctorset;
  // const { catfil } = state.filterate;
  return {
    stateLanguageType,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
    settings,
    verifyCode,
    metadata,
    //   Doctorsetget,
    //   catfil
  };
};
export default pure(
  withRouter(
    connect(mapStateToProps, {
      LoginReducerAim,
      OptionList,
      LanguageFetchReducer,
      Settings,
      authy,
    })(VideoCallPat)
  )
);
