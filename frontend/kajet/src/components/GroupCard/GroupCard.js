import React, {Component, useState} from 'react';
import {Link} from "react-router-dom";

import svg from "../../images/sprite.svg";

import "./groupcard.scss"

const GroupCard = props => {
    const [chosen, setChosen] = useState(false);

    const selectGroup = e => {
        e.preventDefault();

        setChosen(true);

        props.selectGroup(props.id, e);
    };

    const removeGroup = e => {
        e.preventDefault();

        props.removeGroup(props.id);
    };

    return (
        <div className="group-card">
            <button className="choose-collection-btn"
                    onClick={selectGroup}></button>
            <p className="group-card__title">
                {props.title}
            </p>
            <span className="group-card__terms-amount">{props.collectionAmount} kolekcji</span>
            <div className="group-card__controls">
                <button onClick={removeGroup}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        className="group-card__controls__icon"
                    >
                        <use xlinkHref={`${svg}#icon-bin2`} />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default GroupCard;
