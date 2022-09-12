import React, { Component } from 'react';
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
import { Settings } from "Screens/Login/setting";
import { S3Image } from "Screens/Components/GetS3Images/index";

var options = [{}]
function TabContainer(props) {
  return (
    <Typography component="div" className="tabsCntnts">
      {this.props.children}
    </Typography>
  );
}
TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
class SelectDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: [],
      currentList2: [],
      searchValue: "",
      showPopup: false,
      showRename: false,
      txtName: {},
      showinput: false,

      isActive: false,


    };
  }


back = e => {
  e.preventDefault();
  this.props.prevStep();

}

continue = e => {
  e.preventDefault();
  this.props.nextStep();
}

render() {
  const { dataa } = this.props;
  let translate = getLanguage(this.props.stateLanguageType);
  let {
    my_profile,
    Security
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
      <Grid className="homeBgIner">
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12}>
            <Grid container direction="row">
              <Grid item xs={12} md={11} lg={11}>
                <Grid className="settingPage">
                  {/* <h5 className="setting-h5">Settings</h5> */}
                  <Grid className='last-sec-setting form_full'>



                    {/* Card Menu */}
                    <Grid className="cardDisplay-select">
                      <Grid className='card-section'>
                        <Grid className="card-header">
                          <S3Image imgUrl={dataa.language.image} />

                          <Grid>
                            <h5 className="selectdoc-head"> {dataa.language.first_name}{' '}{dataa.language.last_name}{','}{dataa.language.speciality} </h5>
                            {/* <p className='selectdoc-content'>Thu, Feb 3-8:30 am EST</p> */}
                            <Grid className='selectdoc-button'>
                              <span>on-line</span>

                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid className='card-content'>
                          <Select
                            value={''}
                            onChange={(e) => { }}
                            options={options}
                            placeholder={"I would like to"}
                            name="appointment"
                            isSearchable={true}
                            className="mr_sel"
                          />



                          <p className='card-label'>Your Aimedis credit : <b>Omin</b> </p>
                          {dataa.lang ? <Grid>
                            <a>+ Top up your account </a>
                          </Grid> : (
                            ''
                          )}


                          <Grid>
                            <Grid className='call-feedback-part'>
                              <Grid>
                                <Grid className='call-feadback-header'>
                                  <Grid>
                                    <img className="call-img" src={require('assets/virtual_images/patient.png')} alt='doctor' />

                                  </Grid>
                                  <Grid className="comment-callpat">
                                    <h5> Latest review for: </h5>
                                    <p>Stacy Lee, MD</p>
                                  </Grid>
                                </Grid>
                                <Grid className="call-comment-patient">
                                  “Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.”
                                </Grid>
                              </Grid>
                              <Grid>
                                <Grid className='call-feadback-header'>
                                  <Grid>
                                    <img className="call-img" src={require('assets/virtual_images/patient.png')} alt='doctor' />

                                  </Grid>
                                  <Grid className="comment-callpat">
                                    <h5> Latest review for: </h5>
                                    <p>Stacy Lee, MD</p>
                                  </Grid>
                                </Grid>
                                <Grid className="call-comment-patient">
                                  “Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.”
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid className="infoShwSave3 ">
                              <input
                                type="button"
                                value="« Back"
                                onClick={this.back}

                              />
                              <input
                                type="button"
                                value="Next »"
                                onClick={this.continue}

                              />
                            </Grid>

                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* <Grid className='logout' >Logout</Grid> */}
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
  const { settings } = state.Settings;
  return {
    stateLanguageType,
    stateLoginValueAim,
    settings,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    LoginReducerAim,
    LanguageFetchReducer,
    Settings
  })(SelectDoctor)
);