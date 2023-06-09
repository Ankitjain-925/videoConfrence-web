import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { withRouter } from "react-router-dom";
import { LanguageFetchReducer } from "Screens/actions";
import { slide as Menu } from "react-burger-menu";
import Timer from "Screens/Components/TimeLogOut/index";
import LogOut from "Screens/Components/LogOut/index";
import Mode from "Screens/Components/ThemeMode/index.js";
import SetLanguage from "Screens/Components/SetLanguage/index.js";
import { getLanguage } from "translations/index";
import { getSetting } from "../api";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagnosisdata: [],
      mediacationdata: [],
      allergydata: [],
      family_doc: [],
      donar: {},
      contact_partner: {},
      loaderImage: false,
      mode: "normal",
    };
    new Timer(this.logOutClick.bind(this));
  }

  //For loggedout if logged in user is deleted
  componentDidMount() {
    new LogOut(
      this.props.stateLoginValueAim?.token,
      this.props.stateLoginValueAim?.user?._id,
      this.logOutClick.bind(this)
    );
    getSetting(this);
  }

  //For close the model
  openLanguageModel = () => {
    this.setState({ openFancyLanguage: true });
  };

  //For open Model
  handleCloseFancyLanguage = () => {
    this.setState({ openFancyLanguage: false });
  };
  //For logout the User
  logOutClick = () => {
    let email = "";
    let password = "";
    this.props.LoginReducerAim(email, password);
    let languageType = "en";
    this.props.LanguageFetchReducer(languageType);
    this.props.history.push("/");
  };

  //For My Profile link
  ProfileLink = () => {
    this.props.history.push("/patient");
  };

  PictureEval = () => {
    this.props.history.push("/patient/new-request");
  };

  //   //For Archive link
  gotoAppointmentList = () => {
    this.props.history.push("/appointment-list");
  };
  topupPage = () => {
    this.props.history.push('/patient/top-up');
  };

  //For Second opinion link
  dashboard = () => {
    this.props.history.push("/patient/settings");
  };
  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      my_profile,
      profile_setting,
      Language,
      DarkMode,
      logout,
      manage_prepaid_talktime,
      dashboard,
      appointments,
      settings,
      top_up,
      health_profile,
      list_requests,
      assesments,
    } = translate;
    return (
      <Grid
        className={
          this.props.settings &&
          this.props.settings.setting &&
          this.props.settings.setting.mode &&
          this.props.settings.setting.mode === "dark"
            ? "MenuMob MenuLeftDrkUpr"
            : "MenuMob"
        }
      >
        {/* <Notification /> */}
        <Grid container direction="row" alignItems="center">
          <Grid item xs={6} md={6} sm={6} className="MenuMobLeft">
            <a>
              <img
                src={require("assets/images/navigation-drawer.svg")}
                alt=""
                title=""
                className="MenuImg"
              />
            </a>
            <Menu className="addCstmMenu">
              <Grid className="menuItems">
              <ul>
            {this.props.stateLoginValueAim?.isVideoLoggedIn && 
            <>
             <li
              className={
                this.props.currentPage === "settings" ? "menuActv" : ""
              }
            >
              <a onClick={this.dashboard}>
                {this.props.settings &&
                  this.props.settings.setting &&
                  this.props.settings.setting.mode &&
                  this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/virtual_images/settings-whits.png")}
                    alt=""
                    title=""
                  />
                ) : (
                  <img
                    src={require("assets/virtual_images/setting.png")}
                    alt=""
                    title=""
                  />
                )}
                <span>{health_profile}</span>
              </a>
            </li>
            <li
              className={
                this.props.currentPage === "topup" ? "menuActv" : ""
              }
            >


              <a onClick={this.topupPage}>

                {this.props.settings &&
                  this.props.settings.setting &&
                  this.props.settings.setting.mode &&
                  this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/images/archive2.png")}
                    alt=""
                    title=""
                  />
                ) : (
                  <img
                    src={require("assets/images/archive.png")}
                    alt=""
                    title=""
                  />
                )}
                <span>{top_up}</span>
              </a>
            </li>
            <li
              className={
                this.props.currentPage === "appointments" ? "menuActv" : ""
              }
            >
              <a onClick={this.PictureEval}>
                {this.props.settings &&
                  this.props.settings.setting &&
                  this.props.settings.setting.mode &&
                  this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/images/nav-journal-white.svg")}
                    alt=""
                    title=""
                  />
                ) : (
                  <img
                    src={require("assets/images/nav-journal.svg")}
                    alt=""
                    title=""
                  />
                )}
                <span>{assesments}</span>
              </a>
            </li>
            <li
              className={
                this.props.currentPage === "list" ? "menuActv" : ""
              }
            >


              <a onClick={this.gotoAppointmentList}>

                {this.props.settings &&
                  this.props.settings.setting &&
                  this.props.settings.setting.mode &&
                  this.props.settings.setting.mode === "dark" ? (
                  <img
                    src={require("assets/images/archive2.png")}
                    alt=""
                    title=""
                  />
                ) : (
                  <img
                    src={require("assets/images/archive.png")}
                    alt=""
                    title=""
                  />
                )}
                <span>{list_requests}</span>
              </a>
            </li>
            </>
           }

            <li
              className={this.props.currentPage === "profile" ? "menuActv" : ""}
            >
              <a className="profilMenu">
                <img
                  src={require("assets/images/nav-my-profile.svg")}
                  alt=""
                  title=""
                />

                <span>{my_profile}</span>
                <div className="profilMenuList">
                  <ul>
                    <li>
                      <a onClick={this.ProfileLink}>
                        {this.props.settings &&
                          this.props.settings.setting &&
                          this.props.settings.setting.mode &&
                          this.props.settings.setting.mode === "dark" ? (

                          <img
                            src={require("assets/images/menudocs-white.jpg")}
                            alt=""
                            title=""
                          />
                        ) : (
                          <img
                            src={require("assets/images/menudocs.jpg")}
                            alt=""
                            title=""
                          />
                        )}
                        {profile_setting}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          this.openLanguageModel();
                        }}
                      >
                        {this.props.settings &&
                          this.props.settings.setting &&
                          this.props.settings.setting.mode &&
                          this.props.settings.setting.mode === "dark" ? (
                          <img
                            src={require("assets/images/menudocs-white.jpg")}
                            alt=""
                            title=""
                          />
                        ) : (
                          <img
                            src={require("assets/images/menudocs.jpg")}
                            alt=""
                            title=""
                          />
                        )}
                        {Language}
                      </a>
                    </li>
                    <li>
                      <a>
                        {this.props.settings &&
                          this.props.settings.setting &&
                          this.props.settings.setting.mode &&
                          this.props.settings.setting.mode === "dark" ? (
                          <img
                            src={require("assets/images/menudocs-white.jpg")}
                            alt=""
                            title=""
                          />
                        ) : (
                          <img
                            src={require("assets/images/menudocs.jpg")}
                            alt=""
                            title=""
                          />
                        )}
                        {DarkMode}{" "}
                        <Mode
                          mode={
                            this.props.settings?.setting?.mode
                              ? this.props.settings?.setting?.mode
                              : "normal"
                          }
                          name="mode"
                          getSetting={() => getSetting(this)}
                        />
                      </a>
                    </li>
                    <li onClick={this.logOutClick}>
                      <a>
                        {this.props.settings &&
                          this.props.settings.setting &&
                          this.props.settings.setting.mode &&
                          this.props.settings.setting.mode === "dark" ? (
                          <img
                            src={require("assets/images/menudocs-white.jpg")}
                            alt=""
                            title=""
                          />
                        ) : (
                          <img
                            src={require("assets/images/menudocs.jpg")}
                            alt=""
                            title=""
                          />

                        )}
                        {logout}
                      </a>
                    </li>
                  </ul>
                </div>
              </a>
            </li>
          </ul>
              </Grid>
            </Menu>
          </Grid>
          <Grid item xs={6} md={6} sm={6} className="MenuMobRght">
            <a>
              <img
                src={require("assets//images/LogoPNG.png")}
                alt=""
                title=""
              />
            </a>
          </Grid>
        </Grid>
        {/* For set the language  */}
        <SetLanguage
          getSetting={() => getSetting(this)}
          openFancyLanguage={this.state.openFancyLanguage}
          languageValue={this.state.languageValue}
          handleCloseFancyLanguage={this.handleCloseFancyLanguage}
          openLanguageModel={this.openLanguageModel}
        />
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
  connect(mapStateToProps, { LoginReducerAim, LanguageFetchReducer, Settings })(
    Index
  )
);