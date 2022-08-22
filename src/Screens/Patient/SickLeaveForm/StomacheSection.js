import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FatiqueQuestion from '../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions';
import MMHG from 'Screens/Components/mmHgField/index';
import PainIntensity from 'Screens/Components/PainIntansity/index';
import SelectByTwo from 'Screens/Components/SelectbyTwo/index';
import PainPoint from '../../Components/PointPain/index';
import { getLanguage } from 'translations/index';

function Index(props) {
  let translate = getLanguage(props.stateLanguageType);
  const {
    do_you_have_diabetes,
    Do_you_suffer_from_high_or_low_blood,
    diagnosed_Heart_failure,
    had_a_heart_attack,
    where_did_the_pain_begin,
    where_does_it_hurt_now,
    pain_behind_the_sternum,
    RR_diastolic,
    rr_systolic,
    occur_continuously_or_periodically,
    undergoing_treatment_for_this_Problem,
    you_describe_the_intensity,
    do_you_take_painkillers,
    temperature_please_tell_me_in_C,
    situation,
    Hba1c,
    blood_sugar,
  } = translate;
  useEffect(() => {}, []);

  return (
    <Grid className="borderLineAfer">
      <Grid className="fillDia">
        <Grid className="bgncmnSpc">
          <Grid className="bgncmnLbl">
            <label>{where_did_the_pain_begin}</label>
          </Grid>
          <PainPoint
            id="New_id1"
            gender={props.user?.sex}
            painPoint={
              props.updateQues && props.updateQues?.stomach_painbegin_painPoint
                ? props.updateQues.stomach_painbegin_painPoint
                : []
            }
            onChange={(e) =>
              props.updateAllEntrySec(e, 'stomach_painbegin_painPoint')
            }
          />
          {props.error_section == 12 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}
        </Grid>
      </Grid>
      <Grid className="fillDia">
        <Grid className="bgncmnSpc">
          <Grid className="bgncmnLbl">
            <label>{where_does_it_hurt_now}</label>
          </Grid>
          <PainPoint
            id="New_id2"
            gender={props.user?.sex}
            painPoint={
              props.updateQues && props.updateQues?.stomach_hurtnow_painPoint
                ? props.updateQues?.stomach_hurtnow_painPoint
                : []
            }
            onChange={(e) =>
              props.updateAllEntrySec(e, 'stomach_hurtnow_painPoint')
            }
          />
          {props.error_section == 13 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}
        </Grid>
      </Grid>
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'stomach_behind_the_sternum', 2)
            }
            label={pain_behind_the_sternum}
            value={props.updateQues?.stomach_behind_the_sternum}
          />
        </Grid>
      </Grid>
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'stomach_heart_attack')
            }
            label={had_a_heart_attack}
            value={props.updateQues?.stomach_heart_attack}
          />
        </Grid>
      </Grid>
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'stomach_heart_failure')
            }
            label={diagnosed_Heart_failure}
            value={props.updateQues?.stomach_heart_failure}
          />
        </Grid>
      </Grid>
      {props.error_section == 8 && (
        <div className="err_message2">{props.errorChrMsg}</div>
      )}
      <Grid className="haveCmnSpc">
        <Grid className="bgncmnLbl">
          <label>{Do_you_suffer_from_high_or_low_blood}</label>
        </Grid>
        <Grid container direction="row" spacing="1">
          <Grid item md={6} sm={6}>
            <Grid className="fillDia">
              <MMHG
                name="stomach_rr_systolic"
                Unit="mmHg"
                label={rr_systolic}
                onChange={(e) => props.updateAllEntrySec1(e)}
                value={props.updateQues?.stomach_rr_systolic}
              />
            </Grid>
            {props.error_section == 14 && (
              <div className="err_message2">{props.errorChrMsg}</div>
            )}
          </Grid>
          <Grid item md={6} sm={6}>
            <Grid className="fillDia">
              <MMHG
                name="stomach_rr_diastolic"
                Unit="mmHg"
                label={RR_diastolic}
                onChange={(e) => props.updateAllEntrySec1(e)}
                value={props.updateQues?.stomach_rr_diastolic}
              />
            </Grid>
            {props.error_section == 15 && (
              <div className="err_message2">{props.errorChrMsg}</div>
            )}
          </Grid>
        </Grid>
      </Grid>{' '}
      <Grid className="fatiqueQues fatiqueQuess1">
        <FatiqueQuestion
          updateAllEntrySec={(e) =>
            props.updateAllEntrySec(e, 'stomach_have_diabetes')
          }
          label={do_you_have_diabetes}
          value={props.updateQues?.stomach_have_diabetes}
        />
        {props.error_section == 80 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
      {props.updateQues && props.updateQues?.stomach_have_diabetes === 'yes' && (
        <>
          <Grid container direction="row" spacing="1">
            <Grid item md={6} sm={6}>
              <Grid className="fillDia">
                <MMHG
                  name="stomach_blood_sugar"
                  Unit="mg/dl"
                  label={blood_sugar}
                  onChange={(e) => props.updateAllEntrySec1(e)}
                  value={props.updateQues?.stomach_blood_sugar}
                />
              </Grid>
              {props.error_section == 46 && (
                <div className="err_message2">{props.errorChrMsg}</div>
              )}
            </Grid>
            <Grid item md={6} sm={6}>
              <Grid className="fillDia">
                <MMHG
                  name="stomach_Hba1c"
                  Unit="%"
                  label={Hba1c}
                  onChange={(e) => props.updateAllEntrySec1(e)}
                  value={props.updateQues?.stomach_Hba1c}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid className="fillDia">
            <SelectByTwo
              name="stomach_situation"
              label={situation}
              options={props.Allsituation}
              onChange={(e) => props.updateAllEntrySec(e, 'stomach_situation')}
              value={props.updateQues?.stomach_situation}
            />
          </Grid>
        </>
      )}
      <Grid className="sickQuesSec">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'stomach_continuously_or_periodically')
            }
            label={occur_continuously_or_periodically}
            value={props.updateQues?.stomach_continuously_or_periodically}
          />
        </Grid>
      </Grid>
      {props.error_section == 16 && (
        <div className="err_message2">{props.errorChrMsg}</div>
      )}
      <Grid className="textFieldArea1">
        <Grid className="bgncmnSpc">
          <Grid className="bgncmnLbl">
            <label>{temperature_please_tell_me_in_C}</label>
          </Grid>
          <input
            type="number"
            placeholder="36.6"
            name="stomach_body_temp"
            onChange={(e) => props.updateAllEntrySec1(e)}
            // className={
            //   this.state.forError ? 'setRedColor' : ''
            // }
            value={props.updateQues?.stomach_body_temp}
          />
          {props.error_section == 17 && (
            <div className="err_message2">{props.errorChrMsg}</div>
          )}
        </Grid>
      </Grid>
      <Grid className="bgncmnSpc">
        <Grid className="fatiqueQues fatiqueQuess1">
          <FatiqueQuestion
            updateAllEntrySec={(e) =>
              props.updateAllEntrySec(e, 'stomach_take_painkillers')
            }
            label={do_you_take_painkillers}
            value={props.updateQues?.stomach_take_painkillers}
          />
        </Grid>

        {props.error_section == 18 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
      <Grid className="bgncmnSpc">
        <Grid className="bgncmnLbl">
          <label>{you_describe_the_intensity}</label>
        </Grid>
        <PainIntensity
          name="stomach_pain_intensity"
          onChange={(e) => props.updateAllEntrySec1(e)}
          value={Math.round(props.updateQues?.stomach_pain_intensity)}
          // setting={this.props.settings}
          comesFrom="Evalute"
        />
        {props.error_section == 19 && (
          <div className="err_message2">{props.errorChrMsg}</div>
        )}
      </Grid>
      <Grid className="fatiqueQues fatiqueQuess1">
        <FatiqueQuestion
          updateAllEntrySec={(e) =>
            props.updateAllEntrySec(e, 'stomach_undergoing_treatment')
          }
          label={undergoing_treatment_for_this_Problem}
          value={props.updateQues?.stomach_undergoing_treatment}
        />
      </Grid>
      {props.error_section == 20 && (
        <div className="err_message2">{props.errorChrMsg}</div>
      )}
    </Grid>
  );
}

export default Index;
