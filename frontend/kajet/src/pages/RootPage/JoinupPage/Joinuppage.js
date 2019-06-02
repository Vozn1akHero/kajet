import React, {Component, Fragment} from 'react';
import Header from "../../../components/Header/Header";
import {Link} from "react-router-dom";
import Popup from "reactjs-popup";
import { InputIncorrectness } from "../../../components/InputIncorrectness/InputIncorrectness";

import {joinUp, checkEmail, checkIfUserIsLoggedIn} from "../../../security/auth/Auth";

import CustomPopup from '../../../components/CustomPopup/CustomPopup'


import "./joinup-page.scss"

class Joinuppage extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            popUpRegSuccessOpen: false,
            emailStatus: true
        }
    }

    userJoiningUp = e => {
        e.preventDefault();

        const res = joinUp(this.state);

        if(res) this.setState({
            popUpRegSuccessOpen: true
        });
    };

    emailInsertionChecking = async e => {
        this.setState({email: e.target.value});

        const res = await checkEmail(this.state.email);

        if(res) this.setState({ emailStatus: true });
        else this.setState({ emailStatus: false });
    };

    closeRegSuccessPopUp = () => {
        this.setState({
            popUpRegSuccessOpen: false
        });
    };

    render() {
        return (
            <div className="joinup-page">
                <CustomPopup
                    open={this.state.popUpRegSuccessOpen}
                    closePopup={this.closeRegSuccessPopUp}
                    text="Zostałeś pomyślnie zarejestrowany" />

                <Header showBtnOption="login" />

                <section className="joinup-sec">
                    <form className="joinup-sec__form" onSubmit={this.userJoiningUp}>
                        <input type="text" className="joinup-sec__name"
                               onChange={e => this.setState({name: e.target.value})}
                               placeholder="Twoje imię"/>

                        <input type="email" className="joinup-sec__email"
                               onChange={this.emailInsertionChecking}
                               placeholder="Twój email"/>
                        {!this.state.emailStatus ? <span>Ten email jest zajęty przez innego użytkownika</span> : null}

                        <input type="password" className="joinup-sec__pass"
                               onChange={e => this.setState({password: e.target.value})}
                               placeholder="Twoje hasło"/>

                        <button disabled={!this.state.emailStatus} style={!this.state.emailStatus ? {background: 'grey'} : null} type="submit" className="joinup-sec__joinup-btn">Zarejestruj się</button>
                    </form>
                </section>
            </div>
        );
    }
}

export default Joinuppage;
