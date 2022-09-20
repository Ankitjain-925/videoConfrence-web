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
        this.state = {
            isActive: false,
            isActiv: false,
            value: ''
        };

    }
    
    continue = e => {
        e.preventDefault();
        console.log("this.props.dataa",this.props.dataa)
        if(this.props.dataa.permission == true || this.props.dataa.permission == false){
            this.props.nextStep();
        }
        else{
            this.setState({ OptionRequired: "Please select a option"  });
        }
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    onchange = e => {
        this.setState({ setData: e.target.value });

    }

    click = (e, type) => {
        // e.preventDefault();
        // this.setState({ isActiv: false });
        // this.setState({ isActive: !this.state.isActive });
        this.props.onSelectLanguage1(e)
        if (type == "top-up" && this?.props?.redux_st?.stateLoginValueAim?.VideoData?.prepaid_talktime_min < this.props.dataa.time.value ){
            this.setState({ CompareRequired: "Please recharge top-up to continue, your top-up amount is low."  });
            this.setState({ OptionRequired: "Select credit card payment option / Go to manage prepaid page"  });

        }
        else{
            this.setState({ CompareRequired: " "  });
            this.setState({ OptionRequired: " "  });
        }

    }

    // dssdd = e => {
    //     e.preventDefault();
    //     this.setState({ isActive: false });
    //     this.setState({ isActiv: !this.state.isActiv });
    // }



    render() {
        return (
            <>
                <Grid className="logForm form_full">

                    <Grid className="logRow" >
                        <Grid container direction="row" >
                            <Grid item xs={12} md={5} className="Card_1" >



                                <Grid sx={{ maxWidth: 345 }} onClick={(e)=>this.click(true, 'top-up')} className={this.props.dataa.permission === true ? 'Card_Sel' : ''}>


                                    <Grid container justify="space-between" className="padd_10">
                                        <Typography variant="h6" component="div" align="left" className="adv1">Top-Up</Typography>
                                        <Typography variant="h6" component="div" align="right" className="adv2">{this.props.dataa.time.value}{' '}{"Min"}</Typography>
                                        
                                    </Grid>

                                    <CardContent>
                                        <Typography variant="body2">
                                        Your Top-Up Amount is: {this?.props?.redux_st?.stateLoginValueAim?.VideoData?.prepaid_talktime_min}{' '}{'Min'} 
                                        </Typography>
                                    </CardContent>
                                    <Grid className = "err_mesg1">{this.state.CompareRequired}</Grid>
                                    
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={1}>

                            </Grid>
                            <Grid item xs={12} md={5} className="Card_1">
                                <Grid sx={{ maxWidth: 345 }} onClick={(e)=>this.click(false, 'credit-card')} className={this.props.dataa.permission === true ? '' : this.props.dataa.permission === false ? 'Card_Sel' : ''}>


                                    <Grid container justify="space-between" className="padd_10">
                                        <Typography variant="h6" component="div" align="left" className="adv1">Credit Card</Typography>
                                        <Typography variant="h6" component="div" align="right" className="adv2">{this.props.dataa.time.value}{' '}{"Min"}</Typography>
                                    </Grid>
                                    <CardContent>
                                        <Typography variant="body2">
                                            Click Here To Pay Through Credit Card 
                                        </Typography>
                                    </CardContent>
                                    
                                </Grid>
                            </Grid>
                            <Grid className = "err_mesg">{this.state.OptionRequired}</Grid>
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