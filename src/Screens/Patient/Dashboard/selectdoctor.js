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
    let translate = getLanguage(this?.props?.redux_st?.stateLanguageType);
    let {
      my_profile,
      Security
    } = translate;
    return (
      <Grid className="logForm form_full">
        {/* Start of Bread Crumb */}
        <Grid container direction="row" alignItems="center">
          <Grid item xs={12} md={12}  >




            {/* Card Menu */}


            <Grid className="card-header">
              <S3Image imgUrl={dataa?.doctor_detail[0]?.image} />

              <Grid>
                <h5 className="selectdoc-head"> {dataa?.doctor_detail[0]?.first_name}{' '}{dataa?.doctor_detail[0]?.last_name} </h5>
                <h6 className="selectdoc-head2"> ({dataa?.doctor_detail[0]?.profile_id})</h6>
                {/* <p className='selectdoc-content'>Thu, Feb 3-8:30 am EST</p> */}
                <Grid className='selectdoc-button'>
                  <span>
                <img className = "v_c_img" src={require('assets/images/video-call-copy2.svg')} alt="" title="" />on-line
                </span>

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

              <p className='card-label'>I would like to: <b>Video-Call</b> </p>
              


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
                      <Grid>
                        <Grid className='call-feadback-header'>
                          <Grid>
                            <img className="call-img" src={item?.patient_infos?.image} alt='doctor' />

                          </Grid>
                          <Grid className="comment-callpat">
                            <h5> Latest review for: </h5>
                            <p>{item?.patient_infos?.first_name}{' '}{item?.patient_infos?.last_name}, MD</p>
                            <p>{item?.patient_id}</p>

                          </Grid>
                        </Grid>
                        <Grid className="call-comment-patient">
                          {/* {item.comment} */}
                        </Grid>
                      </Grid>
                    </Grid>


                  </Grid>


                ))}


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





            {/* <Grid className='logout' >Logout</Grid> */}
          </Grid>
        </Grid>
      </Grid>

    );
  }
}
export default SelectDoctor;