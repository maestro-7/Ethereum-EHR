import React, { Component } from "react";
import {Form,Button,Navbar,Nav,FormControl} from 'react-bootstrap';


class NavbarComp extends Component{
    
    render()
    {
      let isLogged = this.props.isLogged?true:false;
    
      
        return(
          
            <div bg="dark">
                
              <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Welcome To EHR</Navbar.Brand>
                <Nav className="mr-auto">
                  {/* <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#features">Features</Nav.Link>
                  <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                </Nav>
                <Form inline>
                  {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                  {isLogged?
                  <Button variant="outline-light" onClick={()=>this.props.onlogout()}>Logout</Button>:<div></div>}
                </Form>
              </Navbar>
            </div>
            );
    }
}


export default NavbarComp;