import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Token} from './token';
import {User} from './user';
import thunk from 'redux-thunk';
import { Beers } from './beers';
import { Comments } from './comments';
import { Breweries } from './breweries';


export const ConfigureStore = () => {

    const store = createStore(         

        combineReducers({
            token: Token,
            user: User,
            beers: Beers,
            comments: Comments,
            breweries: Breweries,
            
        }),
        applyMiddleware( thunk )            
    );

    return store;
}