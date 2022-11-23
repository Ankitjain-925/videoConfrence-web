import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LanguageFetchReducer } from "Screens/actions";
import { LoginReducerAim } from "Screens/Login/actions";
import { Settings } from "Screens/Login/setting";
import { authy } from "Screens/Login/authy.js";
import { Redirect } from "react-router-dom";
import { getLanguage } from 'translations/index';
import Select from "react-select";
import Loader from 'Screens/Components/Loader/index';
import VHfield from 'Screens/Components/VHfield/index';
import npmCountryList from 'react-select-country-list';
import Autocomplete from 'Screens/Components/Autocomplete/index.js';
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { commonCometHeader } from "component/CommonHeader/index";
import axios from 'axios';
import sitedata from 'sitedata';
import { commonHeader } from 'component/CommonHeader/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.city = null;
        this.state =
        {
            errorChrMsg1: '',
            loaderImage: false,
            refundData: {},
            successMsg: false,
        }
    }

    componentDidMount() {
        var npmCountry = npmCountryList().getData();
        this.setState({ selectCountry: npmCountry });
        // this.city = new google.maps.places.Autocomplete(
        //     this.autocompleteInput.current,
        //     { types: ['geocode'] }
        // );
    }

    // componentDidUpdate = (prevProps) => {
    //     if (prevProps.openModal !== this.props.openModal) {
    //         this.setState({ openModal: this.props.openModal });
    //     }
    // };

    // Set all field data in state
    updateEntryState = (e, name) => {
        const { refundData } = this.state;
        const state = refundData;
        !name ? state[e.target.name] = e.target.value : state[name] = e;
        this.setState({ refundData: state });
    }

    //Calling when city is updated
    updateEntryCity = (place) => {
        this.setState({ city: place.formatted_address });
        this.setState({
            area: {
                type: 'Point',
                coordinates: [
                    place.geometry.location.lng(),
                    place.geometry.location.lat(),
                ],
            },
        });
        const state = this.state.refundData;
        state['Address'] = place.formatted_address;
        this.setState({ refundData: state });
    };

    // Srcoll window top in every error
    MoveTop = (top) => {
        window.scroll({
            top: top,
            behavior: 'smooth'
        });
    }

    //For logout the User
    logOutClick = () => {
        let email = "";
        let password = "";
        this.props.LoginReducerAim(email, password);
        let languageType = "en";
        this.props.LanguageFetchReducer(languageType);
        this.props.history.push("/");
    };

    // Final submission of Form data
    handleSubmit = () => {
        var user_token = this.props.stateLoginValueAim?.token;
        const { refundData } = this.state;
        this.setState({ errorChrMsg1: "" })
        var data = refundData;
        var id = this.props.stateLoginValueAim?.VideoData?._id;
        data.VideoChatAccountId = id;
        // data.BankCountry = "dsfxbgbjhk"
        data.user_id = this.props.stateLoginValueAim?.user?._id;
        data.email = this.props.stateLoginValueAim?.user?.email;
        if (data && data.AccountOwner) {
            if (data && data.NameOfBank) {
                if (data && data.BankCountry) {
                    if (data && data.BankKey) {
                        if (data && data.BankAccountNumber) {
                            if (data && data.Address) {
                                this.setState({ loaderImage: true });
                                axios
                                    .post(sitedata.data.path + "/vchat/AddRefundInfo",
                                        data,
                                        commonHeader(user_token))
                                    .then(() => {
                                        axios
                                            .put(sitedata.data.path + '/vchat/UpdateVideoAccount/' + id,
                                                {
                                                    status: false
                                                },
                                                commonHeader(user_token))
                                            .then((response) => {
                                                this.setState({
                                                    loaderImage: false,
                                                    refundData: {},
                                                    successMsg: true
                                                });
                                                this.logOutClick();
                                            }).catch((error) => {
                                                this.setState({ loaderImage: false });
                                            });
                                    }).catch(() => {
                                        this.setState({ loaderImage: false });
                                    })
                            }
                            else {
                                this.MoveTop(0);
                                this.setState({ errorChrMsg1: "Please Enter Bank branch city" })
                            }
                        }
                        else {
                            this.MoveTop(0);
                            this.setState({ errorChrMsg1: "Please Enter Bank account number" })
                        }
                    }
                    else {
                        this.MoveTop(0);
                        this.setState({ errorChrMsg1: "Please Enter Bank key" })
                    }
                } else {
                    this.MoveTop(0);
                    this.setState({ errorChrMsg1: "Please Select Bank country" })
                }
            } else {
                this.MoveTop(0);
                this.setState({ errorChrMsg1: "Please enter Bank name" })
            }
        } else {
            this.MoveTop(0);
            this.setState({ errorChrMsg1: "Please enter Account owner name" })
        }
    }

    goToDeactive = () => {
        this.props.history.push({
            pathname: "/patient",
            state: 2
        })
    }

    render() {
        const { stateLoginValueAim } = this.props;
        // if (
        //     stateLoginValueAim.user === 'undefined' ||
        //     stateLoginValueAim.token === 450 ||
        //     stateLoginValueAim.token === 'undefined' ||
        //     stateLoginValueAim.user.type !== 'doctor' ||
        //     !this.props.verifyCode ||
        //     !this.props.verifyCode.code
        // ) {
        //     return <Redirect to={'/'} />;
        // }
        let translate = getLanguage(this.props.stateLanguageType);
        const {
        } = translate;
        const {
            loaderImage,
            errorChrMsg1,
            refundData,
            selectCountry
        } = this.state;
        return (
            <Grid
                className={
                    this.props.settings &&
                        this.props.settings.setting &&
                        this.props.settings.setting.mode &&
                        this.props.settings.setting.mode === "dark"
                        ? "homeBg darkTheme"
                        : "homeBg"
                }
            >
                {loaderImage && <Loader />}
                <Grid className="homeBgIner homeBgIner">
                    <Grid container direction="row" justify="center">
                        <Grid item xs={12} md={12}>
                            <Grid container direction="row">
                                <Grid item xs={12} sm={2} md={2}>
                                    <Grid
                                        className="backFlow backFlow34 backFlow44"
                                        onClick={() => {
                                            this.goToDeactive()
                                        }}
                                    >
                                        <a>
                                            <img
                                                src={require('assets/virtual_images/rightArrow.png')}
                                                alt=""
                                                title=""
                                            />
                                            Back
                                        </a>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                    <Grid className="allFormSection">
                                        <Grid>
                                            <Grid className="profileInfo profileInfo123">
                                                <h1>Refund Form</h1>
                                            </Grid>
                                            <div className="err_message">{errorChrMsg1}</div>
                                            {this.state.successMsg && (
                                                <div className="succ_message">Your Refund Data successfully submitted</div>
                                            )}
                                            <Grid item xs={12} sm={12} md={12}>

                                                <Grid>
                                                    <Grid>
                                                        <VHfield
                                                            label="Account Owner"
                                                            name="AccountOwner"
                                                            placeholder="Enter Account owner"
                                                            onChange={(e) => this.updateEntryState(e)}
                                                            value={refundData?.AccountOwner}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12}>
                                                <Grid>
                                                    <VHfield
                                                        label="Name of Bank"
                                                        name="NameOfBank"
                                                        placeholder="Enter Bank name"
                                                        onChange={(e) => this.updateEntryState(e)}
                                                        value={refundData?.NameOfBank}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container xs={12} sm={12} md={12}>
                                                <Grid container direction="row" spacing={2}>
                                                    <Grid item xs={12} sm={6} md={6}>
                                                        <Grid className="applyCssOnLabel">
                                                            <label>Bank Country</label>
                                                        </Grid>
                                                        <Grid>
                                                            <Select
                                                                name="BankCountry"
                                                                options={selectCountry}
                                                                placeholder="Search Select"
                                                                onChange={(e) => this.updateEntryState(e, "BankCountry")}
                                                                value={refundData?.BankCountry}
                                                                className="addStafSelect abc123455"
                                                                isMulti={false}
                                                                isSearchable={true}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={6}>
                                                        <Grid className="enterSpcl enterSpcl44">
                                                            <Grid className="rrInput vhfield-add">
                                                                <Grid>
                                                                    <label>Bank Key</label>
                                                                </Grid>
                                                                <input
                                                                    type="number"
                                                                    placeholder="Enter Bank key"
                                                                    onChange={(e) => this.updateEntryState(e)}
                                                                    name="BankKey"
                                                                    value={refundData?.BankKey}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={12}>
                                                <Grid className="enterSpcl enterSpcl44">
                                                    <Grid className="rrInput vhfield-add">
                                                        <Grid>
                                                            <label>Bank Account Number</label>
                                                        </Grid>
                                                        <input
                                                            type="number"
                                                            placeholder="Enter Account number"
                                                            onChange={(e) => this.updateEntryState(e)}
                                                            name="BankAccountNumber"
                                                            value={refundData?.BankAccountNumber}
                                                        />

                                                        <Grid>
                                                            <label>ABA/Routing Number</label>
                                                        </Grid>
                                                        <input
                                                            type="number"
                                                            placeholder="Enter ABA/Routing number"
                                                            onChange={(e) => this.updateEntryState(e)}
                                                            name="ABARoutingNumber"
                                                            value={refundData?.ABARoutingNumber}
                                                        />

                                                        <Grid>
                                                            <label>IBAN</label>
                                                        </Grid>
                                                        <input
                                                            type="number"
                                                            placeholder="Enter IBAN"
                                                            onChange={(e) => this.updateEntryState(e)}
                                                            name="IBAN"
                                                            value={refundData?.IBAN}
                                                        />

                                                        <Grid>
                                                            <label>SWIFT Code</label>
                                                        </Grid>
                                                        <input
                                                            type="number"
                                                            placeholder="Enter SWIFT Code"
                                                            onChange={(e) => this.updateEntryState(e)}
                                                            name="SWIFCode"
                                                            value={refundData?.SWIFCode}
                                                        />

                                                        <Grid>
                                                            <label>Control Key</label>
                                                        </Grid>
                                                        <input
                                                            type="number"
                                                            placeholder="Enter Control Key"
                                                            onChange={(e) => this.updateEntryState(e)}
                                                            name="ControlKey"
                                                            value={refundData?.ControlKey}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid className="profileInfoIner profileInfoIner343">
                                                    <label>Bank Branch, City</label>
                                                    <Grid>
                                                        <Autocomplete
                                                            value={refundData?.Address}
                                                            stateLanguageType={this.props.stateLanguageType}
                                                            onPlaceChanged={this.updateEntryCity.bind(this)}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid className="enterSpcl">
                                                    <Grid className="rrInput vhfield-add">
                                                        <Grid>
                                                            <label>DUNS Number</label>
                                                        </Grid>
                                                        <input
                                                            type="number"
                                                            placeholder="Enter DUNS Number"
                                                            onChange={(e) => this.updateEntryState(e)}
                                                            name="DUNSNumber"
                                                            value={refundData?.DUNSNumber}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={9} md={6}>
                                            <Grid className="infoShwSave3">
                                                <input
                                                    type="Submit"
                                                    value="Submit"
                                                    onClick={() => this.handleSubmit()}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* <Modal
                    open={this.state.openModal}
                    onClose={() => this.closeFullQues()}
                    className={
                        this.props.settings.setting &&
                            this.props.settings.setting.mode &&
                            this.props.settings.setting.mode === "dark"
                            ? "darkTheme addSpeclModel"
                            : "addSpeclModel"
                    }
                >
                    <Grid
                        className={
                            this.props.settings &&
                                this.props.settings.setting &&
                                this.props.settings.setting.mode &&
                                this.props.settings.setting.mode === "dark"
                                ? "darkTheme addSpeclContnt"
                                : "addServContnt"
                        }
                    // className="addServContnt"
                    >
                        <Grid className="addSpeclContntIner">
                            <Grid className="creatTaskCntnt creatTaskCntnt1">
                                <Grid className="addSpeclLbl">
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                    >
                                        <Grid item xs={8} md={8} lg={8}>
                                            <label>Refund Form</label>

                                        </Grid>

                                        <Grid item xs={4} md={4} lg={4}>
                                            <Grid>
                                                <Grid className="entryCloseBtn">
                                                    <a
                                                        onClick={() =>
                                                            this.closeFullQues()
                                                        }
                                                    >
                                                        <img
                                                            src={require("assets/images/close-search.svg")}
                                                            alt=""
                                                            title=""
                                                        />
                                                    </a>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <div className="err_message">{errorChrMsg1}</div>
                                <Grid className="enterServMain">
                                    <Grid className="enterSpcl">
                                        <Grid>
                                            <VHfield
                                                label="Account Owner"
                                                name="AccountOwner"
                                                placeholder="Enter Account owner"
                                                onChange={(e) => this.updateEntryState(e)}
                                                value={refundData?.AccountOwner}
                                            />
                                        </Grid>

                                        <Grid>
                                            <VHfield
                                                label="Name of Bank"
                                                name="NameOfBank"
                                                placeholder="Enter Bank name"
                                                onChange={(e) => this.updateEntryState(e)}
                                                value={refundData?.NameOfBank}
                                            />
                                        </Grid>

                                        <label>Bank Country</label>
                                        <Grid>
                                            <Select
                                                name="BankCountry"
                                                options={selectCountry}
                                                placeholder="Search_Select"
                                                onChange={(e) => this.updateEntryState(e, "BankCountry")}
                                                value={refundData?.BankCountry}
                                                className="addStafSelect"
                                                isMulti={false}
                                                isSearchable={true}
                                            />
                                        </Grid>

                                        <Grid className="spaceInLabel">
                                            <label>Bank Key</label>
                                        </Grid>
                                        <input
                                            type="number"
                                            placeholder="Enter Bank key"
                                            onChange={(e) => this.updateEntryState(e)}
                                            name="BankKey"
                                            value={refundData?.BankKey}
                                        />


                                        <Grid className="enterSpcl enterSpcl44">
                                            <Grid className="rrInput vhfield-add">
                                                <Grid className="spaceInLabel">
                                                    <label>Bank Account Number</label>
                                                </Grid>
                                                <input
                                                    type="number"
                                                    placeholder="Enter Account number"
                                                    onChange={(e) => this.updateEntryState(e)}
                                                    name="BankAccountNumber"
                                                    value={refundData?.BankAccountNumber}
                                                />

                                                <Grid className="spaceInLabel">
                                                    <label>ABA/Routing Number</label>
                                                </Grid>
                                                <input
                                                    type="number"
                                                    placeholder="Enter ABA/Routing number"
                                                    onChange={(e) => this.updateEntryState(e)}
                                                    name="ABARoutingNumber"
                                                    value={refundData?.ABARoutingNumber}
                                                />

                                                <Grid className="spaceInLabel">
                                                    <label>IBAN</label>
                                                </Grid>
                                                <input
                                                    type="number"
                                                    placeholder="Enter IBAN"
                                                    onChange={(e) => this.updateEntryState(e)}
                                                    name="IBAN"
                                                    value={refundData?.IBAN}
                                                />

                                                <Grid className="spaceInLabel">
                                                    <label>SWIFT Code</label>
                                                </Grid>
                                                <input
                                                    type="number"
                                                    placeholder="Enter SWIFT Code"
                                                    onChange={(e) => this.updateEntryState(e)}
                                                    name="SWIFCode"
                                                    value={refundData?.SWIFCode}
                                                />

                                                <Grid className="spaceInLabel">
                                                    <label>Control Key</label>
                                                </Grid>
                                                <input
                                                    type="number"
                                                    placeholder="Enter Control Key"
                                                    onChange={(e) => this.updateEntryState(e)}
                                                    name="ControlKey"
                                                    value={refundData?.ControlKey}
                                                />
                                            </Grid>
                                        </Grid>


                                        5                <Grid className="profileInfoIner">
                                            <label>Bank Branch, City</label>
                                            <Grid>
                                                <Autocomplete
                                                    value={refundData?.Address}
                                                    stateLanguageType={this.props.stateLanguageType}
                                                    onPlaceChanged={this.updateEntryCity.bind(this)}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid className="enterSpcl enterSpcl44">
                                            <Grid className="rrInput vhfield-add">
                                                <Grid>
                                                    <label>DUNS Number</label>
                                                </Grid>
                                                <input
                                                    type="number"
                                                    placeholder="Enter DUNS Number"
                                                    onChange={(e) => this.updateEntryState(e)}
                                                    name="DUNSNumber"
                                                    value={refundData?.DUNSNumber}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12} className="saveTasks">
                                            <Button
                                                onClick={() => this.handleSubmit()}>
                                                Submit
                                            </Button>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid> </Grid>
                </Modal> */}
            </Grid >
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
    const { verifyCode } = state.authy;
    return {
        stateLanguageType,
        stateLoginValueAim,
        loadingaIndicatoranswerdetail,
        settings,
        verifyCode,
    };
};
export default withRouter(
    connect(mapStateToProps, {
        LoginReducerAim,
        LanguageFetchReducer,
        Settings,
        authy,
    })(Index)
);