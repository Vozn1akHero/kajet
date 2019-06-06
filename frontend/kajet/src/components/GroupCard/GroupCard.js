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
            <button className="select-group-btn"
                    onClick={selectGroup}></button>

            <div className="card-left-wrapper">
                <div className="title-wrapper">
                    <p className="group-card__title">
                        {props.title}
                    </p>
                    <span>tytuł</span>
                </div>

                <div className="terms-amount-wrapper">
                    <p className="group-card__terms-amount">{props.collectionAmount} określeń</p>
                    <span>ilość znajdujących się w środku kolekcji w kolekcji</span>
                </div>
            </div>

            <div className="side-nav-wrapper" style={{background: props.isGroupSelected
                    ? '#00baff' : 'linear-gradient(95deg, #fff000 0%, #ffda8e 100%)' }}
            >
                <div className="group-card__controls">
                    <button onClick={removeGroup}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                            <use xlinkHref={`${svg}#icon-bin2`} />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupCard;
