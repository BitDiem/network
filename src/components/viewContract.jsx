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
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import SvgIcon from 'material-ui/SvgIcon';
import Popover from 'material-ui/Popover';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

function MoreIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
    </SvgIcon>
  );
};

const styles = {};

class SearchContract extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorOriginVertical: 'top',
      anchorOriginHorizontal: 'left',
      transformOriginVertical: 'top',
      transformOriginHorizontal: 'left',
      positionTop: 200,
      positionLeft: 400,
      anchorReference: 'anchorEl'
    };

    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleClose = this.handleClose.bind(this);
  };

  render() {

    var startTerminated = (<Button size="medium" variant="flat" color="secondary" disabled={this.props.loading||this.props.contractState!='Created'} onClick={this.props.submitStartContract}>
          Start
        </Button>)

    if(this.props.contractState=='In Progress') {
      startTerminated = (<Button size="medium" variant="flat" color="secondary" disabled={this.props.loading||this.props.contractState!='In Progress'} onClick={this.props.submitTerminateContract}>
            Terminate
          </Button>)
    }

    var infoStyle = {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }

    var pendingApprovals = 0;
    if(this.props.pendingPayeeUpdate != null && (this.props.pendingPayeeUpdate.payeeApproved != true || this.props.pendingPayeeUpdate.payerApproved != true)) {
      pendingApprovals++;
    }
    if(this.props.pendingPayerUpdate != null && (this.props.pendingPayerUpdate.payeeApproved != true || this.props.pendingPayerUpdate.payerApproved != true)) {
      pendingApprovals++;
    }
    if(this.props.pendingUsufructUpdate != null && (this.props.pendingUsufructUpdate.payeeApproved != true || this.props.pendingUsufructUpdate.payerApproved != true)) {
      pendingApprovals++;
    }

    return (
      <CardContent>
        <Grid container xs={12} direction="row" justify="center">
          <Grid container xs={12} alignItems="flex-start" spacing={0}>
            <Grid item xs={12}>
              <Grid container xs={12} direction="row" justify="center">
                <Grid item xs={12}><Typography align='center' variant="headline" component="h2" style={{marginTop:50,marginBottom:50}}>Contract Information</Typography></Grid>
                <Grid item xs={12}><Typography align='center'>{"For more information, head over to https://www.bitdiem.com/"}</Typography></Grid>
                <Grid item xs={12} style={{marginTop:10,marginBottom:10}}></Grid>
                <Grid item xs={12} sm={4}>
                  <Typography component="h2"><b>Contract Address:</b></Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography component="h2" style={infoStyle}>{this.props.contractAddress}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography component="h2"><b>Contract State:</b></Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography component="h2" style={infoStyle}>{this.props.contractState}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography component="h2"><b>Funds Deposited:</b></Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography component="h2" style={infoStyle}>{this.props.fundsDeposited}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography component="h2"><b>Funds Available:</b></Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography component="h2" style={infoStyle}>{this.props.fundsWithdrawable}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography component="h2"><b>Payer Address:</b></Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography component="h2" style={infoStyle}>{this.props.payerAddress}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography component="h2"><b>Payee Address:</b></Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Typography component="h2" style={infoStyle}>{this.props.payeeAddress}</Typography>
                </Grid>
                <Grid item xs={12} style={{marginTop:10,marginBottom:10}}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12} direction="row" justify="center" spacing={0} style={{position: 'relative'}}>
          <Grid item xs={2} sm={2} align='left' >
            <Button size="medium" variant="flat" color="secondary" disabled={this.props.loading} onClick={this.props.submitBack}>
              Back
            </Button>
          </Grid>
          <Grid item xs={10} sm={10} align='right' spacing={0}>
            {startTerminated}
            <Button size="medium" variant="flat" color="secondary" disabled={this.props.loading||this.props.contractState=='Terminated'} onClick={this.props.submitDepositNavigate}>
              Deposit
            </Button>
            <Button size="medium" variant="flat" color="secondary" disabled={this.props.loading} onClick={this.props.submitWithdrawNavigate}>
              Withdraw
            </Button>
            <Badge color="primary" badgeContent={pendingApprovals} >
              <IconButton
                color="secondary"
                aria-label="More"
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                onClick={this.handleClickButton}>
                <MoreIcon  />
              </IconButton>
            </Badge>
            <Popover
              open={this.state.open}
              anchorEl={this.anchorEl}
              anchorReference={this.state.anchorReference}
              anchorPosition={{ top: this.state.positionTop, left: this.state.positionLeft }}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: this.state.anchorOriginVertical,
                horizontal: this.state.anchorOriginHorizontal,
              }}
              transformOrigin={{
                vertical: this.state.transformOriginVertical,
                horizontal: this.state.transformOriginHorizontal,
              }}
            >
            <List component="nav">
              <ListItem button onClick={this.props.submitUpdatePayerNavigate}>
                <ListItemText primary="Update Payer" />
              </ListItem>
              <ListItem button onClick={this.props.submitUpdatePayeeNavigate}>
                <ListItemText primary="Update Payee" />
              </ListItem>
              <Badge color="primary" badgeContent={pendingApprovals} >
                <ListItem button onClick={this.props.submitApprovalsNavigate}>
                  <ListItemText primary="Approvals" />
                </ListItem>
              </Badge>
            </List>
            </Popover>
          </Grid>
          {this.props.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
        </Grid>
        <Grid container xs={12} direction="row">
          <LinearProgress />
        </Grid>
      </CardContent>
    );
  };

  handleClickButton = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
}

export default withStyles(styles)(SearchContract);
