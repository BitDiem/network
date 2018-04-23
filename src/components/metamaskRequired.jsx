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

class MetamaskRequired extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <CardContent>
        <Grid container xs={12} direction="row" justify="center">
          <Grid container xs={12} alignItems="flex-start" spacing={0}>
            <Grid item xs={12}>
              <Grid container xs={12} direction="column" justify="center">
                <Grid item xs={12}><Typography align='center' variant="headline" component="h2" style={{marginTop:50,marginBottom:50}}>Contract Information</Typography></Grid>
                <Grid item xs={12}><Typography align='center'>We could not find MetaMask on your system. Unfortunately you require metamask to continue using the <b>BitDiem</b> network.</Typography></Grid>
                <Grid item xs={12}><Typography align='center'>For instructions on how to set up your <b>MetaMask extension</b>, please head to href <a href="https://metamask.io/">https://metamask.io/</a></Typography></Grid>
                <Grid item xs={12}><Typography align='center'>Once you have finished setting up metamsk, please <b>refresh</b> this page.</Typography></Grid>
                <Grid item xs={12} style={{marginTop:10,marginBottom:10}}></Grid>
                <Grid item xs={12}>
                  <Typography component="h2"></Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                  <img src='metamask.png' width='321px' height='122px' alt='' />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12} direction="row">
          <LinearProgress />
        </Grid>
      </CardContent>
    );
  }
}

export default withStyles(styles)(MetamaskRequired);
