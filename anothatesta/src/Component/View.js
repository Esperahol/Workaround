import React, {useEffect, useState} from 'react';
import RatingDisplay from './RatingDisplay'
import axios from 'axios';

export default function Read() {

    const [ratings, getRatings] = useState('');

    const url = 'http://localhost:8081/';
    
    useEffect(() => {
        getAllNotes();
    }, []);

    const getAllRatings = () => {
        axios.get(`${url}ratings`)
        .then((response) => {
            const allRatings = response.data.ratings.allRatings;
            getRatings(allRatings);
        })
        .catch(error => console.error(`Error: ${error}`));
    }
        return(
            <RatingDisplay ratings={ratings}/>
        )
}