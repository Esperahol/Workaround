import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle  } from "reactstrap";
import BeerDetail from "./BeerDetail";

class BeerMenu extends Component{

    constructor(props){
        super(props);

        this.state = {
            selectedBeer: null
        };

        console.log('Menu component constructed');
        
    }

    onBeerSelect(beer){

        this.setState({
            selectedBeer: beer
        });

    }



    render(){
        console.log('renders menu component');
        
        const menu = this.props.beers.map((beer) => {
            return (
                <div key={ beer.id } className="col-12 col-md-5 m-1">    
                    <Card onClick={ () => this.onBeerSelect( beer ) } >

                        <CardImg width="100%" src={ beer.image } alt={ beer.name } />
                        <CardImgOverlay>
                            <CardTitle> { beer.name }</CardTitle>
                        </CardImgOverlay>
                    </Card>                
                </div>
            );
        });

        return(
            <div className="container">
                <div className="row">
                    { menu }
                </div>

                <BeerDetail beer={this.state.selectedBeer} />
                

            </div>
        );
    }

    componentDidMount(){
        console.log('Menu component componentDidMounbt is invoked');
        
    }
}

export default BeerMenu;