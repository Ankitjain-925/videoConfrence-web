import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FatiqueQuestion from '../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions';
import PainIntensity from 'Screens/Components/PainIntansity/index';
import DateFormat from 'Screens/Components/DateFormat/index';
import { getLanguage } from 'translations/index';

function Index(props) {
  let translate = getLanguage(props.stateLanguageType);
  const {
    when_did_the_symptoms_begin,
    you_describe_the_intensity,
    do_you_sleep,
    you_have_suicidal_thoughts_or,
    hurt_yourself_once,
  } = translate;
  useEffect(() => {}, []);

  return (
    <Grid className="borderLineAfer">
      <Grid className="bgncmnSpc">
        <Grid className="bgncmnLbl">
          <label>{when_did_the_symptoms_begin}</label>
        </Grid>
        <Grid>
          <DateFormat
            name="depressed_symptoms_begin"
            value={
              props.updateQues?.depressed_symptoms_begin
                ? new Date(props.updateQues?.depressed_symptoms_begin)
                : new Date()
            }
            max={new Date()}
            onChange={(e) =>
              props.updateAllEntrySec(e, 'depressed_symptoms_begin')
            }
            // date_format={
            //   this.props.settings &&
            //   this.props.settings.setting &&
            //   this.props.settings.setting.date_format
            // }
            NotFutureDate={true}
          />
          {props.error_section == 39 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}

        </Grid>
      </Grid>

      <Grid className="bgncmnSpc">
        <Grid className="bgncmnLbl">
          <label>{you_describe_the_intensity}</label>
        </Grid>
        <PainIntensity
          name="depressed_pain_intensity"
          onChange={(e) => props.updateAllEntrySec1(e)}
          value={Math.round(props.updateQues?.depressed_pain_intensity)}
          // setting={this.props.settings}
          comesFrom="Evalute"
        />
        {props.error_section == 40 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
      <Grid className="fatiqueQues fatiqueQuess1">
        <FatiqueQuestion
          updateAllEntrySec={(e) =>
            props.updateAllEntrySec(e, 'depressed_do_you_sleep')
          }
          label={do_you_sleep}
          value={props.updateQues?.depressed_do_you_sleep}
        />
      </Grid>
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'depressed_suicidal_thoughts')
            }
            label={you_have_suicidal_thoughts_or}
            value={props.updateQues?.depressed_suicidal_thoughts}
          />
        </Grid>
      </Grid>
      <Grid className="bgncmnSpcRmv sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'depressed_hurt_yourself')
            }
            label={hurt_yourself_once}
            value={props.updateQues?.depressed_hurt_yourself}
          />
        </Grid>
        {props.error_section == 41 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
    </Grid>
  );
}

export default Index;
