import React, { Component } from 'react';

import Home from '../Home/Home';
import BeerMenu from './BeerMenu';
import Header from '../Structure/Header';
import Footer from '../Structure/Footer';
import BeerDetail from './Beerdetail';

import Login from '../Login/Login';
import Register from '../Register/Register';
import {addToken, deleteUser} from '../../Redux/actionCreators';


import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { postComment, fetchBeers, fetchComments, fetchBreweries } from '../redux/actionCreators';
import { actions } from 'react-redux-form';



const mapStateToProps = state => {

    return{
        comments: state.comments,
        beers: state.beers,
        breweries: state.breweries,
        token: state.token,
        user: state.user

    }
}       

const mapDispatchToProps = (dispatch) => ({
    postComment: (beerId, rating, author, comment) => dispatch(postComment(beerId, rating, author, comment)),
    
    
    fetchBeers: () => { dispatch(fetchBeers()) },
    
    fetchComments: () => dispatch(fetchComments()),
    
    fetchBreweries: () => dispatch(fetchBreweries()),

    addToken: () => { dispatch(addToken()) },
    
    deleteUser: () => { dispatch(deleteUser())}


});


class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.fetchBeers();
        this.props.fetchComments();
        this.props.fetchBreweries();
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                    beer={
                        this.props.beers.beers.filter(beer => beer.featured)[0]
                    }
                    beersLoading={this.props.beers.isLoading}
                    beerErrMess={this.props.beers.errMess}
                    
                    brewery={
                        this.props.breweries.breweries.filter((brewery) => brewery.featured)[0]
                    }
                    breweryLoading={this.props.breweries.isLoading}
                    breweryErrMess={this.props.breweries.errMess}

                />
            );
        };


        const BeerWithId = ({match}) => {
            return(
                <BeerDetail beer={this.props.beers.beers.filter((beer) => beer.id === parseInt(match.params.beerId, 10))[0]}
                    isLoading={this.props.beers.isLoading}
                    errMess={this.props.beers.errMess}
                    
                    comments={this.props.comments.comments.filter((comment) => comment.beerId === parseInt(match.params.beerId, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            );
        };



        return (
            <div>
                <Header></Header>
                {this.props.token.token !== undefined ?
                        <div>
                            <Link to='/home'>Home | </Link>
                            <Link to='/login' onClick={this.handleLogout}>logout</Link> 
                            <Redirect to='/home'/>

                        </div>  
                    : 
                        <Link to='/login'>Home | </Link>
                }

                        <Switch>
                            <Route path='/login' component={() => <Login/>}/>
                            <Route path='/register'component={() => <Register/>}/>
                            <Route path='/home' component={this.props.token.token !== undefined ? () => <Home/> : null}/>
                            <Redirect to='/login'/>

                            <Route path="/home" component={ HomePage } />
                            <Route exact path="/beermenu" 
                                component={() => <Menu beers={this.props.beers}/> }
                            />

                            <Route path="/beermenu/:beerId" component={BeerWithId}  
                            />
                        
                            {/* lack of match equals forced to home */}
                            <Redirect to="/home" />
                        </Switch>

                <Footer></Footer>
            </div> 
        );

    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
