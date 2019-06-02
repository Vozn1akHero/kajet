import React, { Component, useState } from 'react';

import svg from "../../images/sprite.svg";
import "./card.scss"
import EditCardPopup from "../EditCardPopup/EditCardPopup";

class CollectionCard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            cardEditingOn: false
        }
    }

    turnOnOffEditing = () => {
      this.setState(prevState => ({
          cardEditingOn: !prevState.cardEditingOn
      }))
    };

    changeCardData = data => {
      this.props.changeCardData(data);
    };


    render() {
        return (
            <div className="card">
                <EditCardPopup
                    open={this.state.cardEditingOn}
                    modifyStatus={this.turnOnOffEditing}
                    changeCardData={this.changeCardData}
                    {...this.props}/>

                <div className="card__title">
                    <h1>
                        {this.props.title}
                    </h1>
                </div>
                <div className="card__desc">
                    <p>
                        {this.props.description}
                    </p>
                </div>

                <section className="card__controls">
                    <button
                        className="card__editing-btn"
                        onClick={this.turnOnOffEditing}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className="icon"
                        >
                            <use xlinkHref={`${svg}#icon-pencil`}/>
                        </svg>
                    </button>
                </section>

            </div>
        );
    }
}

export default CollectionCard
