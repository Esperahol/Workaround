import Card from './shared/Card';
import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

function ReviewBeer({ beer, handleDelete }) {  
    return (
          <Card>
            <div className="num-display">{beer.rating}</div>
            <button onClick={() => handleDelete(beer.id)} className="close">
            <FaTimes color="gray" />
            </button>
            <div className="text-display">{beer.text}</div>    
          </Card>  
          );
        }
        
        ReviewBeer.propTypes = {
          item: PropTypes.object.isRequired
        };
  
    export default ReviewBeer;