// import React, { Component } from "react";

// class Doctor extends Component{
//     contract = this.props.contract;
//         address = this.props.address;
//         state={name:null,id:null,patient_list:[]};
//     // constructor(){
//     // {
        
//     // }
//     async getinfo()
//     {
//         var result;
//         try{
//             result = await this.contract['OPT'].methods.getDoctorInfo().call({from :this.Acc[0]});
//             this.setState({name:result[0],id:result[1],patient_list:result[2]});
//         }
//         catch(err)
//         {
//             alert('Something went wrong. Login Again');
//         }
//     }
    
        
    
//     render()
//     {   
//         this.getinfo();
//         return(<div className="main">
//             <div className="Namelbl">Name:</div>
//             <div className="Name">{this.state.name}</div>
//             <div className="id">Id:</div>
//             <div className="id">{this.state.id}</div>
//             <div className="patlbl">List Of Trated Patients</div>
//             <div className="patient">{this.state.patient_list.map(patient=><ol>
//                 <li>patient</li>
//             </ol>)}</div>
//         </div>);
//     }
// }
// export default Doctor;
import React, { Component } from 'react';
import {  Row, Col, Card, Tag } from 'antd';
//import { connect } from "react-redux";
import DisplayPatient from "./display_patient";

class Doctor extends Component {

    constructor(props){
        super(props);
    }
     healthRecord =this.props.contract["OPT"];
     Acc =this.props.Acc;
    state = {
        name: "",
        patient_list: [],
        filesInfo:[],
        load_patient:""
    }

    componentDidMount(){
        
            this.loadDoctor();
    }

    // componentWillReceiveProps(nextProps){
    //     if(healthRecord !== nextProps.global_vars.healthRecord) {
    //         this.loadDoctor(nextProps.global_vars.healthRecord);   
    //     }
    // }

    async loadDoctor(){
        let res = await this.healthRecord.methods.getDoctorInfo().call({from :this.Acc[0]});
        this.setState({name:res[0],patient_list:res[2]});
    }

    render() {
        let { name, patient_list } = this.state;
        return (
            <div>
                <Card bordered={true}>
                    <div>
                        name: {name}
                    </div>
                </Card>
                <Row gutter={16} style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <Col className='col-sm-10' span={10}>
                        <Card bordered={true} style={flexStyle}>
                            { 
                                patient_list.map((patient) => {
                                return <div><Tag onClick={()=>this.setState({load_patient:patient})}>{patient}</Tag></div>
                                }) 
                            }
                        </Card>
                    </Col>
					<br/>
                    <Col className='col-sm-6' span={6} style={{width: "58%"}}>
                        {
                            this.state.load_patient ?
                            <div>Patients List<DisplayPatient contract ={this.healthRecord} Acc={this.Acc} patient_address={this.state.load_patient} /></div> :
                            <div>No Patients To Show</div>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

const flexStyle = {
    display:"flex", 
    flexDirection:"column"
}

const mapStateToProps = (state) => {
    return {
      auth: state.auth,
      global_vars: state.global_vars
    };
};

export default Doctor;
//export default connect(mapStateToProps, {})(Doctor);