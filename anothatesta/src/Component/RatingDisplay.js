import React from 'react';

export default function RatingDisplay(props) {
    const {ratings} = props;

    if (ratings.length > 0) {
        return (
            ratings.map((rating, index) =>{
                console.log(rating);
                return(
                    <div className='rating' key={rating._id}>
                        <h3 className="rating_title">{rating.title}</h3>
                        <p className="rating_body">{rating.content}</p>
                        <span className="rating_fadeout"></span>
                    </div>
                )
            })
        )
    } else {
        return (<h3>No ratings found.</h3>)
    }
    return(
        <>
        { RatingDisplay(props) }
        </>
    )
}