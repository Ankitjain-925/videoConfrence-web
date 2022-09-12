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
mainState:{},
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


    handleLanguage = (langValue) => {
        const state=this.state.mainState;
        state["language"]=langValue;
        this.setState({ mainState:state });
    }

    handleLanguage1 = (lang) => {
        const state=this.state.mainState;
        state["lang"]=lang;
        this.setState({ mainState:state });
    }

    handleLanguage2 = (lang1) => {
        this.setState({ lang: lang1 });
    }

    showStep = () => {
        const { step, language, lang, mainState } = this.state;

        if (step === 1)
            return (<PersonalInfo
                onSelectLanguage2={this.handleLanguage2}
                nextStep={this.nextStep}
            />);
        if (step === 2)
            return (<JobDetails
                onSelectLanguage1={this.handleLanguage1}
                nextStep={this.nextStep}
                prevStep={this.prevStep}
            />);
        if (step === 3)
            return (<AllInfo
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