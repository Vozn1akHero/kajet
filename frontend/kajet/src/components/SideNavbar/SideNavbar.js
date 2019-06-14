import React, {memo} from 'react';
import {Link} from "react-router-dom";
import svg from "../../images/sprite.svg";

import "./sidenavbar.scss"

const SideNavbar = props => {
        return (
                <nav className="navigation">
                    <div className="navigation__logo">
                        <img src={require('../../images/logo.png')} alt=""/>
                    </div>

                    <section className="navigation__controls">
                        <div className="navigation__controls__row--1">


                            <Link to="/app/collections">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                className="navigation__controls__icon"
                            >
                                <use xlinkHref={`${svg}#icon-make-group`} />
                            </svg>
                            </Link>
                            <Link to="/app/groups">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    className="navigation__controls__icon"
                                >
                                    <use xlinkHref={`${svg}#icon-folder`} />
                                </svg>
                            </Link>
                        </div>
                        <div className="navigation__controls__row--2">
                            <Link to="/app/settings">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    className="navigation__controls__icon"
                                >
                                    <use xlinkHref={`${svg}#icon-cog`} />
                                </svg>
                            </Link>
                            <button onClick={props.logout}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    className="navigation__controls__icon"
                                >
                                    <use xlinkHref={`${svg}#icon-exit`} />
                                </svg>
                            </button>
                        </div>
                    </section>
                </nav>

        );
};

export default memo(SideNavbar);
