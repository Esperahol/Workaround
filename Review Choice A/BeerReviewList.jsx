/*
If the review prop is passed in as an array with multiple reviews we will use the Array.proptype.map() 
method which will iterate through every review in the review array prop and return multiple pieces of UI 
in the form of the ReviewItem.jsx component.
*/ 

import ReviewBeer from './ReviewBeer';
import PropTypes from 'prop-types';

function BeerReviewList({ review }) {
      if (!review || review.length === 0) {
        return <p>No reviews yet</p>;
      }
     return ( 
       <div className="feedback-list">
         {review.map(beer => (
            <ReviewBeer key={beer.id} item={beer} handleDelete={handleDelete}/>
        ))}
      </div>
    );
  }
  BeerReviewList.propTypes = {
    review: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired
      })
    )
   }; 
export default BeerReviewList;

