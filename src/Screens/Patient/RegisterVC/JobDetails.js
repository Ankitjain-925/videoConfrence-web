import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";


class JobDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }

    }
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    onchange = e => {
        this.setState({ setData: e.target.value });

    }



    render() {
        const myst1 = {
            display: "flex",
                }

        const { jobTitle, jobCompany, jobLocation, handleChange } = this.props;
        return (
            <>
                <Grid className="logForm">


                    <Grid className="logRow" >
                        <Grid container direction="row" justify="center" >
                            <Grid item xs={6} md={6} style= {myst1}>



                                <input
                                    type="radio"
                                    checked={this.state.setData === "no"}
                                    value="no"
                                    onChange={(e) => this.onchange(e)}

                                    placeholder="Job Title"
                                />
                                <label>PrePaid</label>
                            </Grid>
                            <Grid item xs={6} md={6} style= {myst1}>
                                <input
                                    type="radio"
                                    checked={this.state.setData === "yes"}

                                    value="yes"
                                    onChange={(e) => this.onchange(e)}
                                    placeholder="Company"
                                />
                                <label>Credit Card</label>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid className="logRow">

                        <Grid>
                            {this.state.setData === "yes" && (
                                <input
                                    type="text"
                                    name="jobCompany"
                                    value={jobLocation}
                                    onChange={handleChange('jobLocation')}
                                    placeholder="Enter Card Number"
                                />
                            )}
                        </Grid>
                    </Grid>


                    <Grid className="infoShwSave3 label_1">
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


            </>
        );
    }
}

export default JobDetails;