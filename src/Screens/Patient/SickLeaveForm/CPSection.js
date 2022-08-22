import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FatiqueQuestion from '../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions';
import MMHG from 'Screens/Components/mmHgField/index';
import { getLanguage } from 'translations/index';

function Index(props) {
  let translate = getLanguage(props.stateLanguageType);
  const {
    what_is_your_blood_pressure,
    had_a_heart_attack,
    diagnosed_Heart_failure,
    do_you_have_dizziness,
    do_you_have_shoulder_pain,
    rr_systolic,
    RR_diastolic,
  } = translate;

  return (
    <Grid className="borderLineAfer">
      <Grid className="bgncmnSpc">
        <Grid className="bgncmnLbl">
          <label>{what_is_your_blood_pressure}</label>
        </Grid>
        <Grid container direction="row" spacing="1">
          <Grid item md={6} sm={6}>
            <Grid className="fillDia">
              <MMHG
                name="cardiac_rr_systolic"
                Unit="mmHg"
                label={rr_systolic}
                onChange={(e) => props.updateAllEntrySec1(e)}
                value={props.updateQues?.cardiac_rr_systolic}
              />
            </Grid>
            {props.error_section == 42 && (
              <div className="err_message2">{props.errorChrMsg}</div>
            )}
          </Grid>
          <Grid item md={6} sm={6}>
            <Grid className="fillDia">
              <MMHG
                name="cardiac_rr_diastolic"
                Unit="mmHg"
                label={RR_diastolic}
                onChange={(e) => props.updateAllEntrySec1(e)}
                value={props.updateQues?.cardiac_rr_diastolic}
              />
            </Grid>
            {props.error_section == 43 && (
              <div className="err_message2">{props.errorChrMsg}</div>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid className="fatiqueQues fatiqueQuess1">
        <FatiqueQuestion
          updateAllEntrySec={(e) =>
            props.updateAllEntrySec(e, 'cardiac_heart_attack')
          }
          label={had_a_heart_attack}
          value={props.updateQues?.cardiac_heart_attack}
        />
      </Grid>
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'cardiac_heart_failure')
            }
            label={diagnosed_Heart_failure}
            value={props.updateQues?.cardiac_heart_failure}
          />
        </Grid>
      </Grid>
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'cardiac_have_dizziness')
            }
            label={do_you_have_dizziness}
            value={props.updateQues?.cardiac_have_dizziness}
          />
        </Grid>
      </Grid>
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'cardiac_have_shoulder_pain')
            }
            label={do_you_have_shoulder_pain}
            value={props.updateQues?.cardiac_have_shoulder_pain}
          />
        </Grid>
      </Grid>
      {props.error_section == 44 && (
        <div className="err_message2">{props.errorChrMsg}</div>
      )}
    </Grid>
  );
}

export default Index;
