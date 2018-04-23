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

class SetupContract extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    /*<Grid item xs={12}>
      <TextField fullWidth={true}
        id="bitDiem" label="Bit Diem Address" required error={this.props.bitDiemError} value={this.props.bitDiem} disabled={this.props.loading}
        onChange={this.handleChange('bitDiem')} margin="normal"
        helperText="Address of the bitDiem Organisation if you would like to provide them with usufruct"/>
    </Grid>
    <Grid item xs={12}>
      <TextField fullWidth={true} required error={this.props.ensNameError} disabled={this.props.loading}
        id="ensName" label="ENS Name" value={this.props.ensName}
        onChange={this.handleChange('ensName')} margin="normal"
        helperText={"Human friendly name for your contract. You can use this to search for your contract going forward"}/>
    </Grid>*/

    if(this.props.loaded) {
      return(<CardContent>
        <Grid container xs={12} direction="row" justify="center">
          <Grid item xs={12}>
            <Typography align='center' color="textSecondary" variant="headline" component="h2">Contract setup is complete!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align='center' color="textSecondary" component="h2">Your contract address is: <b>{this.props.contract.address}</b>.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align='center' color="textSecondary" component="h2">Keep it safe, you can interact with the contract using this address.</Typography>
          </Grid>
        </Grid>
        <Grid container xs={12} direction="row" justify="center" spacing={0} style={{position: 'relative'}}>
          <Grid item xs={12} sm={12} align='left'>
            <Button size="small" onClick={this.props.reset}>Back</Button>
          </Grid>
        </Grid>
      </CardContent>)
    }

    return (
      <CardContent>
        <Grid container xs={12} direction="row" justify="center">
          <Grid container xs={12} alignItems="flex-start" spacing={0}>
            <Grid item xs={12}>
              <Grid container xs={12} direction="column" justify="center" style={{marginLeft:10,marginRight:15}}>
              <Grid item xs={12}><Typography align='center' variant="headline" component="h2" style={{marginTop:50,marginBottom:50}}>Setup Contract</Typography></Grid>
              <Grid item xs={12}><Typography align='center'>{"For more information, head over to https://www.bitdiem.com/"}</Typography></Grid>
                <Grid item xs={12} >
                  <TextField required fullWidth={true} color="textSecondary" required error={this.props.payerError} disabled={this.props.loading}
                    id="payer" label="Payer Address" value={this.props.payer}
                    onChange={this.props.handleChange('payer')} margin="normal"
                    helperText={"The contract address of the company/person who will be paying for the services"}/>
                </Grid>
                <Grid item xs={12} >
                  <TextField required fullWidth={true} color="textSecondary" required error={this.props.payeeError} disabled={this.props.loading}
                    id="payee" label="Payee Address" value={this.props.payee}
                    onChange={this.props.handleChange('payee')} margin="normal"
                    helperText={"The contracat address of the company/person who will be receiving payment"}/>
                </Grid>
                <Grid item xs={12} >
                  <TextField required fullWidth={true} color="textSecondary" required error={this.props.paymentIntervalError} disabled={this.props.loading}
                    id="paymentInterval" label="Payment Interval" value={this.props.paymentInterval}
                    onChange={this.props.handleChange('paymentInterval')} margin="normal"
                      helperText={"The interval that funds will be transferred to the payee"}/>
                </Grid>
                <Grid item xs={12} >
                  <TextField required fullWidth={true} color="textSecondary" required error={this.props.paymentAmountError} disabled={this.props.loading}
                    id="paymentAmount" label="Payment Amount" value={this.props.paymentAmount}
                    onChange={this.props.handleChange('paymentAmount')} margin="normal"
                    helperText={"The amount of funds that will be transferred to the payee every payment interval"}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12} direction="row" justify="center" spacing={0} style={{position: 'relative'}}>
            <Grid item xs={6} sm={6} align='left'>
              <Button size="medium" variant="flat" color="secondary" disabled={this.props.loading} onClick={this.props.submitBack}>
                Back
              </Button>
              {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
            </Grid>
            <Grid item xs={6} sm={6} align='right' >
              <Button size="medium" variant="raised" color="secondary" disabled={this.props.loading} onClick={this.props.submitSetupContract}>
                Done
              </Button>
              {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
            </Grid>
        </Grid>
      </CardContent>
    );
  }
}

export default withStyles(styles)(SetupContract);
