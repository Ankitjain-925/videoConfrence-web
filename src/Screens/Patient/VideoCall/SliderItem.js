import React from "react";
import SymptomQuestions from "Screens/Components/TimelineComponent/CovidSymptomsField/SymptomQuestions";
// comesFrom
function Item({item}) {
  return (
    <div className="gridDiv">
      <div className="call-feadback-header width100">
        <div>
          <img
            className="call-img"
            src={require(`assets/virtual_images/patient.png`)}
            alt="doctor"
          />
        </div>
        <div className="comment-callpat">
          <h5> Latest review for: </h5>
          <p>{"Stacy Lee, MD"}</p>
          <SymptomQuestions comesFrom='videoCallRating' value= {item?.rating} />
        </div>
      </div>
      <div className="call-comment-patient" dangerouslySetInnerHTML={{__html: item?.comment}}>
      </div>
    </div>
  );
}


export default Item;
