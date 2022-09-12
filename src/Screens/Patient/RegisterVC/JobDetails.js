import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class JobDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '', }
        this.state = {
            isActive: false,
            isActiv: false,
        };

    }
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    onchange = e => {
        this.setState({ setData: e.target.value });

    }

    dssd = e => {
        e.preventDefault();
        this.setState({ isActiv: false });
        this.setState({ isActive: !this.state.isActive });
        this.props.onSelectLanguage1(true);

    }

    dssdd = e => {
        e.preventDefault();
        this.setState({ isActive: false });
        this.setState({ isActiv: !this.state.isActiv });
    }



    render() {
        return (
            <>
                <Grid className="logForm form_full">


                    <Grid className="logRow" >
                        <Grid container direction="row" >
                            <Grid item xs={12} md={5} className="Card_1" >



                                <Grid sx={{ maxWidth: 345 }} onClick={this.dssd} className={this.state.isActive ? 'Card_Sel' : ''}>


                                    <Grid container justify="space-between" className="padd_10">
                                        <Typography variant="h6" component="div" align="left" className="adv1">Top-Up</Typography>
                                        <Typography variant="h6" component="div" align="right" className="adv2">10 Min</Typography>
                                    </Grid>


                                    <CardContent>
                                        <Typography variant="body2">
                                        Your Top-Up Amount is: 
                                        </Typography>
                                    </CardContent>
                                    
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={1}>

                            </Grid>
                            <Grid item xs={12} md={5} className="Card_1">
                                <Grid sx={{ maxWidth: 345 }} onClick={this.dssdd} className={this.state.isActiv ? 'Card_Sel' : ''}>


                                    <Grid container justify="space-between" className="padd_10">
                                        <Typography variant="h6" component="div" align="left" className="adv1">Credit Card</Typography>
                                        <Typography variant="h6" component="div" align="right" className="adv2">20 Min</Typography>
                                    </Grid>
                                    <CardContent>
                                        <Typography variant="body2">
                                            Click Here To Pay Through Credit Card 
                                        </Typography>
                                    </CardContent>
                                    
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid className="logRow">

                        <Grid>
                            {this.state.setData === "yes" && (
                                <input
                                    type="text"
                                    name="jobCompany"
                                    
                                    placeholder="Enter Card Number"
                                />
                            )}
                        </Grid>
                    </Grid>


                    <Grid className="infoShwSave3">
                        <input
                            type="button"
                            value="« Back"
                            onClick={this.back}

                        />
                        <input
                            type="button"
                            value="Next »"
                            onClick={this.continue}

                        />
                    </Grid>
                </Grid>


            </>
        );
    }
}

export default JobDetails;