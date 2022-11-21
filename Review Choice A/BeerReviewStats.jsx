import PropTypes from 'prop-types';

function BeerStats({ review }) {
      // Rating Average  
      let average =
          review.reduce((accumulator, current) => {
            return accumulator + current.rating;
          }, 0) / review.length;
        average = average.toFixed(1);
        return (
          <div className="feedback-stats">
            BeerStats
            <h4>{review.length} Product Reviews</h4>      
            <h4>Average Product Rating: {isNaN(average) ? 0 : average}</h4>     
          </div>
       );
    }
    BeerStats.propTypes = {  
        review: PropTypes.array.isRequired
    };
        
export default BeerStats;