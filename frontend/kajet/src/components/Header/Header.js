import React, {Fragment, memo} from 'react';
import { Link } from "react-router-dom";

import "./header.scss"

const Header = (props) => {
    const { showBtnOption } = props;

    return (
        <Fragment>
            <header className="header">
                <div className="header__logo">
                    <Link to="/rp/main">
                        <img src={require('../../images/logo.png')} alt=""/>
                    </Link>
                </div>

                <div className="header__auth-panel">
                    {showBtnOption === "login" ? <Link to="/rp/login">
                        <button className="btn">Zaloguj</button>
                    </Link> : <Link to="/rp/joinup">
                        <button className="btn">Dołącz</button>
                    </Link> }
                </div>
            </header>
        </Fragment>
    );
};

export default memo(Header);
