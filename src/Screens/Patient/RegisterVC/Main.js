import React, { Component } from 'react';
import PersonalInfo from './PersonalInfo';
import JobDetails from './JobDetails';
import AllInfo from './AllInfo';
import Step4 from './Step4';
import SelectDoctor from '../Dashboard/Selectdoctor';
import Form5 from '../SickLeaveForm/index'

import Grid from "@material-ui/core/Grid";

export class StepForm extends Component {
    state = {
        step: 1,
        mainState: {},
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


    handleLanguage = (langValue, i, search) => {
        const state = this.state.mainState;
        state["doctor_detail"] = langValue;
        state["doctor_index"] = i;
        console.log("hcfhgjhkj", langValue)
        state["doctor_search"] = search;
        this.setState({ mainState: state });
    }

    handleLanguage1 = (lang) => {
        console.log("lang",lang)
        const state = this.state.mainState;
        state["permission"] = lang;
        this.setState({ mainState: state });
    }

    handleLanguage2 = (lang2) => {
        const state = this.state.mainState;
        state["time"] = lang2;
        state["amount"] = lang2.value * 5;
        this.setState({ mainState: state });
    }


    // handleChange = input => e => {
    //     this.setState({[input]: e.target.value});
    // }

    showStep = () => {
        const { step, language, lang, mainState } = this.state;

        if (step === 1)
            return (<PersonalInfo
                dataa={mainState}
                onSelectLanguage2={this.handleLanguage2}
                nextStep={this.nextStep}
            />);
        if (step === 2)
            return (<JobDetails
                dataa={mainState}
                onSelectLanguage1={this.handleLanguage1}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
            />);
        if (step === 3)
            return (<AllInfo
                dataa={mainState}
                onSelectLanguage={this.handleLanguage}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
            />);
        if (step === 4)
            return (<SelectDoctor
                dataa={mainState}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
            />);
        if (step === 5)
            return (<Form5
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