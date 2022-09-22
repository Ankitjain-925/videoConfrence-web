import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import sitedata from "sitedata";
import { commonCometHeader, commonHeader } from 'component/CommonHeader/index';
import Loader from 'Screens/Components/Loader/index';
import { getLanguage } from 'translations/index';
import Input from '@material-ui/core/Input';
import { S3Image } from "Screens/Components/GetS3Images/index";
import { DebounceInput } from 'react-debounce-input';
import qrcode from 'qrcode.react';

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
            loaderImage: false,
            isActive: false,
        };
    }
    SearchFilter1 = (e) => {
        this.setState({ loaderImage: true });
        var user_token = this.props.redux_st.stateLoginValueAim.token
        var data1 = e.target.value.toLowerCase()
        this.props.onSelectLanguage('', '', '');
        this.setState({ searchValue: e.target.value });
        axios
            .get(sitedata.data.path + "/vchat/Get_Doctor/" + data1,
                commonHeader(user_token))
            .then((response) => {
                this.setState({
                    currentList: response.data.data,
                    loaderImage: false
                });
            })
            .catch((error) => {
                this.setState({ loaderImage: false });
            });
    };
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    func = (item, i, searchValue) => {
        this.setState({ load: i, loaderImage: true });
        var user_token = this.props.redux_st.stateLoginValueAim.token
        axios
            .get(sitedata.data.path + "/vchat/getfeedbackfordoctor/" + item._id,
                commonHeader(user_token))
            .then((response) => {
                var q = [item, response]
                console.log("final", q)
                this.props.onSelectLanguage(q, i, searchValue);
                this.setState({ loaderImage: false });
                this.setState({
                    currentList: response.data.data,

                });

            })
            .catch((error) => {
                this.setState({ loaderImage: false });
            });



    }
    // onChangePage = (data, i) => {
    //     this.props.onSelectLanguage(data);
    //     console.log("jgvuvyuv", data)
    //     this.setState({ isActive: i });
    // }
    render() {
        let translate = getLanguage(this.props.redux_st.stateLanguageType);
        let {
            search_by_name_email_speciality_id_doc,
        } = translate;

        return (

            <>
                {this.state.loaderImage && <Loader />}
                <Grid className="logForm form_full">
                    {/* Start of Bread Crumb */}
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} md={12}  >
                            <Grid className="bread">
                                <Grid className="breadCrumbUpr">
                                    <Grid container direction="row" alignItems="center">
                                        <Grid item xs={12} md={12} className="srchLft">
                                            <DebounceInput
                                                className="de_inp"
                                                name="searchValue"
                                                value={this.props.dataa.doctor_search}
                                                placeholder={search_by_name_email_speciality_id_doc}

                                                // debounceTimeout={300}
                                                onInput={this.SearchFilter1}
                                                autoComplete="off"
                                            />
                                            <a className="Serc_img">
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

                                {/* <Grid className="wardsGrupUpr"> */}
                                <Grid container direction="row">
                                    {/* {console.log("this.props.dataa", this.props.dataa.doctor_detail.first_name)} */}
                                    {this.props.dataa.doctor_detail ?
                                        <Grid
                                            item
                                            xs={6}
                                            md={6}
                                            lg={6}
                                            sm={6}
                                        >
                                            <Grid className="card-header Card_Sel">
                                                <S3Image imgUrl={this.props.dataa.doctor_detail[0].image} />

                                                <Grid>
                                                    <h5 className="selectdoc-head"> {this.props.dataa.doctor_detail[0].first_name}{' '}{this.props.dataa.doctor_detail[0].last_name}</h5>
                                                    <h5 className="selectdoc-head2"> {'('}{this.props.dataa.doctor_detail[0].profile_id}{')'}</h5>
                                                    {/* <p className='selectdoc-content'>Thu, Feb 3-8:30 am EST</p> */}
                                                    <Grid className='selectdoc-button'>
                                                        <img className="v_c_img" src={require('assets/images/video-call-copy2.svg')} alt="" title="" />on-line


                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        :

                                        this.state.currentList?.length > 0 &&
                                        this.state.currentList.map((item, i) => (

                                            <Grid
                                                item
                                                xs={6}
                                                md={6}
                                                lg={6}
                                                sm={6}
                                            >
                                                {/* {console.log("1222",this.props.dataa.doctor_index )} */}


                                                <Grid className={this.state.load === i ? 'Card_Sel card-header' : 'card-header'} onClick={() => {
                                                    this.func(item, i, this.state.searchValue);
                                                }}>

                                                    <Grid>
                                                        <p><h5 className="selectdoc-head"> {item.first_name}{' '}{item.last_name}</h5></p>
                                                        <h5 className="selectdoc-head"> {'('}{item.profile_id}{')'}</h5>
                                                        {/* <p className='selectdoc-content'>Thu, Feb 3-8:30 am EST</p> */}
                                                        <Grid className='selectdoc-button'>
                                                            <img className="v_c_img" src={require('assets/images/video-call-copy2.svg')} alt="" title="" />on-line


                                                        </Grid>
                                                    </Grid>
                                                </Grid>



                                            </Grid>


                                        ))
                                    }


                                </Grid>
                                {/* </Grid> */}
                            </Grid>
                            <Grid className="infoShwSave3 ">
                                <input
                                    type="button"
                                    value="« Back"
                                    onClick={this.back}

                                />
                                {this.props.dataa.doctor_detail ?

                                    <input
                                        type="button"
                                        value="Next »"
                                        onClick={this.continue}

                                    /> : ''
                                }
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </>
        );
    }
}

export default AllInfo;