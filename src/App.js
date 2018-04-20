import React, { Component } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
import ButtonAppBar from './components/ButtonAppBar.js'
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Select from 'material-ui/Select';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText, FormControlLabel, FormGroup, FormLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import NumberFormat from 'react-number-format';
import { LinearProgress } from 'material-ui/Progress';
import { CircularProgress } from 'material-ui/Progress';
import HelpOutlineIcon from 'material-ui-icons/HelpOutline';
import HelpIcon from 'material-ui-icons/HelpOutline';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Radio, { RadioGroup } from 'material-ui/Radio';

const EthereumTx = require('ethereumjs-tx')
const CryptoJS = require('crypto-js')
const Eth = require('ethjs-query')
const EthContract = require('ethjs-contract')

const aes256 = require('aes256');
const bip39 = require('bip39');
const axios = require('axios');
const sha256 = require('sha256');
const isEthereumAddress  = require('is-ethereum-address');
const email = require("email-validator");
const md5 = require('md5');
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/mew"));

const CONST_DATA = '0x6080604052600060055560006006556000600755600060085560006009553480156200002a57600080fd5b5060405160808062002f9b8339810180604052810190808051906020019092919080519060200190929190805190602001909291908051906020019092919050505083600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515620000aa57600080fd5b3073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515620000e657600080fd5b83600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156200012457600080fd5b3073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156200016057600080fd5b856000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555084600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600381905550826004819055506000600a60006101000a81548160ff021916908360028111156200020f57fe5b02179055506200022d6200026b640100000000026401000000009004565b6005819055507fabd60e51a18b36604f00b5547417cf9051cc5c3a2e80e68206296e14be19f0bc60405160405180910390a150505050505062000273565b600043905090565b612d1880620002836000396000f300608060405260043610610111576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168062470e5014610116578063048f162714610171578063155dd5ee146101cc5780631b2e7ce21461021157806324d4ba711461026c5780632fd949ca146102c3578063382a2914146102f25780633b76594d1461034d5780633ed35855146103855780634a7de193146103e05780634b10fb7f1461040b5780634b28676d146104365780635fb02f4d146104915780636e309325146104c05780637007b80c1461051b5780637410c946146105465780637f4e48491461059d578063c177713c146105d6578063cf5a51c41461062d578063dbd3cd6214610688575b600080fd5b34801561012257600080fd5b50610157600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106cd565b604051808215151515815260200191505060405180910390f35b34801561017d57600080fd5b506101b2600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a91565b604051808215151515815260200191505060405180910390f35b3480156101d857600080fd5b506101f760048036038101908080359060200190929190505050610e55565b604051808215151515815260200191505060405180910390f35b34801561021d57600080fd5b50610252600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610f77565b604051808215151515815260200191505060405180910390f35b34801561027857600080fd5b5061028161133b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156102cf57600080fd5b506102d8611365565b604051808215151515815260200191505060405180910390f35b3480156102fe57600080fd5b50610333600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506116af565b604051808215151515815260200191505060405180910390f35b61036b60048036038101908080359060200190929190505050611833565b604051808215151515815260200191505060405180910390f35b34801561039157600080fd5b506103c6600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506118fb565b604051808215151515815260200191505060405180910390f35b3480156103ec57600080fd5b506103f5611cc0565b6040518082815260200191505060405180910390f35b34801561041757600080fd5b50610420611d6e565b6040518082815260200191505060405180910390f35b34801561044257600080fd5b50610477600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050611d9e565b604051808215151515815260200191505060405180910390f35b34801561049d57600080fd5b506104a6611f20565b604051808215151515815260200191505060405180910390f35b3480156104cc57600080fd5b50610501600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061223a565b604051808215151515815260200191505060405180910390f35b34801561052757600080fd5b506105306125ff565b6040518082815260200191505060405180910390f35b34801561055257600080fd5b5061055b61262f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156105a957600080fd5b506105b2612659565b604051808260028111156105c257fe5b60ff16815260200191505060405180910390f35b3480156105e257600080fd5b506105eb612670565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561063957600080fd5b5061066e600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050612699565b604051808215151515815260200191505060405180910390f35b34801561069457600080fd5b506106b360048036038101908080359060200190929190505050612a5c565b604051808215151515815260200191505060405180910390f35b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806107775750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561078257600080fd5b6001601260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550601260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1680156109765750601260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b15610a245781600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f8ba699f9ab34a77bd0987dd09af5a8099d617e13e6325973402b2f482f75a17b82604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1610a88565b7ff5061b4c1bdced1dc42f2892b66ab5400c24159f221d3bf1c73caf1bfa2b693282604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b60019050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610b3b5750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b1515610b4657600080fd5b6001600f60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600f60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff168015610d3a5750600f60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b15610de85760008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fdb94ce3e6d735b2432b321f731542851ec1e65bb588309639d07255e310da7eb82604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1610e4c565b7fe23f7dc58724ac00b296371f64aa85343636f071a44899e63d569c957041a3e582604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b60019050919050565b60008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610eb557600080fd5b610ebd612bc6565b9150610ec882612bce565b905083610ee082600854612c1990919063ffffffff16565b10151515610eed57600080fd5b610f0284600854612c1990919063ffffffff16565b600881905550610f336000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685612c32565b7f0788d719d36264cd922e6e2bb8f52f65b13571d1ea3ddaf8d27b1acfdd18c3d06008546040518082815260200191505060405180910390a1600192505050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806110215750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561102c57600080fd5b6001601060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550601060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1680156112205750601060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b156112ce5781600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f0e7c1721c1e365ec9ca6e6e5d28ab1ffbf593e49297ea64084448c03b9f9389882604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1611332565b7f93585c1ca1eca363e13d402b87477b0a1933fe4c080bcc23ce3b0fe488cd65e982604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b60019050919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16148061140f5750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b806114675750600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561147257600080fd5b6001600281111561147f57fe5b600a60009054906101000a900460ff16600281111561149a57fe5b14806114cb5750600060028111156114ae57fe5b600a60009054906101000a900460ff1660028111156114c957fe5b145b15156114d657600080fd5b6001600d60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600d60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1680156116135750600d6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b1561167b57611620612bc6565b6007819055506002600a60006101000a81548160ff0219169083600281111561164557fe5b02179055507f6d0d90585834980bd0e5603341ff50b06349c11e0bf9241d03f6d065f12a262b60405160405180910390a16116a8565b7f80839e538bde2958c151f70739742ebe9e722b5da34c2fa611315b3da73ea2bc60405160405180910390a15b6001905090565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561170d57600080fd5b81600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561174a57600080fd5b3073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415151561178557600080fd5b82600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507ff3678822b5e5e311f8002ee6f8ea45edc30a79ae69d9825d7627a27407ffecee83604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a16001915050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561189057600080fd5b813414151561189e57600080fd5b6118b382600854612c7d90919063ffffffff16565b6008819055507f7cb5d45c1071f219bd2da1ea101758715bd52f23f2a707f2d9a0387dea18d9066008546040518082815260200191505060405180910390a160019050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806119a55750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b15156119b057600080fd5b6001601160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550601160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff168015611ba45750601160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b15611c53576000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f179e21f0981e88a2779ba1112739eb322607a8278f598d47f8ea779bc752995b82604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1611cb7565b7f6bb17a03cdc2bedfad8f39fd8b43fc788e49501cbc89ffb08698b0a42cef054382604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b60019050919050565b600080600060016002811115611cd257fe5b600a60009054906101000a900460ff166002811115611ced57fe5b1480611d1e575060006002811115611d0157fe5b600a60009054906101000a900460ff166002811115611d1c57fe5b145b1515611d2957600080fd5b611d31612bc6565b9150611d50611d3f83612bce565b600854612c1990919063ffffffff16565b9050611d6760045482612c9b90919063ffffffff16565b9250505090565b600080611d79612bc6565b9050611d98611d8782612bce565b600954612c7d90919063ffffffff16565b91505090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515611dfb57600080fd5b81600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515611e3857600080fd5b3073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515611e7357600080fd5b826000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f06711c09a773091896899b2a46dd22bbcf88e7d8880d020af862160f1885164d83604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a16001915050919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480611fca5750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b806120225750600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561202d57600080fd5b6000600281111561203a57fe5b600a60009054906101000a900460ff16600281111561205557fe5b14151561206157600080fd5b6001600c60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600c60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16801561219e5750600c6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b15612206576121ab612bc6565b6006819055506001600a60006101000a81548160ff021916908360028111156121d057fe5b02179055507fb68cb586b4c1e4d232a128b287a59cb564b969040bc4ca75179aeb2b60523f8f60405160405180910390a1612233565b7fc7e7b50b696c4073ef5cec15add75ef3c59b41f125ff641c08fe287e2cb366fe60405160405180910390a15b6001905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806122e45750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b15156122ef57600080fd5b6001601360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550601360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1680156124e35750601360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b15612592576000600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f94738a715db57b0cc076e94ddbc113d3f76955f9a875f39f08890d3b5c6c718b82604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a16125f6565b7f90f33dfd68b2ef1560c8e794442a79dd013cc304f089c755f1e239b20633ee2e82604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b60019050919050565b60008061260a612bc6565b905061262961261882612bce565b600854612c1990919063ffffffff16565b91505090565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600a60009054906101000a900460ff16905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806127435750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b151561274e57600080fd5b6001600e60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600e60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1680156129425750600e60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b156129ef57816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f489f767f25769df8c0c0a994b4578876b3c40dfac160013e83ac9a01de2a506282604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1612a53565b7fe71ed5c6aa5ee94f4809aed41aef4d3b07967f9a0779c7ad6917b4e0bbdbec9182604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b60019050919050565b6000806000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515612abd57600080fd5b612ac5612bc6565b9150612ad082612bce565b905083612ae882600954612c7d90919063ffffffff16565b10151515612af557600080fd5b612b1c84612b0e83600854612c1990919063ffffffff16565b612c1990919063ffffffff16565b600881905550612b4984612b3b83600954612c7d90919063ffffffff16565b612c1990919063ffffffff16565b60098190555081600581905550612b82600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1685612c32565b7ff1cd759bc86f7e79470e4a2e1bc21dd46c673588ab057bfca67fb184a55ed8036009546040518082815260200191505060405180910390a1600192505050919050565b600043905090565b600080612be660055484612c1990919063ffffffff16565b9050612c11600354612c0383600454612cb190919063ffffffff16565b612c9b90919063ffffffff16565b915050919050565b6000828211151515612c2757fe5b818303905092915050565b8173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015612c78573d6000803e3d6000fd5b505050565b6000808284019050838110151515612c9157fe5b8091505092915050565b60008183811515612ca857fe5b04905092915050565b6000806000841415612cc65760009150612ce5565b8284029050828482811515612cd757fe5b04141515612ce157fe5b8091505b50929150505600a165627a7a723058203da8af720ae10fd066d98df7d3fc326346f22f986474649bf4b218ae192347450029';
const CONST_ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "requestUsufructUpdate",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "removePayer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawFunds",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "requestPayeeUpdate",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUsufruct",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "terminateContract",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "setPayeeAddress",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "depositFunds",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "removePayee",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getRemainingIntervals",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPayeeBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "setPayerAddress",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "startContract",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "removeUsufruct",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPayerBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPayeeAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getContractState",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getPayerAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "requestPayerUpdate",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawPayment",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_payerAddress",
				"type": "address"
			},
			{
				"name": "_payeeAddress",
				"type": "address"
			},
			{
				"name": "_interval",
				"type": "uint256"
			},
			{
				"name": "_paymentAmount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "ContractCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "ContractStartRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "ContractStarted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "ContractTerminatedRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "ContractTerminated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "payerBalance",
				"type": "uint256"
			}
		],
		"name": "FundsDeposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "payerBalance",
				"type": "uint256"
			}
		],
		"name": "DepositWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "payeeBalance",
				"type": "uint256"
			}
		],
		"name": "PaymentsWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_payerAddress",
				"type": "address"
			}
		],
		"name": "PayerUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_payerAddress",
				"type": "address"
			}
		],
		"name": "PayerUpdateRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_payerAddress",
				"type": "address"
			}
		],
		"name": "PayerUpdateAuthorised",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_payerAddress",
				"type": "address"
			}
		],
		"name": "PayerRemoveRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_payerAddress",
				"type": "address"
			}
		],
		"name": "PayerRemoveAuthorised",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_payeeAddress",
				"type": "address"
			}
		],
		"name": "PayeeUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_payeeAddress",
				"type": "address"
			}
		],
		"name": "PayeeUpdateRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_payeeAddress",
				"type": "address"
			}
		],
		"name": "PayeeUpdateAuthorised",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_payeeAddress",
				"type": "address"
			}
		],
		"name": "PayeeRemoveRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_payeeAddress",
				"type": "address"
			}
		],
		"name": "PayeeRemoveAuthorised",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "usufructAddress",
				"type": "address"
			}
		],
		"name": "UsufructUpdateRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "usufructAddress",
				"type": "address"
			}
		],
		"name": "UsufructUpdateAuthorised",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "usufructAddress",
				"type": "address"
			}
		],
		"name": "UsufructRemoveRequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "usufructAddress",
				"type": "address"
			}
		],
		"name": "UsufructRemoveAuthorised",
		"type": "event"
	}
];

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
      errored: false,

      depositContract: '',
      depositContractError: false,
      depositAmount: '',
      depositAmountError: false,

      withdrawContract: '',
      withdrawContractError: false,
      withdrawAmount: '',
      withdrawAmountError: false

    };

    this.submitSetupContract = this.submitSetupContract.bind(this);
    this.submitBack = this.submitBack.bind(this);
    this.submitFundContract = this.submitFundContract.bind(this);
    this.submitWithdrawContract = this.submitWithdrawContract.bind(this);
    this.submitSearchContract = this.submitSearchContract.bind(this);
    this.submitStartContract = this.submitStartContract.bind(this);
    this.submitCreateNavigate = this.submitCreateNavigate.bind(this);
    this.submitDepositNavigate = this.submitDepositNavigate.bind(this);
    this.submitWithdrawNavigate = this.submitWithdrawNavigate.bind(this);

    this.processSetupContract = this.processSetupContract.bind(this);
    this.processFundContract = this.processFundContract.bind(this);
    this.processWithdrawContract = this.processWithdrawContract.bind(this);

    this.reset = this.reset.bind(this);

  };

  componentDidMount() {
    var that = this

    window.web3.eth.getAccounts(function (error, accounts) {
      if (error) return console.error(error)
      that.setState({accounts})
    })
  };

  reset() {
    this.setState({loaded:false})
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleRadio = (event, value) => {
   this.setState({ value });
  };
  handleChecked = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  submitDepositNavigate() {
    this.setState({currentScreen: 'fundContract'})
  };

  submitWithdrawNavigate() {
    this.setState({currentScreen: 'withdrawContract'})
  };

  submitCreateNavigate() {
    this.setState({currentScreen: 'setupContract'})
  };

  submitStartContract() {
    this.setState({loading: true});
    const myContract = window.web3.eth.contract(CONST_ABI).at(this.state.searchContract);
    if(typeof myContract !== 'undefined') {
      var that = this
      myContract.startContract({from: this.state.accounts[0]}, function(error, result){
        that.setState({loading: false});

        that.processSearchContract();
      });
    }
  };

  submitSearchContract() {
    this.setState({
      loading:true,
      searchContractError: false
    })
    var error = false;
    if (!isEthereumAddress(this.state.searchContract)) {
      this.setState({ searchContractError: true });
      error = true;
    }

    if (error) {
      this.setState({loading: false})
    } else {
      //this.setState({key:md5(JSON.stringify(this.state))})
      this.processSearchContract()
    }
  };
  processSearchContract() {
    const myContract = window.web3.eth.contract(CONST_ABI).at(this.state.searchContract);
    if(typeof myContract !== 'undefined') {
      var that = this
      myContract.getPayeeAddress({from: this.state.searchContract}, function(error, result){
        that.setState({payeeAddress: result});
      });
      myContract.getPayerAddress({from: this.state.searchContract}, function(error, result){
        that.setState({payerAddress: result});
      });
      myContract.getPayeeBalance({from: this.state.searchContract}, function(error, result){
        if(!error)
          that.setState({fundsWithdrawable: result.c[0]});

        console.log(result);
      });
      myContract.getPayerBalance({from: this.state.searchContract}, function(error, result){
        if(!error)
          that.setState({fundsDeposited: result.c[0]});

        console.log(result);
      });
      myContract.getContractState({from: this.state.searchContract}, function(error, result){
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

      this.setState({paymentintervalcontractContract: myContract, currentScreen: 'contractDetails', loading: false, withdrawContract: this.state.searchContract, depositContract: this.state.searchContract})
    }
  };
  submitWithdrawContract() {
    this.setState({
      loading:true,
      withdrawContractError: false,
      withdrawAmountError: false
    })
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
      //this.setState({key:md5(JSON.stringify(this.state))})
      this.processWithdrawContract()
    }
  };
  processWithdrawContract() {
    var _amount = this.state.withdrawAmount;

    const myContract = window.web3.eth.contract(CONST_ABI).at(this.state.searchContract);
    var that = this;

    myContract.withdrawPayment(_amount, {
      to: this.state.withdrawContract,
      from: this.state.accounts[0],
      gas: 3000000
    }, function(error, result) {
      that.setState({withdrawContractHash: result, loading:false, loaded:true})
    })
  };

  submitFundContract() {
    this.setState({
      loading:true,
      depositContractError: false,
      depositAmountError:false
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
      //this.setState({key:md5(JSON.stringify(this.state))})
      this.processFundContract()
    }
  };
  processFundContract() {
    var _amount = this.state.depositAmount;

    const myContract = window.web3.eth.contract(CONST_ABI).at(this.state.searchContract);
    var that = this;

    myContract.depositFunds(_amount, {
      to: this.state.depositContract,
      from: this.state.accounts[0],
      value: _amount,
      gas: 3000000
    }, function(error, result) {
      that.setState({fundContractHash: result, loading:false, loaded:true})
    })
  };

  submitBack() {
    this.setState({
      currentScreen: 'searchContract'
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
      //this.setState({key:md5(JSON.stringify(this.state))})
      this.processSetupContract()
    }
  };
  async processSetupContract() {
    this.setState({loading:true})
    let code = CONST_DATA;
    let abi = CONST_ABI

    let paymentintervalcontractContract = window.web3.eth.contract(abi);

    var that = this;
    let contract = paymentintervalcontractContract.new(
      this.state.payer,
      this.state.payee,
      this.state.paymentAmount,
      this.state.paymentInterval,
      {from: this.state.accounts[0], gas: 4700000, data: code},
      function (e, contract){
        console.log(e, contract);
        if (typeof contract !== 'undefined' && typeof contract.address !== 'undefined') {
           console.log('Contract mined! address: ' + contract.address + ' transactionHash: http://testnet.etherscan.io/tx/' + contract.transactionHash);

           that.setState({loading:false, loaded:true, contract: contract})
        }
      }
    );
  };

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  renderSetupContract(style) {
    /*<Grid item xs={12}>
      <TextField fullWidth={true}
        id="bitDiem" label="Bit Diem Address" required error={this.state.bitDiemError} value={this.state.bitDiem} disabled={this.state.loading}
        onChange={this.handleChange('bitDiem')} margin="normal"
        helperText="Address of the bitDiem Organisation if you would like to provide them with usufruct"/>
    </Grid>
    <Grid item xs={12}>
      <TextField fullWidth={true} required error={this.state.ensNameError} disabled={this.state.loading}
        id="ensName" label="ENS Name" value={this.state.ensName}
        onChange={this.handleChange('ensName')} margin="normal"
        helperText={"Human friendly name for your contract. You can use this to search for your contract going forward"}/>
    </Grid>*/

    return (
      <Grid container xs={11} justify="space-around" alignItems="center" direction="row" spacing={0}>
        <Grid item xs={12} sm={8} md={6} lg={4} style={{marginTop:150}}>
          {!this.state.loaded?<Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">
                <Grid container xs={12} alignItems="flex-start" spacing={0}>
                  <Grid item xs={12}>
                    <Grid container xs={12} direction="column" justify="center" style={{marginLeft:10,marginRight:15}}>
                    <Grid item xs={12}><Typography align='center' variant="headline" component="h2" style={{marginTop:50,marginBottom:50}}>Setup Contract</Typography></Grid>
                    <Grid item xs={12}><Typography align='center'>{"For more information, head over to https://www.bitdiem.com/"}</Typography></Grid>
                      <Grid item xs={12} >
                        <TextField required fullWidth={true} color="textSecondary" required error={this.state.payerError} disabled={this.state.loading}
                          id="payer" label="Payer Address" value={this.state.payer}
                          onChange={this.handleChange('payer')} margin="normal"
                          helperText={"The contract address of the company/person who will be paying for the services"}/>
                      </Grid>
                      <Grid item xs={12} >
                        <TextField required fullWidth={true} color="textSecondary" required error={this.state.payeeError} disabled={this.state.loading}
                          id="payee" label="Payee Address" value={this.state.payee}
                          onChange={this.handleChange('payee')} margin="normal"
                          helperText={"The contracat address of the company/person who will be receiving payment"}/>
                      </Grid>
                      <Grid item xs={12} >
                        <TextField required fullWidth={true} color="textSecondary" required error={this.state.paymentIntervalError} disabled={this.state.loading}
                          id="paymentInterval" label="Payment Interval" value={this.state.paymentInterval}
                          onChange={this.handleChange('paymentInterval')} margin="normal"
                            helperText={"The interval that funds will be transferred to the payee"}/>
                      </Grid>
                      <Grid item xs={12} >
                        <TextField required fullWidth={true} color="textSecondary" required error={this.state.paymentAmountError} disabled={this.state.loading}
                          id="paymentAmount" label="Payment Amount" value={this.state.paymentAmount}
                          onChange={this.handleChange('paymentAmount')} margin="normal"
                          helperText={"The amount of funds that will be transferred to the payee every payment interval"}/>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container xs={12} direction="row" justify="center" spacing={0} style={{position: 'relative'}}>
                  <Grid item xs={6} sm={6} align='left'>
                    <Button size="small" variant="flat" color="secondary" disabled={this.state.loading} onClick={this.submitBack}>
                      Back
                    </Button>
                    {this.state.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
                  </Grid>
                  <Grid item xs={6} sm={6} align='right' >
                    <Button size="small" variant="raised" color="secondary" disabled={this.state.loading} onClick={this.submitSetupContract}>
                      Done
                    </Button>
                    {this.state.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
                  </Grid>
              </Grid>
              <Grid container xs={12} direction="row">
                <LinearProgress />
              </Grid>
            </CardContent>
          </Card>:
          !this.state.errored?<Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" variant="headline" component="h2">Contract setup is complete.</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" component="h2">The next step is for the Payer to fund the contract</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" component="h2">Your contract address is: {this.state.contract.address}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.reset}>Back</Button>
            </CardActions>
          </Card>:
          <Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">
              <Grid item xs={12}>
                <Typography align='center' color="textSecondary" variant="headline" component="h2">Error Encountered</Typography>
              </Grid>
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" component="h2" style={{margin:100,color:'#E91E63'}}>{this.state.err.toString()}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.reset}>Back</Button>
            </CardActions>
          </Card>}
        </Grid>
      </Grid>
    )
  };

  renderFundContract(style) {
    return (
      <Grid container xs={11} justify="space-around" alignItems="center" direction="row" spacing={0}>
        <Grid item xs={12} sm={9} md={7} lg={5} style={{marginTop:150}}>
          {!this.state.loaded?<Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">
                <Grid container xs={12} alignItems="flex-start" spacing={0}>
                  <Grid item xs={12}>
                    <Grid container xs={12} direction="column" justify="center">
                    <Grid item xs={12}><Typography align='center' variant="headline" component="h2" style={{marginTop:50,marginBottom:50}}>Fund Contract</Typography></Grid>
                    <Grid item xs={12}><Typography align='center'>{"For more information, head over to https://www.bitdiem.com/"}</Typography></Grid>
                      <Grid item xs={12} >
                        <TextField required fullWidth={true} color="textSecondary" required error={this.state.depositContractError} disabled={this.state.loading}
                          id="depositContract" label="ENS Name" value={this.state.depositContract}
                          onChange={this.handleChange('depositContract')} margin="normal"
                          helperText={"The contract name"}/>
                      </Grid>
                      <Grid item xs={12} >
                        <TextField required fullWidth={true} color="textSecondary" required error={this.state.depositAmountError} disabled={this.state.loading}
                          id="depositAmount" label="Amount" value={this.state.depositAmount}
                          onChange={this.handleChange('depositAmount')} margin="normal"
                          helperText={"Deposit amount"}/>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container xs={12} direction="row" justify="center" spacing={0} style={{position: 'relative'}}>
                  <Grid item xs={6} align='left' >
                    <Button size="small" variant="flat" color="secondary" disabled={this.state.loading} onClick={this.submitBack}>
                      Back
                    </Button>
                    {this.state.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
                  </Grid>
                  <Grid item xs={6} align='right' >
                    <Button size="small" variant="raised" color="secondary" disabled={this.state.loading} onClick={this.submitFundContract}>
                      Deposit
                    </Button>
                    {this.state.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
                  </Grid>
              </Grid>
              <Grid container xs={12} direction="row">
                <LinearProgress />
              </Grid>
            </CardContent>
          </Card>:
          !this.state.errored?<Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" variant="headline" component="h2">Contract funding is complete.</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" component="h2">Transaction hash: {this.state.fundContractHash}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" component="h2">Amount depositted {this.state.depositAmount}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.reset}>Back</Button>
            </CardActions>
          </Card>:
          <Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">
              <Grid item xs={12}>
                <Typography align='center' color="textSecondary" variant="headline" component="h2">Error Encountered</Typography>
              </Grid>
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" component="h2" style={{margin:100,color:'#E91E63'}}>{this.state.err.toString()}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.reset}>Back</Button>
            </CardActions>
          </Card>}
        </Grid>
      </Grid>
    )
  };

  renderSearchContract(style) {
    return (
      <Grid container xs={11} justify="space-around" alignItems="center" direction="row" spacing={0}>
        <Grid item xs={12} sm={9} md={7} lg={5} style={{marginTop:150}}>
          {!this.state.loaded?<Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">
                <Grid container xs={12} alignItems="flex-start" spacing={0}>
                  <Grid item xs={12}>
                    <Grid container xs={12} direction="column" justify="center">
                      <Grid item xs={12}><Typography align='center' variant="headline" component="h2" style={{marginTop:50,marginBottom:50}}>Search for Contract</Typography></Grid>
                      <Grid item xs={12}><Typography align='center'>{"For more information, head over to https://www.bitdiem.com/"}</Typography></Grid>
                      <Grid item xs={12} >
                        <TextField required fullWidth={true} color="textSecondary" required error={this.state.searchContractError} disabled={this.state.loading}
                          id="searchContract" label="ENS Name or Contract Address" value={this.state.searchContract}
                          onChange={this.handleChange('searchContract')} margin="normal"
                          helperText={"The contract name"}/>
                      </Grid>
                      <Grid item xs={12} style={{marginTop:10,marginBottom:10}}></Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container xs={12} direction="row" justify="center" spacing={0} style={{position: 'relative'}}>
                  <Grid item xs={6} sm={6} align='left'>
                    <Button size="small" variant="raised" color="secondary" disabled={this.state.loading} onClick={this.submitSearchContract}>
                      Search
                    </Button>
                    {this.state.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
                  </Grid>
                  <Grid item xs={6} sm={6} align='right'>
                    <Button size="small" variant="raised" color="secondary" disabled={this.state.loading} onClick={this.submitCreateNavigate}>
                      Create
                    </Button>
                    {this.state.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
                  </Grid>
              </Grid>
              <Grid container xs={12} direction="row">
                <LinearProgress />
              </Grid>
              <Grid container xs={12} direction="column"  spacing={0} style={{position: 'relative'}}>

              </Grid>
            </CardContent>
          </Card>:
          !this.state.errored?<Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" variant="headline" component="h2">Withdrawal is complete.</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" component="h2">Funds were withdrawn to {this.state.withdrawContract}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" component="h2">Your contract ENS name {this.state.contract}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" component="h2">Amount withdrawn {this.state.withdrawAmount}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.reset}>Back</Button>
            </CardActions>
          </Card>:
          <Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">
              <Grid item xs={12}>
                <Typography align='center' color="textSecondary" variant="headline" component="h2">Error Encountered</Typography>
              </Grid>
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" component="h2" style={{margin:100,color:'#E91E63'}}>{this.state.err.toString()}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.reset}>Back</Button>
            </CardActions>
          </Card>}
        </Grid>
      </Grid>
    )
  };

  renderContractDetails(style) {
    return (
      <Grid container xs={11} justify="center" alignItems="flex-start" direction="row" spacing={0}>
        <Grid item xs={12} sm={9} md={7} lg={5} style={{marginTop:150}}>
          {!this.state.loaded?<Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">
                <Grid container xs={12} alignItems="flex-start" spacing={0}>
                  <Grid item xs={12}>
                    <Grid container xs={12} direction="column" justify="center">
                      <Grid item xs={12}><Typography align='center' variant="headline" component="h2" style={{marginTop:50,marginBottom:50}}>Contract Information</Typography></Grid>
                      <Grid item xs={12}><Typography align='center'>{"For more information, head over to https://www.bitdiem.com/"}</Typography></Grid>
                      <Grid item xs={12} style={{marginTop:10,marginBottom:10}}></Grid>
                      <Grid item xs={12}>
                        <Typography component="h2">Contract state: {this.state.contractState}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography component="h2">Funds Deposited: {this.state.fundsDeposited}</Typography>
                      </Grid>
                      <Grid item xs={12} >
                        <Typography component="h2">Funds Withdrawable: {this.state.fundsWithdrawable}</Typography>
                      </Grid>
                      <Grid item xs={12} >
                        <Typography component="h2">Payer Address: {this.state.payerAddress}</Typography>
                      </Grid>
                      <Grid item xs={12} >
                        <Typography component="h2">Payee Address: {this.state.payeeAddress}</Typography>
                      </Grid>
                      <Grid item xs={12} style={{marginTop:10,marginBottom:10}}></Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container xs={12} direction="row" justify="center" spacing={0} style={{position: 'relative'}}>
                <Grid item xs={3} sm={3} align='left' >
                  <Button size="small" variant="flat" color="secondary" disabled={this.state.loading} onClick={this.submitBack}>
                    Back
                  </Button>
                </Grid>
                <Grid item xs={3} sm={3} align='right' spacing={0}>
                  <Button size="small" variant="raised" color="secondary" disabled={this.state.loading||this.state.contractState!='Created'} onClick={this.submitStartContract}>
                    Start
                  </Button>
                </Grid>
                <Grid item xs={3} sm={3} align='right' spacing={0}>
                  <Button size="small" variant="raised" color="secondary" disabled={this.state.loading} onClick={this.submitDepositNavigate}>
                    Deposit
                  </Button>
                </Grid>
                <Grid item xs={3} sm={3} align='right' spacing={0}>
                  <Button size="small" variant="raised" color="secondary" disabled={this.state.loading} onClick={this.submitWithdrawNavigate}>
                    Withdraw
                  </Button>
                </Grid>
                {this.state.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
              </Grid>
              <Grid container xs={12} direction="row">
                <LinearProgress />
              </Grid>
            </CardContent>
          </Card>:
          !this.state.errored?<Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">

              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.reset}>Back</Button>
            </CardActions>
          </Card>:
          <Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">
              <Grid item xs={12}>
                <Typography align='center' color="textSecondary" variant="headline" component="h2">Error Encountered</Typography>
              </Grid>
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" component="h2" style={{margin:100,color:'#E91E63'}}>{this.state.err.toString()}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.reset}>Back</Button>
            </CardActions>
          </Card>}
        </Grid>
      </Grid>
    )
  };

  renderWithdrawContract(style) {
    return (
      <Grid container xs={11} justify="space-around" alignItems="center" direction="row" spacing={0}>
        <Grid item xs={12} sm={9} md={7} lg={5} style={{marginTop:150}}>
          {!this.state.loaded?<Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">
                <Grid container xs={12} alignItems="flex-start" spacing={0}>
                  <Grid item xs={12}>
                    <Grid container xs={12} direction="column" justify="center">
                      <Grid item xs={12}><Typography align='center' variant="headline" component="h2" style={{marginTop:50,marginBottom:50}}>Withdraw Contract</Typography></Grid>
                      <Grid item xs={12}><Typography align='center'>{"For more information, head over to https://www.bitdiem.com/"}</Typography></Grid>
                      <Grid item xs={12}>
                        <Typography component="h2">Available: {this.state.fundsWithdrawable}</Typography>
                      </Grid>
                      <Grid item xs={12} >
                        <Typography component="h2">History</Typography>
                      </Grid>
                      <Grid item xs={12} >
                        <TextField required fullWidth={true} color="textSecondary" required error={this.state.withdrawContractError} disabled={this.state.loading}
                          id="withdrawContract" label="ENS Name" value={this.state.withdrawContract}
                          onChange={this.handleChange('withdrawContract')} margin="normal"
                          helperText={"The contract name"}/>
                      </Grid>
                      <Grid item xs={12} >
                        <TextField required fullWidth={true} color="textSecondary" required error={this.state.withdrawAmountError} disabled={this.state.loading}
                          id="withdrawAmount" label="Amount" value={this.state.withdrawAmount}
                          onChange={this.handleChange('withdrawAmount')} margin="normal"
                          helperText={"Withdraw amount"}/>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container xs={12} direction="row" justify="center" spacing={0} style={{position: 'relative'}}>
                <Grid item xs={6} sm={6} align='left' >
                  <Button size="small" variant="flat" color="secondary" disabled={this.state.loading} onClick={this.submitBack}>
                    Back
                  </Button>
                  {this.state.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
                </Grid>
                <Grid item xs={6} sm={6} align='right'>
                  <Button size="small" variant="raised" color="secondary" disabled={this.state.loading} onClick={this.submitWithdrawContract}>
                    Withdraw
                  </Button>
                  {this.state.loading && <CircularProgress size={36} style={{position: 'absolute',top: '50%',left: '50%',marginTop: -12,marginLeft: -12,}}/>}
                </Grid>
              </Grid>
              <Grid container xs={12} direction="row">
                <LinearProgress />
              </Grid>
            </CardContent>
          </Card>:
          !this.state.errored?<Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" variant="headline" component="h2">Withdrawal is complete.</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" component="h2">Funds were withdrawn from {this.state.withdrawContract}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" component="h2">Amount withdrawn {this.state.withdrawAmount}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.reset}>Back</Button>
            </CardActions>
          </Card>:
          <Card raised elevation={10} square={false} fullWidth={true}>
            <CardContent>
              <Grid container xs={12} direction="row" justify="center">
              <Grid item xs={12}>
                <Typography align='center' color="textSecondary" variant="headline" component="h2">Error Encountered</Typography>
              </Grid>
                <Grid item xs={12}>
                  <Typography align='center' color="textSecondary" component="h2" style={{margin:100,color:'#E91E63'}}>{this.state.err.toString()}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.reset}>Back</Button>
            </CardActions>
          </Card>}
        </Grid>
      </Grid>
    )
  };

  render() {

    var styles = {
      headerBackground: {
        backgroundColor: '#ffe400',
        maxHeight:250,
        borderBottom: '1px solid #777777'
      }
    };

    return (
      <MuiThemeProvider theme={theme}>
        <div style={styles.headerBackground}>
          <CssBaseline />
          <Grid container xs={12} justify="space-around" alignItems="center" direction="row" spacing={0}>
            {this.renderScreen()}
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  };

  renderScreen() {
    switch (this.state.currentScreen) {
      case 'searchContract':
        return this.renderSearchContract()
        break;
      case 'setupContract':
        return this.renderSetupContract()
        break;
      case 'fundContract':
        return this.renderFundContract()
        break;
      case 'withdrawContract':
        return this.renderWithdrawContract()
        break;
      case 'contractDetails':
        return this.renderContractDetails()
        break;
      default:
        return this.renderSearchContract()
    }
  }
}

export default App;
