import React from "react";
import SymptomQuestions from "Screens/Components/TimelineComponent/CovidSymptomsField/SymptomQuestions";
import { S3Image } from "Screens/Components/GetS3Images/index";
import Grid from '@material-ui/core/Grid';


// comesFrom
function Item({ item }) {
  return (

    <Grid
      item
      xs={12}
      md={6}
      lg={6}
    >
      <Grid className='call-feedback-part'>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={6} md={6} sm={6}>
            <Grid className='call-feadback-header'>
              

              <Grid className='call-feadbackimg'>
                <S3Image imgUrl={item?.patient_info?.image} />
              </Grid>
              <Grid className="comment-callpat">
                <p>{item?.patient_info?.first_name}{' '}{item?.patient_info?.last_name}</p>
                <p>( {item?.patient_info?.alies_id} )</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={6} sm={6}>
            <Grid className="setDataSym">
              <SymptomQuestions
                updateEntryState1={(e) =>
                  this.updateAllEntrySec(
                    e,
                    'rating'
                  )
                }
                comesFrom="Feedback"
                // label="Give_rating_Doctor"
                value={item?.rating}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} sm={12}>
            <Grid className="call-comment-patient">
              <p dangerouslySetInnerHTML={{ __html: item?.Comment }}>
              </p> </Grid>
          </Grid>

        </Grid>

      </Grid>
    </Grid>
  );
}


export default Item;
