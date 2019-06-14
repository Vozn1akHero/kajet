import React, {Component} from 'react';
import Header from "../../../components/Header/Header";

import {logIn} from "../../../security/auth/Auth";

import CustomPopup from '../../../components/CustomPopup/CustomPopup'


import "./login-page.scss"
import MainButton from "../../../components/MainButton/MainButton";


class Loginpage extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            logInDataIncorrectnessPopUp: false
        }
    }

    userAuth = async e => {
        e.preventDefault();

        const logInRes = await logIn(this.state);

        if(logInRes) this.props.history.push('/app/collections');
        else this.setState({
            logInDataIncorrectnessPopUp: true
        })
    };

    closeLogInDataIncorrectnessPopup = () => {
        this.setState({
            logInDataIncorrectnessPopUp: false
        });
    };

    render() {
        return (
            <div className="login-page">
                <CustomPopup
                    open={this.state.logInDataIncorrectnessPopUp}
                    closePopup={this.closeLogInDataIncorrectnessPopup}
                    text="Email lub hasło nie jest prawidłowe. Spróbuj ponownie" />

                <Header showBtnOption="joinup" />

                <section className="login-sec">
                    <form className="login-sec__form" onSubmit={this.userAuth}>
                        <input type="email" className="login-sec__login"
                               onChange={e => this.setState({email: e.target.value})}
                               placeholder="Twój email"
                               required/>
                        <input type="password" className="login-sec__pass"
                               onChange={e => this.setState({password: e.target.value})}
                               placeholder="Twoje hasło"
                               required/>

                           <MainButton
                                styles={{marginTop: "2rem"}}
                                title="Zaloguj"
                           />
{/*
                        <div className="pass-recovery">
                            <Link to="/">
                                <span>Kliknij tutaj</span>
                            </Link>
                            <p>jeżeli zapomniałeś hasła</p>
                        </div>*/}
                    </form>
                </section>
            </div>
        );
    }
}

export default Loginpage;
