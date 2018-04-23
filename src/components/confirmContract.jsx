import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';

const styles = {};

class ConfirmContract extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <CardContent>
        <Grid container xs={12} direction="row" justify="center">
          <Grid item xs={12}>
            <Typography align='center' color="textSecondary" variant="headline" component="h2">Contract setup is complete.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align='center' color="textSecondary" component="h2">The next step is for the Payer to fund the contract</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align='center' color="textSecondary" component="h2">Your contract address is: {this.props.contract.address}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="medium" onClick={this.props.reset}>Back</Button>
      </CardActions>
    );
  }
}

export default withStyles(styles)(ConfirmContract);
