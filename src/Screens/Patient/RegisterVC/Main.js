import React, { Component } from 'react';
import PersonalInfo from './PersonalInfo';
import JobDetails from './JobDetails';
import AllInfo from './AllInfo';
import Step4 from './Step4';
import SelectDoctor from '../Dashboard/selectdoctor';
import Form5 from '../SickLeaveForm/index'

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
        jobLocation: '',
        language: '',
        lang: '',
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

    handleLanguage = (langValue) => {
        this.setState({ language: langValue });
        // var aaa = { ...langValue }
        // console.log("gfctcghchgvyhvygvyhg", aaa)
    }

    handleLanguage1 = (lang) => {
        this.setState({ lang: lang });
        // var aaa = { ...langValue }
        // console.log("gfctcghchgvyhvygvyhg", aaa)
    }

    showStep = () => {
        const { step, firstName, lastName, jobTitle, jobCompany, jobLocation, language, lang } = this.state;

        if (step === 1)
            return (<PersonalInfo
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                firstName={firstName}
                lastName={lastName}
            />);
        if (step === 2)
            return (<JobDetails
                onSelectLanguage1={this.handleLanguage1}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                jobTitle={jobTitle}
                jobCompany={jobCompany}
                jobLocation={jobLocation}
            />);
        if (step === 3)
            return (<AllInfo
                onSelectLanguage={this.handleLanguage}
                firstName={firstName}
                lastName={lastName}
                jobTitle={jobTitle}
                jobCompany={jobCompany}
                jobLocation={jobLocation}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
            />);
        if (step === 4)
            return (<SelectDoctor
                dataa={language}
                dataaa={lang}
                firstName={firstName}
                lastName={lastName}
                jobTitle={jobTitle}
                jobCompany={jobCompany}
                jobLocation={jobLocation}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
            />);
        if (step === 5)
            return (<Form5
                dataa={language}
                dataaa={lang}
                firstName={firstName}
                lastName={lastName}
                jobTitle={jobTitle}
                jobCompany={jobCompany}
                jobLocation={jobLocation}
                nextStep={this.nextStep}
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


                <h1 style={myst1}>Step {step} of 5.</h1>
                {this.showStep()}


            </>
        );
    }
}

export default StepForm;