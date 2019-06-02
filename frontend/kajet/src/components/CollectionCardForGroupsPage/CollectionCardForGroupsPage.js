import React, {Component, memo} from 'react';
import {Link} from "react-router-dom";

import svg from "../../images/sprite.svg";

import "./collectioncardforgroupspage.scss"

const CollectionCard = props => {
    return (
        <div className="collection-card-for-groups-page">
            <Link to={`/app/collection/${props.collection.id}`} className="collection-card-for-groups-page__title">
                {props.collection.title}
            </Link>
            <span className="collection-card-for-groups-page__terms-amount">{props.collection.cards.length} określeń</span>
        </div>
    );
};

export default memo(CollectionCard);
