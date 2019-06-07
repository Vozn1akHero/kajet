import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import './mainpage.scss'

import Header from "../../../components/Header/Header";
import MainButton from "../../../components/MainButton/MainButton";

class Mainpage extends Component {
    render() {
        return (
            <div className="mainpage">
                <Header showBtnOption="login" />
                <section className="main-panel">
                    <div className="main-panel__part--1">
                        <h1>
                            <span>Ucz się</span> nowych rzeczy z kartek
                        </h1>
                    </div>
                    <div className="main-panel__part--2">
                        <p>Genialne rozwiązane, które wspomoże Cię w zapamiętywaniu nawet
                            najtrudniejszych rzeczy.</p>
                    </div>
                    <div className="main-panel__part--3">
                        <Link to={'/rp/joinup'}>
                            <MainButton
                                styles={{
                                    height: '7rem',
                                    width: '19rem',
                                    marginTop: '3rem'
                                }}
                                title="Dołącz"
                            />
                        </Link>
                    </div>
                </section>
            </div>
        );
    }
}

export default Mainpage;
