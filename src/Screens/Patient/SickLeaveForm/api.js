import axios from 'axios';
import sitedata from 'sitedata';
import { commonHeader } from 'component/CommonHeader/index';
import Timezone from 'timezon.json';
import { GetLanguageDropdown } from 'Screens/Components/GetMetaData/index.js';
import { getLanguage } from 'translations/index';
import { getDate } from 'Screens/Components/BasicMethod/index';
import moment from 'moment';

export function getHouseId() {
  let env = 'DEV';
  let url = '';
  if (typeof window !== 'undefined') {
    let target = window.location.href;
    env = target.match(/localhost/) ? 'DEV' : 'PRD';
  }
  let HouseId;
  if (env === 'DEV') {
    HouseId = process.env.REACT_APP_DEV_HOUSE_ID;
  } else {
    HouseId = process.env.REACT_APP_TEST_HOUSE_ID;
  }
  return HouseId;
}

// export const getAmountData = (current) => {
//   current.setState({ loaderImage: true });
//   var house_id = getHouseId();
//   axios
//     .get(
//       sitedata.data.path +
//       '/vactive/GetAmount/' + house_id,
//       commonHeader(current.props.stateLoginValueAim.token)
//     )
//     .then((response) => {
//       if (response.data.hassuccessed) {
//         current.setState({
//           amountDta: response?.data?.sickleave_certificate_amount,

//           loaderImage: false,
//         });
//       }
//     })
//     .catch((err) => {
//       current.setState({ loaderImage: false });
//     });
// };

//Not need yet this for the payment
export const fromEuroToCent = (amount, current) => {
  return parseInt(amount * 100);
};

export const fromMinToEuro = (min, current) => {
  return parseInt(min * 500);
};

export const CancelClick = (current) => {
  current.props.history.push('/appointment-list');
};

// //for downoading the pdf
// export const DownloadCert = (data, current) => {
//   current.setState({ loaderImage: true });
//   axios
//     .post(sitedata.data.path + '/vactive/downloadSickleaveCertificate', data, {
//       responseType: 'blob',
//     })
//     .then((responce) => {
//       current.setState({ loaderImage: false });
//       var data = new Blob([responce.data]);
//       if (typeof window.navigator.msSaveBlob === 'function') {
//         // If it is IE that support download blob directly.
//         window.navigator.msSaveBlob(data, 'report.pdf');
//       } else {
//         var blob = data;
//         var link = document.createElement('a');
//         link.href = window.URL.createObjectURL(blob);
//         link.download = 'report.pdf';
//         document.body.appendChild(link);
//         link.click(); // create an <a> element and simulate the click operation.
//       }
//     });
// };

// For send meeting link sendLinkDocPatpatient as well as doctor
export const sendLinkDocPat = (taskValue, current) => {
  console.log('call on credit card too')
  var data = {};
  var patient_info = {
    first_name: current.props.stateLoginValueAim?.user?.first_name,
    last_name: current.props.stateLoginValueAim?.user?.last_name,
    alies_id: current.props.stateLoginValueAim?.user?.alies_id,
    profile_id: current.props.stateLoginValueAim?.user?.profile_id,
    // user_id: current.props.stateLoginValueAim?.user.user?._id,
  };
  data.patient_info = patient_info;
  console.log('taskValue?.assinged_to[0]', taskValue?.assinged_to[0])
  var doctor_info = {
    first_name: taskValue?.assinged_to[0]?.first_name,
    last_name: taskValue?.assinged_to[0]?.last_name,
    alies_id: taskValue?.assinged_to[0]?.alies_id,
    profile_id: taskValue?.assinged_to[0]?.profile_id,
    user_id: taskValue?.assinged_to[0]?.user_id,
  }
  data.docProfile = doctor_info;
  let patientEmail = current?.props?.stateLoginValueAim?.user?.email;
  data.task_type = 'video_conference';
  data.task_id = taskValue?._id;
  data.date = taskValue?.date;
  var tq1 = taskValue?.start.split(':');
  var tq2 = taskValue?.end.split(':');
  var calRandomNo = Math.floor(Math.random() * 90 + 10);
  var Access_key = `${taskValue?.patient?.profile_id}-${taskValue?.assinged_to[0]?.profile_id}-${calRandomNo}`;
  data.sesion_id = Access_key;
  data.start_time = new Date(
    new Date(taskValue?.date).setHours(tq1[0], tq1[1])
  );
  data.end_time = new Date(new Date(taskValue?.date).setHours(tq2[0], tq2[1]));
  data.patient_mail = patientEmail;
  data.patient_profile_id = taskValue?.patient?.profile_id;
  data.patient_id = current.props.stateLoginValueAim?.user?._id;
  data.doctor_profile_id = taskValue?.assinged_to[0]?.profile_id;
 console.log('taskValue?.assinged_to[0]?.user_id', taskValue?.assinged_to[0]?.user_id)
  data.doctor_id = taskValue?.assinged_to[0]?.user_id;
  current.setState({ loaderImage: true });
  axios
    .post(
      sitedata.data.path + '/vactive/AddMeeting/' + taskValue?.start + '/' + taskValue?.end,
      data,
      commonHeader(current.props.stateLoginValueAim.token)
    )
    .then((responce) => {
      if (responce.data.hassuccessed) {
        current.setState({ loaderImage: false });
        current.props.history.push('/appointment-list');
      } else {
        current.setState({ loaderImage: false });
      }
    }).catch((err) => { })
};

// export function getLink() {
//   let env = 'DEV';
//   let url = '';
//   if (typeof window !== 'undefined') {
//     let target = window.location.href;
//     env = target.match(/localhost/) ? 'DEV' : 'PRD';
//   }
//   let STRIPE_PUBLISHABLE;
//   if (env === 'DEV') {
//     STRIPE_PUBLISHABLE = 'https://virtualhospital.aidoc.io/video-conference';
//   } else {
//     STRIPE_PUBLISHABLE = 'https://virtualhospital.aidoc.io/video-conference';
//   }
//   return STRIPE_PUBLISHABLE;
// }

export const CallTopUpApi_Add = (current, data) => {
  var calPrePaid = 0;
  if (current.props.stateLoginValueAim?.VideoData?.prepaid_talktime_min && parseInt(current.props.stateLoginValueAim?.VideoData?.prepaid_talktime_min) > 0) {
    calPrePaid = parseInt(current.props.stateLoginValueAim?.VideoData?.prepaid_talktime_min);
  }

  calPrePaid = calPrePaid + parseInt(data?.data?.paymentData?.amount / 500)
  var info = {
    paid_amount_obj: {
      datetime: data?.data?.paymentData?.Date,
      amount: data?.data?.paymentData?.amount / 100,
      min: data?.data?.paymentData?.amount / 500,
      payment_data: data?.data?.paymentData,
    },
    prepaid_talktime_min: calPrePaid,
    manage_for: "add",
    _id: current.props.stateLoginValueAim?.VideoData?._id,
  }
  current.setState({ loaderImage: true });
  axios
    .post(sitedata.data.path + '/vchat/managePrepaid',
      info)
    .then((res) => {
      current.setState({ loaderImage: false });
      var user_token = current.props.stateLoginValueAim.token
      var forUpdate = { value: true, token: user_token, user: current.props?.stateLoginValueAim?.user }
      var VideoData = res.data?.data
      current.props.LoginReducerAim(current.props?.stateLoginValueAim?.user?.email, '', current.props?.stateLoginValueAim?.user_token, () => { }, forUpdate, current.props?.stateLoginValueAim?.isVideoLoggedIn, VideoData, current.props?.stateLoginValueAim?.is_vedio_registered);
    })
    .catch((err) => {
      current.setState({ loaderImage: false });
    })
}

// For payment stripe
export const saveOnDB1 = (data, task, current) => {
  current.setState({ loaderImage: true });
  if (data._id || task && task.payment_by && task.payment_by === "Credit-Card" && task._id) {
    if (task && task.payment_by && task.payment_by === "Credit-Card") {
      var id = task?._id;
      var Spdata = {
        payment_data: data?.data?.paymentData,
        amount: data?.data?.paymentData?.amount,
        is_payment: true,
        pay_with_topup: false
      }
    }
    else {
      id = data?._id;
      Spdata = {
        amount: data?.amount,
        is_payment: true,
        pay_with_topup: true
      }
    }
    axios
      .put(
        sitedata.data.path + '/vh/AddTask/' + id,
        Spdata,
        commonHeader(current.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        if (responce.data.hassuccessed) {
          console.log('frombackend',responce.data.data)

          if (task && task.payment_by && task.payment_by === "Credit-Card") {
            sendLinkDocPat(responce.data.data, current);
          }
          else {
            sendLinkDocPat(responce.data.data, current);
          }
          current.setState({ loaderImage: false });
          current.props.history.push('/appointment-list');
        }
      });
  } else {
    current.setState({ loaderImage: false });
  }
};
//Get All information Related to Metadata
export const getMetadata = (current) => {
  current.setState({ allMetadata: current.props.metadata }, () => {
    GetLanguageMetadata(current);
  });
};

export const DownloadBill = (current, item) => {
  current.setState({ loaderImage: true });
  const data = {
    data: {
      first_name: current.props.stateLoginValueAim?.user?.first_name,
      last_name: current.props.stateLoginValueAim?.user?.last_name,
      address: current.props.stateLoginValueAim?.user?.address,
      country: current.props.stateLoginValueAim?.user?.country,
      city: current.props.stateLoginValueAim?.user?.city,
      birthday: current.props.stateLoginValueAim?.user?.birthday,
    },
    task_id: item?._id,
    type: 'video_conference',
  };
  axios
    .post(sitedata.data.path + "/vchat/DownloadbillVC", data, {
      responseType: "blob",
    })
    .then((res) => {
      current.setState({ loaderImage: false });
      var data = new Blob([res.data]);
      if (typeof window.navigator.msSaveBlob === 'function') {
        // If it is IE that support download blob directly.
        window.navigator.msSaveBlob(data, 'bill.pdf');
      } else {
        var blob = data;
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'bill.pdf';
        document.body.appendChild(link);
        link.click(); // create an <a> element and simulate the click operation.
      }
    });
};

export const GetLanguageMetadata = (current) => {
  if (current.state.allMetadata) {
    var Allsituation = GetLanguageDropdown(
      current.state.allMetadata &&
      current.state.allMetadata.situation &&
      current.state.allMetadata.situation,
      current.props.stateLanguageType
    );
    var Allsmoking_status = GetLanguageDropdown(
      current.state.allMetadata &&
      current.state.allMetadata.smoking_status &&
      current.state.allMetadata.smoking_status,
      current.props.stateLanguageType
    );
    current.setState({
      Allsituation: Allsituation,
      Allsmoking_status: Allsmoking_status,
    });
  }
};

export const allgetData = (patient_id, current) => {
  current.setState({ loaderImage: true });
  let translate = getLanguage(current.props.stateLanguageType);
  let { Something_went_wrong } = translate;
  axios
    .get(
      sitedata.data.path + '/vchat/GetVideoTask/' + patient_id,
      commonHeader(current.props.stateLoginValueAim.token)
    )
    .then((responce) => {
      current.setState({ loaderImage: false });
      if (responce.data.hassuccessed) {
        let data = responce.data;
        var totalPage = Math.ceil(data?.data?.length / 20);
        current.setState(
          {
            AllDataSec1: data.data,
            loaderImage: false,
            totalPage: totalPage,
            currentPage: 1,
          },
          () => {
            if (totalPage > 1) {
              var pages = [];
              for (var i = 1; i <= current.state.totalPage; i++) {
                pages.push(i);
              }
              current.setState({
                AllDataSec: current.state.AllDataSec1.slice(0, 20),
                pages: pages,
              });
            } else {
              current.setState({ AllDataSec: current.state.AllDataSec1 });
            }
          }
        );
      } else {
        current.setState({
          errorMsg: Something_went_wrong,
          loaderImage: false,
        });
      }
    });
};

export const PaymentDue = (data, current) => {
  let translate = getLanguage(current.props.stateLanguageType);
  let {
    payment_process_must_be_within_15_min
  } = translate;
  let approvedDate = moment(data?.approved_date).format("DD-MM-YYYY");
  var currentDate = moment(new Date()).format("DD-MM-YYYY");
  let approvedTimes = moment(data?.approved_date);
  let currentTime = moment();
  // if (moment(currentDate).isSame(approvedDate)) {
  if (currentDate === approvedDate) {
    let approvedTime = currentTime.diff(approvedTimes, 'minutes');
    if (approvedTime >= 15) {
      current.setState({ error_section: 90, errorChrMsg: payment_process_must_be_within_15_min });
      setTimeout(() => { current.setState({ errorChrMsg: '' }) }, 10000);
      MoveTop(0);
    } else {
      var check = data?.payment_by;
      current.props.history.push({
        pathname: check === "Top-Up" ? "/payment/top-up" : "/payment/credit-card",
        state: {
          data: data
        }
      })
    }
  } else {
    current.setState({ error_section: 90, errorChrMsg: payment_process_must_be_within_15_min });
    setTimeout(() => { current.setState({ errorChrMsg: '' }) }, 10000);
    MoveTop(0);
  }
};



export const handleCloseDetail = (current) => {
  current.setState({ openDetail: false });
};

export const handleOpenDetail = (item, current) => {
  current.setState({ openDetail: true, newTask: item });
};

export const EditRequest = (current, data) => {
  current.props.history.push({
    pathname: '/patient/sick-request',
    state: { updateQues: data },
  });
};

export const saveOnDB = (current) => {
  current.setState({ loaderImage: true });
  if (current.state.updateQues._id) {
    axios
      .put(
        sitedata.data.path + '/vh/AddTask/' + current.state.updateQues._id,
        commonHeader(current.props.stateLoginValueAim.token)
      )
      .then((responce) => {
        current.setState({ loaderImage: false });
        if (responce.data.hassuccessed) {
          current.props.history.push('/patient/request-list');
        }
      });
  } else {
    current.setState({ loaderImage: false });
  }
};

// Set the state of questions
export const updateAllEntrySec = (e, name, current) => {
  var updateQues = current.state.updateQues;
  updateQues[name] = e;
  current.setState({ updateQues: updateQues });
};

export const updateAllEntrySec1 = (e, current) => {
  var updateQues = current.state.updateQues;
  updateQues[e.target.name] = e.target.value;
  current.setState({ updateQues: updateQues });
};
// Set the checkbox state
export const updateAllEntrySec2 = (e, current) => {
  if (e.target.name === 'DataprotectionRules') {
    current.setState({ DataprotectionRules: e.target.checked });
  } else {
    var updateQues = current.state.updateQues;
    updateQues[e.target.name] = e.target.checked;
    current.setState({ updateQues: updateQues });
  }
};
// For scroll of every error message
export const MoveTop = (top) => {
  window.scroll({
    top: top,
    behavior: 'smooth',
  });
};

export const handleEvalSubmit = (current, value) => {
  let translate = getLanguage(current.props.stateLanguageType);
  let {
    please_select,
    data_protection_rules_and_regulations_of_aimedis,
    atleast_one_problem_for,
    time_slot,
    sick_leave_certificate,
  } = translate;
  current.setState({ errorChrMsg: '' });
  let data = {};
  data = current.state.updateQues;
  var due_on = data?.due_on || {};
  due_on['date'] = new Date();
  data.due_on = due_on;
  due_on['time'] = new Date();
  data.due_on = due_on;
  var patient = {
    first_name: current.props.stateLoginValueAim?.user?.first_name,
    last_name: current.props.stateLoginValueAim?.user?.last_name,
    alies_id: current.props.stateLoginValueAim?.user?.alies_id,
    profile_id: current.props.stateLoginValueAim?.user?.profile_id,
    user_id: current.props.stateLoginValueAim?.user.user?._id,
  };
  data.patient = patient;
  data.patient_id = current.props.stateLoginValueAim?.user?._id;
  data.task_name = 'Video Conference from patient';
  data.task_type = 'video_conference';
  data.done_on = '';
  data.priority = 0;
  data.archived = false;
  data.is_payment = false;
  data.status = 'open';
  data.created_at = new Date();
  data.house_id = current.props.dataa?.house_id;
  data.amount = current.props.dataa?.amount;
  data.total_time = current.props.dataa?.time;
  if (current.props.dataa && current.props.dataa.permission) {
    data.payment_by = "Top-Up";
  } else {
    data.payment_by = "Credit-Card";
  }
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
  if (value === 1) {
    if (validatePainHeart1(data.headache, '', 'headache', current)) {
      if (validatePainHeart(data.headache, data, 'painbegin', current)) {
        if (validatePainHeart(data.headache, data, 'hurtnow', current)) {
          if (
            validatePainHeart(
              data.headache,
              data.headache_rr_systolic,
              'headache_rr_systolic',
              current
            )
          ) {
            if (
              validatePainHeart(
                data.headache,
                data.headache_rr_diastolic,
                'headache_rr_diastolic',
                current
              )
            ) {
              if (
                validatePainHeart(
                  data.headache,
                  data,
                  'headache_have_temprature',
                  current
                )
              ) {
              if (
                validatePainHeart(
                  data.headache,
                  data.headache_body_temp,
                  'headache_body_temp',
                  current
                )
              ) {
               
                if (
                  validatePainHeart(
                    data.headache,
                    data,
                    'headache_have_diabetes',
                    current
                  )
                ) {
                  if (
                    validatePainHeart(
                      data.headache,
                      data.headache_quality_of_pain,
                      'headache_quality_of_pain',
                      current
                    )
                  ) {
                    if (
                      validatePainHeart1(
                        data.headache,
                        data.headache_need_to_vomit,
                        'headache_need_to_vomit',
                        current
                      )
                    ) {
                      if (
                        validatePainHeart1(
                          data.headache,
                          data.headache_onset_of_pain,
                          'headache_onset_of_pain',
                          current
                        )
                      ) {
                        if (
                          validatePainHeart1(
                            data.headache,
                            data.headache_take_painkillers,
                            'headache_take_painkillers',
                            current
                          )
                        ) {
                          if (
                            validatePainHeart(
                              data.headache,
                              data.headache_pain_intensity,
                              'headache_pain_intensity',
                              current
                            )
                          ) {
                            if (
                              validatePainHeart(
                                data.headache,
                                data.headache_undergoing_treatment,
                                'headache_undergoing_treatment',
                                current
                              )
                            ) {
                              if (
                                validatePainHeart1(
                                  data.stomach_problems,
                                  data,
                                  'stomach_problems',
                                  current
                                )
                              ) {
                                if (
                                  validatePainHeart(
                                    data.stomach_problems,
                                    data.stomach_painbegin_painPoint,
                                    'stomach_painbegin_painPoint',
                                    current
                                  )
                                ) {
                                  if (
                                    validatePainHeart(
                                      data.stomach_problems,
                                      data.stomach_hurtnow_painPoint,
                                      'stomach_hurtnow_painPoint',
                                      current
                                    )
                                  ) {
                                    if (
                                      validatePainHeart1(
                                        data.stomach_problems,
                                        data.stomach_behind_the_sternum,
                                        'stomach_behind_the_sternum',
                                        current
                                      )
                                    ) {
                                      if (
                                        validatePainHeart1(
                                          data.stomach_problems,
                                          data.stomach_heart_attack,
                                          'stomach_heart_attack',
                                          current
                                        )
                                      ) {
                                        if (
                                          validatePainHeart1(
                                            data.stomach_problems,
                                            data.stomach_heart_failure,
                                            'stomach_heart_failure',
                                            current
                                          )
                                        ) {
                                          if (
                                            validatePainHeart(
                                              data.stomach_problems,
                                              data,
                                              'stomach_blood_pressure',
                                              current
                                            )
                                          ) {

                                              if (
                                                validatePainHeart(
                                                  data.stomach_problems,
                                                  data.stomach_continuously_or_periodically,
                                                  'stomach_continuously_or_periodically',
                                                  current
                                                )
                                              ) {
                                               
                                                if (
                                                  validatePainHeart(
                                                    data.stomach_problems,
                                                    data,
                                                    'stomache_have_temprature',
                                                    current
                                                  )
                                                ) {
                                                  if (
                                                    validatePainHeart(
                                                      data.stomach_problems,
                                                      data.stomach_take_painkillers,
                                                      'stomach_take_painkillers',
                                                      current
                                                    )
                                                  ) {
                                                    if (
                                                      validatePainHeart(
                                                        data.stomach_problems,
                                                        data.stomach_pain_intensity,
                                                        'stomach_pain_intensity',
                                                        current
                                                      )
                                                    ) {
                                                      if (
                                                        validatePainHeart(
                                                          data.stomach_problems,
                                                          data.stomach_undergoing_treatment,
                                                          'stomach_undergoing_treatment',
                                                          current
                                                        )
                                                      ) {
                                                        if (
                                                          validatePainHeart1(
                                                            data.diarrhea,
                                                            data,
                                                            'diarrhea',
                                                            current
                                                          )
                                                        ) {
                                                          if (
                                                            validatePainHeart(
                                                              data.diarrhea,
                                                              data.diarrhea_symptoms_begin,
                                                              'diarrhea_symptoms_begin',
                                                              current
                                                            )
                                                          ) {
                                                            if (
                                                              validatePainHeart(
                                                                data.diarrhea,
                                                                data.diarrhea_suffer_from_vomiting,
                                                                'diarrhea_suffer_from_vomiting',
                                                                current
                                                              )
                                                            ) {
                                                              if (
                                                                validatePainHeart(
                                                                  data.diarrhea,
                                                                  data,
                                                                  'diarrhea_have_temprature',
                                                                  current
                                                                )
                                                              ) {
                                                              if (
                                                                validatePainHeart(
                                                                  data.diarrhea,
                                                                    data.diarrhea_envi_suffer_symtoms,
                                                                    'diarrhea_envi_suffer_symtoms',
                                                                    current
                                                                  )
                                                                ) {
                                                                  if (
                                                                    validatePainHeart(
                                                                      data.diarrhea,
                                                                      data.diarrhea_liquids_with_you,
                                                                      'diarrhea_liquids_with_you',
                                                                      current
                                                                    )
                                                                  ) {
                                                                    if (
                                                                      validatePainHeart1(
                                                                        data.have_fever,
                                                                        data,
                                                                        'have_fever',
                                                                        current
                                                                      )
                                                                    ) {
                                                                      if (
                                                                        validatePainHeart(
                                                                          data.have_fever,
                                                                          data.fever_symptoms_begin,
                                                                          'fever_symptoms_begin',
                                                                          current
                                                                        )
                                                                      ) {
                                                                        if (
                                                                          validatePainHeart(
                                                                            data.have_fever,
                                                                            data.fever_top_body_temp,
                                                                            'fever_top_body_temp',
                                                                            current
                                                                          )
                                                                        ) {
                                                                          if (
                                                                            validatePainHeart(
                                                                              data.have_fever,
                                                                              data.fever_low_body_temp,
                                                                              'fever_low_body_temp',
                                                                              current
                                                                            )
                                                                          ) {
                                                                            if (
                                                                              validatePainHeart(
                                                                                data.have_fever,
                                                                                data.fever_pain_intensity,
                                                                                'fever_pain_intensity',
                                                                                current
                                                                              )
                                                                            ) {
                                                                              if (
                                                                                validatePainHeart(
                                                                                  data.have_fever,
                                                                                  data,
                                                                                  'fever_have_a_cough',
                                                                                  current
                                                                                )
                                                                              ) {
                                                                                if (
                                                                                  validatePainHeart(
                                                                                    data.have_fever,
                                                                                    data,
                                                                                    'fever_have_a_Sputum',
                                                                                    current
                                                                                  )
                                                                                ) {
                                                                                if (
                                                                                  validatePainHeart(
                                                                                    data.have_fever,
                                                                                    data.fever_sputum,
                                                                                    'fever_sputum',
                                                                                    current
                                                                                  )
                                                                                ) {
                                                                                  if (
                                                                                    validatePainHeart1(
                                                                                      data.back_pain,
                                                                                      data,
                                                                                      'back_pain',
                                                                                      current
                                                                                    )
                                                                                  ) {
                                                                                    if (
                                                                                      validatePainHeart(
                                                                                        data.back_pain,
                                                                                        data.back_pain_symptoms_begin,
                                                                                        'back_pain_symptoms_begin',
                                                                                        current
                                                                                      )
                                                                                    ) {
                                                                                      if (
                                                                                        validatePainHeart(
                                                                                          data.back_pain,
                                                                                          data.back_pain_symptoms_begin,
                                                                                          'back_pain_symptoms_begin',
                                                                                          current
                                                                                        )
                                                                                      ) {
                                                                                        if (
                                                                                          validatePainHeart1(
                                                                                            data.back_pain,
                                                                                            data.back_pain_been_injured,
                                                                                            'back_pain_been_injured',
                                                                                            current
                                                                                          )
                                                                                        ) {
                                                                                          if (
                                                                                            validatePainHeart1(
                                                                                              data.back_pain,
                                                                                              data.back_pain_physically_strained,
                                                                                              'back_pain_physically_strained',
                                                                                              current
                                                                                            )
                                                                                          ) {
                                                                                            if (
                                                                                              validatePainHeart1(
                                                                                                data.back_pain,
                                                                                                data.back_pain_stress_depression,
                                                                                                'back_pain_stress_depression',
                                                                                                current
                                                                                              )
                                                                                            ) {
                                                                                              if (
                                                                                                validatePainHeart1(
                                                                                                  data.back_pain,
                                                                                                  data.back_pain_heart_attack,
                                                                                                  'back_pain_heart_attack',
                                                                                                  current
                                                                                                )
                                                                                              ) {
                                                                                                if (
                                                                                                  validatePainHeart1(
                                                                                                    data.back_pain,
                                                                                                    data.back_pain_heart_failure,
                                                                                                    'back_pain_heart_failure',
                                                                                                    current
                                                                                                  )
                                                                                                ) {
                                                                                                  if (
                                                                                                    validatePainHeart(
                                                                                                      data.back_pain,
                                                                                                      data,
                                                                                                      'back_pain_blood_pressure',
                                                                                                      current
                                                                                                    )
                                                                                                  ) {
                                                                                                      if (
                                                                                                        validatePainHeart1(
                                                                                                          data.cough_and_snees,
                                                                                                          data,
                                                                                                          'cough_and_snees',
                                                                                                          current
                                                                                                        )
                                                                                                      ) {
                                                                                                        if (
                                                                                                          validatePainHeart(
                                                                                                            data.cough_and_snees,
                                                                                                            data.cough_symptoms_begin,
                                                                                                            'cough_symptoms_begin',
                                                                                                            current
                                                                                                          )
                                                                                                        ) {
                                                                                                          if (
                                                                                                            validatePainHeart(
                                                                                                              data.cough_and_snees,
                                                                                                              data,
                                                                                                              'cough_have_temprature',
                                                                                                              current
                                                                                                            )
                                                                                                          ) {
                                                                                                            if (
                                                                                                              validatePainHeart(
                                                                                                                data.cough_and_snees,
                                                                                                                data.cough_envi_suffer_symtoms,
                                                                                                                'cough_envi_suffer_symtoms',
                                                                                                                current
                                                                                                              )
                                                                                                            ) {
                                                                                                              if (
                                                                                                                validatePainHeart(
                                                                                                                  data.cough_and_snees,
                                                                                                                  data,
                                                                                                                  'Cough_allergies',
                                                                                                                  current
                                                                                                                )
                                                                                                              ) {
                                                                                                                if (
                                                                                                                  validatePainHeart1(
                                                                                                                    data.feel_depressed,
                                                                                                                    data,
                                                                                                                    'feel_depressed',
                                                                                                                    current
                                                                                                                  )
                                                                                                                ) {
                                                                                                                  if (
                                                                                                                    validatePainHeart1(
                                                                                                                      data.feel_depressed,
                                                                                                                      data.depressed_symptoms_begin,
                                                                                                                      'depressed_symptoms_begin',
                                                                                                                      current
                                                                                                                    )
                                                                                                                  ) {
                                                                                                                    if (
                                                                                                                      validatePainHeart(
                                                                                                                        data.feel_depressed,
                                                                                                                        data.depressed_pain_intensity,
                                                                                                                        'depressed_pain_intensity',
                                                                                                                        current
                                                                                                                      )
                                                                                                                    ) {
                                                                                                                      if (
                                                                                                                        validatePainHeart1(
                                                                                                                          data.feel_depressed,
                                                                                                                          data.depressed_do_you_sleep,
                                                                                                                          'depressed_do_you_sleep',
                                                                                                                          current
                                                                                                                        )
                                                                                                                      ) {
                                                                                                                        if (
                                                                                                                          validatePainHeart1(
                                                                                                                            data.feel_depressed,
                                                                                                                            data.depressed_suicidal_thoughts,
                                                                                                                            'depressed_suicidal_thoughts',
                                                                                                                            current
                                                                                                                          )
                                                                                                                        ) {
                                                                                                                          if (
                                                                                                                            validatePainHeart1(
                                                                                                                              data.feel_depressed,
                                                                                                                              data.depressed_hurt_yourself,
                                                                                                                              'depressed_hurt_yourself',
                                                                                                                              current
                                                                                                                            )
                                                                                                                          ) {
                                                                                                                            if (
                                                                                                                              validatePainHeart1(
                                                                                                                                data.cardiac_problems,
                                                                                                                                data,
                                                                                                                                'cardiac_problems',
                                                                                                                                current
                                                                                                                              )
                                                                                                                            ) {
                                                                                                                              if (
                                                                                                                                validatePainHeart(
                                                                                                                                  data.cardiac_problems,
                                                                                                                                  data.cardiac_rr_systolic,
                                                                                                                                  'cardiac_rr_systolic',
                                                                                                                                  current
                                                                                                                                )
                                                                                                                              ) {
                                                                                                                                if (
                                                                                                                                  validatePainHeart(
                                                                                                                                    data.cardiac_problems,
                                                                                                                                    data.cardiac_rr_diastolic,
                                                                                                                                    'cardiac_rr_diastolic',
                                                                                                                                    current
                                                                                                                                  )
                                                                                                                                ) {
                                                                                                                                  if (
                                                                                                                                    validatePainHeart1(
                                                                                                                                      data.cardiac_problems,
                                                                                                                                      data.cardiac_heart_attack,
                                                                                                                                      'cardiac_heart_attack',
                                                                                                                                      current
                                                                                                                                    )
                                                                                                                                  ) {
                                                                                                                                    if (
                                                                                                                                      validatePainHeart1(
                                                                                                                                        data.cardiac_problems,
                                                                                                                                        data.cardiac_heart_failure,
                                                                                                                                        'cardiac_heart_failure',
                                                                                                                                        current
                                                                                                                                      )
                                                                                                                                    ) {
                                                                                                                                      if (
                                                                                                                                        validatePainHeart1(
                                                                                                                                          data.cardiac_problems,
                                                                                                                                          data.cardiac_have_dizziness,
                                                                                                                                          'cardiac_have_dizziness',
                                                                                                                                          current
                                                                                                                                        )
                                                                                                                                      ) {
                                                                                                                                        if (
                                                                                                                                          validatePainHeart1(
                                                                                                                                            data.cardiac_problems,
                                                                                                                                            data.cardiac_have_shoulder_pain,
                                                                                                                                            'cardiac_have_shoulder_pain',
                                                                                                                                            current
                                                                                                                                          )
                                                                                                                                        ) {
                                                                                                                                          if (
                                                                                                                                            data.headache ===
                                                                                                                                            'yes' ||
                                                                                                                                            data.stomach_problems ===
                                                                                                                                            'yes' ||
                                                                                                                                            data.diarrhea ===
                                                                                                                                            'yes' ||
                                                                                                                                            data.have_fever ===
                                                                                                                                            'yes' ||
                                                                                                                                            data.back_pain ===
                                                                                                                                            'yes' ||
                                                                                                                                            data.cough_and_snees ===
                                                                                                                                            'yes' ||
                                                                                                                                            data.feel_depressed ===
                                                                                                                                            'yes' ||
                                                                                                                                            data.cardiac_problems ===
                                                                                                                                            'yes'
                                                                                                                                          ) {
                                                                                                                                            if (
                                                                                                                                              (data._id &&
                                                                                                                                                (current
                                                                                                                                                  .state
                                                                                                                                                  .DataprotectionRules ||
                                                                                                                                                  current
                                                                                                                                                    .state
                                                                                                                                                    .DataprotectionRules ===
                                                                                                                                                  false)) ||
                                                                                                                                              (current
                                                                                                                                                .state
                                                                                                                                                .DataprotectionRules &&
                                                                                                                                                current
                                                                                                                                                  .state
                                                                                                                                                  .DataprotectionRules ===
                                                                                                                                                true)
                                                                                                                                            ) {
                                                                                                                                              if (
                                                                                                                                                data?._id &&
                                                                                                                                                (!data.is_decline ||
                                                                                                                                                  data.is_decline ==
                                                                                                                                                  false)
                                                                                                                                              ) {
                                                                                                                                                updateTaskApi(
                                                                                                                                                  current,
                                                                                                                                                  data
                                                                                                                                                );
                                                                                                                                              } else {
                                                                                                                                                current.setState(
                                                                                                                                                  {
                                                                                                                                                    openCalendar: true,
                                                                                                                                                  }
                                                                                                                                                );
                                                                                                                                              }
                                                                                                                                            } else {
                                                                                                                                              current.setState(
                                                                                                                                                {
                                                                                                                                                  error_section: 45,
                                                                                                                                                  errorChrMsg:
                                                                                                                                                    please_select +
                                                                                                                                                    ' ' +
                                                                                                                                                    data_protection_rules_and_regulations_of_aimedis,
                                                                                                                                                }
                                                                                                                                              );
                                                                                                                                            }
                                                                                                                                          } else {
                                                                                                                                            current.setState(
                                                                                                                                              {
                                                                                                                                                error_section: 73,
                                                                                                                                                errorChrMsg:
                                                                                                                                                  please_select +
                                                                                                                                                  ' ' +
                                                                                                                                                  atleast_one_problem_for +
                                                                                                                                                  ' ' +
                                                                                                                                                  sick_leave_certificate,
                                                                                                                                              }
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
    }
  } else {
    var slot = current.state.currentSelected;
    if (current.state.assinged_to) {
      data.assinged_to = current.state.assinged_to;
    }
    if (current.state.appointDate && current.state.appointDate.length > 0) {
      data.start = current.state.appointDate[slot];
      data.end = current.state.appointDate[slot + 1];
      // data.date = new Date(current.state.date);
      data.date = new Date(new Date().setDate(new Date(current.state.date).getDate()))
    }
    if (
      (current.state.currentSelected && current.state.currentSelected > -1 || current.state.currentSelected === 0)
      && !current.state.bookedError && current.state.bookedError === ''
    ) {
      current.setState({
        loaderImage: true,
      });
      if (data?._id && (data?.is_decline || data?.is_decline == true)) {
        updateTaskApi(current, data);
      } else {
        axios
          .post(
            sitedata.data.path + '/vh/AddTask',
            data,
            commonHeader(current.props.stateLoginValueAim?.token)
          )
          .then((responce) => {
            // mailSendToDoc(data, current);
            if (responce && responce.data && responce.data.hassuccessed) {
              var check = responce?.data?.data?.payment_by;
              current.props.history.push({
                pathname: check === "Top-Up" ? "/payment/top-up" : "/payment/credit-card",
                state: {
                  data: responce?.data?.data
                }
              })
            }
          })
          .catch(function (error) {
            current.setState({
              loaderImage: false,
            });
          });
      }
    } else {
      current.setState({
        error_section: 70,
        errorChrMsg: please_select + '' + time_slot,
      });
    }
  }
};

// export const mailSendToDoc = (data, current) => {
//   var data1 = {};
//   var first_name = current.props.stateLoginValueAim?.user?.first_name;
//   var last_name = current.props.stateLoginValueAim?.user?.last_name;
//   var profile_id = current.props.stateLoginValueAim?.user?.profile_id;
//   data1.start = data.start;
//   data1.end = data.end;
//   data1.profile_id = profile_id;
//   data1.first_name = first_name;
//   data1.last_name = last_name;
//   data1.email = data.assinged_to[0].email;
//   data1.date =
//     current.state.date &&
//     getDate(
//       current.state.date,
//       current.props.settings &&
//       current.props.settings?.setting &&
//       current.props.settings?.setting?.date_format
//     );
//   axios
//     .post(
//       sitedata.data.path + '/vactive/DoctorMail',
//       data1,
//       commonHeader(current.props.stateLoginValueAim?.token)
//     )
//     .then((responce) => {
//       current.setState({
//         updateQues: {},
//         loaderImage: false,
//         openCalendar: false,
//         DataprotectionRules: false,
//         currentSelected: -1,
//       });
//     })
//     .catch(function (error) {
//       console.log('error');
//     });
// };

export const updateTaskApi = (current, data) => {
  data.is_decline = false;
  axios
    .put(
      sitedata.data.path + '/vh/AddTask/' + data?._id,
      data,
      commonHeader(current.props.stateLoginValueAim.token)
    )
    .then((responce) => {
      if (responce.data.hassuccessed) {
        current.setState({
          updateQues: {},
          loaderImage: false,
          openCalendar: false,
          DataprotectionRules: false,
          currentSelected: -1,
        });
        current.props.history.push('/patient/request-list');
      }
    })
    .catch(function (error) {
    });
};

// Validate all fields
export const validatePainHeart = (check, value, item, current) => {
  let translate = getLanguage(current.props.stateLanguageType);

  let {
    blood_pressure,
    please_select,
    Pain_begin,
    hurt_now,
    Quality_of_pain,
    please_enter,
    Undergoing_treatment,
    with_yes_no,
    pain_point,
    continuously_or_periodically,
    take_painkillers,
    suffer_from_vomiting,
    environmental_suffer_symtoms,
    keep_liquids_with,
    valid_body_temp,
    sputum_intensity,
    back_symptoms_begin,
    rr_systolic,
    bp_should_number,
    systolic_value_between,
    RR_diastolic,
    diastolic_in_number,
    diastolic_value_between,
    pain_intensity,
    body_temp,
    Body_temp_bet,
    diabetes,
    enter_blood_sugar,
    blood_sugar_in_number,
    blood_sugar_between,
    enter_hba1c,
    Hba1c_should_between,
    fev_cough,
    atleast_condition,
    low_value,
    top_value,
    fever_low_body_temp,
    of_body_temprature,
    please_select_situation,
  } = translate;

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
      current.setState({
        error_section: 1,
        errorChrMsg: please_select + ' ' + Pain_begin,
      });
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
      current.setState({
        error_section: 2,
        errorChrMsg: please_select + ' ' + hurt_now,
      });
      MoveTop(0);
      return false;
    } else {
      return true;
    }
  } else if (item === 'headache_quality_of_pain' && check === 'yes') {
    if (!value && !(value > -1)) {
      current.setState({
        error_section: 6,
        errorChrMsg: please_enter + ' ' + Quality_of_pain,
      });
      MoveTop(250);
      return false;
    } else {
      return true;
    }
  } else if (item === 'headache_undergoing_treatment' && check === 'yes') {
    if (!value) {
      current.setState({
        error_section: 11,
        errorChrMsg:
          please_select + ' ' + Undergoing_treatment + ' ' + with_yes_no,
      });
      MoveTop(550);
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
      current.setState({
        error_section: section,
        errorChrMsg: please_select + ' ' + pain_point,
      });
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
      current.setState({
        error_section: 16,
        errorChrMsg:
          please_select +
          ' ' +
          continuously_or_periodically +
          ' ' +
          with_yes_no,
      });
      MoveTop(450);
      return false;
    } else {
      return true;
    }
  }
  else if (
    (item === 'back_pain_blood_pressure' ) &&
    check === 'yes'
  ) {
    if (!value.back_pain_blood_pressure) {
      current.setState({
        error_section: 66,
        errorChrMsg: please_select + ' ' + blood_pressure + ' ' + with_yes_no,
      });
      MoveTop(200);
      return false;
    } else if (value && value.back_pain_blood_pressure === 'yes') {
      if (!value.back_pain_rr_systolic) {
        current.setState({
          error_section: 33,
          errorChrMsg: please_enter + ' ' + rr_systolic,
        });
        MoveTop(250);
        return false;
      } else if (!bpPattern.test(value.back_pain_rr_systolic)) {
        current.setState({
          error_section: 33,
          errorChrMsg: rr_systolic + ' ' + bp_should_number,
        });
        MoveTop(250);
        return false;
      } else if (value.back_pain_rr_systolic < 120) {
        current.setState({
          error_section: 33,
          errorChrMsg: systolic_value_between,
        });
        MoveTop(250);
        return false;
      } else if (value.back_pain_rr_systolic > 140) {
        current.setState({
          error_section: 33,
          errorChrMsg: systolic_value_between,
        });
        MoveTop(250);
        return false;
      }  
      else if (!value.back_pain_rr_diastolic) {
        current.setState({
          error_section: 34,
          errorChrMsg: please_enter + ' ' + RR_diastolic,
        });
        MoveTop(250);
        return false;
      } else if (!bpPattern.test(value.back_pain_rr_diastolic)) {
        current.setState({
          error_section: 34,
          errorChrMsg: diastolic_in_number,
        });
        MoveTop(250);
        return false;
      } else if (value.back_pain_rr_diastolic < 80) {
        current.setState({
          error_section: 34,
          errorChrMsg: diastolic_value_between,
        });
        MoveTop(250);
        return false;
      } else if (value.back_pain_rr_diastolic > 90) {
        current.setState({
          error_section: 34,
          errorChrMsg: diastolic_value_between,
        });
        MoveTop(250);
        return false;
      } 
      else {
        return true;
      }
    }
    else {
      return true;
    }
  
  }
  
  else if (
    (item === 'stomach_blood_pressure' ) &&
    check === 'yes'
  ) {
    if (!value.stomach_blood_pressure) {
      current.setState({
        error_section: 67,
        errorChrMsg: please_select + ' ' + blood_pressure + ' ' + with_yes_no,
      });
      MoveTop(200);
      return false;
    } else if (value && value.stomach_blood_pressure === 'yes') {
      if (!value.stomach_rr_systolic) {
        current.setState({
          error_section: 14,
          errorChrMsg: please_enter + ' ' + rr_systolic,
        });
        MoveTop(250);
        return false;
      } else if (!bpPattern.test(value.stomach_rr_systolic)) {
        current.setState({
          error_section: 14,
          errorChrMsg: rr_systolic + ' ' + bp_should_number,
        });
        MoveTop(250);
        return false;
      } else if (value.stomach_rr_systolic < 120) {
        current.setState({
          error_section: 33,
          errorChrMsg: systolic_value_between,
        });
        MoveTop(250);
        return false;
      } else if (value.stomach_rr_systolic > 140) {
        current.setState({
          error_section: 14,
          errorChrMsg: systolic_value_between,
        });
        MoveTop(250);
        return false;
      } 
      else if (!value.stomach_rr_diastolic) {
        current.setState({
          error_section: 15,
          errorChrMsg: please_enter + ' ' + RR_diastolic,
        });
        MoveTop(250);
        return false;
      } else if (!bpPattern.test(value.stomach_rr_diastolic)) {
        current.setState({
          error_section: 15,
          errorChrMsg: diastolic_in_number,
        });
        MoveTop(250);
        return false;
      } else if (value.stomach_rr_diastolic < 80) {
        current.setState({
          error_section: 15,
          errorChrMsg: diastolic_value_between,
        });
        MoveTop(250);
        return false;
      } else if (value.stomach_rr_diastolic > 90) {
        current.setState({
          error_section: 15,
          errorChrMsg: diastolic_value_between,
        });
        MoveTop(250);
        return false;
      } 
      else {
        return true;
      }
    }
    else {
      return true;
    }
  
  }  
  else if (
    (item === 'cough_have_temprature' ) &&
    check === 'yes'
  ) {
    if (!value.cough_have_temprature) {
      current.setState({
        error_section: 64,
        errorChrMsg: please_select + ' ' + body_temp + ' ' + with_yes_no,
      });
      MoveTop(200);
      return false;
    } else if (value && value.cough_have_temprature === 'yes') {
      if (!value?.cough_body_temp) {
          current.setState({
            error_section: 36,
            errorChrMsg: please_enter + ' ' + body_temp,
          });
          MoveTop(550);
          return false;
        } else if (value?.cough_body_temp < 36 || value?.cough_body_temp > 41) {
          current.setState({
            error_section: 36,
            errorChrMsg: please_select + ' ' + Body_temp_bet,
          });
          MoveTop(550);
          return false;
        } else {
          return true;
        }
    }
    else {
      return true;
    }
  
  } 
  else if (
    (item === 'stomache_have_temprature' ) &&
    check === 'yes'
  ) {
    if (!value.stomache_have_temprature) {
      current.setState({
        error_section: 59,
        errorChrMsg: please_select + ' ' + body_temp + ' ' + with_yes_no,
      });
      MoveTop(200);
      return false;
    } else if (value && value.stomache_have_temprature === 'yes') {
      if (!value?.stomach_body_temp) {
          current.setState({
            error_section: 17,
            errorChrMsg: please_enter + ' ' + body_temp,
          });
          MoveTop(550);
          return false;
        } else if (value?.stomach_body_temp < 36 || value?.stomach_body_temp > 41) {
          current.setState({
            error_section: 17,
            errorChrMsg: please_select + ' ' + Body_temp_bet,
          });
          MoveTop(550);
          return false;
        } else {
          return true;
        }
    }
    else {
      return true;
    }
  
  }
  else if (item === 'stomach_take_painkillers' && check === 'yes') {
    if (!value) {
      current.setState({
        error_section: 18,
        errorChrMsg: please_select + ' ' + take_painkillers + ' ' + with_yes_no,
      });
      MoveTop(250);
      return false;
    } else {
      return true;
    }
  } else if (item === 'stomach_undergoing_treatment' && check === 'yes') {
    if (!value) {
      current.setState({
        error_section: 20,
        errorChrMsg:
          please_select + ' ' + Undergoing_treatment + ' ' + with_yes_no,
      });
      MoveTop(550);
      return false;
    } else {
      return true;
    }
  } 
  else if (
    (item === 'Cough_allergies' ) &&
    check === 'yes'
  ) {
    if (!value.Cough_allergies) {
      current.setState({
        error_section: 65,
        errorChrMsg: please_select + ' ' + 'suffer from Allergies' + ' ' + with_yes_no,
      });
      MoveTop(200);
      return false;
    } else if (value && value.Cough_allergies === 'yes') {
      var section = 38;
    if (!value.cough_suffer_from_allergies || value.cough_suffer_from_allergies === '<p><br></p>' || value.cough_suffer_from_allergies === '<p></p>') {
      current.setState({
        error_section: 38,
        errorChrMsg: please_enter + ' ' + 'allergies',
      });
      MoveTop(450);
      return false;
    } else {
      return true;
    }
    }
    else {
      return true;
    }
  
  } 
  else if (
    (item === 'fever_have_a_Sputum' ) &&
    check === 'yes'
  ) {
    if (!value.fever_have_a_Sputum) {
      current.setState({
        error_section: 61,
        errorChrMsg: please_select + ' ' + 'Sputum' + ' ' + with_yes_no,
      });
      MoveTop(200);
      return false;
    } else if (value && value.fever_have_a_Sputum === 'yes') {
      var section = 30;
    if (!value.fever_sputum || value.fever_sputum === '<p><br></p>' || value.fever_sputum === '<p></p>') {
      current.setState({
        error_section: 30,
        errorChrMsg: please_enter + ' ' + sputum_intensity,
      });
      MoveTop(450);
      return false;
    } else {
      return true;
    }
    }
    else {
      return true;
    }
  
  } 
  else if (
    (item === 'diarrhea_have_temprature' ) &&
    check === 'yes'
  ) {
    if (!value.diarrhea_have_temprature) {
      current.setState({
        error_section: 60,
        errorChrMsg: please_select + ' ' + body_temp + ' ' + with_yes_no,
      });
      MoveTop(200);
      return false;
    } else if (value && value.diarrhea_have_temprature === 'yes') {
      if (!value?.diarrhea_body_temp) {
          current.setState({
            error_section: 23,
            errorChrMsg: please_enter + ' ' + body_temp,
          });
          MoveTop(550);
          return false;
        } else if (value?.diarrhea_body_temp < 36 || value?.diarrhea_body_temp > 41) {
          current.setState({
            error_section: 23,
            errorChrMsg: please_select + ' ' + Body_temp_bet,
          });
          MoveTop(550);
          return false;
        } else {
          return true;
        }
    }
    else {
      return true;
    }
  
  } 
  else if (item === 'diarrhea_suffer_from_vomiting' && check === 'yes') {
    if (!value) {
      current.setState({
        error_section: 22,
        errorChrMsg:
          please_select + ' ' + suffer_from_vomiting + ' ' + with_yes_no,
      });
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
      current.setState({
        error_section: section,
        errorChrMsg:
          please_select +
          ' ' +
          environmental_suffer_symtoms +
          ' ' +
          with_yes_no,
      });
      MoveTop(550);
      return false;
    } else {
      return true;
    }
  } else if (item === 'diarrhea_liquids_with_you' && check === 'yes') {
    if (!value) {
      current.setState({
        error_section: 25,
        errorChrMsg:
          please_select + ' ' + keep_liquids_with + ' ' + with_yes_no,
      });
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
    var currentItem = item === fever_low_body_temp ? low_value : top_value;
    if (!value) {
      current.setState({
        error_section: section,
        errorChrMsg:
          please_enter + ' ' + currentItem + ' ' + of_body_temprature,
      });
      MoveTop(550);
      return false;
    } else if (value < 36 || value > 41) {
      current.setState({
        error_section: section,
        errorChrMsg: valid_body_temp,
      });
      MoveTop(550);
      return false;
    } else {
      return true;
    }
  } 
  // else if (
  //   (item === 'cough_suffer_from_allergies') &&
  //   check === 'yes'
  // ) {
  //   var section = item === 'fever_sputum' ? 30 : 38;
  //   var currentItem =
  //     item === 'fever_sputum' ? 'Sputum' : 'suffer from Allergies';
  //   if (!value || value === '<p><br></p>' || value === '<p></p>') {
  //     current.setState({
  //       error_section: section,
  //       errorChrMsg: please_enter + ' ' + sputum_intensity,
  //     });
  //     MoveTop(450);
  //     return false;
  //   } else {
  //     return true;
  //   }
  // } 
  else if (
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
      current.setState({
        error_section: section,
        errorChrMsg: please_enter + ' ' + back_symptoms_begin,
      });
      MoveTop(550);
      return false;
    } else {
      return true;
    }
  } else if (
    (item === 'headache_rr_systolic' ||
      item === 'stomach_rr_systolic' ||
      item === 'cardiac_rr_systolic') &&
    check === 'yes'
  ) {
    var section =
      item === 'headache_rr_systolic'
        ? 3
        : item === 'stomach_rr_systolic'
          ? 14
            : 42;
    if (!value) {
      current.setState({
        error_section: section,
        errorChrMsg: please_enter + ' ' + rr_systolic,
      });
      MoveTop(250);
      return false;
    } else if (!Valid) {
      current.setState({
        error_section: section,
        errorChrMsg: rr_systolic + ' ' + bp_should_number,
      });
      MoveTop(250);
      return false;
    } else if (value < 120) {
      current.setState({
        error_section: section,
        errorChrMsg: systolic_value_between,
      });
      MoveTop(250);
      return false;
    } else if (value > 140) {
      current.setState({
        error_section: section,
        errorChrMsg: systolic_value_between,
      });
      MoveTop(250);
      return false;
    } else {
      return true;
    }
  } else if (
    (item === 'headache_rr_diastolic' ||
      item === 'stomach_rr_diastolic' ||
      item === 'cardiac_rr_diastolic') &&
    check === 'yes'
  ) {
    var section =
      item === 'headache_rr_diastolic'
        ? 4
        : item === 'stomach_rr_diastolic'
          ? 15
            : 43;
    if (!value) {
      current.setState({
        error_section: section,
        errorChrMsg: please_enter + ' ' + RR_diastolic,
      });
      MoveTop(250);
      return false;
    } else if (!Valid) {
      current.setState({
        error_section: section,
        errorChrMsg: diastolic_in_number,
      });
      MoveTop(250);
      return false;
    } else if (value < 80) {
      current.setState({
        error_section: section,
        errorChrMsg: diastolic_value_between,
      });
      MoveTop(250);
      return false;
    } else if (value > 90) {
      current.setState({
        error_section: section,
        errorChrMsg: diastolic_value_between,
      });
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
      current.setState({
        error_section: section,
        errorChrMsg: please_enter + ' ' + pain_intensity,
      });
      MoveTop(450);
      return false;
    } else {
      return true;
    }
  }
  else if (
    (item === 'headache_have_temprature' ) &&
    check === 'yes'
  ) {
    if (!value.headache_have_temprature) {
      current.setState({
        error_section: 58,
        errorChrMsg: please_select + ' ' + body_temp + ' ' + with_yes_no,
      });
      MoveTop(200);
      return false;
    } else if (value && value.headache_have_temprature === 'yes') {
      if (!value?.headache_body_temp) {
          current.setState({
            error_section: 5,
            errorChrMsg: please_enter + ' ' + body_temp,
          });
          MoveTop(550);
          return false;
        } else if (value?.headache_body_temp < 36 || value?.headache_body_temp > 41) {
          current.setState({
            error_section: 5,
            errorChrMsg: please_select + ' ' + Body_temp_bet,
          });
          MoveTop(550);
          return false;
        } else {
          return true;
        }
    }
    else {
      return true;
    }
  
  } 
  else if (item === 'headache_have_diabetes' && check === 'yes') {
    if (!value.headache_have_diabetes) {
      current.setState({
        error_section: 46,
        errorChrMsg: please_select + ' ' + diabetes + ' ' + with_yes_no,
      });
      MoveTop(200);
      return false;
    } else if (value && value.headache_have_diabetes === 'yes') {
      var bpPattern = /^[0-9]+$/;
      var valid = bpPattern.test(value.headache_blood_sugar);
      let calHba1c = value.headache_Hba1c && value.headache_Hba1c / 10;
      if (!value.headache_blood_sugar) {
        current.setState({
          error_section: 47,
          errorChrMsg: enter_blood_sugar,
        });
        MoveTop(200);
        return false;
      } else if (!valid) {
        current.setState({
          error_section: 47,
          errorChrMsg: blood_sugar_in_number,
        });
        MoveTop(200);
        MoveTop(0);
        return false;
      } else if (value?.headache_blood_sugar < 160) {
        current.setState({
          error_section: 47,
          errorChrMsg: blood_sugar_between,
        });
        MoveTop(200);
        MoveTop(0);
        return false;
      } else if (value?.headache_blood_sugar > 240) {
        current.setState({
          error_section: 47,
          errorChrMsg: blood_sugar_between,
        });
        MoveTop(200);
        MoveTop(0);
        return false;
      } else if (!value.headache_Hba1c) {
        current.setState({
          error_section: 56,
          errorChrMsg: enter_hba1c,
        });
        MoveTop(200);
        MoveTop(0);
        return false;
      } else if (calHba1c < 57 / 10) {
        current.setState({
          error_section: 56,
          errorChrMsg: Hba1c_should_between,
        });
        MoveTop(200);
        MoveTop(0);
        return false;
      } 
      else if(!value.headache_situation){
        current.setState({
          error_section: 58,
          errorChrMsg: please_select_situation,
        });
        MoveTop(200);
        MoveTop(0);
        return false;
      }
      else if (calHba1c > 64 / 10) {
        current.setState({
          error_section: 56,
          errorChrMsg: Hba1c_should_between,
        });
        MoveTop(200);
        MoveTop(0);
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else if (item === 'fever_have_a_cough' && check === 'yes') {
    if (!value.fever_have_a_cough) {
      current.setState({
        error_section: 75,
        errorChrMsg: please_select + ' ' + fev_cough + ' ' + with_yes_no,
      });
      MoveTop(200);
      return false;
    } else if (value && value.fever_have_a_cough === 'yes') {
      if (!value.fever_cold && !value.fever_hoarseness) {
        current.setState({
          error_section: 76,
          errorChrMsg: please_select + ' ' + atleast_condition,
        });
        MoveTop(200);
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


export const validatePainHeart1 = (check, value, item, current) => {
  let translate = getLanguage(current.props.stateLanguageType);

  let {
    please_select,
    Headache,
    Diarrhea,
    Fever,
    back_pain,
    feel_depressed,
    cough_and_snees,
    cardiac_problems,
    stomach_problems,
    need_to_vomit,
    onset_of_pain,
    with_yes_no,
    take_painkillers,
    behind_the_sternum,
    heart_attack,
    heart_failure,
    been_injured,
    strained,
    stress_depression,
    do_you__sleep,
    suicidal_thoughts,
    hurt_yourself,
    have_dizziness,
    have_shoulder_pain,
  } = translate;
  if (
    (item === 'headache_need_to_vomit' ||
      item === 'headache_onset_of_pain' ||
      item === 'headache_take_painkillers') &&
    check === 'yes'
  ) {
    var currentItem =
      item === 'headache_need_to_vomit'
        ? need_to_vomit
        : item === 'headache_onset_of_pain'
          ? onset_of_pain
          : take_painkillers;

    if (!value) {
      current.setState({
        error_section: 7,
        errorChrMsg: please_select + ' ' + currentItem + ' ' + with_yes_no,
      });
      MoveTop(200);
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
        ? behind_the_sternum
        : item === 'stomach_heart_attack'
          ? heart_attack
          : heart_failure;

    if (!value) {
      current.setState({
        error_section: 8,
        errorChrMsg: please_select + ' ' + currentItem + ' ' + with_yes_no,
      });
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
        ? been_injured
        : item === 'back_pain_physically_strained'
          ? strained
          : item === 'back_pain_stress_depression'
            ? stress_depression
            : item === 'back_pain_heart_attack'
              ? heart_failure
              : heart_failure;

    if (!value) {
      current.setState({
        error_section: 32,
        errorChrMsg: please_select + ' ' + currentItem + ' ' + with_yes_no,
      });
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
        ? do_you__sleep
        : item === 'depressed_suicidal_thoughts'
          ? suicidal_thoughts
          : hurt_yourself;
    if (!value) {
      current.setState({
        error_section: 41,
        errorChrMsg: please_select + ' ' + currentItem + ' ' + with_yes_no,
      });
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
        ? heart_attack
        : item === 'cardiac_heart_failure'
          ? heart_failure
          : item === 'cardiac_have_dizziness'
            ? have_dizziness
            : have_shoulder_pain;

    if (!value) {
      current.setState({
        error_section: 44,
        errorChrMsg: please_select + ' ' + currentItem + ' ' + with_yes_no,
      });
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
        ? Headache
        : item === 'stomach_problems'
          ? stomach_problems
          : item === 'diarrhea'
            ? Diarrhea
            : item === 'have_fever'
              ? Fever
              : item === 'back_pain'
                ? back_pain
                : item === 'feel_depressed'
                  ? feel_depressed
                  : item === 'cough_and_snees'
                    ? cough_and_snees
                    : cardiac_problems;
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
      current.setState({
        error_section: section,
        errorChrMsg: please_select + ' ' + currentItem + ' ' + with_yes_no,
      });
      MoveTop(200);
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
};

export const onChange = (date, current) => {
  current.setState({ date: date, bookedError: '', currentSelected: -1 });
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
      days = 'Monday';
      break;
    case 2:
      days = 'Tuesday';
      break;
    case 3:
      days = 'Wednesday';
      break;
    case 4:
      days = 'Thursday';
      break;
    case 5:
      days = 'Friday';
      break;
    case 6:
      days = 'Saturday';
      break;
    case 0:
      days = 'Sunday';
      break;
  }
  let appointmentData = current.state.appointmentData;
  var appointDate;
  if (appointmentData) {
    Object.entries(appointmentData).map(([key, value]) => {
      if (key == days) {
        appointDate = value;
        current.setState({ appointDate: appointDate });

        let DoctorSlot = [];
        appointDate.map((item, i) => {
          if (i < appointDate?.length - 1) {
            DoctorSlot.push(appointDate[i] + "-" + appointDate[i + 1])
          }
        })
        if (current.state.openCalendar) {
          current.setState({ loaderImage: true })
        }
        // nextDay.setDate(day.getDate()+1);
        var localDateTime = new Date(new Date().setDate(new Date(date).getDate()));
        // var id = current.state.doctorData?._id;
        var id = current.props.dataa.doctor_detail[0]._id;
        axios
          .post(
            sitedata.data.path + '/vchat/getSlotTime',
            {
              date: localDateTime,
              doctor_id: id
            },
            commonHeader(current.props.stateLoginValueAim?.token)
          )
          .then((responce) => {
            if (responce.data.hassuccessed) {
              let bookedSlot = [];
              responce && responce.data && responce.data.data && responce.data.data.map((item) => {
                bookedSlot.push(item?.start + "-" + item?.end)
              })
              calBookedSlot(DoctorSlot, bookedSlot, current)
              current.setState({ loaderImage: false })
            }
            current.setState({ loaderImage: false })
          })
          .catch(function (error) {
            current.setState({ loaderImage: false })
          });
      }
    });
  }
  current.setState({ apointDay: days, selectedDate: date1 });
};

export const calBookedSlot = (ts, booked, current) => {
  var slot;
  var isBooked;
  let isAlreadyExist;
  var allSlotes = [];
  var curTime = moment().add(30, 'minutes').format("HH:mm");
  var curDate = moment();
  ts.map(item => {
    const [start, end] = item.split('-')
    if (moment(current.state.date).isSame(curDate, 'date', 'month', 'year')) {
      isAlreadyExist = !(curTime <= start) ? true : false;
    } else {
      isAlreadyExist = false;
    }
    // isAlreadyExist = !(curTime <= start)
    isBooked = !booked
      .map(item => item.split('-'))
      .every(([bookedStart, bookedEnd]) =>
        (bookedStart >= end || bookedEnd <= start)
      )
    slot = `${start}-${end}`
    allSlotes.push({ slot: slot, isBooked: isBooked, isAlreadyExist: isAlreadyExist })
  })
  current.setState({ allSlotes: allSlotes })
}

export const ExitinHoliday = (date, h_start, h_end) => {
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

export const Isintime = (currentTime, b_start, b_end) => {
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

export const Availabledays = (date, days_upto) => {
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

export const getCalendarData = (current) => {
  let translate = getLanguage(current.props.stateLanguageType);

  let { try_after_some_time } = translate;
  var user_token = current.props.stateLoginValueAim?.token;
  axios
    .post(
      sitedata.data.path + "/vchat/DynamicSlots",
      {

        _id: current.props.dataa.doctor_detail[0]._id,
        duration_of_timeslots: current.props.dataa.time.value,
      },
      commonHeader(user_token))
    .then((response) => {
      if (response?.data && response?.data?.data) {
        var data1 = response?.data?.data[0]?.data;
        var data = response?.data?.data[0]?.slot[0];
        if (
          response?.data?.data[0]?.slot?.length > 0 &&
          (data?.Monday?.length > 0 ||
            data?.Tuesday?.length > 0 ||
            data?.Wednesday?.length > 0 ||
            data?.Thursday?.length > 0 ||
            data?.Friday?.length > 0 ||
            data?.Saturday?.length > 0)
        ) {
          current.setState({
            errorChrMsg1: '',
          });
        } else {
          current.setState({
            errorChrMsg1: try_after_some_time,
          });
        }
        current.setState({
          doctorData: data1,
          appointmentData: data,
          assinged_to: [
            {
              email: data1?.email,
              alies_id: data1?.alies_id,
              first_name: data1?.first_name,
              last_name: data1?.last_name,
              profile_id: data1?.profile_id,
              type: data1?.type,
              user_id: data1?._id,
            },
          ],
        });
        setTimeout(() => onChange(new Date(), current), 200);
      }
    });
};

export const SelectTimeSlot = (AppointDay, Ai, data, current) => {
  current.setState({ bookedError: '' });
  let translate = getLanguage(current.props.stateLanguageType);
  let { this_time_slot_is_already_booked, please_select, another_one, upcoming_slots } = translate;
  if (data && data.isBooked) {
    current.setState({ currentSelected: Ai, bookedError: this_time_slot_is_already_booked + ' ' + please_select + ' ' + another_one });
  } else if (data && data.isAlreadyExist) {
    current.setState({ currentSelected: Ai, bookedError: please_select + ' ' + upcoming_slots });
  } else {
    current.setState({ bookedError: '', currentSelected: Ai });
  }
};

// export const DownloadBill = (current, id, bill_date) => {
//   var data = {},
//     senddata = {};
//   data.patient_id = current.props.stateLoginValueAim.user?._id;
//   data.profile_id = current.props.stateLoginValueAim.user?.profile_id;
//   data.first_name = current.props.stateLoginValueAim.user?.first_name;
//   data.last_name = current.props.stateLoginValueAim.user?.last_name;
//   data.alies_id = current.props.stateLoginValueAim.user?.alies_id;
//   data.mobile = current.props.stateLoginValueAim.user?.mobile;
//   data.email = current.props.stateLoginValueAim.user?.email;
//   data.profile_image = current.props.stateLoginValueAim.user?.image;
//   data.address = current.props.stateLoginValueAim.user?.address;
//   data.postal_code = current.props.stateLoginValueAim.user?.postal_code;
//   data.country = current.props.stateLoginValueAim.user?.country?.label;
//   data.city = current.props.stateLoginValueAim.user?.city;
//   data.birthday = current.props.stateLoginValueAim.user?.birthday;
//   senddata.invoice_id = id;
//   senddata.bill_date = bill_date;
//   senddata.data = data;
//   current.setState({ loaderImage: true });
//   axios
//     .post(sitedata.data.dowload_link + '/vh/downloadPEBill', senddata, {
//       responseType: 'blob',
//     })
//     .then((res) => {
//       setTimeout(() => {
//         current.setState({ loaderImage: false });
//       }, 3000);
//       var data = new Blob([res.data]);
//       if (typeof window.navigator.msSaveBlob === 'function') {
//         // If it is IE that support download blob directly.
//         window.navigator.msSaveBlob(data, 'Bill.pdf');
//       } else {
//         var blob = data;
//         var link = document.createElement('a');
//         link.href = window.URL.createObjectURL(blob);
//         link.download = 'Bill.pdf';
//         document.body.appendChild(link);
//         link.click(); // create an <a> element and simulate the click operation.
//       }
//     })
//     .catch((err) => {
//       current.setState({ loaderImage: false });
//     })
//     .catch((err) => {
//       current.setState({ loaderImage: false });
//     });
// };

export const CallTopUpApi = (current, data) => {
  let talktimeMin = current.props.stateLoginValueAim?.VideoData?.prepaid_talktime_min ? current.props.stateLoginValueAim?.VideoData?.prepaid_talktime_min : 0;
  let calPrePaid = talktimeMin - data?.total_time?.value;
  var info = {
    used_talktime: {
      datetime: data?.date,
      amount: data?.amount,
      min: data?.total_time?.value
    },
    _id: current.props.stateLoginValueAim?.VideoData?._id,
    prepaid_talktime_min: calPrePaid,
    manage_for: "use"
  }
  current.setState({ loaderImage: true });
  axios
    .post(sitedata.data.path + '/vchat/managePrepaid',
      info)
    .then((res) => {
      if (res && res.data && res.data.hassuccessed) {
        saveOnDB1(data, res?.data?.data, current);
        current.setState({ loaderImage: false });
      }
    })
    .catch((err) => {
      current.setState({ loaderImage: false });
    })
}
