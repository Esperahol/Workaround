import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addToken = (token) => ({
    type: ActionTypes.ADD_TOKEN,
    payload: token
});

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
})

export const deleteUser = () => ({
    type: ActionTypes.DELETE_USER
})


/* Comment function? */
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (beerId, rating, author, comment)=> (dispatch)=> {

    const newComment = {
        dishId: beerId,
        rating: rating,
        author: author,
        comment: comment,
    }
    newComment.date = new Date().toISOString();

    return fetch( baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {

        if (response.ok) {
                return response;
        }
        else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
        }
    },
        //SERVER FAILURE 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        }
    )
    .then( response => response.json() )
    .then( response => dispatch(addComment(response)) )
    .catch(error => {
        console.log('Post Comments', error.message); 
        alert('Comment could not be posted\nError'+ error.message);
    });

}

/* Beers  functions*/
// thunk: function returns an func
export const fetchBeers = () => (dispatch) => {
    dispatch(beersLoading(true));

    return fetch(baseUrl + 'beers')
        .then(response => {
            if (response.ok) 
            {
                return response;
            }
            else
            {
                var error = new Error('Error ' + response.status + ': '+ response.statusText )
                error.response = response;
                throw error;
            }
        },
         //SERVER FAILURE 
         error => {
            var errmess = new Error( error.message );
            throw errmess;
         })
        .then(response => response.json())
        .then(beers => dispatch(addBeers(beers)))
        .catch(error => dispatch(beersFailed(error.message) ) );
}

export const beersLoading = () => ({
    type: ActionTypes.BEERS_LOADING
});

export const beersFailed = (errmess) => ({
    type: ActionTypes.BEERS_FAILED,
    payload: errmess
});

export const addBeers = (beers) => ({
    type: ActionTypes.ADD_BEERS,
    payload: beers
});

/** Comment functions */
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
        //server fail
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        }) 
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});



/* brewery functions (just in case) */
export const fetchBreweries = () => (dispatch) => {

    dispatch( breweriesLoading() );

    return fetch( baseUrl + 'breweries')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
        //server failure 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then( breweries => dispatch( addBreweries(breweries) ) ) 
        .catch(error => dispatch(breweriesFailed(error.message)));
}

export const breweriesLoading = () => ({
    type: ActionTypes.BREWERIES_LOADING
});

export const breweriesFailed = (errmess) => ({
    type: ActionTypes.BREWERIES_FAILED,
    payload: errmess
});

export const addBreweries = (breweries) => ({
    type: ActionTypes.ADD_BREWERIES,
    payload: breweries
});