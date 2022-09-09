import React, { useState } from "react"
import Grid from '@material-ui/core/Grid';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import Notification from 'Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications';
import AppBar from '@material-ui/core/AppBar';
import Select from 'react-select';
import { getLanguage } from 'translations/index';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Button, TextField, Card } from "@material-ui/core/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from 'Screens/actions';
import Input from '@material-ui/core/Input';
import { S3Image } from "Screens/Components/GetS3Images/index";
import { DebounceInput } from 'react-debounce-input';
import { Settings } from 'Screens/Login/setting';

var options = [{}]
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

  const [value, setValue] = useState(0)
  let translate = getLanguage(props.stateLanguageType);
  let {
    my_profile,
    Security
  } = translate;


  return (
    <Grid
      className={
        props.settings &&
          props.settings.setting &&
          props.settings.setting.mode &&
          props.settings.setting.mode === 'dark'
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
              <Grid item xs={12} md={11} lg={11}>
                <div className="settingPage">
                  <>
                    <div>
                      <div className='call-page-card form_full'>
                        <div className="heading-status-call">
                          <div className='inprogress-call Card_1'>
                            <span className='inprogress-call-text '>In progress</span>
                          </div>
                          <div className=''>
                            <span className='call-review-text'> Latest review for</span>
                          </div>
                        </div>

                        <div className='video-page'>
                          <div className='call-popup Card_1'>
                            <div className='call-pop-title'>Out Of Credit</div>
                            <div className='call-pop-body'>
                              You run out of credit. Please top up your account and make another call.
                            </div>

                            <div className="option-call-move">
                              <div className="call-out-top-up">Top Up
                              </div>
                              <div className="call-close-btn">Close</div>
                            </div>
                          </div>

                        </div>

                        <div className="heading-status-call">
                          <div className=''>
                            <img src={require('assets/virtual_images/speaker.png')} alt='speaker' />
                          </div>
                          <div className="heading-status-call">
                            <img src={require('assets/virtual_images/video_23.png')} />
                            <div className='call-end-button'>End Call</div>
                            <img src={require('assets/virtual_images/mute.png')} alt='mute' />
                          </div>
                          <div>
                            <img src={require('assets/virtual_images/expand.png')} alt='speaker' />

                          </div>
                        </div>




                        <div className='call-feedback-part'>
                          <div>
                            <div className='call-feadback-header'>
                              <div>
                                <img className="call-img" src={require('assets/virtual_images/patient.png')} alt='doctor' />

                              </div>
                              <div className="comment-callpat">
                                <h5> Latest review for: </h5>
                                <p>Stacy Lee, MD</p>
                              </div>
                            </div>
                            <div className="call-comment-patient">
                              “Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.”
                            </div>
                          </div>
                          <div>
                            <div className='call-feadback-header'>
                              <div>
                                <img className="call-img" src={require('assets/virtual_images/patient.png')} alt='doctor' />

                              </div>
                              <div className="comment-callpat">
                                <h5> Latest review for: </h5>
                                <p>Stacy Lee, MD</p>
                              </div>
                            </div>
                            <div className="call-comment-patient">
                              “Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.”
                            </div>
                          </div>
                        </div>

                        {/* <div>

                          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint <a href=''>
                            occaecati cupiditate non provident.
                          </a>
                        </div> */}



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
  )
};
const mapStateToProps = (state) => {
  const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
    state.LoginReducerAim;
  const { stateLanguageType } = state.LanguageReducer;
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    settings,
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  };
};
export default
  withRouter(
    connect(mapStateToProps, {
      LoginReducerAim,
      Settings,
      LanguageFetchReducer,
    })(VideoCallPat)
  );
