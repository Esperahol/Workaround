import { useState } from 'react';
import ProductReviewList from './components/ProductReviewList';

function App() {  
    const [review, setReview] = useState(ProductData);
    const deleteFeedback = id => {
            if (window.confirm('Are you sure you want to delete?')) {
                      setReview(review.filter(item => item.id !== id));    
            }};
}


//incomplete - not sure if can stand alone or will need help via App.js
//saving idea for later focus or review