import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LanguageFetchReducer } from 'Screens/actions';
import { getLanguage } from 'translations/index';
import { pure } from 'recompose';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      value: this.props.value,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.label !== this.props.label ||
      prevProps.loggedinUser !== this.props.loggedinUser ||
      prevProps.value !== this.props.value
    ) {
      this.setState({
        label: this.props.label,
        loggedinUser: this.props.loggedinUser,
        value: this.props.value,
      });
    }
  };

  updateAllEntrySec = (value) => {
    if (!this.props.notchangeble) {
      this.props.updateAllEntrySec(value);
    }
  };

  render() {
    let translate = getLanguage(this.props.stateLanguageType);
    let { Yes, No } = translate;
    return (
      <>
        {/* {console.log('this.state.value', this.state.value)} */}
        <Grid container direction="row" alignItems="center">
          <Grid item xs={8} md={8}>
            <label>{this.state.label}</label>
          </Grid>
          <Grid item xs={4} md={4}>
            <a
              className={
                (this.state.value === 'yes' || this.state.value === true) &&
                'activeButton'
              }
              onClick={() => this.updateAllEntrySec('yes')}
            >
              {Yes}
            </a>
            <a
              className={
                (this.state.value === 'no' || this.state.value === false) &&
                'activeButton'
              }
              onClick={() => this.updateAllEntrySec('no')}
            >
              {No}
            </a>
          </Grid>
        </Grid>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  const { stateLanguageType } = state.LanguageReducer;
  return {
    stateLanguageType,
  };
};
export default pure(
  withRouter(connect(mapStateToProps, { LanguageFetchReducer })(Index))
);
