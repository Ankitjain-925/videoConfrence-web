import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FatiqueQuestion from '../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions';
import DateFormat from 'Screens/Components/DateFormat/index';
import { getLanguage } from 'translations/index';

function Index(props) {
  let translate = getLanguage(props.stateLanguageType);
  const {
    when_did_the_symptoms_begin,
    Do_you_suffer_from_vomiting,
    temperature_please_tell_me_in_C,
    environment_suffer_from_the_same_symtoms,
    keep_liquids_with_you,
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
            name="diarrhea_symptoms_begin"
            value={
              props.updateQues?.diarrhea_symptoms_begin
                ? new Date(props.updateQues?.diarrhea_symptoms_begin)
                : new Date()
            }
            max={new Date()}
            onChange={(e) =>
              props.updateAllEntrySec(e, 'diarrhea_symptoms_begin')
            }
            // date_format={
            //   this.props.settings &&
            //   this.props.settings.setting &&
            //   this.props.settings.setting.date_format
            // }
            NotFutureDate={true}
          />
          {props.error_section == 21 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}
        </Grid>
      </Grid>
      <Grid className="fatiqueQues fatiqueQuess1">
        <FatiqueQuestion
          updateAllEntrySec={(e) =>
            props.updateAllEntrySec(e, 'diarrhea_suffer_from_vomiting')
          }
          label={Do_you_suffer_from_vomiting}
          value={props.updateQues?.diarrhea_suffer_from_vomiting}
        />
      </Grid>
      {props.error_section == 22 && (
        <div className="err_message2">{props.errorChrMsg}</div>
      )}
      <Grid className="bgncmnSpc">
        <Grid className="textFieldArea1">
          <Grid className="bgncmnLbl">
            <label>{temperature_please_tell_me_in_C}</label>
          </Grid>
          <Grid>
            <input
              type="number"
              placeholder="36.6"
              name="diarrhea_body_temp"
              onChange={(e) =>
                props.updateAllEntrySec1(e, 'diarrhea_body_temp')
              }
              // className={forError ? 'setRedColor' : ''}
              value={props.updateQues?.diarrhea_body_temp}
            />
            {props.error_section == 23 && (
              <div className="err_message2">{props.errorChrMsg}</div>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid className="fatiqueQues fatiqueQuess1">
        <FatiqueQuestion
          updateAllEntrySec={(e) =>
            props.updateAllEntrySec(e, 'diarrhea_envi_suffer_symtoms')
          }
          label={environment_suffer_from_the_same_symtoms}
          value={props.updateQues?.diarrhea_envi_suffer_symtoms}
        />
      </Grid>
      {props.error_section == 24 && (
        <div className="err_message2">{props.errorChrMsg}</div>
      )}
      <Grid className="bgncmnSpcRmv sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'diarrhea_liquids_with_you')
            }
            label={keep_liquids_with_you}
            value={props.updateQues?.diarrhea_liquids_with_you}
          />
        </Grid>
        {props.error_section == 25 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
    </Grid>
  );
}

export default Index;
