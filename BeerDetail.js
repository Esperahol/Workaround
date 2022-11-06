import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from "reactstrap";

class BeerDetail extends Component{
    constructor(props) {
        super(props);

        console.log(props);
        
        this.state = {
            selectedBeerDetail: this.props.bsdetail
        };


    }

    renderBeer(beer) {

        if (beer != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={beer.image} alt={beer.name} />
                        <CardBody>
                            <CardTitle> {beer.name}</CardTitle>
                            <CardText> {beer.description} </CardText>
                        </CardBody>
                    </Card>
                </div>   
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    renderComments(comments){
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>

            </div>
        )
    }


    render(){
        const beer = this.props.beer

        console.log(beer);
        
        if (beer == null) {
            return (<div></div>);
        }

        const beerItem = this.renderBeer(beer);
        const beerComment = this.renderComments(beer.comments);

        return (
            <div className='row'>
                {beerItem}
                {beerComment}
            </div>
        )
    }

}

export default BeerDetail;