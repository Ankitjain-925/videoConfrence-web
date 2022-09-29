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
import { Settings } from "Screens/Login/setting";
import { S3Image } from "Screens/Components/GetS3Images/index";
import SymptomQuestions from '../../Components/TimelineComponent/CovidSymptomsField/SymptomQuestions';

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
    this.setState({ errMsg: "" })
    const { dataa } = this.props;
    e.preventDefault();
    if (dataa?.house_id) {
      this.setState({ errMsg: "" })
      this.props.nextStep();
    } else {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      })
      this.setState({ errMsg: "Please select hospital first" })
    }
  }

  updateAllEntrySec = (e, name) => {
    this.setState({ showQuestion: e });
  };

  render() {
    const { dataa } = this.props;
    let translate = getLanguage(this?.props?.redux_st?.stateLanguageType);
    let {
      my_profile,
      Security,
      back_symbol,
      next_symbol,
      select_hospitals,
      search_select,
      I_would_like,
      video_call,
    } = translate;
    return (
      <Grid className="logForm form_full">
        {/* Start of Bread Crumb */}
        <Grid container direction="row" alignItems="center">
          <Grid item xs={12} md={12}  >




            {/* Card Menu */}


            <Grid className="card-header">
              <Grid container direction="row">
                <Grid item xs={12} sm={7} md={7} className="setDataImg">
                  <S3Image imgUrl={dataa?.doctor_detail[0]?.image} />
                  <Grid>
                    <h5 className="selectdoc-head"> {dataa?.doctor_detail[0]?.first_name}{' '}{dataa?.doctor_detail[0]?.last_name} </h5>
                    <h6 className="selectdoc-head2 selectdoc-head3"> ( {dataa?.doctor_detail[0]?.profile_id} )</h6>
                    <h6 className="selectdoc-head3">  <img
                      src={require("assets/images/email.svg")}
                      alt=""
                      title=""
                    />{dataa?.doctor_detail[0]?.email}</h6>
                    {/* <p className='selectdoc-content'>Thu, Feb 3-8:30 am EST</p> */}
                    <Grid className='selectdoc-button'>
                      <span>
                        <img className="v_c_img" src={require('assets/images/video-call-copy2.svg')} alt="" title="" />on-line
                      </span>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={5} md={5}>
                  <label>{select_hospitals}</label>
                  <Grid>
                    <Select
                      name="for_hospital"
                      options={dataa?.doctor_detail[0]?.houses}
                      placeholder={search_select}
                      onChange={(e) => this.props.onSelectLanguage6(e?.value)}
                      value={dataa?.doctor_detail[0]?.houses.filter(obj => obj?.value === dataa?.house_id)}
                      className="addStafSelect"
                      isMulti={false}
                      isSearchable={true}
                    />
                    <div className="err_mesg">{this.state.errMsg}</div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid className='card-content'>
              {/* <Select
                    value={''}
                    onChange={(e) => { }}
                    options={options}
                    placeholder={"I would like to"}
                    name="appointment"
                    isSearchable={true}
                    className="mr_sel"
                  /> */}
              <Grid className='card-label'>
                <p >{I_would_like}
                  {' '}<b>{video_call}</b> </p></Grid>



              {dataa?.permission ? <Grid>
                <p className='card-label'>Your Aimedis credit : <b>{this?.props?.redux_st?.stateLoginValueAim?.VideoData?.prepaid_talktime_min}{' '}{'Min'}</b> </p>
                <a>+ Top up your account </a>
              </Grid> : (
                ''
              )}

              {dataa?.doctor_detail[1]?.data?.data?.length > 0 &&
                dataa?.doctor_detail[1]?.data?.data?.map((item, i) => (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                  >
                    <Grid className='call-feedback-part'>
                      <Grid container direction="row" alignItems="center">
                        <Grid item xs={6} md={6} sm={6}>
                          <Grid className='call-feadback-header'>


                            <Grid className='call-feadbackimg'>
                              <S3Image imgUrl={item?.patient_info?.image} />
                            </Grid>
                            <Grid className="comment-callpat">
                              <p>{item?.patient_info?.first_name}{' '}{item?.patient_info?.last_name}</p>
                              <p>( {item?.patient_info?.alies_id} )</p>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={6} md={6} sm={6}>
                          <Grid className="setDataSym">
                            <SymptomQuestions
                              updateEntryState1={(e) =>
                                this.updateAllEntrySec(
                                  e,
                                  'rating'
                                )
                              }
                              comesFrom="Feedback"
                              // label="Give_rating_Doctor"
                              value={item?.rating}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={12} md={12} sm={12}>
                          <Grid className="call-comment-patient">
                            <p dangerouslySetInnerHTML={{ __html: item?.Comment }}>
                            </p> </Grid>
                        </Grid>

                      </Grid>

                    </Grid>
                  </Grid>

                ))}


              <Grid className="infoShwSave3 ">
                <input
                  type="button"
                  value={back_symbol}
                  onClick={this.back}

                />
                <input
                  type="button"
                  value={next_symbol}
                  onClick={this.continue}

                />
              </Grid>


            </Grid>





            {/* <Grid className='logout' >Logout</Grid> */}
          </Grid>
        </Grid>
      </Grid>

    );
  }
}
export default SelectDoctor;