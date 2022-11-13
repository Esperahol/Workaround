import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem  } from "reactstrap";
import {Link} from 'react-router-dom';    
import { baseUrl } from '../shared/baseUrl';

    function RenderMenuItem({ beer, onClick }) {
        return(
            <Card>
                <Link to={ `/beermenu/${beer.id}` } >
                    <CardImg width="100%" src={baseUrl + beer.image} alt={beer.name} />
                    <CardImgOverlay>
                        <CardTitle> {beer.name}</CardTitle>
                    </CardImgOverlay>
                </Link>
            </Card>   
        );
    }

    const Menu = (props) => {

        const menu = props.beers.beers.map((beer) => {
            return (
                <div key={ beer.id } className="col-12 col-md-5 m-1">    
                    <RenderMenuItem beer={beer}  />
                </div>
            );
        });

        if (props.beers.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.beers.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.beers.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
        {
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/home">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                Menu
                            </BreadcrumbItem>
                        </Breadcrumb>
                        
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr />
                        </div>
                    </div>
    
                    <div className="row">
                        { menu }
                    </div>
                </div>
            );

        }


    }
    




export default Menu;