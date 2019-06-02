import React, { Component } from 'react';

import './collection-card-for-group-creation.scss'

class CollectionCardForGroupCreation extends Component{
    constructor(props) {
        super(props);
        this.state = {
            chosen: false
        }
    }

    selectCard = e => {
        e.preventDefault();
        this.setState({
            chosen: true
        });
        this.props.selectCard(this.props.id, e);
    };

    unselectCard = e => {
        e.preventDefault();
        this.setState({
            chosen: false
        });
        this.props.unselectCard(this.props.id, e);
    };

    render(){
        return (
            <>
                <li className="collection-card-ng"
                    style={{ background: this.state.chosen ? '#f0f8ff' : 'f8f8f8' }}>
                    <h1 className="collection-card-ng__title">
                        {this.props.title}
                    </h1>
                    <p className="collection-card-ng__terms-amount">
                        {this.props.cardsLength} określeń
                    </p>
                    <button className="choose-collection-btn"
                            onClick={this.state.chosen ? this.unselectCard : this.selectCard}>&#x2713;</button>
                </li>
            </>
        );
    }
}

export default CollectionCardForGroupCreation;
