import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";


class CardPayment extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }
        this.state = {
        };
    }
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    // ValueName = (value) => {

    //     var sec = value.value * 5;
    //     this.setState({ title2: sec });
    //     this.props.onSelectLanguage2(value);
    // }


    render() {


        return (
            <>

                <Grid className="cnfrmDiaMain profilePkg cnfrmDiaMain1">
                    <div className="payment_sec_extra_ser1">
                        <div className="sbu_button">
                            <h2>Payment</h2>
                            <Grid container direction="row" spacing={2}>
                                <Grid item xs={12} md={6}>
                                    {/* <Checkout /> */}
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <button
                                        //   onClick={() => {
                                        //     CancelClick(this);
                                        //   }}
                                        className="CutomStripeButton"
                                    >
                                        cancel
                                    </button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Grid>


            </>
        );
    }
}

export default CardPayment;