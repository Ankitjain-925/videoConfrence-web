import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import sitedata from "sitedata";
import { commonCometHeader, commonHeader } from 'component/CommonHeader/index';
import Loader from 'Screens/Components/Loader/index';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { LoginReducerAim } from "Screens/Login/actions";
import { LanguageFetchReducer } from 'Screens/actions';
import { getLanguage } from 'translations/index';
import Input from '@material-ui/core/Input';
import { S3Image } from "Screens/Components/GetS3Images/index";

class AllInfo extends Component {
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
        };
    }
    SearchFilter1 = (e) => {
        var user_token = this.props.stateLoginValueAim.token
        var val = e.target.value.toLowerCase()
        this.setState({ searchValue: e.target.value });
        axios
            .post(
                sitedata.data.path + "/vchat/Get_Doctor",
                {

                    data: val,

                },
                commonHeader(user_token))
            .then((response) => {

                this.setState({ loaderImage: false });
                this.setState({
                    currentList: response.data.data,

                });
            })
            .catch((error) => {
                this.setState({ loaderImage: false });
            });
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        let translate = getLanguage(this.props.stateLanguageType);
        let {
            search_by_name_email_speciality_id_doc,
        } = translate;

        return (

            <>

                {/* Start of Bread Crumb */}
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} md={12}  >
                        <Grid className="bread">
                            <Grid className="breadCrumbUpr">
                                <Grid container direction="row" alignItems="center">
                                    <Grid item xs={12} md={12} className="srchLft">
                                        <Input
                                            name="searchValue"
                                            value={this.state.searchValue}
                                            placeholder={search_by_name_email_speciality_id_doc}
                                            onChange={this.SearchFilter1}
                                            autoComplete="off"
                                        />
                                        <a>
                                            <img
                                                src={require('assets/virtual_images/InputField.svg')}
                                                alt=""
                                                title=""
                                            />
                                        </a>
                                    </Grid>

                                </Grid>
                            </Grid>
                            {/* End of Bread Crumb */}

                            <Grid className="wardsGrupUpr">
                                <Grid container direction="row">
                                    {this.state.currentList?.length > 0 &&
                                        this.state.currentList.map((item) => (

                                            <Grid
                                                item
                                                xs={12}
                                                md={4}
                                                lg={4}

                                            >


                                                <Grid className="flowInfo P_full">
                                                    <Grid className="flowProfil">
                                                        <Grid className="P_f"><S3Image imgUrl={item.image} /></Grid>
                                                        <Grid className="flowProfilRght" >
                                                            <label>{item.first_name + item.last_name}</label>
                                                            <p>{item.profile_id}</p>
                                                            <p>{item.speciality}</p>
                                                            <input
                                                                type="button"
                                                                className='P_f1'
                                                                value="Click »"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>

                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid className="infoShwSave3 P_f2 ">
                            <input
                                type="button"
                                value="« Back"
                                onClick={this.back}

                            />
                        </Grid>
                    </Grid>

                </Grid>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    const { stateLoginValueAim, loadingaIndicatoranswerdetail } =
        state.LoginReducerAim;
    const { stateLanguageType } = state.LanguageReducer;
    return {
        stateLanguageType,
        stateLoginValueAim,

    };
};
export default withRouter(
    connect(mapStateToProps, {
        LoginReducerAim,
        LanguageFetchReducer,
    })(AllInfo)
);