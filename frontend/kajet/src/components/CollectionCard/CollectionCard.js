import React, {Component, memo} from 'react';
import {Link} from "react-router-dom";

import svg from "../../images/sprite.svg";

import "./collectioncard.scss"

const CollectionCard = props => {
    const removeCollection = async e => {
        e.preventDefault();
        await props.removeCollection(props.collection.id);
    };

    return (
        <div className="collection-card">
            <div className="card-left-wrapper">
                <div className="title-wrapper">
                    <Link to={`/app/collection/${props.collection.id}`} className="collection-card__title">
                        {props.collection.title}
                    </Link>
                    <span>tytuł</span>
                </div>

                <div className="terms-amount-wrapper">
                    <p className="collection-card__terms-amount">{props.collection.cards.length} określeń</p>
                    <span>ilość kartek w kolekcji</span>
                </div>
            </div>

            <div className="side-nav-wrapper">
                <div className="add-date-wrapper">
                    <span>dodano</span>
                    <span>03.06.2019</span>
                </div>

                <div className="collection-card__controls">
                    <button onClick={removeCollection}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className="collection-card__controls__icon"
                        >
                            <use xlinkHref={`${svg}#icon-bin2`} />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(CollectionCard);
