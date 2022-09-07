import React, { Component } from 'react';
import PersonalInfo from './PersonalInfo';
import JobDetails from './JobDetails';
import AllInfo from './AllInfo';
import Grid from "@material-ui/core/Grid";

export class StepForm extends Component {
    state = {
        step: 1,

        // step 1
        firstName: '',
        lastName: '',
        email: '',

        // step 2
        jobTitle: '',
        jobCompany: '',
        jobLocation: ''

    }

    nextStep = () => {
        const { step } = this.state;

        this.setState({
            step: step + 1
        });
    }

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    showStep = () => {
        const { step, firstName, lastName, jobTitle, jobCompany, jobLocation } = this.state;

        if (step === 1)
            return (<PersonalInfo
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                firstName={firstName}
                lastName={lastName}
            />);
        if (step === 2)
            return (<JobDetails
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                jobTitle={jobTitle}
                jobCompany={jobCompany}
                jobLocation={jobLocation}
            />);
        if (step === 3)
            return (<AllInfo
                firstName={firstName}
                lastName={lastName}
                jobTitle={jobTitle}
                jobCompany={jobCompany}
                jobLocation={jobLocation}
                prevStep={this.prevStep}
            />);
            if (step === 4)
            return (<AllInfo
                firstName={firstName}
                lastName={lastName}
                jobTitle={jobTitle}
                jobCompany={jobCompany}
                jobLocation={jobLocation}
                prevStep={this.prevStep}
            />);
    }

    render() {
        const { step } = this.state;
        const myst1 = {
            float: "right",
            left: "-30px",
            position: "relative",
            margin: "10px"
        };

        return (
            <>


                <h1 style={myst1}>Step {step} of 3.</h1>
                {this.showStep()}


            </>
        );
    }
}

export default StepForm;