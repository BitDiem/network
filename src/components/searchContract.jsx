import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';
import { CircularProgress } from 'material-ui/Progress';

const styles = {};

class ViewContract extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.onKeyDown = this.onKeyDown.bind(this);
  };

  onKeyDown(event) {
    if (event.which == 13) {
      this.props.submitSearchContract()
    }
  };

  render() {
    return (
      <CardContent>
        <Grid container xs={12} direction="row" justify="center">
          <Grid container xs={12} alignItems="flex-start" spacing={0}>
            <Grid item xs={12}>
              <Grid container xs={12} direction="column" justify="center">
                <Grid item xs={12}><Typography align='center' variant="headline" component="h2" style={{marginTop:50,marginBottom:50}}>Search for Contract</Typography></Grid>
                <Grid item xs={12}><Typography align='center'>{"For more information, head over to https://www.bitdiem.com/"}</Typography></Grid>
                <Grid item xs={12} >
                  <TextField required fullWidth={true} color="textSecondary" required error={this.props.searchContractError} autoFocus disabled={this.props.loading}
                    id="searchContract" label="ENS Name or Contract Address" value={this.props.searchContract}
                    onChange={this.props.handleChange('searchContract')} margin="normal"
                    helperText={"The contract name"}
                    onKeyDown={this.onKeyDown}/>
                </Grid>
                <Grid item xs={12} style={{marginTop:10,marginBottom:10}}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12} direction="row" justify="center" spacing={0} style={{position: 'relative'}}>
            <Grid item xs={12} sm={12} align='right'>
              <Button size="medium" variant="raised" color="secondary" disabled={this.props.loading} onClick={this.props.submitSearchContract}>
                Search
              </Button>
              {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
            </Grid>
        </Grid>
        <Grid container xs={12} direction="row">
          <LinearProgress />
        </Grid>
        <Grid container xs={12} direction="column"  spacing={0} style={{position: 'relative'}}>

        </Grid>
      </CardContent>
    );
  }
}

export default withStyles(styles)(ViewContract);
