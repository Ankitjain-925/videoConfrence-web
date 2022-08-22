import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FatiqueQuestion from '../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions';
import Checkbox from '@material-ui/core/Checkbox';
import PainIntensity from 'Screens/Components/PainIntansity/index';
import DateFormat from 'Screens/Components/DateFormat/index';
import NotesEditor from '../../Components/Editor/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getLanguage } from 'translations/index';

function Index(props) {
  let translate = getLanguage(props.stateLanguageType);
  const {
    when_did_the_symptoms_begin,
    in_move_throughout_the_day,
    top,
    low,
    value_Number_in_C,
    you_describe_the_intensity,
    do_you_have_a_cough,
    hoarseness,
    cold,
    sputum_what_consistency_and_color,
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
            name="fever_symptoms_begin"
            value={
              props.updateQues?.fever_symptoms_begin
                ? new Date(props.updateQues?.fever_symptoms_begin)
                : new Date()
            }
            max={new Date()}
            onChange={(e) => props.updateAllEntrySec(e, 'fever_symptoms_begin')}
            // date_format={
            //   this.props.settings &&
            //   this.props.settings.setting &&
            //   this.props.settings.setting.date_format
            // }
            NotFutureDate={true}
          />
          {props.error_section == 26 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}
        </Grid>
      </Grid>
      <Grid className="textFieldArea1">
        <Grid className="bgncmnSpc">
          <Grid>
            <Grid className="bgncmnLbl">
              <label>{in_move_throughout_the_day}</label>
            </Grid>
            <Grid>
              <label>
                {top} {value_Number_in_C}
              </label>
              <input
                type="number"
                placeholder="40.5"
                name="fever_top_body_temp"
                onChange={(e) =>
                  props.updateAllEntrySec1(e, 'fever_top_body_temp')
                }
                // className={forError ? 'setRedColor' : ''}
                value={props.updateQues?.fever_top_body_temp}
              />
              {props.error_section == 27 && (
                <div className="err_message2">{props.errorChrMsg}</div>
              )}
            </Grid>
          </Grid>
          <Grid>
            <Grid>
              <label>
                {low} {value_Number_in_C}
              </label>
            </Grid>
            <Grid>
              <input
                type="number"
                placeholder="36.6"
                name="fever_low_body_temp"
                onChange={(e) =>
                  props.updateAllEntrySec1(e, 'fever_low_body_temp')
                }
                // className={forError ? 'setRedColor' : ''}
                value={props.updateQues?.fever_low_body_temp}
              />
              {props.error_section == 28 && (
                <div className="err_message2">{props.errorChrMsg}</div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid className="bgncmnSpc">
        <Grid className="bgncmnLbl">
          <label>{you_describe_the_intensity}</label>
        </Grid>
        <PainIntensity
          name="fever_pain_intensity"
          onChange={(e) => props.updateAllEntrySec1(e)}
          value={Math.round(props.updateQues?.fever_pain_intensity)}
          // setting={this.props.settings}
          comesFrom="Evalute"
        />
        {props.error_section == 29 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
      <Grid className="fatiqueQues fatiqueQuess1">
        <FatiqueQuestion
          updateAllEntrySec={(e) =>
            props.updateAllEntrySec(e, 'fever_have_a_cough')
          }
          label={do_you_have_a_cough}
          value={props.updateQues?.fever_have_a_cough}
        />
        {props.error_section == 75 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
      {props.updateQues && props.updateQues?.fever_have_a_cough === 'yes' && (
        <Grid className="fatiqueQues">
          <Grid className="bgncmnSpc">
            <Grid container direction="row" justify="center">
              <Grid item xs={12} md={12}>
                <Grid container direction="row" justify="center">
                  <Grid item xs={4} md={4}>
                    <Grid className="sickCheckSec">
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="fever_cold"
                            value={
                              props.updateQues &&
                              props.updateQues?.fever_cold &&
                              props.updateQues?.fever_cold == true
                                ? false
                                : true
                            }
                            color="#00ABAF"
                            checked={props.updateQues?.fever_cold}
                            onChange={(e) => {
                              props.updateAllEntrySec2(e);
                            }}
                            className="PIC_Condition"
                          />
                        }
                        label={cold}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <Grid className="sickCheckSec">
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="fever_hoarseness"
                            value={
                              props.updateQues &&
                              props.updateQues?.fever_hoarseness &&
                              props.updateQues?.fever_hoarseness == true
                                ? false
                                : true
                            }
                            color="#00ABAF"
                            checked={props.updateQues?.fever_hoarseness}
                            onChange={(e) => {
                              props.updateAllEntrySec2(e);
                            }}
                            className="PIC_Condition"
                          />
                        }
                        label={hoarseness}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={4} md={4}></Grid>
                </Grid>
                {props.error_section == 76 && (
                  <div className="err_message2">{props.errorChrMsg}</div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid className="fillDiaAll">
        <label>{sputum_what_consistency_and_color}</label>
        <NotesEditor
          name="fever_sputum"
          onChange={(e) => props.updateAllEntrySec(e, 'fever_sputum')}
          value={props.updateQues?.fever_sputum}
        />
        {props.error_section == 30 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
    </Grid>
  );
}

export default Index;
