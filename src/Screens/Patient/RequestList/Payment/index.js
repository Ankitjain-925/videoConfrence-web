import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import sitedata from 'sitedata';
import { getLanguage } from 'translations/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LoginReducerAim } from 'Screens/Login/actions';
import { LanguageFetchReducer } from 'Screens/actions';
import { Settings } from 'Screens/Login/setting';
import { authy } from 'Screens/Login/authy.js';
import Loader from 'Screens/Components/Loader/index';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { OptionList } from 'Screens/Login/metadataaction';
import StripeCheckout from 'react-stripe-checkout';
import { confirmAlert } from 'react-confirm-alert';
import { getPublishableKey } from 'Screens/Components/CardInput/getPriceId';
import {
  saveOnDB1,
  CancelClick,
  fromEuroToCent,
  getAmountData,
} from '../../SickLeaveForm/api';

const CURRENCY = 'EUR';
const STRIPE_PUBLISHABLE = getPublishableKey();

class Index extends Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.StripeClick = React.createRef();
    this.state = {
      loaderImage: false,
      dataForLInk: {},
    };
  }

  componentDidMount() {
    if (this.props.location?.state?.data) {
      this.setState({
        updateEvaluate: this.props.location?.state?.data,
      });
    }
    getAmountData(this);
  }

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let { pay_with_stripe, payment, cancel, request_list_payment, Payment } =
      translate;

    //Success payment alert after payment is success
    const successPayment = (data) => {
      let translate = getLanguage(this.props.stateLanguageType);
      const { paymnt_processed, ok } = translate;
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div
              className={
                this.props.settings &&
                this.props.settings.setting &&
                this.props.settings.setting.mode === 'dark'
                  ? 'dark-confirm react-confirm-alert-body'
                  : 'react-confirm-alert-body'
              }
            >
              <h1>{paymnt_processed}</h1>
              <div className="react-confirm-alert-button-group">
                <button
                  onClick={() => {
                    onClose();
                    saveOnDB1(data, this.state.updateEvaluate, this);
                  }}
                >
                  {ok}
                </button>
              </div>
            </div>
          );
        },
      });
    };

    //Alert of the Error payment
    const errorPayment = (data) => {
      let translate = getLanguage(this.props.stateLanguageType);
      let { ok, paymnt_err } = translate;
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div
              className={
                this.props.setting &&
                this.props.setting.setting &&
                this.props.setting.setting.mode === 'dark'
                  ? 'dark-confirm react-confirm-alert-body'
                  : 'react-confirm-alert-body'
              }
            >
              <h1>{paymnt_err}</h1>
              <div className="react-confirm-alert-button-group">
                <button
                  onClick={() => {
                    onClose();
                  }}
                >
                  {ok}
                </button>
              </div>
            </div>
          );
        },
      });
    };

    const Checkout = ({
      name = 'AIS',
      description = 'Stripe Payment',
      amount = this.state.amountDta,
      email = this.props.stateLoginValueAim.user.email,
    }) => (
      <StripeCheckout
        ref={(ref) => {
          this.StripeClick = ref;
        }}
        name={name}
        image="https://sys.aimedis.io/static/media/LogoPNG.03ac2d92.png"
        description={description}
        amount={fromEuroToCent(amount, this)}
        token={onToken}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
        label={pay_with_stripe}
        className="CutomStripeButton"
        email={email}
        closed={this.onClosed}
      />
    );

    //For payment
    const onToken = (token) =>
      axios
        .post(sitedata.data.path + '/lms_stripeCheckout/intent-pop', {
          source: token.id,
          currency: CURRENCY,
          amount: fromEuroToCent(this.state.amountDta, this),
        })
        .then(successPayment, this.setState({ addtocart: [] }))
        .catch(errorPayment);

    return (
      <Grid>
        <Grid
          className={
            this.props.settings &&
            this.props.settings.setting &&
            this.props.settings.setting.mode &&
            this.props.settings.setting.mode === 'dark'
              ? 'homeBg homeBgDrk'
              : 'homeBg'
          }
        >
          {this.state.loaderImage && <Loader />}
          <Grid className="homeBgIner">
            <Grid container direction="row" justify="center">
              <Grid item xs={12} md={12}>
                <Grid container direction="row">
                  {/* Website Menu */}
                  <LeftMenu isNotShow={true} currentPage="feedback" />
                  <LeftMenuMobile isNotShow={true} currentPage="feedback" />
                  <Grid item xs={12} md={11} lg={10}>
                    <Grid className="docsOpinion">
                      <Grid container direction="row" className="docsOpinLbl">
                        <Grid item xs={12} md={6}>
                          <label>{request_list_payment}</label>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid className="cnfrmDiaMain profilePkg cnfrmDiaMain1">
                        <div className="payment_sec_extra_ser1">
                          <div className="sbu_button">
                            <h2>{Payment}</h2>
                            <Grid container direction="row" spacing={2}>
                              <Grid item xs={12} md={6}>
                                <Checkout />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <button
                                  onClick={() => {
                                    CancelClick(this);
                                  }}
                                  className="CutomStripeButton"
                                >
                                  {cancel}
                                </button>
                              </Grid>
                            </Grid>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
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
