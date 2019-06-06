import React, { Component } from 'react';

import './collection-card-for-group-creation.scss'
import {Link} from "react-router-dom";

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
                <div className="collection-card-ng">
                    <button className="choose-collection-btn"
                            onClick={this.state.chosen ? this.unselectCard : this.selectCard}>
                    </button>

                    <div className="card-left-wrapper">
                        <div className="title-wrapper">
                            <h1 className="collection-card-ng__title">
                                {this.props.title}
                            </h1>
                            <span>tytuł</span>
                        </div>

                        <div className="terms-amount-wrapper">
                            <p className="collection-card-ng__terms-amount">{this.props.cardsLength} określeń</p>
                            <span>ilość kartek w kolekcji</span>
                        </div>
                    </div>

                    <div className="side-nav-wrapper"
                         style={{ background: this.state.chosen ? '#f0f8ff' : 'f8f8f8' }}>
                    </div>
                </div>
            );
    }
}

export default CollectionCardForGroupCreation;
