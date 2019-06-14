import React, { memo} from 'react';
import {Link} from "react-router-dom";

import "./collectioncardforgroupspage.scss"

const CollectionCard = props => {
    return (
        <div className="collection-card-for-groups-page">
            <div className="card-left-wrapper">
                <div className="title-wrapper">
                    <Link to={`/app/collection/${props.collection.id}`} className="collection-card-for-groups-page__title">
                        {props.collection.title}
                    </Link>
                    <span>tytuł</span>
                </div>

                <div className="terms-amount-wrapper">
                    <p className="collection-card-for-groups-page__terms-amount">{props.collection.cards.length} określeń</p>
                    <span>ilość kartek w kolekcji</span>
                </div>
            </div>

            <div className="side-nav-wrapper">
            </div>
        </div>
    );
};

export default memo(CollectionCard);
