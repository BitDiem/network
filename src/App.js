import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import Grid from 'material-ui/Grid';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';
import SvgIcon from 'material-ui/SvgIcon';
import Card from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

import MetamaskRequired from './components/metamaskRequired.jsx';
import SearchContract from './components/searchContract.jsx';
import ViewContract from './components/viewContract.jsx';
import DepositContract from './components/depositContract.jsx';
import WithdrawContract from './components/withdrawContract.jsx';
import SetupContract from './components/setupContract.jsx';
import ErrorModal from './components/errorModal.jsx';
import UpdateContractPayer from './components/updateContractPayer.jsx';
import UpdateContractPayee from './components/updateContractPayee.jsx';
import PendingApprovals from './components/pendingApprovals.jsx';


const Config = require('./config.js');

const Eth = require('ethjs-query')
const EthContract = require('ethjs-contract')

const isEthereumAddress  = require('is-ethereum-address');
const fs = require('fs');

function SearchIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
    </SvgIcon>
  );
}
function MyContractsIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M15,7H20.5L15,1.5V7M8,0H16L22,6V18A2,2 0 0,1 20,20H8C6.89,20 6,19.1 6,18V2A2,2 0 0,1 8,0M4,4V22H20V24H4A2,2 0 0,1 2,22V4H4Z" />
    </SvgIcon>
  );
}
function CreateIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M11,15V12H9V15H6V17H9V20H11V17H14V15H11Z" />
    </SvgIcon>
  );
}
function MenuIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </SvgIcon>
  );
}


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffff55',
      main: '#ffe400',
      dark: '#c7b200',
      contrastText: '#000000',
    },
    secondary: {
      light: '#2c2c2c',
      main: '#000000',
      dark: '#000000',
      contrastText: '#ffffff',
    }
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScreen: 'searchContract',

      loaded:false,
      loading:false,

      payer: '',
      payerError: false,
      payee: '',
      payeeError: false,
      paymentAmount: '',
      paymentAmountError: false,
      paymentInterval: '',
      paymentIntervalError: false,
      bitDiem: '',
      bitDiemError: false,
      ensName: '',
      ensNameError: false,
      error: null,

      depositContract: '',
      depositContractError: false,
      depositAmount: '',
      depositAmountError: false,

      withdrawContract: '',
      withdrawContractError: false,
      withdrawAmount: '',
      withdrawAmountError: false,

      width: 0,
      height: 0,
      bottomNavValue: 'search'
    };

    this.submitSetupContract = this.submitSetupContract.bind(this);
    this.submitBack = this.submitBack.bind(this);
    this.submitFundContract = this.submitFundContract.bind(this);
    this.submitWithdrawContract = this.submitWithdrawContract.bind(this);
    this.submitSearchContract = this.submitSearchContract.bind(this);
    this.submitStartContract = this.submitStartContract.bind(this);
    this.submitTerminateContract = this.submitTerminateContract.bind(this);
    this.submitUpdatePayee = this.submitUpdatePayee.bind(this);
    this.submitUpdatePayer = this.submitUpdatePayer.bind(this);

    this.submitCreateNavigate = this.submitCreateNavigate.bind(this);
    this.submitDepositNavigate = this.submitDepositNavigate.bind(this);
    this.submitUpdatePayerNavigate = this.submitUpdatePayerNavigate.bind(this);
    this.submitUpdatePayeeNavigate = this.submitUpdatePayeeNavigate.bind(this);
    this.submitWithdrawNavigate = this.submitWithdrawNavigate.bind(this);
    this.submitSearchNavigate = this.submitSearchNavigate.bind(this);
    this.submitApprovalsNavigate = this.submitApprovalsNavigate.bind(this);
    this.submitPayeeApprove = this.submitPayeeApprove.bind(this);
    this.submitPayeeReject = this.submitPayeeReject.bind(this);
    this.submitPayerApprove = this.submitPayerApprove.bind(this);
    this.submitPayerReject = this.submitPayerReject.bind(this);

    this.processSetupContract = this.processSetupContract.bind(this);
    this.processFundContract = this.processFundContract.bind(this);
    this.processWithdrawContract = this.processWithdrawContract.bind(this);
    this.processUpdatePayee = this.processUpdatePayee.bind(this);
    this.processUpdatePayeeRequest = this.processUpdatePayeeRequest.bind(this);
    this.processUpdatePayer = this.processUpdatePayer.bind(this);
    this.processUpdatePayerRequest = this.processUpdatePayerRequest.bind(this);

    this.reset = this.reset.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleClose = this.handleClose.bind(this);

  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    if(!window.web3) {
      this.setState({currentScreen: 'metamaskRequired'});
      return;
    }

    var that = this

    this.setState({constData: Config.paymentIntervalData});
    this.setState({constAbi: Config.paymentIntervalAbi});

    window.web3.eth.getAccounts(function (error, accounts) {
      if(error) return that.setState({error:error.toString(), loading: false});
      that.setState({accounts});
    })
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  reset() {
    this.setState({
      loaded:false,
      loading:false,

      payer: '',
      payerError: false,
      payee: '',
      payeeError: false,
      paymentAmount: '',
      paymentAmountError: false,
      paymentInterval: '',
      paymentIntervalError: false,
      bitDiem: '',
      bitDiemError: false,
      ensName: '',
      ensNameError: false,
      error: null,

      depositContract: '',
      depositContractError: false,
      depositAmount: '',
      depositAmountError: false,

      withdrawContract: '',
      withdrawContractError: false,
      withdrawAmount: '',
      withdrawAmountError: false,
    });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submitDepositNavigate() {
    this.setState({currentScreen: 'fundContract', error: null, loading: false});
  };

  submitUpdatePayerNavigate() {
    this.setState({currentScreen: 'updateContractPayer', error: null, loading: false});
  };

  submitUpdatePayeeNavigate() {
    this.setState({currentScreen: 'updateContractPayee', error: null, loading: false});
  };

  submitWithdrawNavigate() {
    this.setState({currentScreen: 'withdrawContract', error: null, loading: false});
  };

  submitCreateNavigate() {
    this.setState({currentScreen: 'setupContract', error: null, loading: false});
  };

  submitSearchNavigate() {
    this.setState({currentScreen: 'searchContract', error: null, loading: false});
  };

  submitApprovalsNavigate() {
    this.setState({currentScreen: 'pendingApprovals', error: null, loading: false});
  };

  submitUpdatePayee() {
    this.setState({
      loading:true,
      newPayeeAddressError: false,
      error: null
    });
    var error = false;
    if (!isEthereumAddress(this.state.newPayeeAddress)) {
      this.setState({ newPayeeAddressvError: true });
      error = true;
    }

    if (error) {
      this.setState({loading: false});
    } else {
      if(this.state.accounts[0] == this.state.payeeAddress) {
        this.processUpdatePayee();
      } else {
        this.processUpdatePayeeRequest();
      }
    }
  };

  processUpdatePayee() {
    const myContract = window.web3.eth.contract(this.state.constAbi).at(this.state.searchContract);
    var that = this;

    myContract.setPayeeAddress(this.state.newPayeeAddress, {
      from: this.state.accounts[0],
      gas: '4700000'
    }, function(error, result) {
      if(error) return that.setState({error:error.toString(), loading: false});

      console.log(result)
      that.setState({loading:false, loaded:true});
    })
  };

  processUpdatePayeeRequest() {
    const myContract = window.web3.eth.contract(this.state.constAbi).at(this.state.searchContract);
    var that = this;

    myContract.requestPayeeUpdate(this.state.newPayeeAddress, {
      from: this.state.accounts[0],
      gas: '4700000'
    }, function(error, result) {
      if(error) return that.setState({error:error.toString(), loading: false});

      console.log(result)
      that.setState({loading:false, loaded:true});
    })
  };

  submitUpdatePayer() {
    this.setState({
      loading:true,
      newPayerAddressError: false,
      error: null
    });
    var error = false;
    if (!isEthereumAddress(this.state.newPayerAddress)) {
      this.setState({ newPayerAddressError: true });
      error = true;
    }

    if (error) {
      this.setState({loading: false});
    } else {
      if(this.state.accounts[0] == this.state.payerAddress) {
        this.processUpdatePayer();
      } else {
        this.processUpdatePayerRequest();
      }
    }
  };

  processUpdatePayer() {
    const myContract = window.web3.eth.contract(this.state.constAbi).at(this.state.searchContract);
    var that = this;

    myContract.setPayerAddress(this.state.newPayerAddress, {
      from: this.state.accounts[0],
      gas: '4700000'
    }, function(error, result) {
      if(error) return that.setState({error:error.toString(), loading: false});

      that.setState({loading:false, loaded:true});
    })
  };

  processUpdatePayerRequest() {
    const myContract = window.web3.eth.contract(this.state.constAbi).at(this.state.searchContract);
    var that = this;

    myContract.requestPayerUpdate(this.state.newPayerAddress, {
      from: this.state.accounts[0],
      gas: '4700000'
    }, function(error, result) {
      if(error) return that.setState({error:error.toString(), loading: false});

      that.setState({loading:false, loaded:true});
    })
  };

  submitStartContract() {
    this.setState({loading: true, error: null});
    const myContract = window.web3.eth.contract(this.state.constAbi).at(this.state.searchContract);
    if(typeof myContract !== 'undefined') {
      var that = this
      myContract.startContract({from: this.state.accounts[0]}, function(error, result){
        if(error) return that.setState({error:error.toString(), loading: false});

        that.setState({loading: false});

        console.log(result);
        that.processSearchContract();
      });
    }
  };

  submitTerminateContract() {
    this.setState({loading: true, error: null});
    const myContract = window.web3.eth.contract(this.state.constAbi).at(this.state.searchContract);
    if(typeof myContract !== 'undefined') {
      var that = this
      myContract.terminateContract({from: this.state.accounts[0]}, function(error, result){
        if(error) return that.setState({error:error.toString(), loading: false});

        that.setState({loading: false});

        console.log(result);
        that.processSearchContract();
      });
    }
  };

  submitSearchContract() {
    this.setState({
      loading:true,
      searchContractError: false,
      error: null
    });
    var error = false;
    if (!isEthereumAddress(this.state.searchContract)) {
      this.setState({ searchContractError: true });
      error = true;
    }

    if (error) {
      this.setState({loading: false});
    } else {
      this.processSearchContract();
    }
  };

  processSearchContract() {
    const myContract = window.web3.eth.contract(this.state.constAbi).at(this.state.searchContract);
    if(typeof myContract !== 'undefined') {
      var that = this;
      myContract.getContractDetails({from: this.state.accounts[0]}, function(error, result){
        if(!error) {
          that.setState({payerAddress: result[0], payeeAddress: result[1], usufructAddress: result[2]});
        }
        console.log(result)
      });
      myContract.getPayeeBalance({from: this.state.accounts[0]}, function(error, result){
        if(!error)
          that.setState({fundsWithdrawable: result.c[0]});
      });
      myContract.getPayerBalance({from: this.state.accounts[0]}, function(error, result){
        if(!error)
          that.setState({fundsDeposited: result.c[0]});
      });
      myContract.getContractState({from: this.state.accounts[0]}, function(error, result){
        if(!error) {
          var state = 'Created'
          switch (result.c[0]) {
            case 0:
              state = 'Created'
              break;
            case 1:
              state = 'In Progress'
              break;
            case 2:
              state = 'Terminated'
              break;
          }
          that.setState({contractState: state});
        }
      });
      myContract.getPendingPayeeUpdate({from: this.state.accounts[0]}, function(error, result){
        if(!error) {
          var payeeObject = { payerApproved: result[0], payeeApproved: result[1], toAddress: result[2] };
          that.setState({pendingPayeeUpdate: payeeObject});
        }
        console.log(result)
      });
      /*myContract.getPendingPayerUpdate({from: this.state.accounts[0]}, function(error, result){
        if(!error) {
          var payerObject = { payerApproved: result[0], payeeApproved: result[1], toAddress: result[2] };
          that.setState({pendingPayerUpdate: payerObject});
        }
        console.log(result)
      });
      myContract.getPendingUsufructUpdate({from: this.state.accounts[0]}, function(error, result){
        if(!error) {
          var usufructObject = { payerApproved: result[0], payeeApproved: result[1], toAddress: result[2] };
          that.setState({pendingUsufructUpdate: usufructObject});
        }
        console.log(result)
      });*/

      this.setState({paymentintervalcontractContract: myContract, currentScreen: 'viewContract', loading: false, withdrawContract: this.state.searchContract, depositContract: this.state.searchContract});
    }
  };
  submitWithdrawContract() {
    this.setState({
      loading:true,
      withdrawContractError: false,
      withdrawAmountError: false,
      error: null
    });
    var error = false;
    if (this.state.withdrawContract=='') {
      this.setState({ withdrawContractError: true });
      error = true;
    }
    var error = false;
    if (this.state.withdrawAmount=='') {
      this.setState({ withdrawAmountError: true });
      error = true;
    }

    if (error) {
      this.setState({loading: false})
    } else {
      this.processWithdrawContract()
    }
  };
  processWithdrawContract() {
    var _amount = this.state.withdrawAmount;

    const myContract = window.web3.eth.contract(this.state.constAbi).at(this.state.searchContract);
    var that = this;

    myContract.withdrawPayment(_amount, {
      to: this.state.withdrawContract,
      from: this.state.accounts[0],
      gas: '4700000'
    }, function(error, result) {
      if(error) return that.setState({error:error.toString(), loading: false});

      that.setState({withdrawContractHash: result, loading:false, loaded:true})
    })
  };

  submitFundContract() {
    this.setState({
      loading:true,
      depositContractError: false,
      depositAmountError:false,
      error: null
    })
    var error = false;
    if (this.state.depositContract=='') {
      this.setState({ depositContractError: true });
      error = true;
    }
    if (this.state.depositAmount=='') {
      this.setState({ depositAmountError: true });
      error = true;
    }

    if (error) {
      this.setState({loading: false})
    } else {
      this.processFundContract()
    }
  };
  processFundContract() {
    var _amount = this.state.depositAmount;

    const myContract = window.web3.eth.contract(this.state.constAbi).at(this.state.searchContract);
    var that = this;

    myContract.depositFunds(_amount, {
      to: this.state.depositContract,
      from: this.state.accounts[0],
      value: _amount,
      gas: '4700000'
    }, function(error, result) {
      if(error) return that.setState({error:error.toString(), loading: false});

      that.setState({fundContractHash: result, loading:false, loaded:true})
    })
  };

  submitBack() {
    this.setState({
      currentScreen: 'searchContract',
      error: null
    })
  };
  submitSetupContract() {
    this.setState({
      loading:true,
      payerError: false,
      payeeError:false,
      paymentAmountError: false,
      paymentIntervalError: false,
      bitDiemError:false,
      ensNameError:false,
      error: null
    })
    var error = false;
    if (!isEthereumAddress(this.state.payer)) {
      this.setState({ payerError: true });
      error = true;
    }
    if (!isEthereumAddress(this.state.payee)) {
      this.setState({ payeeError: true });
      error = true;
    }
    /*if (!isEthereumAddress(this.state.bitDiem)) {
      this.setState({ bitDiemError: true });
      error = true;
    }
    if (this.state.ensName=='') {
      this.setState({ ensNameError: true });
      error = true;
    }*/
    if (this.state.paymentAmount=='') {
      this.setState({ paymentAmountError: true });
      error = true;
    }
    if (this.state.paymentInterval=='') {
      this.setState({ paymentIntervalError: true });
      error = true;
    }
    if (error) {
      this.setState({loading: false})
    } else {
      this.processSetupContract()
    }
  };
  async processSetupContract() {
    this.setState({loading:true, error: null})
    let code = this.state.constData;
    let abi = this.state.constAbi

    let paymentintervalcontractContract = window.web3.eth.contract(abi);

    var that = this;
    let contract = paymentintervalcontractContract.new(
      this.state.payer,
      this.state.payee,
      this.state.paymentInterval,
      this.state.paymentAmount,
      {
        from: this.state.accounts[0],
        gas: '4700000',
        data: code
      },
      function (error, contract){
        if(error) return that.setState({error:error.toString(), loading: false});

        if (typeof contract !== 'undefined' && typeof contract.address !== 'undefined') {
           console.log('Contract mined! address: ' + contract.address + ' transactionHash: http://testnet.etherscan.io/tx/' + contract.transactionHash);

           that.setState({loading:false, loaded:true, contract: contract})
        }
      }
    );
  };

  submitPayeeApprove() {
    const myContract = window.web3.eth.contract(this.state.constAbi).at(this.state.searchContract);
    var that = this;

    myContract.requestPayeeUpdate(this.state.pendingPayeeUpdate.toAddress, {
      from: this.state.accounts[0],
      gas: '4700000'
    }, function(error, result) {
      if(error) return that.setState({error:error.toString(), loading: false});

      that.setState({loading:false, loaded:true})
    })
  };

  submitPayeeReject() {
      //implement reject function on the contract
  };

  submitPayerApprove() {
    const myContract = window.web3.eth.contract(this.state.constAbi).at(this.state.searchContract);
    var that = this;

    myContract.requestPayerUpdate(this.state.pendingPayerUpdate.toAddress, {
      from: this.state.accounts[0],
      gas: '4700000'
    }, function(error, result) {
      if(error) return that.setState({error:error.toString(), loading: false});

      that.setState({loading:false, loaded:true})
    })
  };

  submitPayerReject() {
      //implement reject function on the contract
  };


  handleBottomNavValueChange = (event, bottomNavValue) => {
    var currentScreen = 'searchContract'
    switch(bottomNavValue) {
      case 'search':
        currentScreen = 'searchContract'
      break
      case 'create':
        currentScreen = 'setupContract'
      break
      case 'myContract':
        currentScreen = 'searchContract'
      break
    }
    this.setState({ bottomNavValue, currentScreen });
  };

  renderMetamaskRequired() {
    return (<MetamaskRequired />);
  };

  renderPendingApprovals() {
    return (<PendingApprovals
      submitBack={this.submitBack}
      submitPayeeApprove={this.submitPayeeApprove}
      submitePayeeReject={this.submitPayeeReject}
      submitPayerApprove={this.submitPayerApprove}
      submitPayerReject={this.submitPayerReject}
      contractAddress={this.state.searchContract}
      pendingPayeeUpdate={this.state.pendingPayeeUpdate}
      reset={this.reset}
      handleChange={this.handleChange}
      loaded={this.state.loaded}
      loading={this.state.loading}
      error={this.state.error}
      />);
  };

  renderUpdateContractPayer() {
    return (<UpdateContractPayer
      submitBack={this.submitBack}
      submitUpdatePayer={this.submitUpdatePayer}
      payerAddress={this.state.payerAddress}
      payerAddressError={this.payerAddressError}
      newPayerAddress={this.state.newPayerAddress}
      newPayerAddressError={this.newPayerAddressError}
      reset={this.reset}
      handleChange={this.handleChange}
      loaded={this.state.loaded}
      loading={this.state.loading}
      error={this.state.error}
      />);
  };

  renderUpdateContractPayee() {
    return (<UpdateContractPayee
      submitBack={this.submitBack}
      submitUpdatePayee={this.submitUpdatePayee}
      payeeAddress={this.state.payeeAddress}
      payeeAddressError={this.payeeAddressError}
      newPayeeAddress={this.state.newPayeeAddress}
      newPayeeAddressError={this.newPayeeAddressError}
      reset={this.reset}
      handleChange={this.handleChange}
      loaded={this.state.loaded}
      loading={this.state.loading}
      error={this.state.error}
      />);
  };

  renderSetupContract() {
    return (<SetupContract
      submitBack={this.submitBack}
      submitSetupContract={this.submitSetupContract}
      reset={this.reset}
      handleChange={this.handleChange}
      contract={this.state.contract}
      payer={this.state.payer}
      payerError={this.state.payerError}
      payee={this.state.payee}
      payeeError={this.state.payeeError}
      paymentInterval={this.state.paymentInterval}
      paymentIntervalError={this.state.paymentIntervalError}
      paymentAmount={this.state.paymentAmount}
      paymentAmountError={this.state.paymentAmountError}
      loaded={this.state.loaded}
      loading={this.state.loading}
      error={this.state.error}
      />);
  };

  renderFundContract() {
    return (<DepositContract
      submitBack={this.submitBack}
      submitFundContract={this.submitFundContract}
      reset={this.reset}
      handleChange={this.handleChange}
      depositContract={this.state.depositContract}
      depositContractError={this.state.depositContractError}
      fundContractHash={this.state.fundContractHash}
      depositAmount={this.state.depositAmount}
      depositAmountError={this.state.depositAmountError}
      loaded={this.state.loaded}
      loading={this.state.loading}
      error={this.state.error}
      />);
  };

  renderSearchContract() {
    return (<SearchContract
      submitSearchContract={this.submitSearchContract}
      submitCreateNavigate={this.submitCreateNavigate}
      reset={this.reset}
      handleChange={this.handleChange}
      loaded={this.state.loaded}
      loading={this.state.loading}
      searchContract={this.state.searchContract}
      searchContractError={this.state.searchContractError}
      contract={this.state.contract}
      withdrawContract={this.state.withdrawContract}
      withdrawAmount={this.state.withdrawAmount}
      error={this.state.error}
      />);
  };

  renderViewContract() {
    return (<ViewContract
      submitBack={this.submitBack}
      submitDepositNavigate={this.submitDepositNavigate}
      submitWithdrawNavigate={this.submitWithdrawNavigate}
      submitUpdatePayerNavigate={this.submitUpdatePayerNavigate}
      submitUpdatePayeeNavigate={this.submitUpdatePayeeNavigate}
      submitApprovalsNavigate={this.submitApprovalsNavigate}
      submitStartContract={this.submitStartContract}
      submitTerminateContract={this.submitTerminateContract}
      reset={this.reset}
      handleChange={this.handleChange}
      contractState={this.state.contractState}
      contractAddress={this.state.searchContract}
      fundsDeposited={this.state.fundsDeposited}
      fundsWithdrawable={this.state.fundsWithdrawable}
      payerAddress={this.state.payerAddress}
      payeeAddress={this.state.payeeAddress}
      pendingPayeeUpdate={this.state.pendingPayeeUpdate}
      loaded={this.state.loaded}
      loading={this.state.loading}
      error={this.state.error}
      />);
  };

  renderWithdrawContract() {
    return (<WithdrawContract
      submitBack={this.submitBack}
      submitWithdrawContract={this.submitWithdrawContract}
      reset={this.reset}
      handleChange={this.handleChange}
      fundsWithdrawable={this.state.fundsWithdrawable}
      withdrawContract={this.state.withdrawContract}
      withdrawContractError={this.state.withdrawContractError}
      withdrawAmount={this.state.withdrawAmount}
      withdrawAmountError={this.state.withdrawAmountError}
      loaded={this.state.loaded}
      loading={this.state.loading}
      error={this.state.error}
      />);
  };

  handleClose() {
    this.setState({error: null})
  };

  render() {

    var styles = {
      headerBackground: {
        backgroundColor: '#ffe400',
        maxHeight:250,
        borderBottom: '1px solid #777777'
      }
    };

    /*
      screen breakpoints
      xsm: < 600
      sm: >= 600 + < 960
      md: >= 960 + < 1280
      lg: >= 1280 + < 1920
      xl: >= 1920
    */
    var size = '';

    if(this.state.width < 600) {
      size = 'xsm'
    } else if (this.state.width < 960) {
      size = 'sm'
    } else if (this.state.width < 960) {
      size = 'md'
    } else if (this.state.width < 960) {
      size = 'lg'
    } else {
      size = 'xlg'
    }


    var cardStyle = {
      height: (this.state.height-112),
      overflowY: 'auto'
    }

    if(size == 'xsm') {
      return (
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="title" color="inherit">
                BitDiem Network
              </Typography>
            </Toolbar>
          </AppBar>
          <CssBaseline />
          <Grid container xs={12} justify="space-around" alignItems="center" direction="row" spacing={0}>
            <Grid container xs={12} justify="space-around" alignItems="center" direction="row" spacing={0}>
              <Grid item xs={12} sm={8} md={6} lg={4} style={{}}>
                <Card raised elevation={0} square={false}  style={cardStyle}>
                  {this.renderScreen()}
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <BottomNavigation value={this.state.bottomNavValue} onChange={this.handleBottomNavValueChange} style={{position: 'absolute', bottom:'0px', left: '0px', right: '0px', backgroundColor: ''}} >
            <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
            <BottomNavigationAction label="Create" value="create" icon={<CreateIcon />} />
            <BottomNavigationAction label="My Contracts" value="myContracts" icon={<MyContractsIcon />} />
          </BottomNavigation>

          <ErrorModal error={this.state.error} open={this.state.error != null} handleClose={this.handleClose} />
        </MuiThemeProvider>
      )
    } else {

      var tooltip = 'Create'
      var fabIcon = '+'
      var onClick = this.submitCreateNavigate

      if(this.state.currentScreen == 'setupContract') {
        tooltip = 'Search'
        fabIcon = <SearchIcon />
        onClick = this.submitSearchNavigate
      }

      return (
        <MuiThemeProvider theme={theme}>
          <div style={styles.headerBackground}>
            <AppBar elevation={0} position="static" color="primary">
              <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit">
                  BitDiem Network
                </Typography>
              </Toolbar>
            </AppBar>
            <CssBaseline />
            <Grid container xs={12} justify="space-around" alignItems="center" direction="row" spacing={0}>
              <Grid container xs={11} justify="space-around" direction="row" spacing={0}>
                <Grid item xs={false} sm={2} md={3} lg={3} style={{marginTop: '120px'}}>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={6} style={{marginTop: '120px'}}>
                  <Card raised elevation={5} square={false}  >
                    {this.renderScreen()}
                  </Card>
                </Grid>
                <Grid item xs={false} sm={2} md={3} lg={3} style={{position: 'relative'}}>
                  <Tooltip title={tooltip}>
                    <Button variant="fab" color='secondary' style={{position: 'absolute', top:'157px', left: '20px'}} onClick={onClick}>
                      {fabIcon}
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </div>

          <ErrorModal error={this.state.error} open={this.state.error != null} handleClose={this.handleClose}/>
        </MuiThemeProvider>
      );
    }
  };
  renderScreen() {
    switch (this.state.currentScreen) {
      case 'searchContract':
        return this.renderSearchContract();
        break;
      case 'setupContract':
        return this.renderSetupContract();
        break;
      case 'fundContract':
        return this.renderFundContract();
        break;
      case 'withdrawContract':
        return this.renderWithdrawContract();
        break;
      case 'viewContract':
        return this.renderViewContract();
        break;
      case 'metamaskRequired':
        return this.renderMetamaskRequired();
        break;
      case 'updateContractPayer':
        return this.renderUpdateContractPayer();
        break;
      case 'updateContractPayee':
        return this.renderUpdateContractPayee();
        break;
      case 'pendingApprovals':
        return this.renderPendingApprovals();
        break;
      default:
        return this.renderSearchContract();
    }
  }
}

export default App;
