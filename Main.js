import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './Home';
import Header from './Structure/Header';
import Footer from './Structure/Footer';
import BeerMenu from './BeerMenu';
import BeerDetail from './BeerDetail';

const mapStateToProps = state => {

    return{
        comments: state.comments,
        beers: state.beers,
    }
}       

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comments: COMMENTS,
            beers: BEERS,
        };

    }

    render() {

        const HomePage = () => {
            return(
                <Home 
                    beer={ this.state.beers.filter( (beer)=>beer.featured )[0] }
                />
            );
        };

        const BeerWithId = ({match}) => {
            return(
                <BeerDetail 
                
                beer={this.state.beers.filter( (beer) => beer.id === parseInt(match.params.beerId, 10))[0] } 
                comments={this.state.comments.filter( (comment) => comment.beerId === parseInt(match.params.beerId, 10)) } 
                
                />
            );
        };



        return (
            <div>
                <Header></Header>

                <Switch>
                    <Route path="/home" component={ HomePage } />
                    <Route exact path="/beermenu" component={() => <Menu beers={this.state.beers}/> }/>

                    <Route path="/beermenu/:beerId" component={BeerWithId} />

                    <Route exact path="/reviews" component={Reviews } />
                    <Route exact path="/help" component={ Help } />
                   
                    {/* broken links or misdirects bounce back to home page */}
                    <Redirect to="/home" />
                </Switch>

                <Footer></Footer>
            </div> 
        );

    }

}

export default Main;