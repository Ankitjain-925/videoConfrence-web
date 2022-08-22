import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FatiqueQuestion from '../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions';
import NotesEditor from '../../Components/Editor/index';
import DateFormat from 'Screens/Components/DateFormat/index';
import { getLanguage } from 'translations/index';

function Index(props) {
  let translate = getLanguage(props.stateLanguageType);
  const {
    allergies_If_so_against_what,
    when_did_the_symptoms_begin,
    temperature_please_tell_me_in_C,
    environment_suffer_from_the_same_symtoms,
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
            name="cough_symptoms_begin"
            value={
              props.updateQues?.cough_symptoms_begin
                ? new Date(props.updateQues?.cough_symptoms_begin)
                : new Date()
            }
            max={new Date()}
            onChange={(e) => props.updateAllEntrySec(e, 'cough_symptoms_begin')}
            // date_format={
            //   this.props.settings &&
            //   this.props.settings.setting &&
            //   this.props.settings.setting.date_format
            // }
            NotFutureDate={true}
          />
          {props.error_section == 35 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}
        </Grid>
      </Grid>

      <Grid className="textFieldArea1">
        <Grid className="bgncmnSpc">
          <Grid className="bgncmnLbl">
            <label>{temperature_please_tell_me_in_C}</label>
          </Grid>
          <input
            type="number"
            placeholder="36.6"
            name="cough_body_temp"
            onChange={(e) => props.updateAllEntrySec1(e, 'cough_body_temp')}
            // className={forError ? 'setRedColor' : ''}
            value={props.updateQues?.cough_body_temp}
          ></input>
          {props.error_section == 36 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}
        </Grid>
      </Grid>

      <Grid className="bgncmnSpc">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'cough_envi_suffer_symtoms')
            }
            label={environment_suffer_from_the_same_symtoms}
            value={props.updateQues?.cough_envi_suffer_symtoms}
          />
        </Grid>
        {props.error_section == 37 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>

      <Grid className="fillDiaAll">
        <Grid>
          <Grid className="bgncmnLbl">
            <label>{allergies_If_so_against_what}</label>
          </Grid>
          <NotesEditor
            name="cough_suffer_from_allergies"
            onChange={(e) =>
              props.updateAllEntrySec(e, 'cough_suffer_from_allergies')
            }
            value={props.updateQues?.cough_suffer_from_allergies}
          />
          {props.error_section == 38 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Index;
