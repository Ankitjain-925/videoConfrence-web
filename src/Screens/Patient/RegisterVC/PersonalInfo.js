import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import { getLanguage } from 'translations/index';

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }
        this.state = {
            title_degreeData: [
                { value: "20", label: 20 },
                { value: "40", label: 40 },
                { value: "60", label: 60 },
                { value: "120", label: 120 },
                { value: "240", label: 240 },],
        };
    }
    continue = e => {
        e.preventDefault();
        if (this.props.dataa.time) {
            this.props.nextStep();
        }
        else {
            this.setState({ TimeRequired: 'Please Enter Time' });
        }

    }
    // ValueName = (value) => {

    //     var sec = value.value * 5;
    //     this.setState({ title2: sec });
    //     this.props.onSelectLanguage2(value);
    // }



    render() {

        let translate = getLanguage(this.props.stateLanguageType);
        let {
            enter_time_talk,
            estimated_amount,
            next,
            total_payable_amount,
            select_time_talk,
            please_enter_time,
        } = translate;


        return (
            <> <Grid className="logForm form_full">


                <Grid className="logRow">
                    <Grid className="label_1">
                        <label>{enter_time_talk}</label>
                    </Grid>
                    <Grid>
                        <Select
                            value={this.props.dataa.time}
                            name="firstName"
                            options={this.props.title_degreeData}
                            placeholder={select_time_talk}
                            isSearchable={false}
                            className="mr_sel"
                            onChange={(e) => { this.props.onSelectLanguage2(e) }}
                        />
                        <Grid className="err_mesg">{this.state.TimeRequired}</Grid>
                    </Grid>
                </Grid>
                <Grid className="logRow">
                    <Grid className="label_1">
                        <label>{estimated_amount}</label>
                    </Grid>

                    <Grid className="mys">

                        <input
                            type="text"
                            readOnly
                            name="lastName"
                            value={this.props.dataa.amount}
                            placeholder={total_payable_amount}
                        />
                        <p className="euroamount">€</p>
                    </Grid>
                </Grid>

                <Grid className="infoShwSave3 label_1 ">
                    <input
                        type="button"
                        value={next}
                        onClick={this.continue}

                    />
                </Grid>
            </Grid>

            </>
        );
    }
}

export default PersonalInfo;