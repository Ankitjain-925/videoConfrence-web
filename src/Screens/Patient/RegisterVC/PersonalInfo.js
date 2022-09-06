import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Select from "react-select";


class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }

    }
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { firstName, lastName, handleChange } = this.props;
        return (
            <> <Grid className="logForm form_full">


                <Grid className="logRow">
                    <Grid className="label_1">
                        <label>Enter Time To Talk</label>
                    </Grid>
                    <Grid>
                        <Select
                            value={this.state.title}

                            options={this.state.title_degreeData}
                            placeholder="Mr."
                            name="title"
                            isSearchable={false}
                            className="mr_sel"
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
                            name="lastName"
                            value={lastName}
                            placeholder="Total Payable Amount"
                            onChange={handleChange('lastName')}
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