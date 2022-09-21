import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { getLanguage } from 'translations/index';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { S3Image } from "Screens/Components/GetS3Images/index";
import SymptomQuestions from '../../Components/TimelineComponent/CovidSymptomsField/SymptomQuestions';

class SuccessMsg extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  back = e => {
    e.preventDefault();
    this.props.prevStep();

  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }

  updateAllEntrySec = (e, name) => {
    this.setState({ showQuestion: e });
  };

  render() {
    const { dataa } = this.props;
    let translate = getLanguage(this?.props?.redux_st?.stateLanguageType);
    let {
      my_profile,
      Security
    } = translate;
    return (
      <Grid>
        {/* Start of Bread Crumb */}
        <Grid container direction="row" alignItems="center">
          <Grid item xs={12} md={12}  >
            <div className='succss-pg'>
        <img src={require('assets/virtual_images/Step.png')} />
        <div className='success-header'>
          Top up successfully processed!
        </div>
        <div className='success-sub-heading'>
          120 minutes will be instantly added to your Aimedis balance.
        </div>
        <button className='success-button'>Close</button>
      </div>
          </Grid>
        </Grid>
      </Grid>

    );
  }
}
export default SuccessMsg;