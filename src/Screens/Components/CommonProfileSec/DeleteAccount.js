import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from "Screens/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import sitedata from "sitedata";
import axios from "axios";
import Loader from "Screens/Components/Loader/index";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { getLanguage } from "translations/index";
import { commonHeader, commonCometDelHeader } from 'component/CommonHeader/index';
import Refund from '../../Patient/Refund/index'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Current_state: this.props.LoggedInUser,
      Password: {},
      notmatch: false,
      loaderImage: false,
      // enterpass: false/
      successMsg: false,
      openModal: false
    };
  }

  DeleteUser = () => {
    const { stateLoginValueAim } = this.props;
    var id = this.props.stateLoginValueAim?.VideoData?._id;
    this.setState({ loaderImage: true, successMsg: false });
    const user_token = stateLoginValueAim?.token;
    axios
      .put(sitedata.data.path + '/vchat/UpdateVideoAccount/' + id,
        {
          status: false
        },
        commonHeader(user_token))
      .then((response) => {
        this.setState({ loaderImage: false, successMsg: true });
        setTimeout(() => { this.setState({ successMsg: false }); }, 5000)
      }).catch((error) => {
        this.setState({ loaderImage: false });
      });
  }

  //FOR DELETING THE USER
  // DeleteUser = (deletekey, profile_id, bucket) => {
  //   this.setState({ loaderImage: true });
  //   const user_token = this.props.stateLoginValueAim.token;
  //   axios.delete(sitedata.data.path + '/admin/deleteUser/' + deletekey + '?bucket=' + bucket, commonHeader(user_token))
  //     .then((response) => {
  //       this.setState({ loaderImage: false });
  //       var data = JSON.stringify({ "permanent": true });
  //       var config = {
  //         method: 'delete',
  //         url: 'https://api-eu.cometchat.io/v2.0/users/' + profile_id.toLowerCase(),
  //         headers: commonCometDelHeader(),
  //         data: data
  //       };
  //       axios(config)
  //         .then(function (response) { })
  //         .catch(function (error) { });
  //       this.props.history.push('/');

  //     }).catch((error) => { });
  // }

  // Dialog for deleting accoount 
  DeleteAccount = () => {
    const { stateLoginValueAim } = this.props;
    var talkTime = stateLoginValueAim &&
      stateLoginValueAim.VideoData &&
      stateLoginValueAim.VideoData.prepaid_talktime_min;
    // if (!this.state.notmatch) {
    let translate = getLanguage(this.props.stateLanguageType)
    let { cancel, ok, reallyWantDelete, looseAllData } = translate;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className={
              this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode === "dark"
                ? "dark-confirm react-confirm-alert-body"
                : "react-confirm-alert-body"
            }
          >
            <h1 className="deletewarninghead">{reallyWantDelete}</h1>
            <p className="deletewarning">{(talkTime === 0 || talkTime === null) ? "You will deactivate this video conference account, You will again activate this account when you try to log in again."
              : "You will deactivate this video conference account, You will again activate this account when you try to log in again. Regarding your prepaid balance refund policy, Aimedis super admin will contact you shortly."}</p>
            <div className="react-confirm-alert-button-group">
              <button
                onClick={() => {
                  this.DeleteUser();
                  onClose();
                }}
              >
                {ok}
              </button>
              <button
                onClick={() => {
                  onClose();
                }}
              >
                {cancel}
              </button>
            </div>
          </div>
        );
      },
    });
    // }
  }

  //For Change Password State For version V4
  // ChangePass = (e) => {
  //   const state = this.state.Password;
  //   state[e.target.name] = e.target.value;
  //   if (
  //     e.target.value &&
  //     e.target.value.length > 0 &&
  //     e.target.name === "current_pass"
  //   ) {
  //     axios
  //       .post(
  //         sitedata.data.path + "/UserProfile/Users/checkPass",
  //         {
  //           password: this.state.Password.current_pass,
  //         },
  //         commonHeader(this.props.user_token)
  //       )
  //       .then((responce) => {
  //         if (responce.data.data) {
  //           this.setState({ notmatch: false, fillall: false });
  //         } else {
  //           this.setState({ notmatch: true, fillall: false });
  //         }
  //       });
  //   }
  //   this.setState({ Password: state });
  // };

  openFullQues = () => {
    this.setState({ openModal: true });
  }

  closeFullQues = () => {
    this.setState({ openModal: false });
  }

  render() {
    const { stateLoginValueAim } = this.props;
    var talkTime = stateLoginValueAim &&
      stateLoginValueAim.VideoData &&
      stateLoginValueAim.VideoData.prepaid_talktime_min;
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      password,
      Current,
      Submit,
      delete_your_account,
      delete_account,
      current_pass_not_match,
      deactivate_your_account,
      deactivate_account
    } = translate;



    return (
      <div>
        {this.state.loaderImage && <Loader />}
        {this.state.notmatch && (
          <div className="err_message">{current_pass_not_match}</div>
        )}
        {this.state.successMsg && (
          <div className="succ_message">Your Account is successfully Deactivated</div>
        )}
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={12} md={8}>

            <Grid className="chngPasswrd">
              <h2>{deactivate_your_account}</h2>
              {/* <p>{supportive_text}</p> */}
            </Grid>
            <Grid className="infoSub">
              <input
                type="submit"
                className=""
                onClick={() =>
                  (talkTime == 0 || talkTime == null)
                    ? this.DeleteAccount()
                    : this.props.history.push("/refund")
                }
                value={deactivate_account}
              />
            </Grid>
            {/* <Refund
            closeFullQues={() => this.closeFullQues()}
            openModal={this.state.openModal}
            /> */}
            {/* {this.state.enterpass &&
              <Grid className="genPass current_pass_sec">
                <Grid className="genPassInr">
                  <label>
                    {Current} {password}
                  </label>

                  <input
                    type="password"
                    name="current_pass"
                    onChange={(e) => this.ChangePass(e)}
                  />
                  <input
                    type="submit"
                    onClick={this.DeleteAccount}
                    value={Submit}
                  />
                </Grid>
              </Grid>} */}
          </Grid>
          <Grid item xs={12} md={7}></Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    stateLoginValueAim,
    loadingaIndicatoranswerdetail,
  } = state.LoginReducerAim;
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
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(
    Index
  )
);