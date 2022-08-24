import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import LeftMenu from "Screens/Components/Menus/PatientLeftMenu/index";
import LeftMenuMobile from "Screens/Components/Menus/PatientLeftMenu/mobile";
const VideoGuideLine = (props) => {
  return (
    <Grid
      className={
        props.settings &&
        props.settings.setting &&
        props.settings.setting.mode &&
        props.settings.setting.mode === "dark"
          ? "homeBg darkTheme homeBgDrk"
          : "homeBg"
      }
    >
      <Grid className="homeBgIner">
        <Grid container direction="row" justify="center">
          <Grid item xs={12} md={12}>
            <Grid container direction="row">
              {/* Website Menu */}
              <LeftMenu isNotShow={true} currentPage="register_video" />
              <LeftMenuMobile isNotShow={true} currentPage="register_video" />
              <Grid item xs={12} md={11} lg={10}>
                <Grid className="docsOpinion">
                  <Grid container direction="row" className="docsOpinLbl">
                    <Grid item xs={12} md={6}>
                      <label>{"Guideline"}</label>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VideoGuideLine;