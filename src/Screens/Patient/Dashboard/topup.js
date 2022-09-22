import React, { useState } from "react"
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import Notification from 'Screens/Components/CometChat/react-chat-ui-kit/CometChat/components/Notifications';
import AppBar from '@material-ui/core/AppBar';
import { getLanguage } from 'translations/index';
import MMHG from "Screens/Components/mmHgField/index";
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Button } from "@material-ui/core/index";
import { useHistory } from "react-router-dom";
import SetLanguage from "Screens/Components/SetLanguage/index.js";
import { getSetting } from "Screens/Components/Menus/api";
import { pure } from "recompose";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { withRouter } from "react-router-dom";
import { Settings } from "Screens/Login/setting";
import { LanguageFetchReducer } from "Screens/actions";
import { OptionList } from "Screens/Login/metadataaction";
import { authy } from "Screens/Login/authy.js";
import MiddleTopup from "./middleTopup";
import Payment from "Screens/Patient/RequestList/Payment/index";



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

const Dashboard = (props) => {
  const history = useHistory();
  const [customAmount, SetcustomAmount] = useState(false);
  const [languageValue, setLanguageValue] = useState(null);
  const [openFancyLanguage, setOpenFancyLanguage] = useState(false)
  const [errormsg, setErrormsg] = useState("");
  const [error, setError] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [amount, setAmount] = useState("30");
  const [famount, fsetAmount] = useState(amount / 5);
  const [famount2, fsetAmount2] = useState();






  let translate = getLanguage(props.stateLanguageType);
  let {
    my_profile,
    Security
  } = translate;


  const onKeyDownlogin = (e) => {
    if (e.key === "Enter") {
      onPayment();
    }
  };

  const handleCancel = () => {
    setOpenPayment(false);
  };


  const profileLink = () => {
    history.push("/patient");
  };

  //For open the model
  const openLanguageModel = () => {
    setOpenFancyLanguage(true);
  };

  const onPayment = (e) => {
    if (!customAmount) {
      setErrormsg("Amount shouldn't be empty");
      setError(true);
      setOpenPayment(true);
      if (e == 40 || e == 60 || e == 120){
        fsetAmount2(e)
      }
    } else {
      setErrormsg("");
      setError(false);
      setOpenPayment(true);
    }
  };

  const setAmo = (e) => {
    setAmount(e);
    fsetAmount(e / 5);
  }



  //For close Model
  const handleCloseFancyLanguage = () => {
    setOpenFancyLanguage(false);
  };

  if (
    props?.stateLoginValueAim.user === 'undefined' ||
    props?.stateLoginValueAim.token === 450 ||
    props?.stateLoginValueAim.token === 'undefined' ||
    props?.stateLoginValueAim.user.type !== 'patient'
  ) {
    return <Redirect to={'/'} />;
  }
  else {
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
                <LeftMenu isNotShow={true} currentPage="topup" />
                <LeftMenuMobile isNotShow={true} currentPage="topup" />
                <Grid item xs={12} md={10} lg={8}>
                  <div className="settingPage">
                  {!openPayment && (
                    <h5 className="setting-h5">Balance</h5>
                  )}
                    
                    {!customAmount ? <>
                      {!openPayment && (<>
                        <MiddleTopup />


                        <p className='settingbox-heading'>Top up your balance</p>
                        {/* <div className="last-sec-setting form_full">
                    
                          </div> */}
                        <Grid container direction="row" justify="center" alignItems="center">
                          <Grid item xs={4} md={4} sm={4}>
                            <div className="top-up-mid1-inner form_full">
                              <div className="top-up-head-1">
                                <div className='top-up-head'>Starter</div>
                                <div className='top-up-minnute'>40min</div>
                              </div>
                              <div>
                                <div className="top-up-content">Aenean at lectus posuere enim id nec. Molestie neque, sed fusce faucibus.
                                </div>
                              </div>
                              <div className='top-up-cost'>200 €</div>
                              <div>
                                <button className='top-up-buybtn' onClick={(e) => onPayment(40)}>Buy Now</button>
                              </div>
                            </div>
                          </Grid>

                          <Grid item xs={4} md={4} sm={4}>
                            <div className="top-up-mid1-inner form_full">
                              <div className="top-up-head-1">
                                <div className='top-up-head'>Standard</div>
                                <div className='top-up-minnute'>60min</div>
                              </div>
                              <div>
                                <div className='top-up-content'>Aenean at lectus posuere enim id nec. Molestie neque, sed fusce faucibus.
                                </div>
                              </div>
                              <div className='top-up-cost'>300 €</div>
                              <div>
                                <button className='top-up-buybtn' onClick={(e) => onPayment(60)}>Buy Now</button>
                              </div>
                            </div>
                          </Grid>

                          <Grid item xs={4} md={4} sm={4}>
                            <div className="top-up-mid1-inner form_full">
                              <div className="top-up-head-1">
                                <div className='top-up-head'>Premium</div>
                                <div className='top-up-minnute'>120min</div>
                              </div>
                              <div>
                                <div className='top-up-content'>Aenean at lectus posuere enim id nec. Molestie neque, sed fusce faucibus.
                                </div>
                              </div>
                              <div className='top-up-cost'>600 €</div>
                              <div>
                                <button className='top-up-buybtn' onClick={(e) => onPayment(120)}>Buy Now</button>
                              </div>
                            </div>
                          </Grid>

                        </Grid>

                        <Grid className="goto-custom-topup" onClick={() => { SetcustomAmount(true) }}>
                          or choose a custom amount
                        </Grid>
                      </>
                      )}
                      <Grid>
                        {openPayment && (
                          
                          

                            
                            
                              <Payment
                                onCancel={handleCancel}
                                usedFor={"top_up"}
                                famount={famount2}

                              />

                            

                          
                        )}
                      </Grid>
                    </>
                      :
                      <>
                        {!openPayment && (
                          <div className='last-sec-setting form_full'>
                            <div className="custom-topup-Back" onClick={() => { SetcustomAmount(false) }}> {'« Back'}  </div>
                            <div className='custom-topup form_full_bl'>
                              <div>
                                <h2 className="custom-topup-head">Add a custom amount</h2>
                              </div>
                              <div className="custom-topup-field form_full">
                                <MMHG
                                  onKeyDown={(e) => onKeyDownlogin(e)}
                                  name="amount"
                                  label={"EUR"}
                                  // onChange={(e) => this.updateEntryState(e)}
                                  value={amount}

                                  onChange={(e) => {
                                    setAmo(e.target.value);
                                  }}
                                />
                                <p className="euroamount">€</p>
                                <div>
                                </div>
                              </div>
                              <div className="custom-topup-recieve">You will recieve: <span className="custom-topup-rmin">{famount}{' '}{'Min'}</span></div>
                              <div className="continueBTN-topup">
                                <Button variant='contained' onClick={() => onPayment()}>Continue</Button>

                              </div>

                            </div>

                          </div>
                        )}
                        <Grid>
                          {openPayment && (
                            

                              

                                <Payment
                                  onCancel={handleCancel}
                                  usedFor={"top_up"}
                                  famount={famount}

                                />

                              

                            
                          )}
                        </Grid>

                      </>}
                    {/* <div style={{
                        background: '#FFFFFF',
                        boxShadow: '0px 4px 12px rgba(35, 35, 35, 0.04)',
                        borderRadius: '8px',
                        float: 'left',
                        width: '240.33px',
                        height: '264px',
                        padding: '20px',
                        marginRight: '12px'
                      }}>
                        <div style={{ float: 'left', width: '100%', height: '50px' }}>
                          <div className='top-up-head'>Standard</div>
                          <div className='top-up-minnute'>30min</div>
                        </div>
                        <div>
                          <div className='paraStyles'>Aenean at lectus posuere enim id nec. Molestie neque, sed fusce faucibus.
                          </div>
                        </div>
                        <div className='top-up-cost'>23,99 €</div>
                        <div>
                          <button className='top-up-buybtnblue'>Buy Now</button>
                        </div>
                      </div>
                      <div style={{
                        background: '#FFFFFF',
                        boxShadow: '0px 4px 12px rgba(35, 35, 35, 0.04)+',
                        borderRadius: '8px',
                        float: 'right',
                        width: '240.33px',
                        height: '264px',
                        padding: '20px',
                        marginRight: '12px'

                      }}>
                        <div style={{ float: 'left', width: '100%', height: '50px' }}>
                          <div className='top-up-head'>Premium</div>
                          <div className='top-up-minnute'>100min</div>
                        </div>
                        <div>
                          <div className='paraStyles'>Aenean at lectus pos+uere enim id nec. Molestie neque, sed fusce faucibus.
                          </div>
                        </div>
                        <div className='top-up-cost'>49,99 €</div>
                        <div>
                          <button className='top-up-buybtn'>Buy Now</button>
                        </div>
                      </div>
                    </div> */}

                  </div>

                  {/* <div className='logout' >Logout</div> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    )
  }
}
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
    })(Dashboard)
  ));
