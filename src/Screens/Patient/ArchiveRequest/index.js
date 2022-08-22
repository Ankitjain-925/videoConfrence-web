import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { authy } from "Screens/Login/authy.js";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { OptionList } from "Screens/Login/metadataaction";
import Loader from "Screens/Components/Loader/index";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { getLanguage } from "translations/index";
import { handleOpenDetail, DownloadBill } from "../SickLeaveForm/api";
import sitedata from "sitedata";
import axios from "axios";
import { commonHeader } from "component/CommonHeader/index";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import { getDate, getTime } from "Screens/Components/BasicMethod/index";
import Modal from "@material-ui/core/Modal";
import { GetShowLabel1 } from "Screens/Components/GetMetaData/index.js";
import PainPoint from "Screens/Components/PointPain/index";
import moment from "moment";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllDataPart: [],
      tabvalue2: this.props.tabvalue2 || 0,
      filterAllData: [],
      openAllDetail: false,
      newTask: {},
    };
  }

  handleCloseAllDetail = () => {
    this.setState({ openAllDetail: false });
  };

  handleOpenAllDetail = (item) => {
    this.setState({ openAllDetail: true, newTask: item });
  };

  handleChangeTab2 = (e, tabvalue2) => {
    const { filterAllData } = this.state;

    this.setState({ tabvalue2 });
    switch (tabvalue2) {
      case 0:
        this.setState({ AllDataPart: filterAllData });
        break;
      case 1:
        let notattend = filterAllData.filter((item) => {
          return item.is_payment == true;
        });
        this.setState({ AllDataPart: notattend });
        break;
      case 2:
        let pending = filterAllData.filter((item) => {
          return !item.is_payment;
        });
        this.setState({ AllDataPart: pending });
        break;
      default:
        this.setState({ AllDataPart: filterAllData });
        break;
    }
  };

  componentDidMount() {
    this.allgetDataPart(this.props.stateLoginValueAim.user._id);
  }

  allgetDataPart = (patient_id) => {
    let translate = getLanguage(this.props.stateLanguageType);
    let { Something_went_wrong } = translate;
    axios
      .get(
        sitedata.data.path + "/vactive/Task/" + patient_id,
        commonHeader(this.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        this.setState({ loaderImage: false });
        if (responce.data.hassuccessed) {
          let data = responce.data;
          this.setState({ AllDataPart: data.data });
          this.setState({ filterAllData: data.data });
        } else {
          this.setState({
            errorMsg: Something_went_wrong,
          });
        }
      });
  };
  
  render() {
    const { AllDataPart, tabvalue2 } = this.state;
    let translate = getLanguage(this.props.stateLanguageType);
    let {
      added_on,
      Headache,
      stomach_problems,
      Diarrhea,
      Fever,
      back_pain,
      cough_and_snees,
      feel_depressed,
      cardiac_problems,
      no,
      yes,
      archive_request,
      Download_Bill,
      see_details,
      Alls,
      not_attented,
      Pending_payment,
      appointment_date,
      your_request_is_accepted_by_the_doctor,
      Details,
      appointment_time,
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
      headache_body_temp,
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
      headache_undergoing_treatment,
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
    } = translate;
    return (
      <Grid>
        <Grid
          className={
            this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode &&
            this.props.settings.setting.mode === "dark"
              ? "homeBg homeBgDrk"
              : "homeBg"
          }
        >
          {this.state.loaderImage && <Loader />}
          <Grid className="homeBgIner">
            <Grid container direction="row" justify="center">
              <Grid item xs={12} md={12}>
                <Grid container direction="row">
                  <LeftMenu isNotShow={true} currentPage="archivelink" />
                  <LeftMenuMobile isNotShow={true} currentPage="archivelink" />
                  <Grid item xs={12} md={11} lg={11} className="setleftpadding-archive">
                    <Grid className="docsOpinion docsAllOption">
                      <Grid container direction="row" className="docsOpinLbl">
                        <Grid item xs={12} md={6}>
                          <label>{archive_request}</label>
                        </Grid>
                      </Grid>

                      <Grid
                        className={
                          this.props.settings &&
                          this.props.settings.setting &&
                          this.props.settings.setting.mode &&
                          this.props.settings.setting.mode === "dark"
                            ? "darkTheme"
                            : ""
                        }
                      >
                        <Grid className="taskCntntMng">
                          <Grid container direction="row" alignItems="center">
                            <Grid item xs={12} sm={6} md={7}>
                              <AppBar position="static" className="billTabs">
                                <Tabs
                                  value={tabvalue2}
                                  onChange={this.handleChangeTab2}
                                >
                                  <Tab label={Alls} className="billtabIner" />
                                  <Tab
                                    label={not_attented}
                                    className="billtabIner"
                                  />
                                  <Tab
                                    label={Pending_payment}
                                    className="billtabIner"
                                  />
                                </Tabs>
                              </AppBar>
                            </Grid>
                            <Grid item xs={12} sm={6} md={5}>
                              {/* <Grid className="taskSort">
                              {this.state.showinput && (
                                <input
                                  className="TaskSearch"
                                  type="text"
                                  name="search"
                                  placeholder="Search"
                                  value={this.state.text}
                                  onChange={this.FilterText}
                                />
                              )}
                              <a>
                                {!this.state.showinput ? (
                                  <img
                                    src={require("assets/virtual_images/search-entries.svg")}
                                    alt=""
                                    title=""
                                    onClick={() => {
                                      this.setState({
                                        showinput: !this.state.showinput,
                                      });
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={require("assets/images/close-search.svg")}
                                    alt=""
                                    title=""
                                    onClick={() => {
                                      this.setState({
                                        showinput: !this.state.showinput,
                                        text: "",
                                      });
                                      this.clearFilter();
                                    }}
                                  />
                                )}
                              </a>
                            </Grid> */}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid className="presPkgIner2 archive-sick">
                        <Grid className="presOpinionIner presOpinionInerSec">
                          <Table>
                            <Thead>
                              <Tr>
                                <Th>{added_on}</Th>
                                <Th>{Headache}</Th>
                                <Th>{stomach_problems}</Th>
                                <Th>{Diarrhea}</Th>
                                <Th>{Fever}</Th>
                                <Th>{back_pain}</Th>
                                <Th>{cough_and_snees}</Th>
                                <Th>{feel_depressed}</Th>
                                <Th>{cardiac_problems}</Th>
                                <Th>Status</Th>
                                <Th></Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {AllDataPart &&
                                AllDataPart?.length > 0 &&
                                AllDataPart.map((item, index) => (
                                  <Tr
                                    className={
                                      item && item?.is_decline
                                        ? "declineListCol"
                                        : ""
                                    }
                                  >
                                    <Td>
                                      <p>
                                        {item && !item?.due_on?.date ? (
                                          "-"
                                        ) : (
                                          <>
                                            {getDate(
                                              item?.due_on?.date,
                                              this.props.settings &&
                                                this.props.settings?.setting &&
                                                this.props.settings?.setting
                                                  ?.date_format
                                            )}
                                          </>
                                        )}
                                      </p>
                                      <p>
                                        {item?.due_on?.time &&
                                          getTime(
                                            new Date(item?.due_on?.time),
                                            this.props.settings &&
                                              this.props.settings?.setting &&
                                              this.props.settings?.setting
                                                ?.time_format
                                          )}
                                      </p>
                                    </Td>
                                    <Td>
                                      {item &&
                                      item.headache &&
                                      item.headache === "yes" ? (
                                        <>{yes}</>
                                      ) : (
                                        <>{no}</>
                                      )}
                                    </Td>
                                    <Td>
                                      {item &&
                                      item.stomach_problems &&
                                      item.stomach_problems === "yes" ? (
                                        <>{yes}</>
                                      ) : (
                                        <>{no}</>
                                      )}
                                    </Td>
                                    <Td>
                                      {item &&
                                      item.diarrhea &&
                                      item.diarrhea === "yes" ? (
                                        <>{yes}</>
                                      ) : (
                                        <>{no}</>
                                      )}
                                    </Td>
                                    <Td>
                                      {item &&
                                      item.have_fever &&
                                      item.have_fever === "yes" ? (
                                        <>{yes}</>
                                      ) : (
                                        <>{no}</>
                                      )}
                                    </Td>
                                    <Td>
                                      {item &&
                                      item.back_pain &&
                                      item.back_pain === "yes" ? (
                                        <>{yes}</>
                                      ) : (
                                        <>{no}</>
                                      )}
                                    </Td>
                                    <Td>
                                      {item &&
                                      item.cough_and_snees &&
                                      item.cough_and_snees === "yes" ? (
                                        <>{yes}</>
                                      ) : (
                                        <>{no}</>
                                      )}
                                    </Td>
                                    <Td>
                                      {item &&
                                      item.feel_depressed &&
                                      item.feel_depressed === "yes" ? (
                                        <>{yes}</>
                                      ) : (
                                        <>{no}</>
                                      )}
                                    </Td>
                                    <Td>
                                      {item &&
                                      item.cardiac_problems &&
                                      item.cardiac_problems === "yes" ? (
                                        <>{yes}</>
                                      ) : (
                                        <>{no}</>
                                      )}
                                    </Td>
                                    <Td>
                                    {item &&
                                      item.is_payment && item.is_payment==true
                                     ? 'Not attended' : 'Payment pending'}
                                    </Td>
                                    <Td className="presEditDot scndOptionIner">
                                      <a className="openScndhrf">
                                        <img
                                          src={require("assets/images/three_dots_t.png")}
                                          alt=""
                                          title=""
                                          className="openScnd"
                                        />
                                        <ul>
                                          <li>
                                            <a
                                              onClick={() => {
                                                this.handleOpenAllDetail(
                                                  item,
                                                  this
                                                );
                                              }}
                                            >
                                              <img
                                                src={require("assets/images/details.svg")}
                                                alt=""
                                                title=""
                                              />
                                              {see_details}
                                            </a>
                                          </li>

                                          {item.is_payment &&
                                            item.is_payment === true && (
                                              <li>
                                                <a
                                                  onClick={() => {
                                                  DownloadBill(
                                                    this,
                                                      item
                                                    );
                                                  }}
                                                >
                                                  <img
                                                    src={require("assets/images/download.svg")}
                                                    alt=""
                                                    title=""
                                                  />
                                                  {Download_Bill}
                                                </a>
                                              </li>
                                            )}
                                        </ul>
                                      </a>
                                    </Td>
                                  </Tr>
                                ))}
                            </Tbody>
                          </Table>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* Model setup */}
              <Modal
                open={this.state.openAllDetail}
                onClose={this.handleCloseAllDetail}
                className={
                  this.props.settings &&
                  this.props.settings.setting &&
                  this.props.settings.setting.mode &&
                  this.props.settings.setting.mode === "dark"
                    ? "darkTheme"
                    : ""
                }
              >
                <Grid className="creatTaskModel">
                  <Grid className="creatTaskCntnt">
                    <Grid>
                      <Grid container direction="row">
                        <Grid item xs={12} md={12}>
                          <Grid className="creatLbl">
                            <Grid className="creatLblClose createLSet">
                              <a onClick={this.handleCloseAllDetail}>
                                <img
                                  src={require("assets/images/close-search.svg")}
                                  alt=""
                                  title=""
                                />
                              </a>
                            </Grid>
                            <label>{Details}</label>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        className="setDetail-eval"
                      >
                        {this.state.newTask?.approved == true &&
                          (!this.state.newTask.is_payment ||
                            this.state.newTask.is_payment == false) && (
                            <p className="pending-msgPopup">
                              {your_request_is_accepted_by_the_doctor}
                            </p>
                          )}
                        <Grid item xs={12} md={12} className="taskDescp">
                          <Grid className="stndQues stndQues1">
                            <Grid>
                              <h3>{appointment_date}</h3>
                              {moment(this.state.newTask?.date).format(
                                "MMM DD, YYYY"
                              )}
                            </Grid>
                            <Grid>
                              <h3>{appointment_time}</h3>
                              {this.state.newTask?.start} -{" "}
                              {this.state.newTask?.end}
                            </Grid>
                            {this.state.newTask.headache === "yes" && (
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{Headache}</h3>
                                </Grid>
                                <Grid>
                                  <h1>{Pain_begin}</h1>
                                </Grid>
                                <Grid container xs={12} md={12}>
                                  <Grid item xs={3} md={3}>
                                    <label>{headache_painbegin_back}</label>
                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.headache_painbegin_back === true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid item xs={3} md={3}>
                                    <label>{headache_painbegin_front}</label>
                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.headache_painbegin_front === true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid item xs={3} md={3}>
                                    <label>{headache_painbegin_left}</label>
                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.headache_painbegin_left === true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid item xs={3} md={3}>
                                    <label>{headache_painbegin_right}</label>
                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.headache_painbegin_right === true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid item xs={3} md={3}>
                                    <label>{headache_painbegin_top}</label>
                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.headache_painbegin_top === true ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                </Grid>

                                <Grid>
                                  <Grid>
                                    <h1>{hurtnow}</h1>
                                  </Grid>
                                  <Grid container xs={12} md={12}>
                                    <Grid item xs={3} md={3}>
                                      <label>{headache_hurtnow_back}</label>
                                      {this.state.newTask &&
                                      this.state.newTask
                                        ?.headache_hurtnow_back === true ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid item xs={3} md={3}>
                                      <label>{headache_hurtnow_front}</label>
                                      {this.state.newTask &&
                                      this.state.newTask
                                        ?.headache_hurtnow_front === true ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid item xs={3} md={3}>
                                      <label>{headache_hurtnow_left}</label>
                                      {this.state.newTask &&
                                      this.state.newTask
                                        ?.headache_hurtnow_left === true ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid item xs={3} md={3}>
                                      <label>{headache_hurtnow_right}</label>
                                      {this.state.newTask &&
                                      this.state.newTask
                                        ?.headache_hurtnow_right === true ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid item xs={3} md={3}>
                                      <label>{headache_hurtnow_top}</label>
                                      {this.state.newTask &&
                                      this.state.newTask
                                        ?.headache_hurtnow_top === true ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Grid>
                                  <Grid>
                                    <h1>{blood_pressure}</h1>
                                  </Grid>
                                  <Grid container xs={12} md={12}>
                                    <Grid item xs={6} md={6}>
                                      <label>{rr_systolic}</label>
                                      <p>
                                        {this.state.newTask &&
                                          this.state.newTask
                                            .headache_rr_systolic}
                                      </p>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                      <label>{RR_diastolic}</label>
                                      <p>
                                        {this.state.newTask &&
                                          this.state.newTask
                                            .headache_rr_diastolic}
                                      </p>
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Grid>
                                  <Grid>
                                    <h1>{body_temp}</h1>
                                  </Grid>
                                  <Grid>
                                    <label>{headache_body_temp}</label>
                                  </Grid>
                                  <p>
                                    {this.state.newTask &&
                                      this.state.newTask?.headache_body_temp}
                                  </p>
                                </Grid>
                                {this.state.newTask.headache_have_diabetes ===
                                  "yes" && (
                                  <Grid>
                                    <Grid>
                                      <h1>{diabetes}</h1>
                                    </Grid>
                                    <Grid container xs={12} md={12}>
                                      <Grid item xs={4} md={4}>
                                        <label>{blood_sugar}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask
                                              ?.headache_blood_sugar}
                                        </p>
                                      </Grid>
                                      <Grid item xs={4} md={4}>
                                        <label>{Hba1c}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask?.headache_Hba1c}
                                        </p>
                                      </Grid>
                                      <Grid item xs={4} md={4}>
                                        <label>{situation}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask
                                              ?.headache_situation &&
                                            this.state.newTask
                                              ?.headache_situation?.value &&
                                            GetShowLabel1(
                                              this.state.Allsituation,
                                              this.state.newTask
                                                ?.headache_situation?.value,
                                              this.props.stateLanguageType,
                                              true,
                                              "anamnesis"
                                            )}
                                        </p>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                )}
                                <Grid className="sickAllMngSec">
                                  <label>{quality_of_pain}</label>
                                </Grid>
                                <p>
                                  {this.state.newTask &&
                                    this.state.newTask
                                      ?.headache_quality_of_pain}
                                </p>
                                <Grid className="sickAllMngSec">
                                  <label>{headache_need_to_vomit}</label>
                                  {this.state.newTask &&
                                  this.state.newTask?.headache_need_to_vomit ===
                                    "yes" ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>
                                <Grid className="sickAllMngSec">
                                  <label>{headache_onset_of_pain}</label>
                                  {this.state.newTask &&
                                  this.state.newTask?.headache_onset_of_pain ===
                                    "yes" ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>

                                <Grid className="sickAllMngSec">
                                  <label>{headache_take_painkillers}</label>
                                </Grid>
                                {this.state.newTask &&
                                this.state.newTask?.take_painkillers ===
                                  "yes" ? (
                                  <p>{yes}</p>
                                ) : (
                                  <p>{no}</p>
                                )}

                                <Grid className="sickAllMngSec">
                                  <label>{headache_undergoing_treatment}</label>
                                </Grid>
                                {this.state.newTask &&
                                this.state.newTask?.undergoing_treatment ===
                                  "yes" ? (
                                  <p>{yes}</p>
                                ) : (
                                  <p>{no}</p>
                                )}

                                <Grid className="sickAllMngSec">
                                  <label>{pain_levelsss}</label>
                                </Grid>
                                <p>
                                  {this.state.newTask &&
                                    this.state.newTask?.headache_pain_intensity}
                                </p>
                              </Grid>
                            )}
                            {this.state.newTask.stomach_problems === "yes" && (
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{stomach_problems}</h3>
                                </Grid>
                                <Grid>
                                  <h1>{Pain_begin}</h1>
                                  <PainPoint
                                    gender={this.state.gender}
                                    painPoint={
                                      this.state.newTask
                                        .stomach_painbegin_painPoint
                                    }
                                    isView={true}
                                  />
                                </Grid>
                                <Grid>
                                  <h1>{hurtnow}</h1>
                                  <PainPoint
                                    gender={this.state.gender}
                                    painPoint={
                                      this.state.newTask
                                        .stomach_hurtnow_painPoint
                                    }
                                    isView={true}
                                  />
                                </Grid>

                                <Grid container xs={12} md={12}>
                                  <Grid xs={4} md={4}>
                                    <label>{stomach_sternum}</label>
                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.stomach_behind_the_sternum === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={4} md={4}>
                                    <label>{stomach_attack}</label>
                                    {this.state.newTask &&
                                    this.state.newTask?.stomach_heart_attack ===
                                      "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={4} md={4}>
                                    <label>{stomach_failure}</label>

                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.stomach_heart_failure === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                </Grid>

                                <Grid>
                                  <Grid>
                                    <h1>{blood_pressure}</h1>
                                  </Grid>
                                  <Grid container xs={12} md={12}>
                                    <Grid xs={6} md={6}>
                                      <label>{rr_systolic}</label>
                                      <p>
                                        {this.state.newTask &&
                                          this.state.newTask
                                            ?.stomach_rr_systolic}
                                      </p>
                                    </Grid>
                                    <Grid xs={6} md={6}>
                                      <label>{RR_diastolic}</label>
                                      <p>
                                        {this.state.newTask &&
                                          this.state.newTask
                                            ?.stomach_rr_diastolic}
                                      </p>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                {this.state.newTask.stomach_have_diabetes ===
                                  "yes" && (
                                  <Grid>
                                    <Grid>
                                      <h1>{diabetes}</h1>
                                    </Grid>
                                    <Grid container xs={12} md={12}>
                                      <Grid xs={4} md={4}>
                                        <label>{blood_sugar}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask
                                              ?.stomach_blood_sugar}
                                        </p>
                                      </Grid>
                                      <Grid xs={4} md={4}>
                                        <label>{Hba1c}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask?.stomach_Hba1c}
                                        </p>
                                      </Grid>
                                      <Grid xs={4} md={4}>
                                        <label>{situation}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask
                                              ?.stomach_situation &&
                                            this.state.newTask
                                              ?.stomach_situation?.value &&
                                            GetShowLabel1(
                                              this.state.Allsituation,
                                              this.state.newTask
                                                ?.stomach_situation?.value,
                                              this.props.stateLanguageType,
                                              true,
                                              "anamnesis"
                                            )}
                                        </p>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                )}

                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{stomach_periodically}</label>
                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.stomach_continuously_or_periodically ===
                                      "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid>
                                    <h1>{body_temp}</h1>
                                  </Grid>
                                  <Grid>
                                    <label>{stomach_temp}</label>
                                  </Grid>
                                  <p>
                                    {this.state.newTask &&
                                      this.state.newTask?.stomach_body_temp}
                                  </p>
                                  <Grid>
                                    <Grid className="sickAllMngSec">
                                      <label>{stomach_take_painkillers}</label>
                                    </Grid>
                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.stomach_take_painkillers === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{stomach_intensity}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask
                                          ?.stomach_pain_intensity}
                                    </p>
                                  </Grid>
                                  <Grid>
                                    <Grid className="sickAllMngSec">
                                      <label>
                                        {stomach_undergoing_treatment}
                                      </label>
                                    </Grid>
                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.stomach_undergoing_treatment ===
                                      "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                            {this.state.newTask.diarrhea === "yes" && (
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{Diarrhea}</h3>
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{diarrhea_symptoms_begin}</label>
                                  </Grid>
                                  <p>
                                    {getDate(
                                      this.state.newTask &&
                                        this.state.newTask
                                          ?.diarrhea_symptoms_begin,
                                      this.props.settings &&
                                        this.props.settings?.setting &&
                                        this.props.settings?.setting
                                          ?.date_format
                                    )}
                                  </p>
                                </Grid>
                                <Grid className="sickAllMngSec">
                                  <label>{diarrhea_vomiting}</label>

                                  {this.state.newTask &&
                                  this.state.newTask
                                    ?.diarrhea_suffer_from_vomiting ===
                                    "yes" ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>
                                <Grid>
                                  <Grid>
                                    <h1>{body_temp}</h1>
                                  </Grid>
                                  <Grid>
                                    <label>{diarrhea_body_temp}</label>
                                  </Grid>
                                  <p>
                                    {this.state.newTask &&
                                      this.state.newTask?.diarrhea_body_temp}
                                  </p>
                                  <Grid className="sickAllMngSec">
                                    <label>{diarrhea_suffer_symtoms}</label>

                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.diarrhea_envi_suffer_symtoms ===
                                      "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{diarrhea_liquids}</label>

                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.diarrhea_liquids_with_you === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                            {this.state.newTask.have_fever === "yes" && (
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{Fever}</h3>
                                </Grid>

                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{fever_symptoms_begin}</label>
                                  </Grid>
                                  <p>
                                    {getDate(
                                      this.state.newTask &&
                                        this.state.newTask
                                          ?.fever_symptoms_begin,
                                      this.props.settings &&
                                        this.props.settings?.setting &&
                                        this.props.settings?.setting
                                          ?.date_format
                                    )}
                                  </p>
                                </Grid>
                                <Grid>
                                  <h1>{body_temp}</h1>
                                </Grid>
                                <Grid container xs={12} md={12}>
                                  <Grid xs={6} md={6}>
                                    <label>{fever_top_body_temp}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask?.fever_top_body_temp}
                                    </p>
                                  </Grid>
                                  <Grid xs={6} md={6}>
                                    <label>{fever_low_body_temp}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask?.fever_low_body_temp}
                                    </p>
                                  </Grid>
                                </Grid>

                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{fever_pain_intensity}</label>
                                  </Grid>
                                  <p>
                                    {this.state.newTask &&
                                      this.state.newTask?.fever_pain_intensity}
                                  </p>
                                </Grid>
                                {this.state.newTask.fever_have_a_cough ===
                                  "yes" && (
                                  <Grid>
                                    <Grid>
                                      <h1>{cough}</h1>
                                    </Grid>

                                    <Grid container xs={12} md={12}>
                                      <Grid xs={6} md={6}>
                                        <label>{fever_cold}</label>
                                        {this.state.newTask &&
                                        this.state.newTask?.fever_cold ===
                                          true ? (
                                          <p>{yes}</p>
                                        ) : (
                                          <p>{no}</p>
                                        )}
                                      </Grid>
                                      <Grid xs={6} md={6}>
                                        <label>{fever_hoarseness}</label>

                                        {this.state.newTask &&
                                        this.state.newTask?.fever_hoarseness ===
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
                                    <label>{fever_sputum}</label>
                                  </Grid>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        this.state.newTask &&
                                        this.state.newTask?.fever_sputum,
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            )}
                            {this.state.newTask.back_pain === "yes" && (
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{back_pain}</h3>
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{back_symptoms_begin}</label>
                                  </Grid>
                                  <p>
                                    {getDate(
                                      this.state.newTask &&
                                        this.state.newTask
                                          ?.back_pain_symptoms_begin,
                                      this.props.settings &&
                                        this.props.settings?.setting &&
                                        this.props.settings?.setting
                                          ?.date_format
                                    )}
                                  </p>
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{back_injured}</label>
                                  </Grid>
                                  {this.state.newTask &&
                                  this.state.newTask?.back_pain_been_injured ===
                                    "yes" ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>
                                <Grid className="sickAllMngSec">
                                  <label>{back_strained}</label>

                                  {this.state.newTask &&
                                  this.state.newTask
                                    ?.back_pain_physically_strained ===
                                    "yes" ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>
                                <Grid className="sickAllMngSec">
                                  <label>{back_depression}</label>

                                  {this.state.newTask &&
                                  this.state.newTask
                                    ?.back_pain_stress_depression === "yes" ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>
                                {this.state.newTask.back_pain_have_diabetes ===
                                  "yes" && (
                                  <Grid>
                                    <Grid>
                                      <h1>{diabetes} </h1>
                                    </Grid>
                                    <Grid container xs={12} md={12}>
                                      <Grid xs={4} md={4}>
                                        <label>{blood_sugar}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask
                                              ?.back_pain_blood_sugar}
                                        </p>
                                      </Grid>
                                      <Grid xs={4} md={4}>
                                        <label>{Hba1c}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask?.back_pain_Hba1c}
                                        </p>
                                      </Grid>

                                      <Grid xs={4} md={4}>
                                        <label>{situation}</label>
                                        <p>
                                          {this.state.newTask &&
                                            this.state.newTask
                                              ?.back_pain_situation &&
                                            this.state.newTask
                                              ?.back_pain_situation?.value &&
                                            GetShowLabel1(
                                              this.state.Allsituation,
                                              this.state.newTask
                                                ?.back_pain_situation?.value,
                                              this.props.stateLanguageType,
                                              true,
                                              "anamnesis"
                                            )}
                                        </p>
                                      </Grid>
                                    </Grid>
                                    <Grid className="sickAllMngSec">
                                      <label>{back_attack}</label>
                                      {this.state.newTask &&
                                      this.state.newTask
                                        ?.back_pain_heart_attack === "yes" ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid className="sickAllMngSec">
                                      <label>{back_failure}</label>
                                      {this.state.newTask &&
                                      this.state.newTask
                                        ?.back_pain_heart_failure === "yes" ? (
                                        <p>{yes}</p>
                                      ) : (
                                        <p>{no}</p>
                                      )}
                                    </Grid>
                                    <Grid>
                                      <Grid>
                                        <h1>{blood_pressure}</h1>
                                      </Grid>
                                      <Grid container xs={12} md={12}>
                                        <Grid xs={6} md={6}>
                                          <label>{rr_systolic}</label>
                                          <p>
                                            {this.state.newTask &&
                                              this.state.newTask
                                                ?.back_pain_rr_systolic}
                                          </p>
                                        </Grid>
                                        <Grid xs={6} md={6}>
                                          <label>{RR_diastolic}</label>
                                          <p>
                                            {this.state.newTask &&
                                              this.state.newTask
                                                ?.back_pain_rr_diastolic}
                                          </p>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                )}
                              </Grid>
                            )}
                            {this.state.newTask.cough_and_snees === "yes" && (
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{cough_and_snees}</h3>
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{cough_symptoms_begin}</label>
                                  </Grid>
                                  <p>
                                    {getDate(
                                      this.state.newTask &&
                                        this.state.newTask
                                          ?.cough_symptoms_begin,
                                      this.props.settings &&
                                        this.props.settings?.setting &&
                                        this.props.settings?.setting
                                          ?.date_format
                                    )}
                                  </p>
                                </Grid>
                                <Grid>
                                  <h1>{body_temp}</h1>
                                </Grid>
                                <Grid>
                                  <Grid>
                                    <label>{body_temp}</label>
                                  </Grid>
                                  <p>
                                    {this.state.newTask &&
                                      this.state.newTask?.cough_body_temp}
                                  </p>
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{cough_suffer_symtoms}</label>
                                  </Grid>
                                  {this.state.newTask &&
                                  this.state.newTask
                                    ?.cough_envi_suffer_symtoms === "yes" ? (
                                    <p>{yes}</p>
                                  ) : (
                                    <p>{no}</p>
                                  )}
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{cough_allergies}</label>
                                  </Grid>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        this.state.newTask &&
                                        this.state.newTask
                                          ?.cough_suffer_from_allergies,
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            )}
                            {this.state.newTask.feel_depressed === "yes" && (
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{feel_depressed}</h3>
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{depressed_symptoms_begin}</label>
                                  </Grid>
                                  <p>
                                    {getDate(
                                      this.state.newTask &&
                                        this.state.newTask
                                          ?.depressed_symptoms_begin,
                                      this.props.settings &&
                                        this.props.settings?.setting &&
                                        this.props.settings?.setting
                                          ?.date_format
                                    )}
                                  </p>
                                </Grid>
                                <Grid>
                                  <Grid className="sickAllMngSec">
                                    <label>{pain_level}</label>
                                  </Grid>
                                  <p>
                                    {this.state.newTask &&
                                      this.state.newTask
                                        ?.depressed_pain_intensity}
                                  </p>
                                </Grid>
                                <Grid container xs={12} md={12}>
                                  <Grid xs={4} md={4} className="sickAllMngSec">
                                    <label>{depressed_do_you_sleep}</label>

                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.depressed_do_you_sleep === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={4} md={4} className="sickAllMngSec">
                                    <label>{depressed_suicidal_thoughts}</label>

                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.depressed_suicidal_thoughts ===
                                      "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={4} md={4} className="sickAllMngSec">
                                    <label>{depressed_hurt_yourself}</label>

                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.depressed_hurt_yourself === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>
                            )}
                            {this.state.newTask.cardiac_problems === "yes" && (
                              <Grid>
                                <Grid className="allSickHeadSec">
                                  <h3>{cardiac_problems}</h3>
                                </Grid>
                                <Grid>
                                  <h1>{blood_pressure}</h1>
                                </Grid>
                                <Grid container xs={12} md={12}>
                                  <Grid xs={6} md={6}>
                                    <label>{rr_systolic}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask?.cardiac_rr_systolic}
                                    </p>
                                  </Grid>
                                  <Grid xs={6} md={6}>
                                    <label>{RR_diastolic}</label>
                                    <p>
                                      {this.state.newTask &&
                                        this.state.newTask
                                          ?.cardiac_rr_diastolic}
                                    </p>
                                  </Grid>
                                </Grid>

                                <Grid container xs={12} md={12}>
                                  <Grid xs={3} md={3} className="sickAllMngSec">
                                    <label>{cardiac_heart_attack}</label>

                                    {this.state.newTask &&
                                    this.state.newTask?.cardiac_heart_attack ===
                                      "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={3} md={3} className="sickAllMngSec">
                                    <label>{cardiac_heart_failure}</label>

                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.cardiac_heart_failure === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={3} md={3} className="sickAllMngSec">
                                    <label>{cardiac_dizziness}</label>
                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.cardiac_have_dizziness === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
                                  </Grid>
                                  <Grid xs={3} md={3} className="sickAllMngSec">
                                    <label>{cardiac_shoulder_pain}</label>

                                    {this.state.newTask &&
                                    this.state.newTask
                                      ?.cardiac_have_shoulder_pain === "yes" ? (
                                      <p>{yes}</p>
                                    ) : (
                                      <p>{no}</p>
                                    )}
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
              </Modal>
              {/* End of Model setup */}{" "}
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
