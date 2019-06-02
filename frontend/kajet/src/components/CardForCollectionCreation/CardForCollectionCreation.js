import React, { Component } from 'react';
import './card-for-collection-creation.scss'

class CardForCollectionCreation extends Component{
    setCardTitle = e => {
        this.setState({ title: e.target.value});
    };

    setCardDescription = e => {
        this.setState({ description: e.target.value});
    };

    render(){
        return (
            <>
                <li className="new-card">
                    <input type="text" className="new-card__title" onChange={this.setCardTitle} placeholder="Tytuł"/>
                    <input type="text" className="new-card__description" onChange={this.setCardDescription} placeholder="Opis"/>
                </li>
            </>
        );
    }
}

export default CardForCollectionCreation;
