import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Loader from 'Screens/Components/Loader/index';
import LeftMenu from 'Screens/Components/Menus/PatientLeftMenu/index';
import LeftMenuMobile from 'Screens/Components/Menus/PatientLeftMenu/mobile';
import FatiqueQuestion from '../../Components/TimelineComponent/CovidSymptomsField/FatiqueQuestions';
import Checkbox from '@material-ui/core/Checkbox';
import MMHG from 'Screens/Components/mmHgField/index';
import NotesEditor from '../../Components/Editor/index';
import PainIntensity from 'Screens/Components/PainIntansity/index';
import SymptomQuestions from '../../Components/TimelineComponent/CovidSymptomsField/SymptomQuestions';
import PainPoint from '../../Components/PointPain/index';
import SelectByTwo from 'Screens/Components/SelectbyTwo/index';
import DateFormat from 'Screens/Components/DateFormat/index';
import { OptionList } from 'Screens/Login/metadataaction';
import { GetLanguageDropdown } from 'Screens/Components/GetMetaData/index.js';
import MetaData from 'Screens/Hooks/MetaData';
import Setting from 'Screens/Hooks/Setting';
import Language from 'Screens/Hooks/Language';
import LoginReducerAim from 'Screens/Hooks/LoginReducerAim';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';
import sitedata from 'sitedata';
import {
  commonHeader,
  commonCometHeader,
  GetHouseID,
} from 'component/CommonHeader/index';
import Calendar2 from 'react-calendar';
// import { handleEvalSubmit } from './api';

function Index(props) {
  const [updateQues, setUpdateQues] = useState({});
  const [loaderImage, setloaderImage] = useState(false);
  const [Allsituation, setAllsituation] = useState({});
  const [error_section, setError_section] = useState(0);
  const [errorChrMsg, setErrorChrMsg] = useState('');
  const [DataprotectionRules, setDataprotectionRules] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [appointmentData, setAppointmentData] = useState({});
  const [appointDate, setAppointDate] = useState([]);
  const [apointDay, setApointDay] = useState({});
  const [date, setDate] = useState({});
  const [selectedDate, setSelectedDate] = useState({});
  const all_metadata = MetaData();
  const settings = Setting();
  const all_languages = Language();
  const all_LoginReducerAim = LoginReducerAim();

  useEffect(() => {
    GetLanguageMetadata();
    getCalendarData();
    onChange(new Date());
  }, [appointmentData]);

  // get sugar sitaution options
  const GetLanguageMetadata = () => {
    if (all_metadata) {
      var Allsituation = GetLanguageDropdown(
        all_metadata && all_metadata.situation,
        all_languages
      );
      setAllsituation(Allsituation);
    }
  };

  // Set the state of questions
  const updateAllEntrySec = (e, name) => {
    updateQues[name] = e;
    setUpdateQues({ ...updateQues });
  };

  const updateAllEntrySec1 = (e) => {
    updateQues[e.target.name] = e.target.value;
    setUpdateQues({ ...updateQues });
  };
  // Set the checkbox state
  const updateAllEntrySec2 = (e) => {
    if (e.target.name === 'DataprotectionRules') {
      setDataprotectionRules(e.target.value == 'true' ? true : false);
    } else {
      const state = updateQues;
      state[e.target.name] = e.target.value == 'true' ? true : false;
      setUpdateQues({ ...updateQues });
    }
  };

  // For scroll of every error message
  const MoveTop = (top) => {
    window.scroll({
      top: top,
      behavior: 'smooth',
    });
  };

  const ExitinHoliday = (date, h_start, h_end) => {
    if (h_start && h_end && date) {
      let start_date = new Date(h_start);
      let end_date = new Date(h_end);
      start_date = start_date.setHours(0, 0, 0, 0);
      end_date = end_date.setDate(end_date.getDate() + 1);
      end_date = new Date(end_date).setHours(0, 0, 0, 0);
      return (
        new Date(Date.parse(date.replace(/-/gm, '/'))) >= start_date &&
        new Date(Date.parse(date.replace(/-/gm, '/'))) < end_date
      );
    } else {
      return false;
    }
  };

  const Isintime = (currentTime, b_start, b_end) => {
    if (!currentTime || !b_end || !b_start) return false;
    let b_start_time, b_end_time, current_time, smint;
    b_start_time =
      parseInt(this._getHourMinut(b_start)[0]) * 60 +
      parseInt(this._getHourMinut(b_start)[1]);
    b_end_time =
      parseInt(this._getHourMinut(b_end)[0]) * 60 +
      parseInt(this._getHourMinut(b_end)[1]);
    current_time =
      parseInt(this._getHourMinut(currentTime)[0]) * 60 +
      parseInt(this._getHourMinut(currentTime)[1]);
    smint = parseInt(this._getHourMinut(currentTime)[1]);

    if (current_time >= b_start_time && current_time < b_end_time) {
      return true;
    } else {
      return false;
    }
  };

  const Availabledays = (date, days_upto) => {
    let current_date = new Date();
    let Newdate = new Date();
    if (date && days_upto) {
      current_date = new Date(current_date).setHours(0, 0, 0, 0);
      Newdate = Newdate.setDate(Newdate.getDate() + parseInt(days_upto));
      return (
        new Date(Date.parse(date.replace(/-/gm, '/'))) < current_date ||
        new Date(Date.parse(date.replace(/-/gm, '/'))) >= Newdate
      );
    } else {
      return false;
    }
  };

  const getCalendarData = () => {
    var user_token = all_LoginReducerAim.token;
    axios
      .get(
        sitedata.data.path + '/vactive/SelectDocforSickleave',
        commonHeader(user_token)
      )
      .then((response) => {
        if (
          response?.data &&
          response?.data?.data &&
          response?.data?.data[0]?.sickleave
        ) {
          var data = response?.data?.data[0]?.sickleave[0];
          setAppointmentData(data);
          setTimeout(() => onChange(new Date()), 200);
        }
      });
  };

  const onChange = (date) => {
    setDate(date);
    var day_num;
    var Month, date1;
    if (date !== undefined && date) {
      day_num = date.getDay();
      Month = date.getMonth() + 1;
      date1 = Month + '-' + date.getDate() + '-' + date.getFullYear();
    } else {
      date = new Date();
      day_num = date.getDay();
      Month = date.getMonth() + 1;
      date1 = Month + '-' + date.getDate() + '-' + date.getFullYear();
    }
    let days;
    switch (day_num) {
      case 1:
        days = 'monday';
        break;
      case 2:
        days = 'tuesday';
        break;
      case 3:
        days = 'wednesday';
        break;
      case 4:
        days = 'thursday';
        break;
      case 5:
        days = 'friday';
        break;
      case 6:
        days = 'saturday';
        break;
      case 0:
        days = 'sunday';
        break;
    }
    // let appointmentData = appointmentData;
    let appointDate1;
    if (appointmentData) {
      Object.entries(appointmentData).map(([key, value]) => {
        if (key == days) {
          appointDate1 = value;
        }
      });

      setAppointDate(appointDate1);
      setSelectedDate(date1);
      setApointDay(days);
    }
  };

  // Submit form details with validations
  const handleEvalSubmit = () => {
    setErrorChrMsg('');
    let data = {};
    data = updateQues;
    var due_on = data?.due_on || {};
    due_on['date'] = new Date();
    data.due_on = due_on;
    due_on['time'] = new Date();
    data.due_on = due_on;
    var patient = {
      first_name: all_LoginReducerAim.user?.first_name,
      last_name: all_LoginReducerAim.user?.last_name,
      alies_id: all_LoginReducerAim.user?.alies_id,
      profile_id: all_LoginReducerAim.user?.profile_id,
      user_id: all_LoginReducerAim.user?._id,
      image: all_LoginReducerAim.user.user?.image,
    };
    data.patient = patient;
    data.patient_id = all_LoginReducerAim.user?._id;
    data.task_name = 'Sick leave certificate from patient';
    data.task_type = 'sick_leave';
    data.done_on = '';
    data.priority = 0;
    data.archived = false;
    data.status = 'open';
    data.created_at = new Date();
    data.house_id = '60fabfe5b3394533f7f9a6dc-1639551688707';
    if (!data?.due_on?.date) {
      let due_on = data?.due_on || {};
      due_on['date'] = new Date();
      data.due_on = due_on;
    }
    if (!data?.due_on?.time) {
      let due_on = data?.due_on || {};
      due_on['time'] = new Date();
      data.due_on = due_on;
    }
    if (validatePainHeart1(data.headache, '', 'headache')) {
      if (validatePainHeart(data.headache, data, 'painbegin')) {
        if (validatePainHeart(data.headache, data, 'hurtnow')) {
          if (
            validatePainHeart(
              data.headache,
              data.headache_rr_systolic,
              'headache_rr_systolic'
            )
          ) {
            if (
              validatePainHeart(
                data.headache,
                data.headache_rr_diastolic,
                'headache_rr_diastolic'
              )
            ) {
              if (
                validatePainHeart(
                  data.headache,
                  data.headache_body_temp,
                  'headache_body_temp'
                )
              ) {
                if (
                  validatePainHeart(
                    data.headache,
                    data,
                    'headache_have_diabetes'
                  )
                ) {
                  if (
                    validatePainHeart(
                      data.headache,
                      data.headache_quality_of_pain,
                      'headache_quality_of_pain'
                    )
                  ) {
                    if (
                      validatePainHeart1(
                        data.headache,
                        data.headache_need_to_vomit,
                        'headache_need_to_vomit'
                      )
                    ) {
                      if (
                        validatePainHeart1(
                          data.headache,
                          data.headache_onset_of_pain,
                          'headache_onset_of_pain'
                        )
                      ) {
                        if (
                          validatePainHeart1(
                            data.headache,
                            data.headache_take_painkillers,
                            'headache_take_painkillers'
                          )
                        ) {
                          if (
                            validatePainHeart(
                              data.headache,
                              data.headache_pain_intensity,
                              'headache_pain_intensity'
                            )
                          ) {
                            if (
                              validatePainHeart(
                                data.headache,
                                data.headache_undergoing_treatment,
                                'headache_undergoing_treatment'
                              )
                            ) {
                              if (
                                validatePainHeart1(
                                  data.stomach_problems,
                                  data,
                                  'stomach_problems'
                                )
                              ) {
                                if (
                                  validatePainHeart(
                                    data.stomach_problems,
                                    data.stomach_painbegin_painPoint,
                                    'stomach_painbegin_painPoint'
                                  )
                                ) {
                                  if (
                                    validatePainHeart(
                                      data.stomach_problems,
                                      data.stomach_hurtnow_painPoint,
                                      'stomach_hurtnow_painPoint'
                                    )
                                  ) {
                                    if (
                                      validatePainHeart1(
                                        data.stomach_problems,
                                        data.stomach_behind_the_sternum,
                                        'stomach_behind_the_sternum'
                                      )
                                    ) {
                                      if (
                                        validatePainHeart1(
                                          data.stomach_problems,
                                          data.stomach_heart_attack,
                                          'stomach_heart_attack'
                                        )
                                      ) {
                                        if (
                                          validatePainHeart1(
                                            data.stomach_problems,
                                            data.stomach_heart_failure,
                                            'stomach_heart_failure'
                                          )
                                        ) {
                                          if (
                                            validatePainHeart(
                                              data.stomach_problems,
                                              data.stomach_rr_systolic,
                                              'stomach_rr_systolic'
                                            )
                                          ) {
                                            if (
                                              validatePainHeart(
                                                data.stomach_problems,
                                                data.stomach_rr_diastolic,
                                                'stomach_rr_diastolic'
                                              )
                                            ) {
                                              if (
                                                validatePainHeart(
                                                  data.stomach_problems,
                                                  data.stomach_continuously_or_periodically,
                                                  'stomach_continuously_or_periodically'
                                                )
                                              ) {
                                                if (
                                                  validatePainHeart(
                                                    data.stomach_problems,
                                                    data.stomach_body_temp,
                                                    'stomach_body_temp'
                                                  )
                                                ) {
                                                  if (
                                                    validatePainHeart(
                                                      data.stomach_problems,
                                                      data.stomach_take_painkillers,
                                                      'stomach_take_painkillers'
                                                    )
                                                  ) {
                                                    if (
                                                      validatePainHeart(
                                                        data.stomach_problems,
                                                        data.stomach_pain_intensity,
                                                        'stomach_pain_intensity'
                                                      )
                                                    ) {
                                                      if (
                                                        validatePainHeart(
                                                          data.stomach_problems,
                                                          data.stomach_undergoing_treatment,
                                                          'stomach_undergoing_treatment'
                                                        )
                                                      ) {
                                                        if (
                                                          validatePainHeart1(
                                                            data.diarrhea,
                                                            data,
                                                            'diarrhea'
                                                          )
                                                        ) {
                                                          if (
                                                            validatePainHeart(
                                                              data.diarrhea,
                                                              data.diarrhea_symptoms_begin,
                                                              'diarrhea_symptoms_begin'
                                                            )
                                                          ) {
                                                            if (
                                                              validatePainHeart(
                                                                data.diarrhea,
                                                                data.diarrhea_suffer_from_vomiting,
                                                                'diarrhea_suffer_from_vomiting'
                                                              )
                                                            ) {
                                                              if (
                                                                validatePainHeart(
                                                                  data.diarrhea,
                                                                  data.diarrhea_body_temp,
                                                                  'diarrhea_body_temp'
                                                                )
                                                              ) {
                                                                if (
                                                                  validatePainHeart(
                                                                    data.diarrhea,
                                                                    data.diarrhea_envi_suffer_symtoms,
                                                                    'diarrhea_envi_suffer_symtoms'
                                                                  )
                                                                ) {
                                                                  if (
                                                                    validatePainHeart(
                                                                      data.diarrhea,
                                                                      data.diarrhea_liquids_with_you,
                                                                      'diarrhea_liquids_with_you'
                                                                    )
                                                                  ) {
                                                                    if (
                                                                      validatePainHeart1(
                                                                        data.have_fever,
                                                                        data,
                                                                        'have_fever'
                                                                      )
                                                                    ) {
                                                                      if (
                                                                        validatePainHeart(
                                                                          data.have_fever,
                                                                          data.fever_symptoms_begin,
                                                                          'fever_symptoms_begin'
                                                                        )
                                                                      ) {
                                                                        if (
                                                                          validatePainHeart(
                                                                            data.have_fever,
                                                                            data.fever_top_body_temp,
                                                                            'fever_top_body_temp'
                                                                          )
                                                                        ) {
                                                                          if (
                                                                            validatePainHeart(
                                                                              data.have_fever,
                                                                              data.fever_low_body_temp,
                                                                              'fever_low_body_temp'
                                                                            )
                                                                          ) {
                                                                            if (
                                                                              validatePainHeart(
                                                                                data.have_fever,
                                                                                data.fever_pain_intensity,
                                                                                'fever_pain_intensity'
                                                                              )
                                                                            ) {
                                                                              if (
                                                                                validatePainHeart(
                                                                                  data.have_fever,
                                                                                  data.fever_sputum,
                                                                                  'fever_sputum'
                                                                                )
                                                                              ) {
                                                                                if (
                                                                                  validatePainHeart1(
                                                                                    data.back_pain,
                                                                                    data,
                                                                                    'back_pain'
                                                                                  )
                                                                                ) {
                                                                                  if (
                                                                                    validatePainHeart(
                                                                                      data.back_pain,
                                                                                      data.back_pain_symptoms_begin,
                                                                                      'back_pain_symptoms_begin'
                                                                                    )
                                                                                  ) {
                                                                                    if (
                                                                                      validatePainHeart(
                                                                                        data.back_pain,
                                                                                        data.back_pain_symptoms_begin,
                                                                                        'back_pain_symptoms_begin'
                                                                                      )
                                                                                    ) {
                                                                                      if (
                                                                                        validatePainHeart1(
                                                                                          data.back_pain,
                                                                                          data.back_pain_been_injured,
                                                                                          'back_pain_been_injured'
                                                                                        )
                                                                                      ) {
                                                                                        if (
                                                                                          validatePainHeart1(
                                                                                            data.back_pain,
                                                                                            data.back_pain_physically_strained,
                                                                                            'back_pain_physically_strained'
                                                                                          )
                                                                                        ) {
                                                                                          if (
                                                                                            validatePainHeart1(
                                                                                              data.back_pain,
                                                                                              data.back_pain_stress_depression,
                                                                                              'back_pain_stress_depression'
                                                                                            )
                                                                                          ) {
                                                                                            if (
                                                                                              validatePainHeart1(
                                                                                                data.back_pain,
                                                                                                data.back_pain_heart_attack,
                                                                                                'back_pain_heart_attack'
                                                                                              )
                                                                                            ) {
                                                                                              if (
                                                                                                validatePainHeart1(
                                                                                                  data.back_pain,
                                                                                                  data.back_pain_heart_failure,
                                                                                                  'back_pain_heart_failure'
                                                                                                )
                                                                                              ) {
                                                                                                if (
                                                                                                  validatePainHeart(
                                                                                                    data.back_pain,
                                                                                                    data.back_pain_rr_systolic,
                                                                                                    'back_pain_rr_systolic'
                                                                                                  )
                                                                                                ) {
                                                                                                  if (
                                                                                                    validatePainHeart(
                                                                                                      data.back_pain,
                                                                                                      data.back_pain_rr_diastolic,
                                                                                                      'back_pain_rr_diastolic'
                                                                                                    )
                                                                                                  ) {
                                                                                                    if (
                                                                                                      validatePainHeart1(
                                                                                                        data.cough_and_snees,
                                                                                                        data,
                                                                                                        'cough_and_snees'
                                                                                                      )
                                                                                                    ) {
                                                                                                      if (
                                                                                                        validatePainHeart(
                                                                                                          data.cough_and_snees,
                                                                                                          data.cough_symptoms_begin,
                                                                                                          'cough_symptoms_begin'
                                                                                                        )
                                                                                                      ) {
                                                                                                        if (
                                                                                                          validatePainHeart(
                                                                                                            data.cough_and_snees,
                                                                                                            data.cough_body_temp,
                                                                                                            'cough_body_temp'
                                                                                                          )
                                                                                                        ) {
                                                                                                          if (
                                                                                                            validatePainHeart(
                                                                                                              data.cough_and_snees,
                                                                                                              data.cough_envi_suffer_symtoms,
                                                                                                              'cough_envi_suffer_symtoms'
                                                                                                            )
                                                                                                          ) {
                                                                                                            if (
                                                                                                              validatePainHeart(
                                                                                                                data.cough_and_snees,
                                                                                                                data.cough_suffer_from_allergies,
                                                                                                                'cough_suffer_from_allergies'
                                                                                                              )
                                                                                                            ) {
                                                                                                              if (
                                                                                                                validatePainHeart1(
                                                                                                                  data.feel_depressed,
                                                                                                                  data,
                                                                                                                  'feel_depressed'
                                                                                                                )
                                                                                                              ) {
                                                                                                                if (
                                                                                                                  validatePainHeart1(
                                                                                                                    data.feel_depressed,
                                                                                                                    data.depressed_symptoms_begin,
                                                                                                                    'depressed_symptoms_begin'
                                                                                                                  )
                                                                                                                ) {
                                                                                                                  if (
                                                                                                                    validatePainHeart(
                                                                                                                      data.feel_depressed,
                                                                                                                      data.depressed_pain_intensity,
                                                                                                                      'depressed_pain_intensity'
                                                                                                                    )
                                                                                                                  ) {
                                                                                                                    if (
                                                                                                                      validatePainHeart1(
                                                                                                                        data.feel_depressed,
                                                                                                                        data.depressed_do_you_sleep,
                                                                                                                        'depressed_do_you_sleep'
                                                                                                                      )
                                                                                                                    ) {
                                                                                                                      if (
                                                                                                                        validatePainHeart1(
                                                                                                                          data.feel_depressed,
                                                                                                                          data.depressed_suicidal_thoughts,
                                                                                                                          'depressed_suicidal_thoughts'
                                                                                                                        )
                                                                                                                      ) {
                                                                                                                        if (
                                                                                                                          validatePainHeart1(
                                                                                                                            data.feel_depressed,
                                                                                                                            data.depressed_hurt_yourself,
                                                                                                                            'depressed_hurt_yourself'
                                                                                                                          )
                                                                                                                        ) {
                                                                                                                          if (
                                                                                                                            validatePainHeart1(
                                                                                                                              data.cardiac_problems,
                                                                                                                              data,
                                                                                                                              'cardiac_problems'
                                                                                                                            )
                                                                                                                          ) {
                                                                                                                            if (
                                                                                                                              validatePainHeart(
                                                                                                                                data.cardiac_problems,
                                                                                                                                data.cardiac_rr_systolic,
                                                                                                                                'cardiac_rr_systolic'
                                                                                                                              )
                                                                                                                            ) {
                                                                                                                              if (
                                                                                                                                validatePainHeart(
                                                                                                                                  data.cardiac_problems,
                                                                                                                                  data.cardiac_rr_diastolic,
                                                                                                                                  'cardiac_rr_diastolic'
                                                                                                                                )
                                                                                                                              ) {
                                                                                                                                if (
                                                                                                                                  validatePainHeart1(
                                                                                                                                    data.cardiac_problems,
                                                                                                                                    data.cardiac_heart_attack,
                                                                                                                                    'cardiac_heart_attack'
                                                                                                                                  )
                                                                                                                                ) {
                                                                                                                                  if (
                                                                                                                                    validatePainHeart1(
                                                                                                                                      data.cardiac_problems,
                                                                                                                                      data.cardiac_heart_failure,
                                                                                                                                      'cardiac_heart_failure'
                                                                                                                                    )
                                                                                                                                  ) {
                                                                                                                                    if (
                                                                                                                                      validatePainHeart1(
                                                                                                                                        data.cardiac_problems,
                                                                                                                                        data.cardiac_have_dizziness,
                                                                                                                                        'cardiac_have_dizziness'
                                                                                                                                      )
                                                                                                                                    ) {
                                                                                                                                      if (
                                                                                                                                        validatePainHeart1(
                                                                                                                                          data.cardiac_problems,
                                                                                                                                          data.cardiac_have_shoulder_pain,
                                                                                                                                          'cardiac_have_shoulder_pain'
                                                                                                                                        )
                                                                                                                                      ) {
                                                                                                                                        if (
                                                                                                                                          DataprotectionRules &&
                                                                                                                                          DataprotectionRules ===
                                                                                                                                            true
                                                                                                                                        ) {
                                                                                                                                          setloaderImage(
                                                                                                                                            true
                                                                                                                                          );
                                                                                                                                          // axios
                                                                                                                                          //   .post(
                                                                                                                                          //     sitedata
                                                                                                                                          //       .data
                                                                                                                                          //       .path +
                                                                                                                                          //       '/vh/AddTask',

                                                                                                                                          //     data,
                                                                                                                                          //     commonHeader(
                                                                                                                                          //       all_LoginReducerAim.token
                                                                                                                                          //     )
                                                                                                                                          //   )
                                                                                                                                          // .then(
                                                                                                                                          //   (
                                                                                                                                          //     responce
                                                                                                                                          //   ) => {
                                                                                                                                          //     setUpdateQues(
                                                                                                                                          //       {}
                                                                                                                                          //     );
                                                                                                                                          setloaderImage(
                                                                                                                                            false
                                                                                                                                          );
                                                                                                                                          setDataprotectionRules(
                                                                                                                                            false
                                                                                                                                          );
                                                                                                                                          setOpenCalendar(
                                                                                                                                            true
                                                                                                                                          );
                                                                                                                                          //   }
                                                                                                                                          // )
                                                                                                                                          // .catch(
                                                                                                                                          //   function (
                                                                                                                                          //     error
                                                                                                                                          //   ) {
                                                                                                                                          //     console.log(
                                                                                                                                          //       'error'
                                                                                                                                          //     );
                                                                                                                                          //         setloaderImage(
                                                                                                                                          //           false
                                                                                                                                          //         );
                                                                                                                                          //       }
                                                                                                                                          //     );
                                                                                                                                        } else {
                                                                                                                                          setErrorChrMsg(
                                                                                                                                            'Please select Data protection rules and Regulations of Aimedis.'
                                                                                                                                          );
                                                                                                                                          setError_section(
                                                                                                                                            45
                                                                                                                                          );
                                                                                                                                        }
                                                                                                                                      }
                                                                                                                                    }
                                                                                                                                  }
                                                                                                                                }
                                                                                                                              }
                                                                                                                            }
                                                                                                                          }
                                                                                                                        }
                                                                                                                      }
                                                                                                                    }
                                                                                                                  }
                                                                                                                }
                                                                                                              }
                                                                                                            }
                                                                                                          }
                                                                                                        }
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  // Validate all fields
  const validatePainHeart = (check, value, item) => {
    var bpPattern = /^[0-9]+$/;
    var Valid = bpPattern.test(value);
    if (item === 'painbegin' && check === 'yes') {
      if (
        !value.headache_painbegin_back === true &&
        !value.headache_painbegin_front === true &&
        !value.headache_painbegin_left === true &&
        !value.headache_painbegin_right === true &&
        !value.headache_painbegin_top === true
      ) {
        setError_section(1);
        setErrorChrMsg('Please select pain begin');
        MoveTop(0);
        return false;
      } else {
        return true;
      }
    } else if (item === 'hurtnow' && check === 'yes') {
      if (
        !value.headache_hurtnow_back === true &&
        !value.headache_hurtnow_front === true &&
        !value.headache_hurtnow_left === true &&
        !value.headache_hurtnow_right === true &&
        !value.headache_hurtnow_top === true
      ) {
        setError_section(2);
        setErrorChrMsg('Please select hurt now');
        MoveTop(0);
        return false;
      } else {
        return true;
      }
    } else if (item === 'headache_quality_of_pain' && check === 'yes') {
      if (!value && !(value > -1)) {
        setError_section(6);
        setErrorChrMsg('Please enter Quality of pain value');
        MoveTop(450);
        return false;
      } else {
        return true;
      }
    } else if (item === 'headache_undergoing_treatment' && check === 'yes') {
      if (!value) {
        setError_section(11);
        setErrorChrMsg('Please select Undergoing treatment with YES / NO');
        MoveTop(600);
        return false;
      } else {
        return true;
      }
    } else if (
      (item === 'stomach_painbegin_painPoint' ||
        item === 'stomach_hurtnow_painPoint') &&
      check === 'yes'
    ) {
      var section = item === 'stomach_painbegin_painPoint' ? 12 : 13;
      if (!value) {
        setError_section(section);
        setErrorChrMsg('Please select Pain point');
        MoveTop(0);
        return false;
      } else {
        return true;
      }
    } else if (
      item === 'stomach_continuously_or_periodically' &&
      check === 'yes'
    ) {
      if (!value) {
        setError_section(16);
        setErrorChrMsg(
          'Please select Continuously or Periodically with Yes / No'
        );
        MoveTop(450);
        return false;
      } else {
        return true;
      }
    } else if (item === 'stomach_take_painkillers' && check === 'yes') {
      if (!value) {
        setError_section(18);
        setErrorChrMsg('Please select Take painkillers with Yes / No');
        MoveTop(250);
        return false;
      } else {
        return true;
      }
    } else if (item === 'stomach_undergoing_treatment' && check === 'yes') {
      if (!value) {
        setError_section(20);
        setErrorChrMsg('Please select Undergoing treatment with YES / NO');
        MoveTop(550);
        return false;
      } else {
        return true;
      }
    } else if (item === 'diarrhea_suffer_from_vomiting' && check === 'yes') {
      if (!value) {
        setError_section(22);
        setErrorChrMsg('Please select Suffer from Vomiting with YES / NO');
        MoveTop(550);
        return false;
      } else {
        return true;
      }
    } else if (
      (item === 'diarrhea_envi_suffer_symtoms' ||
        item === 'cough_envi_suffer_symtoms') &&
      check === 'yes'
    ) {
      var section = item === 'diarrhea_envi_suffer_symtoms' ? 24 : 37;
      if (!value) {
        setError_section(section);
        setErrorChrMsg('Please select Envinment Suffer symtoms with YES / NO');
        MoveTop(550);
        return false;
      } else {
        return true;
      }
    } else if (item === 'diarrhea_liquids_with_you' && check === 'yes') {
      if (!value) {
        setError_section(25);
        setErrorChrMsg('Please select keep liquid with you with YES / NO');
        MoveTop(550);
        return false;
      } else {
        return true;
      }
    } else if (
      (item === 'fever_low_body_temp' || item === 'fever_top_body_temp') &&
      check === 'yes'
    ) {
      var section = item === 'fever_low_body_temp' ? 28 : 27;
      var currentItem =
        item === 'fever_low_body_temp' ? 'low value' : 'top value';
      if (!value) {
        setError_section(section);
        setErrorChrMsg(
          'Please Enter' + ' ' + currentItem + ' ' + 'of body temprature'
        );
        MoveTop(550);
        return false;
      } else if (value < 36 || value > 41) {
        setError_section(section);
        setErrorChrMsg('Please Enter valid body temprature');
        MoveTop(550);
        return false;
      } else {
        return true;
      }
    } else if (
      (item === 'fever_sputum' || item === 'cough_suffer_from_allergies') &&
      check === 'yes'
    ) {
      var section = item === 'fever_sputum' ? 30 : 38;
      var currentItem =
        item === 'fever_sputum' ? 'Sputum' : 'suffer from Allergies';
      if (!value || value === '<p><br></p>' || value === '<p></p>') {
        setError_section(section);
        setErrorChrMsg('Please enter sputum intensity');
        MoveTop(450);
        return false;
      } else {
        return true;
      }
    } else if (
      (item === 'fever_symptoms_begin' ||
        item === 'back_pain_symptoms_begin' ||
        item === 'diarrhea_symptoms_begin' ||
        item === 'cough_symptoms_begin' ||
        item === 'depressed_symptoms_begin') &&
      check === 'yes'
    ) {
      var section =
        item === 'fever_symptoms_begin'
          ? 26
          : item === 'back_pain_symptoms_begin'
          ? 31
          : item === 'diarrhea_symptoms_begin'
          ? 21
          : item === 'cough_symptoms_begin'
          ? 35
          : 39;
      if (!value) {
        setError_section(section);
        setErrorChrMsg('Please enter Symptoms begin');
        MoveTop(550);
        return false;
      } else {
        return true;
      }
    } else if (
      (item === 'headache_rr_systolic' ||
        item === 'stomach_rr_systolic' ||
        item === 'back_pain_rr_systolic' ||
        item === 'cardiac_rr_systolic') &&
      check === 'yes'
    ) {
      var section =
        item === 'headache_rr_systolic'
          ? 3
          : item === 'stomach_rr_systolic'
          ? 14
          : item === 'back_pain_rr_systolic'
          ? 33
          : 42;
      if (!value) {
        setError_section(section);
        setErrorChrMsg('Please enter Systolic value');
        MoveTop(250);
        return false;
      } else if (!Valid) {
        setError_section(section);
        setErrorChrMsg('Systolic bp should be in number');
        MoveTop(250);
        return false;
      } else if (value < 120) {
        setError_section(section);
        setErrorChrMsg('Please select systolic bp value between 120-140');
        MoveTop(250);
        return false;
      } else if (value > 140) {
        setError_section(section);
        setErrorChrMsg('Please select systolic bp value between 120-140');
        MoveTop(250);
        return false;
      } else {
        return true;
      }
    } else if (
      (item === 'headache_rr_diastolic' ||
        item === 'stomach_rr_diastolic' ||
        item === 'back_pain_rr_diastolic' ||
        item === 'cardiac_rr_diastolic') &&
        check === 'yes'
    ) {
      var section =
        item === 'headache_rr_diastolic'
          ? 4
          : item === 'stomach_rr_diastolic'
          ? 15
          : item === 'back_pain_rr_diastolic'
          ? 34
          : 43;
      if (!value) {
        setError_section(section);
        setErrorChrMsg('Please enter Diastolic value');
        MoveTop(250);
        return false;
      } else if (!Valid) {
        setError_section(section);
        setErrorChrMsg('Diastolic bp should be in number');
        MoveTop(250);
        return false;
      } else if (value < 80) {
        setError_section(section);
        setErrorChrMsg('Please select Diastolic bp value between 80-90');
        MoveTop(250);
        return false;
      } else if (value > 90) {
        setError_section(section);
        setErrorChrMsg('Please select Diastolic bp value between 80-90');
        MoveTop(250);
        return false;
      } else {
        return true;
      }
    } else if (
      (item === 'headache_pain_intensity' ||
        item === 'stomach_pain_intensity' ||
        item === 'fever_pain_intensity' ||
        item === 'depressed_pain_intensity') &&
      check === 'yes'
    ) {
      var section =
        item === 'headache_pain_intensity'
          ? 10
          : item === 'stomach_pain_intensity'
          ? 19
          : item === 'fever_pain_intensity'
          ? 29
          : 40;
      if (!value && !(value > 0)) {
        setError_section(section);
        setErrorChrMsg('Please select Pain intensity');
        MoveTop(600);
        return false;
      } else {
        return true;
      }
    }
    if (
      (item === 'headache_body_temp' ||
        item === 'stomach_body_temp' ||
        item === 'diarrhea_body_temp' ||
        item === 'cough_body_temp') &&
      check === 'yes'
    ) {
      var section =
        item === 'headache_body_temp'
          ? 5
          : item === 'stomach_body_temp'
          ? 17
          : item === 'diarrhea_body_temp'
          ? 23
          : 36;
      if (!value) {
        setError_section(section);
        setErrorChrMsg('Please Enter body temprature');
        MoveTop(300);
        return false;
      } else if (value < 36 || value > 41) {
        setError_section(section);
        setErrorChrMsg('Please Enter valid body temprature');
        MoveTop(300);
        return false;
      } else {
        return true;
      }
    } else if (item === 'headache_have_diabetes' && check === 'yes') {
      if (!value.headache_have_diabetes) {
        setError_section(46);
        setErrorChrMsg('Please select Diabetes with YES / NO');
        MoveTop(350);
        return false;
      } else if (value && value.headache_have_diabetes === 'yes') {
        var bpPattern = /^[0-9]+$/;
        var valid = bpPattern.test(value.headache_blood_sugar);
        let calHba1c = value.headache_Hba1c && value.headache_Hba1c / 10;
        if (!value.headache_blood_sugar) {
          setError_section(47);
          setErrorChrMsg('Please enter Blood sugar');
          MoveTop(400);
          return false;
        } else if (!valid) {
          setError_section(47);
          setErrorChrMsg('Blood sugar should be in number');
          MoveTop(400);
          return false;
        } else if (value?.headache_blood_sugar < 160) {
          setError_section(47);
          setErrorChrMsg('Blood sugar should be between 160-240');
          MoveTop(400);
          return false;
        } else if (value?.headache_blood_sugar > 240) {
          setError_section(47);
          setErrorChrMsg('Blood sugar should be between 160-240');
          MoveTop(400);
          return false;
        } else if (!value.headache_Hba1c) {
          setError_section(56);
          setErrorChrMsg('Please enter Hba1c');
          MoveTop(400);
          return false;
        } else if (calHba1c < 57 / 10) {
          setError_section(56);
          setErrorChrMsg('Hba1c should be between 57-64');
          MoveTop(400);
          return false;
        } else if (calHba1c > 64 / 10) {
          setError_section(56);
          setErrorChrMsg('Hba1c should be between 57-64');
          MoveTop(400);
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const validatePainHeart1 = (check, value, item) => {
    // console.log('check, value, item', check, value, item);
    if (
      (item === 'headache_need_to_vomit' ||
        item === 'headache_onset_of_pain' ||
        item === 'headache_take_painkillers') &&
      check === 'yes'
    ) {
      var currentItem =
        item === 'headache_need_to_vomit'
          ? 'Need to vomit'
          : item === 'headache_onset_of_pain'
          ? 'Onset of pain'
          : 'Take painkillers';

      if (!value) {
        setErrorChrMsg(
          'Please select' + ' ' + currentItem + ' ' + 'with Yes / No'
        );
        setError_section(7);
        MoveTop(550);
        return false;
      } else {
        return true;
      }
    } else if (
      (item === 'stomach_behind_the_sternum' ||
        item === 'stomach_heart_attack' ||
        item === 'stomach_heart_failure') &&
      check === 'yes'
    ) {
      var currentItem =
        item === 'stomach_behind_the_sternum'
          ? 'Behind the sternum'
          : item === 'stomach_heart_attack'
          ? 'Heart attack'
          : 'Heart failure';

      if (!value) {
        setErrorChrMsg(
          'Please select' + ' ' + currentItem + ' ' + 'with Yes / No'
        );
        setError_section(8);
        MoveTop(200);
        return false;
      } else {
        return true;
      }
    } else if (
      (item === 'back_pain_been_injured' ||
        item === 'back_pain_physically_strained' ||
        item === 'back_pain_stress_depression' ||
        item === 'back_pain_heart_attack' ||
        item === 'back_pain_heart_failure') &&
      check === 'yes'
    ) {
      var currentItem =
        item === 'back_pain_been_injured'
          ? 'been Injured'
          : item === 'back_pain_physically_strained'
          ? 'Physically strained'
          : item === 'back_pain_stress_depression'
          ? 'Pain stress depression'
          : item === 'back_pain_heart_attack'
          ? 'Heart attack'
          : 'Heart failure';

      if (!value) {
        setErrorChrMsg(
          'Please select' + ' ' + currentItem + ' ' + 'with Yes / No'
        );
        setError_section(32);
        MoveTop(200);
        return false;
      } else {
        return true;
      }
    } else if (
      (item === 'depressed_do_you_sleep' ||
        item === 'depressed_suicidal_thoughts' ||
        item === 'depressed_hurt_yourself') &&
      check === 'yes'
    ) {
      var currentItem =
        item === 'depressed_do_you_sleep'
          ? 'do you Sleep'
          : item === 'depressed_suicidal_thoughts'
          ? 'Suicidal thoughts'
          : 'Hurt yourself';
      if (!value) {
        setErrorChrMsg(
          'Please select' + ' ' + currentItem + ' ' + 'with Yes / No'
        );
        setError_section(41);
        MoveTop(200);
        return false;
      } else {
        return true;
      }
    } else if (
      (item === 'cardiac_heart_attack' ||
        item === 'cardiac_heart_failure' ||
        item === 'cardiac_have_dizziness' ||
        item === 'cardiac_have_shoulder_pain') &&
      check === 'yes'
    ) {
      var currentItem =
        item === 'cardiac_heart_attack'
          ? 'Heart attack'
          : item === 'cardiac_heart_failure'
          ? 'Heart failure'
          : item === 'cardiac_have_dizziness'
          ? 'have Dizziness'
          : 'have Shoulder pain';

      if (!value) {
        setErrorChrMsg(
          'Please select' + ' ' + currentItem + ' ' + 'with Yes / No'
        );
        setError_section(44);
        MoveTop(200);
        return false;
      } else {
        return true;
      }
    } else if (
      item === 'headache' ||
      item === 'stomach_problems' ||
      item === 'diarrhea' ||
      item === 'have_fever' ||
      item === 'back_pain' ||
      item === 'cough_and_snees' ||
      item === 'feel_depressed' ||
      item === 'cardiac_problems'
    ) {
      var currentItem =
        item === 'headache'
          ? 'Headache'
          : item === 'stomach_problems'
          ? 'Stomach problems'
          : item === 'diarrhea'
          ? 'Diarrhea'
          : item === 'have_fever'
          ? 'have Fever'
          : item === 'back_pain'
          ? 'Back pain'
          : item === 'feel_depressed'
          ? 'feel Depressed'
          : item === 'cough_and_snees'
          ? 'Cough and Snees'
          : 'Cardiac problems';
      var section =
        item === 'headache'
          ? 48
          : item === 'stomach_problems'
          ? 49
          : item === 'diarrhea'
          ? 50
          : item === 'have_fever'
          ? 51
          : item === 'back_pain'
          ? 52
          : item === 'cough_and_snees'
          ? 53
          : item === 'feel_depressed'
          ? 54
          : 55;
      if (!check) {
        setErrorChrMsg(
          'Please select' + ' ' + currentItem + ' ' + 'with Yes / No'
        );
        setError_section(section);
        MoveTop(200);
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  return (
    <Grid
      className={
        settings &&
        settings.setting &&
        settings.setting.mode &&
        settings.setting.mode === 'dark'
          ? 'homeBg darkTheme homeBgDrk'
          : 'homeBg'
      }
    >
      {loaderImage && <Loader />}
      <Grid className="homeBgIner">
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12}>
            <Grid container direction="row">
              {/* Website Menu */}
              <LeftMenu isNotShow={true} currentPage="picture" />
              <LeftMenuMobile isNotShow={true} currentPage="picture" />
              <Grid item xs={12} md={11} lg={10}>
                <Grid className="docsOpinion">
                  <Grid container direction="row" className="docsOpinLbl">
                    <Grid item xs={12} md={6}>
                      <label>Sick Leave Certificate</label>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={11} lg={8}>
                  <Grid className="cnfrmDiaMain2">
                    {!openCalendar === true ? (
                      <Grid className="fatiqueQues fatiqueQuess1">
                        <FatiqueQuestion
                          updateAllEntrySec={(e) =>
                            updateAllEntrySec(e, 'headache')
                          }
                          label="You have a headache?"
                          value={updateQues.headache}
                        />
                        {error_section == 48 && (
                          <div className="err_message2">{errorChrMsg}</div>
                        )}
                        {updateQues && updateQues?.headache === 'yes' && (
                          <Grid className="borderLineAfer">
                            <Grid className="bgncmnSpc">
                              <Grid className="bgncmnLbl">
                                <label>Where did the pain begin?</label>
                              </Grid>
                              <Grid container direction="row" justify="center">
                                <Grid item xs={12} md={12}>
                                  <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                  >
                                    <Grid item xs={6} sm={6} md={2}>
                                      <Grid className="sickCheckSec">
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              name="headache_painbegin_back"
                                              value={
                                                updateQues &&
                                                updateQues?.headache_painbegin_back &&
                                                updateQues?.headache_painbegin_back ==
                                                  true
                                                  ? false
                                                  : true
                                              }
                                              color="#00ABAF"
                                              checked={
                                                updateQues?.headache_painbegin_back
                                              }
                                              onChange={(e) => {
                                                updateAllEntrySec2(e);
                                              }}
                                              className="PIC_Condition"
                                            />
                                          }
                                          label="Back"
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
                                                updateQues &&
                                                updateQues?.headache_painbegin_front &&
                                                updateQues?.headache_painbegin_front ==
                                                  true
                                                  ? false
                                                  : true
                                              }
                                              color="#00ABAF"
                                              checked={
                                                updateQues?.headache_painbegin_front
                                              }
                                              onChange={(e) => {
                                                updateAllEntrySec2(e);
                                              }}
                                              className="PIC_Condition"
                                            />
                                          }
                                          label="Front"
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
                                                updateQues &&
                                                updateQues?.headache_painbegin_left &&
                                                updateQues?.headache_painbegin_left ==
                                                  true
                                                  ? false
                                                  : true
                                              }
                                              color="#00ABAF"
                                              checked={
                                                updateQues?.headache_painbegin_left
                                              }
                                              onChange={(e) => {
                                                updateAllEntrySec2(e);
                                              }}
                                              className="PIC_Condition"
                                            />
                                          }
                                          label="Left"
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
                                                updateQues &&
                                                updateQues?.headache_painbegin_right &&
                                                updateQues?.headache_painbegin_right ==
                                                  true
                                                  ? false
                                                  : true
                                              }
                                              color="#00ABAF"
                                              checked={
                                                updateQues?.headache_painbegin_right
                                              }
                                              onChange={(e) => {
                                                updateAllEntrySec2(e);
                                              }}
                                              className="PIC_Condition"
                                            />
                                          }
                                          label="Right"
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
                                                updateQues &&
                                                updateQues?.headache_painbegin_top &&
                                                updateQues?.headache_painbegin_top ==
                                                  true
                                                  ? false
                                                  : true
                                              }
                                              color="#00ABAF"
                                              checked={
                                                updateQues?.headache_painbegin_top
                                              }
                                              onChange={(e) => {
                                                updateAllEntrySec2(e);
                                              }}
                                              className="PIC_Condition"
                                            />
                                          }
                                          label="Top"
                                        />
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={2}></Grid>
                                  </Grid>
                                  {error_section == 1 && (
                                    <div className="err_message2">
                                      {errorChrMsg}
                                    </div>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid className="bgncmnSpc">
                              <Grid className="bgncmnLbl">
                                <label>Where does it hurt now?</label>
                              </Grid>
                              <Grid container direction="row" justify="center">
                                <Grid item xs={12} md={12}>
                                  <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                  >
                                    <Grid item xs={6} sm={6} md={2}>
                                      <Grid className="sickCheckSec">
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              name="headache_hurtnow_back"
                                              value={
                                                updateQues &&
                                                updateQues?.headache_hurtnow_back &&
                                                updateQues?.headache_hurtnow_back ==
                                                  true
                                                  ? false
                                                  : true
                                              }
                                              color="#00ABAF"
                                              checked={
                                                updateQues?.headache_hurtnow_back
                                              }
                                              onChange={(e) => {
                                                updateAllEntrySec2(e);
                                              }}
                                              className="PIC_Condition"
                                            />
                                          }
                                          label="Back"
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
                                                updateQues &&
                                                updateQues?.headache_hurtnow_front &&
                                                updateQues?.headache_hurtnow_front ==
                                                  true
                                                  ? false
                                                  : true
                                              }
                                              color="#00ABAF"
                                              checked={
                                                updateQues?.headache_hurtnow_front
                                              }
                                              onChange={(e) => {
                                                updateAllEntrySec2(e);
                                              }}
                                              className="PIC_Condition"
                                            />
                                          }
                                          label="Front"
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
                                                updateQues &&
                                                updateQues?.headache_hurtnow_left &&
                                                updateQues?.headache_hurtnow_left ==
                                                  true
                                                  ? false
                                                  : true
                                              }
                                              color="#00ABAF"
                                              checked={
                                                updateQues?.headache_hurtnow_left
                                              }
                                              onChange={(e) => {
                                                updateAllEntrySec2(e);
                                              }}
                                              className="PIC_Condition"
                                            />
                                          }
                                          label="Left"
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
                                                updateQues &&
                                                updateQues?.headache_hurtnow_right &&
                                                updateQues?.headache_hurtnow_right ==
                                                  true
                                                  ? false
                                                  : true
                                              }
                                              color="#00ABAF"
                                              checked={
                                                updateQues?.headache_hurtnow_right
                                              }
                                              onChange={(e) => {
                                                updateAllEntrySec2(e);
                                              }}
                                              className="PIC_Condition"
                                            />
                                          }
                                          label="Right"
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
                                                updateQues &&
                                                updateQues?.headache_hurtnow_top &&
                                                updateQues?.headache_hurtnow_top ==
                                                  true
                                                  ? false
                                                  : true
                                              }
                                              color="#00ABAF"
                                              checked={
                                                updateQues?.headache_hurtnow_top
                                              }
                                              onChange={(e) => {
                                                updateAllEntrySec2(e);
                                              }}
                                              className="PIC_Condition"
                                            />
                                          }
                                          label="Top"
                                        />
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={2}></Grid>
                                  </Grid>
                                  {error_section == 2 && (
                                    <div className="err_message2">
                                      {errorChrMsg}
                                    </div>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid className="bgncmnSpc">
                              <Grid className="bgncmnLbl">
                                <label>What is your Blood pressure ?</label>
                              </Grid>
                              <Grid container direction="row" spacing="1">
                                <Grid item md={6} sm={6}>
                                  <Grid className="fillDia">
                                    <MMHG
                                      name="headache_rr_systolic"
                                      Unit="mmHg"
                                      label="RR_systolic"
                                      onChange={(e) => updateAllEntrySec1(e)}
                                      value={
                                        updateQues?.headache == 'yes'
                                          ? updateQues?.headache_rr_systolic
                                          : ''
                                      }
                                    />
                                  </Grid>
                                  {error_section == 3 && (
                                    <div className="err_message2">
                                      {errorChrMsg}
                                    </div>
                                  )}
                                </Grid>
                                <Grid item md={6} sm={6}>
                                  <Grid className="fillDia">
                                    <MMHG
                                      name="headache_rr_diastolic"
                                      Unit="mmHg"
                                      label="RR_diastolic"
                                      onChange={(e) => updateAllEntrySec1(e)}
                                      value={updateQues?.headache_rr_diastolic}
                                    />
                                  </Grid>
                                  {error_section == 4 && (
                                    <div className="err_message2">
                                      {errorChrMsg}
                                    </div>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid className="bgncmnSpc">
                              <Grid className="textFieldArea1">
                                <Grid className="bgncmnLbl">
                                  <label>
                                    If you have Temperature, please tell me in C
                                    ?
                                  </label>
                                </Grid>
                                <input
                                  type="number"
                                  placeholder="36.6"
                                  name="headache_body_temp"
                                  onChange={(e) =>
                                    updateAllEntrySec1(e, 'headache_body_temp')
                                  }
                                  // className={forError ? 'setRedColor' : ''}
                                  value={updateQues?.headache_body_temp}
                                ></input>
                                {error_section == 5 && (
                                  <div className="err_message2">
                                    {errorChrMsg}
                                  </div>
                                )}
                              </Grid>
                            </Grid>

                            <Grid className="bgncmnSpc">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'headache_have_diabetes')
                                }
                                label="Do you have diabetes? If so, what is your blood sugar?"
                                value={updateQues?.headache_have_diabetes}
                              />
                              {error_section == 46 && (
                                <div className="err_message2">
                                  {errorChrMsg}
                                </div>
                              )}
                              {updateQues &&
                                updateQues?.headache_have_diabetes ===
                                  'yes' && (
                                  <>
                                    <Grid container direction="row" spacing="1">
                                      <Grid item md={6} sm={6}>
                                        <Grid className="fillDia">
                                          <MMHG
                                            name="headache_blood_sugar"
                                            Unit="mg/dl"
                                            label="Blood sugar"
                                            onChange={(e) =>
                                              updateAllEntrySec1(e)
                                            }
                                            value={
                                              updateQues?.headache_blood_sugar
                                            }
                                          />
                                        </Grid>
                                        {error_section == 47 && (
                                          <div className="err_message2">
                                            {errorChrMsg}
                                          </div>
                                        )}
                                      </Grid>
                                      <Grid item md={6} sm={6}>
                                        <Grid className="fillDia">
                                          <MMHG
                                            name="headache_Hba1c"
                                            Unit="%"
                                            label="Hba1c"
                                            onChange={(e) =>
                                              updateAllEntrySec1(e)
                                            }
                                            value={updateQues?.headache_Hba1c}
                                          />
                                        </Grid>
                                        {error_section == 56 && (
                                          <div className="err_message2">
                                            {errorChrMsg}
                                          </div>
                                        )}
                                      </Grid>
                                    </Grid>
                                    <Grid className="fillDia">
                                      <SelectByTwo
                                        name="headache_situation"
                                        label="Situation"
                                        options={Allsituation}
                                        onChange={(e) =>
                                          updateAllEntrySec(
                                            e,
                                            'headache_situation'
                                          )
                                        }
                                        value={updateQues?.headache_situation}
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
                                updateAllEntrySec(e, 'quality_of_pain')
                              }
                              value={updateQues?.quality_of_pain}
                            />  */}
                                <SymptomQuestions
                                  updateEntryState1={(e) =>
                                    updateAllEntrySec(
                                      e,
                                      'headache_quality_of_pain'
                                    )
                                  }
                                  comesFrom="Feedback"
                                  label="How would you describe the quality of pain?
                              (Throbbing, stinging ...)"
                                  value={updateQues?.headache_quality_of_pain}
                                />
                                {error_section == 6 && (
                                  <div className="err_message2">
                                    {errorChrMsg}
                                  </div>
                                )}
                              </Grid>
                            </Grid>
                            <Grid className="bgncmnSpc">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'headache_need_to_vomit')
                                }
                                label="Do you need to vomit ?"
                                value={updateQues?.headache_need_to_vomit}
                              />
                            </Grid>
                            <Grid className="bgncmnSpc">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'headache_onset_of_pain')
                                }
                                label="Did you have an aura before the onset of pain? (dynamic, mostly visual or other sensory perceptual disorders)"
                                value={updateQues?.headache_onset_of_pain}
                              />
                            </Grid>
                            <Grid className="bgncmnSpc">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(
                                    e,
                                    'headache_take_painkillers'
                                  )
                                }
                                label="Do you take painkillers?"
                                value={updateQues?.headache_take_painkillers}
                              />
                              {error_section == 7 && (
                                <div className="err_message2">
                                  {errorChrMsg}
                                </div>
                              )}
                            </Grid>
                            <Grid className="bgncmnSpc">
                              <label>
                                On a scale of 1 - 10, how would you describe the
                                intensity of the pain?
                              </label>
                              <PainIntensity
                                name="headache_pain_intensity"
                                onChange={(e) => updateAllEntrySec1(e)}
                                value={Math.round(
                                  updateQues?.headache_pain_intensity
                                )}
                                // setting={this.props.settings}
                                comesFrom="Evalute"
                              />
                              {error_section == 10 && (
                                <div className="err_message2">
                                  {errorChrMsg}
                                </div>
                              )}
                            </Grid>
                            <Grid className="bgncmnSpcRmv">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(
                                    e,
                                    'headache_undergoing_treatment'
                                  )
                                }
                                label="Are you already undergoing treatment for your Headace?"
                                value={
                                  updateQues?.headache_undergoing_treatment
                                }
                              />
                              {error_section == 11 && (
                                <div className="err_message2">
                                  {errorChrMsg}
                                </div>
                              )}
                            </Grid>
                          </Grid>
                        )}

                        <Grid className="sickQuesSec">
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'stomach_problems', 2)
                            }
                            label="You have Stomach Problems?"
                            value={updateQues?.stomach_problems}
                          />
                          {error_section == 49 && (
                            <div className="err_message2">{errorChrMsg}</div>
                          )}
                        </Grid>

                        {updateQues && updateQues?.stomach_problems === 'yes' && (
                          <Grid className="borderLineAfer">
                            <Grid className="fillDia">
                              <Grid className="bgncmnSpc">
                                <Grid className="bgncmnLbl">
                                  <label>Where did the pain begin?</label>
                                </Grid>
                                <PainPoint
                                  id="New_id1"
                                  gender={
                                    all_LoginReducerAim &&
                                    all_LoginReducerAim?.user &&
                                    all_LoginReducerAim.user?.sex
                                  }
                                  painPoint={
                                    updateQues &&
                                    updateQues?.stomach_painbegin_painPoint
                                      ? updateQues.stomach_painbegin_painPoint
                                      : []
                                  }
                                  onChange={(e) =>
                                    updateAllEntrySec(
                                      e,
                                      'stomach_painbegin_painPoint'
                                    )
                                  }
                                />
                                {error_section == 12 && (
                                  <div className="err_message2">
                                    {errorChrMsg}
                                  </div>
                                )}
                              </Grid>
                            </Grid>
                            <Grid className="fillDia">
                              <Grid className="bgncmnSpc">
                                <Grid className="bgncmnLbl">
                                  <label>Where does it hurt now?</label>
                                </Grid>
                                <PainPoint
                                  id="New_id1"
                                  gender={
                                    all_LoginReducerAim &&
                                    all_LoginReducerAim?.user &&
                                    all_LoginReducerAim.user?.sex
                                  }
                                  painPoint={
                                    updateQues &&
                                    updateQues?.stomach_hurtnow_painPoint
                                      ? updateQues?.stomach_hurtnow_painPoint
                                      : []
                                  }
                                  onChange={(e) =>
                                    updateAllEntrySec(
                                      e,
                                      'stomach_hurtnow_painPoint'
                                    )
                                  }
                                />
                                {error_section == 13 && (
                                  <div className="err_message2">
                                    {errorChrMsg}
                                  </div>
                                )}
                              </Grid>
                            </Grid>
                            <FatiqueQuestion
                              updateAllEntrySec={(e) =>
                                updateAllEntrySec(
                                  e,
                                  'stomach_behind_the_sternum',
                                  2
                                )
                              }
                              label="Do you have pain behind the sternum?"
                              value={updateQues?.stomach_behind_the_sternum}
                            />
                            <Grid className="sickQuesSec">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'stomach_heart_attack')
                                }
                                label="Have you ever had a heart attack?"
                                value={updateQues?.stomach_heart_attack}
                              />
                            </Grid>
                            <Grid className="sickQuesSec">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'stomach_heart_failure')
                                }
                                label="Do you suffer from diagnosed Heart failure?"
                                value={updateQues?.stomach_heart_failure}
                              />
                            </Grid>
                            {error_section == 8 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                            <Grid className="haveCmnSpc">
                              <Grid className="bgncmnLbl">
                                <label>
                                  Do you suffer from high or low blood pressure
                                  if so can you give the values?
                                </label>
                              </Grid>
                              <Grid container direction="row" spacing="1">
                                <Grid item md={6} sm={6}>
                                  <Grid className="fillDia">
                                    <MMHG
                                      name="stomach_rr_systolic"
                                      Unit="mmHg"
                                      label="RR_systolic"
                                      onChange={(e) => updateAllEntrySec1(e)}
                                      value={updateQues?.stomach_rr_systolic}
                                    />
                                  </Grid>
                                  {error_section == 14 && (
                                    <div className="err_message2">
                                      {errorChrMsg}
                                    </div>
                                  )}
                                </Grid>
                                <Grid item md={6} sm={6}>
                                  <Grid className="fillDia">
                                    <MMHG
                                      name="stomach_rr_diastolic"
                                      Unit="mmHg"
                                      label="RR_diastolic"
                                      onChange={(e) => updateAllEntrySec1(e)}
                                      value={updateQues?.stomach_rr_diastolic}
                                    />
                                  </Grid>
                                  {error_section == 15 && (
                                    <div className="err_message2">
                                      {errorChrMsg}
                                    </div>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>

                            <FatiqueQuestion
                              updateAllEntrySec={(e) =>
                                updateAllEntrySec(e, 'stomach_have_diabetes')
                              }
                              label="Do you have diabetes? If so, what is your blood sugar?"
                              value={updateQues?.stomach_have_diabetes}
                            />

                            {updateQues &&
                              updateQues?.stomach_have_diabetes === 'yes' && (
                                <>
                                  <Grid container direction="row" spacing="1">
                                    <Grid item md={6} sm={6}>
                                      <Grid className="fillDia">
                                        <MMHG
                                          name="stomach_blood_sugar"
                                          Unit="mg/dl"
                                          label="Blood sugar"
                                          onChange={(e) =>
                                            updateAllEntrySec1(e)
                                          }
                                          value={
                                            updateQues?.stomach_blood_sugar
                                          }
                                        />
                                      </Grid>
                                      {error_section == 46 && (
                                        <div className="err_message2">
                                          {errorChrMsg}
                                        </div>
                                      )}
                                    </Grid>
                                    <Grid item md={6} sm={6}>
                                      <Grid className="fillDia">
                                        <MMHG
                                          name="stomach_Hba1c"
                                          Unit="%"
                                          label="Hba1c"
                                          onChange={(e) =>
                                            updateAllEntrySec1(e)
                                          }
                                          value={updateQues?.stomach_Hba1c}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid className="fillDia">
                                    <SelectByTwo
                                      name="stomach_situation"
                                      label="Situation"
                                      options={Allsituation}
                                      onChange={(e) =>
                                        updateAllEntrySec(
                                          e,
                                          'stomach_situation'
                                        )
                                      }
                                      value={updateQues?.stomach_situation}
                                    />
                                  </Grid>
                                </>
                              )}
                            <Grid className="sickQuesSec">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(
                                    e,
                                    'stomach_continuously_or_periodically'
                                  )
                                }
                                label="Do the symptoms occur continuously or periodically?"
                                value={
                                  updateQues?.stomach_continuously_or_periodically
                                }
                              />
                            </Grid>
                            {error_section == 16 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                            <Grid className="textFieldArea1">
                              <Grid className="bgncmnSpc">
                                <Grid className="bgncmnLbl">
                                  <label>
                                    If you have Temperature, please tell me in
                                    C?
                                  </label>
                                </Grid>
                                <input
                                  type="number"
                                  placeholder="36.6"
                                  name="stomach_body_temp"
                                  onChange={(e) => updateAllEntrySec1(e)}
                                  // className={
                                  //   this.state.forError ? 'setRedColor' : ''
                                  // }
                                  value={updateQues?.stomach_body_temp}
                                />
                                {error_section == 17 && (
                                  <div className="err_message2">
                                    {errorChrMsg}
                                  </div>
                                )}
                              </Grid>
                            </Grid>
                            <Grid className="bgncmnSpc">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(
                                    e,
                                    'stomach_take_painkillers'
                                  )
                                }
                                label="Do you take painkillers ?"
                                value={updateQues?.stomach_take_painkillers}
                              />
                              {error_section == 18 && (
                                <div className="err_message2">
                                  {errorChrMsg}
                                </div>
                              )}
                            </Grid>

                            <Grid className="bgncmnSpc">
                              <Grid className="bgncmnLbl">
                                <label>
                                  On a scale of 1 - 10, how would you describe
                                  the intensity of the pain?
                                </label>
                              </Grid>
                              <PainIntensity
                                name="stomach_pain_intensity"
                                onChange={(e) => updateAllEntrySec1(e)}
                                value={Math.round(
                                  updateQues?.stomach_pain_intensity
                                )}
                                // setting={this.props.settings}
                                comesFrom="Evalute"
                              />
                              {error_section == 19 && (
                                <div className="err_message2">
                                  {errorChrMsg}
                                </div>
                              )}
                            </Grid>
                            <FatiqueQuestion
                              updateAllEntrySec={(e) =>
                                updateAllEntrySec(
                                  e,
                                  'stomach_undergoing_treatment'
                                )
                              }
                              label="Are you already undergoing treatment for this Problem ?"
                              value={updateQues?.stomach_undergoing_treatment}
                            />
                            {error_section == 20 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                          </Grid>
                        )}

                        <Grid className="sickQuesSec">
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'diarrhea')
                            }
                            label="You have Diarrhea?"
                            value={updateQues?.diarrhea}
                          />
                          {error_section == 50 && (
                            <div className="err_message2">{errorChrMsg}</div>
                          )}
                        </Grid>

                        {updateQues && updateQues?.diarrhea === 'yes' && (
                          <Grid className="borderLineAfer">
                            <Grid className="bgncmnSpc">
                              <Grid className="bgncmnLbl">
                                <label>When did the symptoms begin?</label>
                              </Grid>
                              <Grid>
                                <DateFormat
                                  name="diarrhea_symptoms_begin"
                                  value={
                                    updateQues?.diarrhea_symptoms_begin
                                      ? new Date(
                                          updateQues?.diarrhea_symptoms_begin
                                        )
                                      : new Date()
                                  }
                                  max={new Date()}
                                  onChange={(e) =>
                                    updateAllEntrySec(
                                      e,
                                      'diarrhea_symptoms_begin'
                                    )
                                  }
                                  // date_format={
                                  //   this.props.settings &&
                                  //   this.props.settings.setting &&
                                  //   this.props.settings.setting.date_format
                                  // }
                                  NotFutureDate={true}
                                />
                                {error_section == 21 && (
                                  <div className="err_message2">
                                    {errorChrMsg}
                                  </div>
                                )}
                              </Grid>
                            </Grid>
                            <FatiqueQuestion
                              updateAllEntrySec={(e) =>
                                updateAllEntrySec(
                                  e,
                                  'diarrhea_suffer_from_vomiting'
                                )
                              }
                              label="Do you suffer from vomiting?"
                              value={updateQues?.diarrhea_suffer_from_vomiting}
                            />
                            {error_section == 22 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                            <Grid className="bgncmnSpc">
                              <Grid className="textFieldArea1">
                                <Grid className="bgncmnLbl">
                                  <label>
                                    If you have Temperature, please tell me in C
                                    ?
                                  </label>
                                </Grid>
                                <Grid>
                                  <input
                                    type="number"
                                    placeholder="36.6"
                                    name="diarrhea_body_temp"
                                    onChange={(e) =>
                                      updateAllEntrySec1(
                                        e,
                                        'diarrhea_body_temp'
                                      )
                                    }
                                    // className={forError ? 'setRedColor' : ''}
                                    value={updateQues?.diarrhea_body_temp}
                                  />
                                  {error_section == 23 && (
                                    <div className="err_message2">
                                      {errorChrMsg}
                                    </div>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>

                            <FatiqueQuestion
                              updateAllEntrySec={(e) =>
                                updateAllEntrySec(
                                  e,
                                  'diarrhea_envi_suffer_symtoms'
                                )
                              }
                              label="Does someone in your environment suffer from the same symtoms?"
                              value={updateQues?.diarrhea_envi_suffer_symtoms}
                            />
                            {error_section == 24 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                            <Grid className="bgncmnSpcRmv sickQuesSec">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(
                                    e,
                                    'diarrhea_liquids_with_you'
                                  )
                                }
                                label="Can you keep liquids with you?"
                                value={updateQues?.diarrhea_liquids_with_you}
                              />
                              {error_section == 25 && (
                                <div className="err_message2">
                                  {errorChrMsg}
                                </div>
                              )}
                            </Grid>
                          </Grid>
                        )}

                        <Grid className="sickQuesSec">
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'have_fever')
                            }
                            label="You have Fever?"
                            value={updateQues?.have_fever}
                          />
                          {error_section == 51 && (
                            <div className="err_message2">{errorChrMsg}</div>
                          )}
                        </Grid>

                        {updateQues && updateQues?.have_fever === 'yes' && (
                          <Grid className="borderLineAfer">
                            <Grid className="bgncmnSpc">
                              <Grid className="bgncmnLbl">
                                <label>When did the symptoms begin?</label>
                              </Grid>
                              <Grid>
                                <DateFormat
                                  name="fever_symptoms_begin"
                                  value={
                                    updateQues?.fever_symptoms_begin
                                      ? new Date(
                                          updateQues?.fever_symptoms_begin
                                        )
                                      : new Date()
                                  }
                                  max={new Date()}
                                  onChange={(e) =>
                                    updateAllEntrySec(e, 'fever_symptoms_begin')
                                  }
                                  // date_format={
                                  //   this.props.settings &&
                                  //   this.props.settings.setting &&
                                  //   this.props.settings.setting.date_format
                                  // }
                                  NotFutureDate={true}
                                />
                                {error_section == 26 && (
                                  <div className="err_message2">
                                    {errorChrMsg}
                                  </div>
                                )}
                              </Grid>
                            </Grid>
                            <Grid className="textFieldArea1">
                              <Grid className="bgncmnSpc">
                                <Grid>
                                  <Grid className="bgncmnLbl">
                                    <label>
                                      In which range do the temperatures move
                                      throughout the day?
                                    </label>
                                  </Grid>
                                  <Grid>
                                    <label>
                                      Top Value :Number in C (35 - 43)
                                    </label>
                                    <input
                                      type="number"
                                      placeholder="36.6"
                                      name="fever_top_body_temp"
                                      onChange={(e) =>
                                        updateAllEntrySec1(
                                          e,
                                          'fever_top_body_temp'
                                        )
                                      }
                                      // className={forError ? 'setRedColor' : ''}
                                      value={updateQues?.fever_top_body_temp}
                                    />
                                    {error_section == 27 && (
                                      <div className="err_message2">
                                        {errorChrMsg}
                                      </div>
                                    )}
                                  </Grid>
                                </Grid>
                                <Grid>
                                  <Grid>
                                    <label>
                                      Low Value : Number in C (35 - 43)
                                    </label>
                                  </Grid>
                                  <Grid>
                                    <input
                                      type="number"
                                      placeholder="36.6"
                                      name="fever_low_body_temp"
                                      onChange={(e) =>
                                        updateAllEntrySec1(
                                          e,
                                          'fever_low_body_temp'
                                        )
                                      }
                                      // className={forError ? 'setRedColor' : ''}
                                      value={updateQues?.fever_low_body_temp}
                                    />
                                    {error_section == 28 && (
                                      <div className="err_message2">
                                        {errorChrMsg}
                                      </div>
                                    )}
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid className="bgncmnSpc">
                              <Grid className="bgncmnLbl">
                                <label>
                                  On a scale of 1 - 10, how would you describe
                                  the intensity of the pain?
                                </label>
                              </Grid>
                              <PainIntensity
                                name="fever_pain_intensity"
                                onChange={(e) => updateAllEntrySec1(e)}
                                value={Math.round(
                                  updateQues?.fever_pain_intensity
                                )}
                                // setting={this.props.settings}
                                comesFrom="Evalute"
                              />
                              {error_section == 29 && (
                                <div className="err_message2">
                                  {errorChrMsg}
                                </div>
                              )}
                            </Grid>

                            <FatiqueQuestion
                              updateAllEntrySec={(e) =>
                                updateAllEntrySec(e, 'fever_have_a_cough')
                              }
                              label="Do you have a cough?"
                              value={updateQues?.fever_have_a_cough}
                            />
                            {updateQues &&
                              updateQues?.fever_have_a_cough === 'yes' && (
                                <Grid className="fatiqueQues">
                                  <Grid className="bgncmnSpc">
                                    <Grid
                                      container
                                      direction="row"
                                      justify="center"
                                    >
                                      <Grid item xs={12} md={12}>
                                        <Grid
                                          container
                                          direction="row"
                                          justify="center"
                                        >
                                          <Grid item xs={4} md={4}>
                                            <Grid className="sickCheckSec">
                                              <FormControlLabel
                                                control={
                                                  <Checkbox
                                                    name="fever_cold"
                                                    value={
                                                      updateQues &&
                                                      updateQues?.fever_cold &&
                                                      updateQues?.fever_cold ==
                                                        true
                                                        ? false
                                                        : true
                                                    }
                                                    color="#00ABAF"
                                                    checked={
                                                      updateQues?.fever_cold
                                                    }
                                                    onChange={(e) => {
                                                      updateAllEntrySec2(e);
                                                    }}
                                                    className="PIC_Condition"
                                                  />
                                                }
                                                label="Cold ?"
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
                                                      updateQues &&
                                                      updateQues?.fever_hoarseness &&
                                                      updateQues?.fever_hoarseness ==
                                                        true
                                                        ? false
                                                        : true
                                                    }
                                                    color="#00ABAF"
                                                    checked={
                                                      updateQues?.fever_hoarseness
                                                    }
                                                    onChange={(e) => {
                                                      updateAllEntrySec2(e);
                                                    }}
                                                    className="PIC_Condition"
                                                  />
                                                }
                                                label="Hoarseness?"
                                              />
                                            </Grid>
                                          </Grid>
                                          <Grid item xs={4} md={4}></Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              )}
                            <Grid className="fillDiaAll">
                              <label>
                                Sputum? If sputum, what consistency and color?
                              </label>
                              <NotesEditor
                                name="fever_sputum"
                                onChange={(e) =>
                                  updateAllEntrySec(e, 'fever_sputum')
                                }
                                value={updateQues?.fever_sputum}
                              />
                              {error_section == 30 && (
                                <div className="err_message2">
                                  {errorChrMsg}
                                </div>
                              )}
                            </Grid>
                          </Grid>
                        )}

                        <Grid className="sickQuesSec">
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'back_pain')
                            }
                            label="You have Back pain?"
                            value={updateQues?.back_pain}
                          />
                          {error_section == 52 && (
                            <div className="err_message2">{errorChrMsg}</div>
                          )}
                        </Grid>

                        {updateQues && updateQues?.back_pain === 'yes' && (
                          <Grid className="borderLineAfer">
                            <Grid className="bgncmnSpc">
                              <Grid className="bgncmnLbl">
                                <label>When did the symptoms begin?</label>
                              </Grid>
                              <Grid>
                                <DateFormat
                                  name="back_pain_symptoms_begin"
                                  value={
                                    updateQues?.back_pain_symptoms_begin
                                      ? new Date(
                                          updateQues?.back_pain_symptoms_begin
                                        )
                                      : new Date()
                                  }
                                  max={new Date()}
                                  onChange={(e) =>
                                    updateAllEntrySec(
                                      e,
                                      'back_pain_symptoms_begin'
                                    )
                                  }
                                  // date_format={
                                  //   this.props.settings &&
                                  //   this.props.settings.setting &&
                                  //   this.props.settings.setting.date_format
                                  // }
                                  NotFutureDate={true}
                                />
                                {error_section == 31 && (
                                  <div className="err_message2">
                                    {errorChrMsg}
                                  </div>
                                )}
                              </Grid>
                            </Grid>
                            <FatiqueQuestion
                              updateAllEntrySec={(e) =>
                                updateAllEntrySec(e, 'back_pain_been_injured')
                              }
                              label="Have you been injured ?"
                              value={updateQues?.back_pain_been_injured}
                            />
                            <Grid className="sickQuesSec">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(
                                    e,
                                    'back_pain_physically_strained'
                                  )
                                }
                                label="Have you been physically strained?"
                                value={
                                  updateQues?.back_pain_physically_strained
                                }
                              />
                            </Grid>
                            <Grid className="sickQuesSec">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(
                                    e,
                                    'back_pain_stress_depression'
                                  )
                                }
                                label="Do you suffer from stress and/or depression?"
                                value={updateQues?.back_pain_stress_depression}
                              />
                            </Grid>
                            <Grid className="sickQuesSec">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(
                                    e,
                                    'back_pain_have_diabetes'
                                  )
                                }
                                label="Do you have diabetes? If so, what is your blood sugar?"
                                value={updateQues?.back_pain_have_diabetes}
                              />
                            </Grid>
                            {updateQues &&
                              updateQues?.back_pain_have_diabetes === 'yes' && (
                                <>
                                  <Grid container direction="row" spacing="1">
                                    <Grid item md={6} sm={6}>
                                      <Grid className="fillDia">
                                        <MMHG
                                          name="back_pain_blood_sugar"
                                          Unit="mg/dl"
                                          label="Blood sugar"
                                          onChange={(e) =>
                                            updateAllEntrySec1(e)
                                          }
                                          value={
                                            updateQues?.back_pain_blood_sugar
                                          }
                                        />
                                      </Grid>
                                    </Grid>
                                    <Grid item md={6} sm={6}>
                                      <Grid className="fillDia">
                                        <MMHG
                                          name="back_pain_Hba1c"
                                          Unit="%"
                                          label="Hba1c"
                                          onChange={(e) =>
                                            updateAllEntrySec1(e)
                                          }
                                          value={updateQues?.back_pain_Hba1c}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid className="fillDia">
                                    <SelectByTwo
                                      name="back_pain_situation"
                                      label="Situation"
                                      options={Allsituation}
                                      onChange={(e) =>
                                        updateAllEntrySec(
                                          e,
                                          'back_pain_situation'
                                        )
                                      }
                                      value={updateQues?.back_pain_situation}
                                    />
                                  </Grid>
                                </>
                              )}
                            <Grid className="sickQuesSec">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'back_pain_heart_attack')
                                }
                                label="Have you ever had a heart attack?"
                                value={updateQues?.back_pain_heart_attack}
                              />
                            </Grid>
                            <Grid className="sickQuesSec">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(
                                    e,
                                    'back_pain_heart_failure'
                                  )
                                }
                                label="Do you suffer from diagnosed Heart failure?"
                                value={updateQues?.back_pain_heart_failure}
                              />
                            </Grid>
                            {error_section == 32 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                            <Grid>
                              <Grid className="bgncmnLbl">
                                <label>
                                  Do you suffer from high or low blood pressure
                                  if so can you give the values?
                                </label>
                              </Grid>
                              <Grid container direction="row" spacing="1">
                                <Grid item md={6} sm={6}>
                                  <Grid className="fillDia">
                                    <MMHG
                                      name="back_pain_rr_systolic"
                                      Unit="mmHg"
                                      label="RR_systolic"
                                      onChange={(e) => updateAllEntrySec1(e)}
                                      value={updateQues?.back_pain_rr_systolic}
                                    />
                                  </Grid>
                                  {error_section == 33 && (
                                    <div className="err_message2">
                                      {errorChrMsg}
                                    </div>
                                  )}
                                </Grid>
                                <Grid item md={6} sm={6}>
                                  <Grid className="fillDia">
                                    <MMHG
                                      name="back_pain_rr_diastolic"
                                      Unit="mmHg"
                                      label="RR_diastolic"
                                      onChange={(e) => updateAllEntrySec1(e)}
                                      value={updateQues?.back_pain_rr_diastolic}
                                    />
                                  </Grid>
                                  {error_section == 34 && (
                                    <div className="err_message2">
                                      {errorChrMsg}
                                    </div>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}

                        <Grid className="sickQuesSec">
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'cough_and_snees')
                            }
                            label="You have Cough and Snees?"
                            value={updateQues?.cough_and_snees}
                          />
                          {error_section == 53 && (
                            <div className="err_message2">{errorChrMsg}</div>
                          )}
                        </Grid>

                        {updateQues && updateQues?.cough_and_snees === 'yes' && (
                          <Grid className="borderLineAfer">
                            <Grid className="bgncmnSpc">
                              <Grid className="bgncmnLbl">
                                <label>When did the symptoms begin?</label>
                              </Grid>
                              <Grid>
                                <DateFormat
                                  name="cough_symptoms_begin"
                                  value={
                                    updateQues?.cough_symptoms_begin
                                      ? new Date(
                                          updateQues?.cough_symptoms_begin
                                        )
                                      : new Date()
                                  }
                                  max={new Date()}
                                  onChange={(e) =>
                                    updateAllEntrySec(e, 'cough_symptoms_begin')
                                  }
                                  // date_format={
                                  //   this.props.settings &&
                                  //   this.props.settings.setting &&
                                  //   this.props.settings.setting.date_format
                                  // }
                                  NotFutureDate={true}
                                />
                                {error_section == 35 && (
                                  <div className="err_message2">
                                    {errorChrMsg}
                                  </div>
                                )}
                              </Grid>
                            </Grid>

                            <Grid className="textFieldArea1">
                              <Grid className="bgncmnSpc">
                                <Grid className="bgncmnLbl">
                                  <label>
                                    If you have Temperature, please tell me in C
                                    ?
                                  </label>
                                </Grid>
                                <input
                                  type="number"
                                  placeholder="36.6"
                                  name="cough_body_temp"
                                  onChange={(e) =>
                                    updateAllEntrySec1(e, 'cough_body_temp')
                                  }
                                  // className={forError ? 'setRedColor' : ''}
                                  value={updateQues?.cough_body_temp}
                                ></input>
                                {error_section == 36 && (
                                  <div className="err_message2">
                                    {errorChrMsg}
                                  </div>
                                )}
                              </Grid>
                            </Grid>

                            <Grid className="bgncmnSpc">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(
                                    e,
                                    'cough_envi_suffer_symtoms'
                                  )
                                }
                                label="Does someone in your environment suffer from the same symtoms?"
                                value={updateQues?.cough_envi_suffer_symtoms}
                              />
                              {error_section == 37 && (
                                <div className="err_message2">
                                  {errorChrMsg}
                                </div>
                              )}
                            </Grid>

                            <Grid className="fillDiaAll">
                              <Grid>
                                <Grid className="bgncmnLbl">
                                  <label>
                                    Do you suffer from allergies? If so, against
                                    what?
                                  </label>
                                </Grid>
                                <NotesEditor
                                  name="cough_suffer_from_allergies"
                                  onChange={(e) =>
                                    updateAllEntrySec(
                                      e,
                                      'cough_suffer_from_allergies'
                                    )
                                  }
                                  value={
                                    updateQues?.cough_suffer_from_allergies
                                  }
                                />
                                {error_section == 38 && (
                                  <div className="err_message2">
                                    {errorChrMsg}
                                  </div>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        )}

                        <Grid className="sickQuesSec">
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'feel_depressed')
                            }
                            label="You feel Depressed?"
                            value={updateQues?.feel_depressed}
                          />
                          {error_section == 54 && (
                            <div className="err_message2">{errorChrMsg}</div>
                          )}
                        </Grid>

                        {updateQues && updateQues?.feel_depressed === 'yes' && (
                          <Grid className="borderLineAfer">
                            <Grid className="bgncmnSpc">
                              <Grid className="bgncmnLbl">
                                <label>When did the symptoms begin?</label>
                              </Grid>
                              <Grid>
                                <DateFormat
                                  name="depressed_symptoms_begin"
                                  value={
                                    updateQues?.depressed_symptoms_begin
                                      ? new Date(
                                          updateQues?.depressed_symptoms_begin
                                        )
                                      : new Date()
                                  }
                                  max={new Date()}
                                  onChange={(e) =>
                                    updateAllEntrySec(
                                      e,
                                      'depressed_symptoms_begin'
                                    )
                                  }
                                  // date_format={
                                  //   this.props.settings &&
                                  //   this.props.settings.setting &&
                                  //   this.props.settings.setting.date_format
                                  // }
                                  NotFutureDate={true}
                                />
                                {error_section == 39 && (
                                  <div className="err_message2">
                                    {errorChrMsg}
                                  </div>
                                )}
                              </Grid>
                            </Grid>

                            <Grid className="bgncmnSpc">
                              <Grid className="bgncmnLbl">
                                <label>
                                  On a scale of 1 - 10, how would you describe
                                  the intensity of the pain?
                                </label>
                              </Grid>
                              <PainIntensity
                                name="depressed_pain_intensity"
                                onChange={(e) => updateAllEntrySec1(e)}
                                value={Math.round(
                                  updateQues?.depressed_pain_intensity
                                )}
                                // setting={this.props.settings}
                                comesFrom="Evalute"
                              />
                              {error_section == 40 && (
                                <div className="err_message2">
                                  {errorChrMsg}
                                </div>
                              )}
                            </Grid>

                            <FatiqueQuestion
                              updateAllEntrySec={(e) =>
                                updateAllEntrySec(e, 'depressed_do_you_sleep')
                              }
                              label="Do you sleep?"
                              value={updateQues?.depressed_do_you_sleep}
                            />
                            <Grid className="sickQuesSec">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(
                                    e,
                                    'depressed_suicidal_thoughts'
                                  )
                                }
                                label="You have suicidal thoughts or ?"
                                value={updateQues?.depressed_suicidal_thoughts}
                              />
                            </Grid>
                            <Grid className="bgncmnSpcRmv sickQuesSec">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(
                                    e,
                                    'depressed_hurt_yourself'
                                  )
                                }
                                label="Do you already hurt yourself once?"
                                value={updateQues?.depressed_hurt_yourself}
                              />
                              {error_section == 41 && (
                                <div className="err_message2">
                                  {errorChrMsg}
                                </div>
                              )}
                            </Grid>
                          </Grid>
                        )}

                        <Grid className="sickQuesSec">
                          <FatiqueQuestion
                            updateAllEntrySec={(e) =>
                              updateAllEntrySec(e, 'cardiac_problems')
                            }
                            label="you have Cardiac Problems?"
                            value={updateQues?.cardiac_problems}
                          />
                        </Grid>

                        {error_section == 55 && (
                          <div className="err_message2">{errorChrMsg}</div>
                        )}
                        {updateQues && updateQues?.cardiac_problems === 'yes' && (
                          <Grid className="borderLineAfer">
                            <Grid className="bgncmnSpc">
                              <Grid className="bgncmnLbl">
                                <label>What is your Blood pressure ?</label>
                              </Grid>
                              <Grid container direction="row" spacing="1">
                                <Grid item md={6} sm={6}>
                                  <Grid className="fillDia">
                                    <MMHG
                                      name="cardiac_rr_systolic"
                                      Unit="mmHg"
                                      label="RR_systolic"
                                      onChange={(e) => updateAllEntrySec1(e)}
                                      value={updateQues?.cardiac_rr_systolic}
                                    />
                                  </Grid>
                                  {error_section == 42 && (
                                    <div className="err_message2">
                                      {errorChrMsg}
                                    </div>
                                  )}
                                </Grid>
                                <Grid item md={6} sm={6}>
                                  <Grid className="fillDia">
                                    <MMHG
                                      name="cardiac_rr_diastolic"
                                      Unit="mmHg"
                                      label="RR_diastolic"
                                      onChange={(e) => updateAllEntrySec1(e)}
                                      value={updateQues?.cardiac_rr_diastolic}
                                    />
                                  </Grid>
                                  {error_section == 43 && (
                                    <div className="err_message2">
                                      {errorChrMsg}
                                    </div>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>

                            <FatiqueQuestion 
                              updateAllEntrySec={(e) =>
                                updateAllEntrySec(e, 'cardiac_heart_attack')
                              }
                              label="Have you ever had a heart attack?"
                              value={updateQues?.cardiac_heart_attack}
                            />
                            <Grid className="sickQuesSec">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'cardiac_heart_failure')
                                }
                                label="Do you suffer from diagnosed Heart failure?"
                                value={updateQues?.cardiac_heart_failure}
                              />
                            </Grid>
                            <Grid className="sickQuesSec">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(e, 'cardiac_have_dizziness')
                                }
                                label="Do you have dizziness?"
                                value={updateQues?.cardiac_have_dizziness}
                              />
                            </Grid>
                            <Grid className="sickQuesSec">
                              <FatiqueQuestion
                                updateAllEntrySec={(e) =>
                                  updateAllEntrySec(
                                    e,
                                    'cardiac_have_shoulder_pain'
                                  )
                                }
                                label="Do you have shoulder pain?"
                                value={updateQues?.cardiac_have_shoulder_pain}
                              />
                            </Grid>
                            {error_section == 44 && (
                              <div className="err_message2">{errorChrMsg}</div>
                            )}
                          </Grid>
                        )}
                        <Grid>
                          <Grid className="sickCheckSec">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="DataprotectionRules"
                                  value={
                                    DataprotectionRules &&
                                    DataprotectionRules == true
                                      ? false
                                      : true
                                  }
                                  color="#00ABAF"
                                  checked={DataprotectionRules}
                                  onChange={(e) => {
                                    updateAllEntrySec2(e);
                                  }}
                                  className="PIC_Condition"
                                />
                              }
                              label="I have react and understood the Data protection rules and Regulations of Aimedis."
                            />
                          </Grid>
                          {error_section == 45 && (
                            <div className="err_message2">{errorChrMsg}</div>
                          )}
                        </Grid>
                        <Grid className="infoShwSave3">
                          <input
                            type="submit"
                            value="Submit"
                            onClick={handleEvalSubmit}
                          ></input>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid>
                        <Grid className="selCalenderUpr">
                          <Grid className="selCalender">
                            <Calendar2
                              onChange={(e) => onChange(e)}
                              value={date}
                            />
                          </Grid>
                          <Grid className="selTimeSlot">
                            <Grid>
                              <label>Select time slot</label>
                            </Grid>

                            {/* <Grid className="selTimeAM">
                              {this.state.appointDate &&
                              this.state.appointDate.length > 0 ? (
                                this.Availabledays(
                                  this.state.selectedDate,
                                  this.state.appointmentData.appointment_days
                                ) ? (
                                  <Grid>
                                    <span>NotAvailable !</span>
                                  </Grid>
                                ) : this.ExitinHoliday(
                                    this.state.selectedDate,
                                    this.state.appointmentData.holidays_start,
                                    this.state.appointmentData.holidays_end
                                  ) ? (
                                  <Grid>
                                    <span>holiday !</span>
                                  </Grid>
                                ) : (
                                  this.state.appointDate.map((data, iA) => {
                                    if (
                                      this.Isintime(
                                        this.state.appointDate[iA],
                                        this.state.appointmentData
                                          .breakslot_start,
                                        this.state.appointmentData
                                          .breakslot_end,
                                        this.state.appointmentData
                                          .holidays_start,
                                        this.state.appointmentData.holidays_end
                                      )
                                    )
                                      return;

                                    return (
                                      <Grid>
                                        {this.state.appointDate[iA + 1] &&
                                        this.state.appointDate[iA + 1] !==
                                          'undefined' &&
                                        iA === 0 ? (
                                          <a
                                            className={
                                              this.state.currentSelected ===
                                                0 && 'current_selected'
                                            }
                                            onClick={() => {
                                              this.findAppointment(
                                                'tab3',
                                                doc_select,
                                                appointType,
                                                apointDay,
                                                iA
                                              );
                                            }}
                                          >
                                            {this.state.appointDate[iA] +
                                              ' - ' +
                                              this.state.appointDate[iA + 1]}
                                          </a>
                                        ) : (
                                          this.state.appointDate[iA + 1] &&
                                          this.state.appointDate[iA + 1] !==
                                            'undefined' && (
                                            <a
                                              className={
                                                this.state.currentSelected &&
                                                this.state.currentSelected ===
                                                  iA
                                                  ? 'current_selected'
                                                  : ''
                                              }
                                              onClick={() => {
                                                this.findAppointment(
                                                  'tab3',
                                                  doc_select,
                                                  appointType,
                                                  apointDay,
                                                  iA
                                                );
                                              }}
                                            >
                                              {this.state.appointDate[iA] +
                                                ' - ' +
                                                this.state.appointDate[iA + 1]}
                                            </a>
                                          )
                                        )}
                                      </Grid>
                                    );
                                  })
                                )
                              ) : this.state.appointDate !== undefined ? (
                                <Grid>
                                  <span>NotAvailable !</span>
                                </Grid>
                              ) : (
                                <Grid>
                                  <span>NotAvailable !</span>
                                </Grid>
                              )}
                            </Grid> */}
                            <Grid className="selTimeAM">
                              {appointDate && appointDate?.length > 0 ? (
                                Availabledays(
                                  this.state.selectedDate,
                                  this.state.appointmentData.appointment_days
                                ) ? (
                                  <Grid>
                                    <span>Not Available !</span>
                                  </Grid>
                                ) : ExitinHoliday(
                                    this.state.selectedDate,
                                    this.state.appointmentData.holidays_start,
                                    this.state.appointmentData.holidays_end
                                  ) ? (
                                  <Grid>
                                    <span>holiday !</span>
                                  </Grid>
                                ) : (
                                  appointDate.map((data, iA) => {
                                    if (
                                      Isintime(
                                        appointDate[iA],
                                        appointmentData.breakslot_start,
                                        appointmentData.breakslot_end,
                                        appointmentData.holidays_start,
                                        appointmentData.holidays_end
                                      )
                                    )
                                      return;

                                    return (
                                      <Grid>
                                        {appointDate[iA + 1] &&
                                        appointDate[iA + 1] !== 'undefined' &&
                                        iA === 0 ? (
                                          <a
                                          // className={
                                          //   this.state.currentSelected ===
                                          //     0 && 'current_selected'
                                          // }
                                          // onClick={() => {
                                          //   this.findAppointment(
                                          //     'tab3',
                                          //     doc_select,
                                          //     appointType,
                                          //     apointDay,
                                          //     iA
                                          //   );
                                          // }}
                                          >
                                            {appointDate[iA] +
                                              ' - ' +
                                              appointDate[iA + 1]}
                                          </a>
                                        ) : (
                                          appointDate[iA + 1] &&
                                          appointDate[iA + 1] !==
                                            'undefined' && (
                                            <a
                                            // className={
                                            //   this.state.currentSelected &&
                                            //   this.state.currentSelected ===
                                            //     iA
                                            //     ? 'current_selected'
                                            //     : ''
                                            // }
                                            // onClick={() => {
                                            //   this.findAppointment(
                                            //     'tab3',
                                            //     doc_select,
                                            //     appointType,
                                            //     apointDay,
                                            //     iA
                                            //   );
                                            // }}
                                            >
                                              {appointDate[iA] +
                                                ' - ' +
                                                appointDate[iA + 1]}
                                            </a>
                                          )
                                        )}
                                      </Grid>
                                    );
                                  })
                                )
                              ) : appointDate !== undefined ? (
                                <Grid>
                                  <span>Not Available !</span>
                                </Grid>
                              ) : (
                                <Grid>
                                  <span>NotAvailable !</span>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid className="infoShwSave3">
                          <input
                            type="submit"
                            value="Submit"
                            onClick={handleEvalSubmit}
                          ></input>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>

                {/* <Grid className="stripePromiseClss"> */}

                {/* </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Index;
