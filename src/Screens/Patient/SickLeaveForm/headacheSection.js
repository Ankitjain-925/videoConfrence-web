import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FatiqueQuestion from '../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions';
import Checkbox from '@material-ui/core/Checkbox';
import MMHG from 'Screens/Components/mmHgField/index';
import PainIntensity from 'Screens/Components/PainIntansity/index';
import SymptomQuestions from '../../Components/TimelineComponent/CovidSymptomsField/SymptomQuestions';
import SelectByTwo from 'Screens/Components/SelectbyTwo/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getLanguage } from 'translations/index';



function Index(props) {
  let translate = getLanguage(props.stateLanguageType);
  const {
    where_did_the_pain_begin,
    back,
    front,
    left,
    right,
    top,
    where_does_it_hurt_now,
    what_is_your_blood_pressure,
    rr_systolic,
    RR_diastolic,
    temperature_please_tell_me_in_C,
    do_you_have_diabetes,
    blood_sugar,
    Hba1c,
    situation,
    describe_the_quality_of_pain,
    do_you_need_to_vomit,
    before_the_onset_of_pain,
    do_you_take_painkillers,
    you_describe_the_intensity,
    undergoing_treatment,
  } = translate;
  return (
    <Grid className="borderLineAfer">
      <Grid className="bgncmnSpc">
        <Grid className="bgncmnLbl">
          <label>{where_did_the_pain_begin}</label>
        </Grid>
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12}>
            <Grid container direction="row" justify="center">
              <Grid item xs={6} sm={6} md={2}>
                <Grid className="sickCheckSec">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="headache_painbegin_back"
                        value={
                          props.updateQues &&
                          props.updateQues?.headache_painbegin_back &&
                          props.updateQues?.headache_painbegin_back == true
                            ? false
                            : true
                        }
                        color="#00ABAF"
                        checked={props.updateQues?.headache_painbegin_back}
                        onChange={(e) => {
                          props.updateAllEntrySec2(e);
                        }}
                        className="PIC_Condition"
                      />
                    }
                    label={back}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Grid className="sickCheckSec">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="headache_painbegin_front"
                        value={
                          props.updateQues &&
                          props.updateQues?.headache_painbegin_front &&
                          props.updateQues?.headache_painbegin_front == true
                            ? false
                            : true
                        }
                        color="#00ABAF"
                        checked={props.updateQues?.headache_painbegin_front}
                        onChange={(e) => {
                          props.updateAllEntrySec2(e);
                        }}
                        className="PIC_Condition"
                      />
                    }
                    label={front}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Grid className="sickCheckSec">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="headache_painbegin_left"
                        value={
                          props.updateQues &&
                          props.updateQues?.headache_painbegin_left &&
                          props.updateQues?.headache_painbegin_left == true
                            ? false
                            : true
                        }
                        color="#00ABAF"
                        checked={props.updateQues?.headache_painbegin_left}
                        onChange={(e) => {
                          props.updateAllEntrySec2(e);
                        }}
                        className="PIC_Condition"
                      />
                    }
                    label={left}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Grid className="sickCheckSec">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="headache_painbegin_right"
                        value={
                          props.updateQues &&
                          props.updateQues?.headache_painbegin_right &&
                          props.updateQues?.headache_painbegin_right == true
                            ? false
                            : true
                        }
                        color="#00ABAF"
                        checked={props.updateQues?.headache_painbegin_right}
                        onChange={(e) => {
                          props.updateAllEntrySec2(e);
                        }}
                        className="PIC_Condition"
                      />
                    }
                    label={right}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Grid className="sickCheckSec">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="headache_painbegin_top"
                        value={
                          props.updateQues &&
                          props.updateQues?.headache_painbegin_top &&
                          props.updateQues?.headache_painbegin_top == true
                            ? false
                            : true
                        }
                        color="#00ABAF"
                        checked={props.updateQues?.headache_painbegin_top}
                        onChange={(e) => {
                          props.updateAllEntrySec2(e);
                        }}
                        className="PIC_Condition"
                      />
                    }
                    label={top}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6} md={2}></Grid>
            </Grid>
            {props.error_section == 1 && (
              <div className="err_message2">{props.errorChrMsg}</div>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid className="bgncmnSpc">
        <Grid className="bgncmnLbl">
          <label>{where_does_it_hurt_now}</label>
        </Grid>
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12}>
            <Grid container direction="row" justify="center">
              <Grid item xs={6} sm={6} md={2}>
                <Grid className="sickCheckSec">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="headache_hurtnow_back"
                        value={
                          props.updateQues &&
                          props.updateQues?.headache_hurtnow_back &&
                          props.updateQues?.headache_hurtnow_back == true
                            ? false
                            : true
                        }
                        color="#00ABAF"
                        checked={props.updateQues?.headache_hurtnow_back}
                        onChange={(e) => {
                          props.updateAllEntrySec2(e);
                        }}
                        className="PIC_Condition"
                      />
                    }
                    label={back}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Grid className="sickCheckSec">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="headache_hurtnow_front"
                        value={
                          props.updateQues &&
                          props.updateQues?.headache_hurtnow_front &&
                          props.updateQues?.headache_hurtnow_front == true
                            ? false
                            : true
                        }
                        color="#00ABAF"
                        checked={props.updateQues?.headache_hurtnow_front}
                        onChange={(e) => {
                          props.updateAllEntrySec2(e);
                        }}
                        className="PIC_Condition"
                      />
                    }
                    label={front}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Grid className="sickCheckSec">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="headache_hurtnow_left"
                        value={
                          props.updateQues &&
                          props.updateQues?.headache_hurtnow_left &&
                          props.updateQues?.headache_hurtnow_left == true
                            ? false
                            : true
                        }
                        color="#00ABAF"
                        checked={props.updateQues?.headache_hurtnow_left}
                        onChange={(e) => {
                          props.updateAllEntrySec2(e);
                        }}
                        className="PIC_Condition"
                      />
                    }
                    label={left}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Grid className="sickCheckSec">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="headache_hurtnow_right"
                        value={
                          props.updateQues &&
                          props.updateQues?.headache_hurtnow_right &&
                          props.updateQues?.headache_hurtnow_right == true
                            ? false
                            : true
                        }
                        color="#00ABAF"
                        checked={props.updateQues?.headache_hurtnow_right}
                        onChange={(e) => {
                          props.updateAllEntrySec2(e);
                        }}
                        className="PIC_Condition"
                      />
                    }
                    label={right}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Grid className="sickCheckSec">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="headache_hurtnow_top"
                        value={
                          props.updateQues &&
                          props.updateQues?.headache_hurtnow_top &&
                          props.updateQues?.headache_hurtnow_top == true
                            ? false
                            : true
                        }
                        color="#00ABAF"
                        checked={props.updateQues?.headache_hurtnow_top}
                        onChange={(e) => {
                          props.updateAllEntrySec2(e);
                        }}
                        className="PIC_Condition"
                      />
                    }
                    label={top}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6} sm={6} md={2}></Grid>
            </Grid>
            {props.error_section == 2 && (
              <div className="err_message2">{props.errorChrMsg}</div>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid className="bgncmnSpc">
        <Grid className="bgncmnLbl">
          <label>{what_is_your_blood_pressure}</label>
        </Grid>
        <Grid container direction="row" spacing="1">
          <Grid item md={6} sm={6}>
            <Grid className="fillDia">
              <MMHG
                name="headache_rr_systolic"
                Unit="mmHg"
                label={rr_systolic}
                onChange={(e) => props.updateAllEntrySec1(e)}
                value={
                  props.updateQues?.headache == 'yes'
                    ? props.updateQues?.headache_rr_systolic
                    : ''
                }
              />
            </Grid>
            {props.error_section == 3 && (
              <div className="err_message2">{props.errorChrMsg}</div>
            )}
          </Grid>
          <Grid item md={6} sm={6}>
            <Grid className="fillDia">
              <MMHG
                name="headache_rr_diastolic"
                Unit="mmHg"
                label={RR_diastolic}
                onChange={(e) => props.updateAllEntrySec1(e)}
                value={props.updateQues?.headache_rr_diastolic}
              />
            </Grid>
            {props.error_section == 4 && (
              <div className="err_message2">{props.errorChrMsg}</div>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid className="bgncmnSpc">
        <Grid className="textFieldArea1">
          <Grid className="bgncmnLbl">
            <label>{temperature_please_tell_me_in_C}</label>
          </Grid>
          <input
            type="number"
            placeholder="36.6"
            name="headache_body_temp"
            onChange={(e) => props.updateAllEntrySec1(e, 'headache_body_temp')}
            // className={forError ? 'setRedColor' : ''}
            value={props.updateQues?.headache_body_temp}
          ></input>
          {props.error_section == 5 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}
        </Grid>
      </Grid>

      <Grid className="bgncmnSpc">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'headache_have_diabetes')
            }
            label={do_you_have_diabetes}
            value={props.updateQues?.headache_have_diabetes}
          />
        </Grid>
        {props.error_section == 46 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
        {props.updateQues &&
          props.updateQues?.headache_have_diabetes === 'yes' && (
            <>
              <Grid container direction="row" spacing="1">
                <Grid item md={6} sm={6}>
                  <Grid className="fillDia">
                    <MMHG
                      name="headache_blood_sugar"
                      Unit="mg/dl"
                      label={blood_sugar}
                      onChange={(e) => props.updateAllEntrySec1(e)}
                      value={props.updateQues?.headache_blood_sugar}
                    />
                  </Grid>
                  {props.error_section == 47 && (
                    <div className="err_message2">{props.errorChrMsg}</div>
                  )}
                </Grid>
                <Grid item md={6} sm={6}>
                  <Grid className="fillDia">
                    <MMHG
                      name="headache_Hba1c"
                      Unit="%"
                      label={Hba1c}
                      onChange={(e) => props.updateAllEntrySec1(e)}
                      value={props.updateQues?.headache_Hba1c}
                    />
                  </Grid>
                  {props.error_section == 56 && (
                    <div className="err_message2">{props.errorChrMsg}</div>
                  )}
                </Grid>
              </Grid>
              <Grid className="fillDia">
                <SelectByTwo
                  name="headache_situation"
                  label={situation}
                  options={props.Allsituation}
                  onChange={(e) =>
                    props.updateAllEntrySec(e, 'headache_situation')
                  }
                  value={props.updateQues?.headache_situation}
                />
              </Grid>
            </>
          )}
      </Grid>

      <Grid className="bgncmnSpc">
        <Grid className="fillDiaAll">
          {/* <label>
        How would you describe the quality of pain?
        (Throbbing, stinging ...)
    </label>
        <NotesEditor
        name="quality_of_pain"
        onChange={(e) =>
        props.updateAllEntrySec(e, 'quality_of_pain')
        }
        value={props.updateQues?.quality_of_pain}
    />  */}
          <SymptomQuestions
            updateEntryState1={(e) =>
              props.updateAllEntrySec(e, 'headache_quality_of_pain')
            }
           
            comesFrom="Feedback"
            label={describe_the_quality_of_pain}
            value={props.updateQues?.headache_quality_of_pain}
          />
          {props.error_section == 6 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}
        </Grid>
      </Grid>
      <Grid className="bgncmnSpc">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'headache_need_to_vomit')
            }
            label={do_you_need_to_vomit}
            value={props.updateQues?.headache_need_to_vomit}
          />
        </Grid>
      </Grid>
      <Grid className="bgncmnSpc">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'headache_onset_of_pain')
            }
            label={before_the_onset_of_pain}
            value={props.updateQues?.headache_onset_of_pain}
          />
        </Grid>
      </Grid>
      <Grid className="bgncmnSpc">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'headache_take_painkillers')
            }
            label={do_you_take_painkillers}
            value={props.updateQues?.headache_take_painkillers}
          />
        </Grid>
        {props.error_section == 7 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
      <Grid className="bgncmnSpc">
        <label>{you_describe_the_intensity}</label>
        <PainIntensity
          name="headache_pain_intensity"
          onChange={(e) => props.updateAllEntrySec1(e)}
          value={Math.round(props.updateQues?.headache_pain_intensity)}
          // setting={this.props.settings}
          comesFrom="Evalute"
        />
        {props.error_section == 10 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
      <Grid className="bgncmnSpcRmv">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'headache_undergoing_treatment')
            }
            label={undergoing_treatment}
            value={props.updateQues?.headache_undergoing_treatment}
          />
        </Grid>
        {props.error_section == 11 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
    </Grid>
  );
  
}

export default Index;
