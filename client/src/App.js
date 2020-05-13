import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import DoctorContract from "./contracts/Doctor.json";
// import PatientContract from "./contracts/Patient.json";
import optHealthCare from "./contracts/optimized_healthCare.json"
import getWeb3 from "./getWeb3";
import DocLogin from "./Components/DocLogin";
import Doctor from "./Components/Doctor";
import Patient from "./Components/Patient";
import NavbarComp from "./Components/NavbarComp";

import "./App.css";
import "./Components/css/antd.css"
import 'antd/dist/antd.css';

class App extends Component {
  state = {  web3: null, accounts: null, contract: [],loggedAcc:null,loggedas:null};
  componentDidMount = async () => {
    try {
      // // Get network provider and web3 instance.
      // this.handleChange= this.handleChange.bind(this);
      // this.handleSubmit= this.handleSubmit.bind(this);

      var web3 = await getWeb3();
      var tmpcont=[];
      // Use web3 to get the user's accounts.
      var accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      var deployedNetwork = optHealthCare.networks[networkId];

       tmpcont['OPT'] = new web3.eth.Contract(
        optHealthCare.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // deployedNetwork = PatientContract.networks[networkId];
      // tmpcont['Pat'] = new web3.eth.Contract(
      //   PatientContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );
      
      
      // console.log(networkId);
      // web3.eth.net.getId().then(console.log);
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract:tmpcont});

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
    console.log(this.state.accounts);
  };
  handleChange(event){
      this.setState({newValue: event.target.value});
  }
  // async handleSubmit(event){
  //   event.preventDefault(true);
  //   const { accounts, contract } = this.state;
    
  //   await contract["SS"].methods.set(this.state.newValue).send({from:accounts[0]});
  //   const response = await contract["SS"].methods.get().call({from :this.Acc[0]});
  //   this.setState({ newValue: response });

  // }
  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // // Stores a given value, 5 by default.
  //   // await contract.methods.set("").send({ from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract["SS"].methods.get().call({from :this.Acc[0]});

  //   // Update state with the result.
  //   this.setState({ newValue: response });
  // };
// async testAcc()
// {
//   var web3 = await getWeb3();
//   var accounts = await web3.eth.getAccounts();
//     console.log(accounts);
//     console.log(this.state.accounts);
// }
  render() {
    //console.log(this.state.loggedas);
    //this.loadcomponent();
    //this.testAcc();
    
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <NavbarComp isLogged={this.state.loggedAcc} onlogout={()=>this.setState({loggedAcc:null,loggedas:null})}/>
        {/* <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
              Value of Variable is {this.state.newValue}  
          </div>  
          <input type="text" value={this.state.newValue} onChange={this.handleChange.bind(this)}></input>
          <input type="submit" value="Submit"/>
          
          </form> */}
          {!this.state.loggedAcc ? <DocLogin onlogin={(loggedAcc,loggedas)=>this.setState({loggedAcc,loggedas})} state = {this.state}/>
               :this.state.loggedas==0?<Doctor contract={this.state.contract} Acc={this.state.accounts}/>:<Patient contract={this.state.contract} Acc={this.state.accounts}/>}
               
               </div>
               
    );
  }
}

export default App;
