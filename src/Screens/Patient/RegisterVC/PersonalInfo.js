import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Select from "react-select";


class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }
        this.state = {
            title_degreeData: [{ value: "20", label: 20 },
            { value: "40", label: 40 },
            { value: "60", label: 60 },
            { value: "120", label: 120 },
            { value: "240", label: 240 },],
            // title: '',
            // title2: '',
        };
    }
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    // ValueName = (value) => {
        
    //     var sec = value.value * 5;
    //     this.setState({ title2: sec });
    //     this.props.onSelectLanguage2(value);
    // }


    render() {


        return (
            <> <Grid className="logForm form_full">


                <Grid className="logRow">
                    <Grid className="label_1">
                        <label>Enter Time To Talk</label>
                    </Grid>
                    <Grid>
                        {console.log("trfhgjk", this.props.dataa.time )}
                        <Select
                            value={this.props.dataa.time}
                            name="firstName"
                            options={this.state.title_degreeData}
                            placeholder="Select Time To Talk "
                            isSearchable={false}
                            className="mr_sel"
                            onChange={(e) => {this.props.onSelectLanguage2(e) }}
                        />
                    </Grid>
                </Grid>
                <Grid className="logRow">
                    <Grid className="label_1">
                        <label>Estimated Amount</label>
                    </Grid>
                    <Grid>
                        <input
                            type="text"
                            readOnly
                            name="lastName"
                            value={this.props.dataa.amount}
                            placeholder="Total Payable Amount"
                        />
                    </Grid>
                </Grid>

                <Grid className="infoShwSave3 label_1 ">
                    <input
                        type="button"
                        value="Next"
                        onClick={this.continue}

                    />
                </Grid>
            </Grid>

            </>
        );
    }
}

export default PersonalInfo;