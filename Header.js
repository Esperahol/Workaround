import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from "reactstrap";
import {  NavLink } from 'react-router-dom';

class Header extends Component{
    
    constructor(props){
        super(props);

        this.state={
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render(){
        return(
        
            <React.Fragment>
                <Navbar dark expand="md">                   
                    <div className="container">

                        <NavbarToggler onClick={this.toggleNav} />

                        <NavbarBrand className="mr-auto" href="/">
                            <img src="resources/images/logo.png" height="30" width="41" alt="Ontapp" />
                        </NavbarBrand>

                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-home fa-lg" ></span>Home
                                    </NavLink>
                                </NavItem>
                                
                                <NavItem>
                                    <NavLink className="nav-link" to="/account">
                                    <span className="fa fa-info fa-lg" ></span>Account
                                    </NavLink>
                                </NavItem>
                                
                                <NavItem>
                                    <NavLink className="nav-link" to="/reviews">
                                        <span className="fa fa-list fa-lg" ></span>Reviews
                                    </NavLink>
                                </NavItem>
                                
                                <NavItem>
                                    <NavLink className="nav-link" to="/help">
                                        <span className="fa fa-address-card fa-lg" ></span>Help
                                    </NavLink>
                                </NavItem>

                            </Nav>                        
                        </Collapse>
                    </div>
                </Navbar>

                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1> Ontapp </h1>
                                <p> 
                                    Your favorite new brewery or beer is just a tap away.
                                </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default Header;