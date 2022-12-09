import React, { useState, Component } from "react"
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
import ButtJoin from "Screens/Components/Button/index";




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
  const [btdisable, setbtdisable] = useState(false);

  let translate = getLanguage(props.stateLanguageType);
  let {
    my_profile,
    Security,
    balance,
    top_your_balance,
    starter,
    forty_min,
    aenean_lectus_posuere,
    two_hundered_euro,
    buy_now,
    standard,
    sixty_min,
    three_hundred_euro,
    premium,
    onehundred_twenty_min,
    six_hundred_uero,
    choose_custom_amount,
    back_sec,
    add_custom_amount,
    will_recieve,
    Continue,
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
      if (e == 40 || e == 60 || e == 120) {
        fsetAmount2(e)
      }
    } else {
      setErrormsg("");
      setError(false);
      setOpenPayment(true);
    }
  };

  const setAmo = (e) => {
    console.log("123", e)
    if( e <= 5000 && e > 0){
      setErrormsg("");
    setAmount(e);
    fsetAmount(e / 5);
    setbtdisable(false)
    }
    else if(e == ""){
    setbtdisable(true)
    fsetAmount(0);
    }
    else{
      setErrormsg("Amount shouldn't be greater than 5000");
      setAmount("");
      fsetAmount(0);
      setbtdisable(true)
    }
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
                  <div className="settingPage 66">
                    {!openPayment && (<>
                      <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={12} sm={6} md={6} lg={6}><h5 className="setting-h5">{balance}</h5></Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6}><ButtJoin /></Grid>
                      </Grid>
                    </>
                    )}
                    {!customAmount ? <>
                      {!openPayment && (<>
                        <MiddleTopup />


                        <p className='settingbox-heading'>{top_your_balance}</p>
                        {/* <div className="last-sec-setting form_full">
                    
                          </div> */}
                        <Grid container direction="row" justify="center" alignItems="center">
                          <Grid item xs={12} md={4} sm={12}>
                            <div className="top-up-mid1-inner form_full">
                              <div className="top-up-head-1">
                                <div className='top-up-head'>{starter}</div>
                                <div className='top-up-minnute'>{forty_min}</div>
                              </div>
                              <div>
                                <div className="top-up-content">{aenean_lectus_posuere}
                                </div>
                              </div>
                              <div className='top-up-cost'>{two_hundered_euro}</div>
                              <div>
                                <button className='top-up-buybtn' onClick={(e) => onPayment(40)}>{buy_now}</button>
                              </div>
                            </div>
                          </Grid>

                          <Grid item xs={12} md={4} sm={12}>
                            <div className="top-up-mid1-inner form_full">
                              <div className="top-up-head-1">
                                <div className='top-up-head'>{standard}</div>
                                <div className='top-up-minnute'>{sixty_min}</div>
                              </div>
                              <div>
                                <div className='top-up-content'>{aenean_lectus_posuere}
                                </div>
                              </div>
                              <div className='top-up-cost'>{three_hundred_euro}</div>
                              <div>
                                <button className='top-up-buybtn' onClick={(e) => onPayment(60)}>{buy_now}</button>
                              </div>
                            </div>
                          </Grid>

                          <Grid item xs={12} md={4} sm={12}>
                            <div className="top-up-mid1-inner form_full">
                              <div className="top-up-head-1">
                                <div className='top-up-head'>{premium}</div>
                                <div className='top-up-minnute'>{onehundred_twenty_min}</div>
                              </div>
                              <div>
                                <div className='top-up-content'>{aenean_lectus_posuere}
                                </div>
                              </div>
                              <div className='top-up-cost'>{six_hundred_uero}</div>
                              <div>
                                <button className='top-up-buybtn' onClick={(e) => onPayment(120)}>{buy_now}</button>
                              </div>
                            </div>
                          </Grid>

                        </Grid>

                        <Grid className="goto-custom-topup" onClick={() => { SetcustomAmount(true) }}>
                          {choose_custom_amount}
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
                            <div className="custom-topup-Back addImgArow" onClick={() => { SetcustomAmount(false) }}>
                              <img src={require("assets/images/Right.svg")} alt="" title="" />{back_sec}</div>
                            <div className='custom-topup form_full_bl'>
                              <div>
                                <h2 className="custom-topup-head">{add_custom_amount}</h2>
                              </div>
                              <div className="custom-topup-field form_full">
                              <div className="err_message">{errormsg}</div>
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
                              <div className="custom-topup-recieve">{will_recieve}<span className="custom-topup-rmin">{famount}{' '}{'Min'}</span></div>
                              <div className="continueBTN-topup">
                                <Button variant='contained' disabled={btdisable} onClick={() => onPayment()}>{Continue}</Button>

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