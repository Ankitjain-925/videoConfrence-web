import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Collapsible from "react-collapsible";
import ReactTooltip from "react-tooltip";
import FileViews from "./../FileViews/index";
import { getDate, newdate, getTime, getImage } from "Screens/Components/BasicMethod/index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { GetShowLabel1 } from "../../GetMetaData/index.js";
import DownloadFullTrack from "Screens/Components/DownloadFullTrack/index.js";
import { LanguageFetchReducer } from "Screens/actions";
import CreatedBySec from "Screens/Components/TimelineComponent/CreatedBysec";
import { getLanguage } from "translations/index"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { pure } from "recompose";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.data || {},
      date_format: this.props.date_format,
      time_foramt: this.props.time_format,
      archive: this.props.archive,
      loggedinUser: this.props.loggedinUser,
      images: this.props.images,
      TrackRecord: this.props.TrackRecord,
      onlyOverview: this.props.onlyOverview,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.data !== this.props.data ||
      prevProps.loggedinUser !== this.props.loggedinUser
    ) {
      this.setState({
        item: this.props.data,
        loggedinUser: this.props.loggedinUser,
      });
    }
    if (prevProps.images !== this.props.images) {
      this.setState({ images: this.props.images });
    }
    if (prevProps.TrackRecord !== this.props.TrackRecord) {
      this.setState({ TrackRecord: this.props.TrackRecord });
    }
    if (prevProps.onlyOverview !== this.props.onlyOverview) {
      this.setState({ onlyOverview: this.props.onlyOverview });
    }
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType)
    let {
      blood_sugar,
      Hba1c,
      situation,
      visible,
      show,
      date,
      time,
      hide,
      until,
      visibility,
      edit,
      Delete,
      not_mentioned,
      always,
      VeiwGraph,
      img_files,
      details,
      Change,
      archive,
      de_archive,
      Download,
    } = translate;
    var item = this.state.item;
    return (
      <Grid container direction="row" className="descpCntnt">
        <Grid item xs={12} md={1} className="descpCntntLft">
          {newdate(item.datetime_on)}
        </Grid>
        <Grid item xs={12} md={10} className="descpCntntRght">
          <Grid className="descpInerRght descpInerBlue">
            <Grid container direction="row" className="addSpc">
              <Grid item xs={12} md={6}>
                <Grid className="blodPrsurImg">
                  <a className="blodPrsurNote">
                    <img
                      src={require("assets/images/blood-pressure-sugar.svg")}
                      alt=""
                      title=""
                    />
                    <span>{blood_sugar}</span>
                  </a>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid className="bp_vsblSec scndOptionIner1">
                  <a
                    onClick={() => this.props.EidtOption(item.type, item, true)}
                    className="bp_vsblEye"
                  >
                    <img
                      src={require("assets/images/eye2.png")}
                      alt=""
                      title=""
                    />{" "}
                    {item.visible === "show" ? (
                      <span>{visible}</span>
                    ) : item.visible === "hide" ? (
                      <span>{hide}</span>
                    ) : (
                      <span>{not_mentioned}</span>
                    )}{" "}
                  </a>
                  <a
                    className="vsblTime"
                    data-tip
                    data-for={item.track_id + "visibility"}
                  >
                    <img
                      src={require("assets/images/clock.svg")}
                      alt=""
                      title=""
                    />
                  </a>
                  <ReactTooltip
                    className="timeIconClas"
                    id={item.track_id + "visibility"}
                    place="top"
                    effect="solid"
                    backgroundColor="#ffffff"
                  >
                    {item.visible === "show" ? (
                      <label>
                        {show} {until}
                      </label>
                    ) : (
                      <label>
                        {hide} {until}
                      </label>
                    )}
                    {item.public === "always" ? (
                      <p> {always} </p>
                    ) : (
                      <p>{getDate(item.public, this.state.date_format)}</p>
                    )}
                  </ReactTooltip>
                  <a className="openScndhrf1">
                    <a className="vsblDots">
                      <img
                        src={require("assets/images/nav-more.svg")}
                        alt=""
                        title=""
                      />
                    </a>
                    {!this.props.Archive ? (
                      <ul>
                        <li>
                          <a onClick={(data) => this.props.ArchiveTrack(item)}>
                            <img
                              src={require("assets/images/archive-1.svg")}
                              alt=""
                              title=""
                            />
                            {archive}
                          </a>
                        </li>
                        {this.props.comesfrom === "patient" && (
                          <li>
                            {item.created_by === this.state.loggedinUser._id &&
                              (!item.updated_by || item.updated_by === "") ? (
                              <a
                                onClick={() =>
                                  this.props.EidtOption(item.type, item)
                                }
                              >
                                <img
                                  src={require("assets/images/edit-1.svg")}
                                  alt=""
                                  title=""
                                />
                                {edit}
                              </a>
                            ) : (
                              <a
                                onClick={() =>
                                  this.props.EidtOption(item.type, item, true)
                                }
                              >
                                <img
                                  src={require("assets/images/edit.svg")}
                                  alt=""
                                  title=""
                                />
                                {Change} {visibility}
                              </a>
                            )}
                          </li>
                        )}
                        {this.props.comesfrom !== "patient" && (
                          <li>
                            <a
                              onClick={() =>
                                this.props.EidtOption(item.type, item)
                              }
                            >
                              <img
                                src={require("assets/images/edit-1.svg")}
                                alt=""
                                title=""
                              />
                              {edit}
                            </a>
                          </li>
                        )}

                        <li>
                          <a onClick={() => this.props.downloadTrack(item)}>
                            <img
                              src={require("assets/images/download.svg")}
                              alt=""
                              title=""
                            />
                            {Download}
                          </a>
                        </li>
                        <li>
                          <DownloadFullTrack
                            TrackRecord={this.state.TrackRecord}
                          />
                        </li>
                        <li>
                          <a
                            onClick={(deleteKey) =>
                              this.props.DeleteTrack(item.track_id)
                            }
                          >
                            <img
                              src={require("assets/images/cancel-request.svg")}
                              alt=""
                              title=""
                            />
                            {Delete}
                          </a>
                        </li>
                      </ul>
                    ) : (
                      <ul>
                        <li>
                          <a onClick={(data) => this.props.ArchiveTrack(item)}>
                            <img
                              src={require("assets/images/archive-1.svg")}
                              alt=""
                              title=""
                            />
                            {de_archive}
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={(deleteKey) =>
                              this.props.DeleteTrack(item.track_id)
                            }
                          >
                            <img
                              src={require("assets/images/cancel-request.svg")}
                              alt=""
                              title=""
                            />
                            {Delete}
                          </a>
                        </li>
                      </ul>
                    )}
                  </a>
                </Grid>
              </Grid>
              <Grid className="clear"></Grid>
            </Grid>

            <Grid className="bp_hg addSpc">
              <label>
                {item.blood_sugar && item.blood_sugar} <span>mg/dl</span>
              </label>
              {/* <p>Normal</p> */}
            </Grid>

            <Collapsible
              trigger={<ExpandMoreIcon />}
              triggerWhenOpen={<ExpandLessIcon />}
              open={!this.state.onlyOverview}
            >
              {
                <Grid>
                  <Grid container direction="row" className="addSpc bpJohnMain">
                    <Grid item xs={12} md={12}>
                      <CreatedBySec data={item} />
                      {/* <Grid className="bpJohnImg">
                  <a data-tip data-for={item.track_id + "created"}>
                    <img
                      src={getImage(item.created_by_image, this.state.images)}
                      alt=""
                      title=""
                    />
                    <span>{item.created_by_temp}</span>
                  </a>
                  <ReactTooltip
                    className="timeIconClas_crested"
                    id={item.track_id + "created"}
                    place="top"
                    effect="solid"
                    backgroundColor="#ffffff"
                  >
                    <p>{item.created_by_temp}</p>
                    <p>{item.created_by_profile}</p>
                    <p>
                      <img
                        src={getImage(item.created_by_image, this.state.images)}
                        alt=""
                        title=""
                      />
                    </p>
                  </ReactTooltip>
                </Grid> */}
                    </Grid>
                    <Grid className="clear"></Grid>
                  </Grid>

                  <Grid className="addSpc detailMark">
                    <Collapsible trigger={details} open="true">
                      <Grid className="detailCntnt">
                        <Grid container direction="row">
                          <Grid item xs={12} md={6} className="bloodPreBy">
                            <Grid container direction="row">
                              <Grid item xs={5} md={5}>
                                <label>{blood_sugar}</label>
                              </Grid>
                              <Grid item xs={7} md={7}>
                                <span>{item.blood_sugar && item.blood_sugar}</span>
                              </Grid>
                              <Grid className="clear"></Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6} className="bloodPreBy">
                            <Grid container direction="row">
                              <Grid item xs={5} md={5}>
                                <label>{situation}</label>
                              </Grid>
                              <Grid item xs={7} md={7}>
                                <span>
                                  {item.situation &&
                                    GetShowLabel1(
                                      this.props.list,
                                      item.situation.value,
                                      this.props.stateLanguageType,
                                      true
                                    )}</span>
                              </Grid>
                              <Grid className="clear"></Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6} className="bloodPreBy">
                            <Grid container direction="row">
                              <Grid item xs={5} md={5}>
                                <label>{Hba1c}</label>
                              </Grid>
                              <Grid item xs={7} md={7}>
                                <span>{item.Hba1c && item.Hba1c}</span>
                              </Grid>
                              <Grid className="clear"></Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={6} className="bloodPreBy">
                            <Grid container direction="row">
                              <Grid item xs={5} md={5}>
                                <label>
                                  {date} & {time}
                                </label>
                              </Grid>
                              <Grid item xs={7} md={7}>
                                <span>
                                  {item.date_measured &&
                                    getDate(
                                      item.date_measured,
                                      this.state.date_format
                                    )}{" "}
                                  {item.time_measured &&
                                    ", " +
                                    getTime(
                                      new Date(item.time_measured),
                                      this.state.time_foramt
                                    )}
                                </span>
                              </Grid>
                              <Grid className="clear"></Grid>
                            </Grid>
                          </Grid>
                          <Grid className="clear"></Grid>
                        </Grid>
                        <Grid className="bp_graph">
                          {/* <Grid><img src={require('assets/images/gp.png')} alt="" title="" /></Grid> */}
                          <Grid>
                            <a onClick={() => this.props.OpenGraph("blood_sugar")}>
                              {VeiwGraph}
                            </a>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Collapsible>
                  </Grid>
                  <Grid className="addSpc detailMark">
                    <Collapsible trigger={img_files} open="true">
                      <FileViews
                        images={this.state.images}
                        attachfile={item.attachfile}
                      />
                    </Collapsible>
                  </Grid>
                </Grid>}
            </Collapsible>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
    stateLanguageType,
  };
};
export default pure(withRouter(
  connect(mapStateToProps, { LanguageFetchReducer })(Index)
));
