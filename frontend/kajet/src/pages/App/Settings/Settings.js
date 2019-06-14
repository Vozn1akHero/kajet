import React, {Component} from 'react';

import "./settings-page.scss"

import MainButton from "../../../components/MainButton/MainButton";
import {connect} from "react-redux";

import {getUserData,
    changeUserName,
    changeUserEmail} from "../../../redux/actions/userActions";

import { changeUserPassword } from './additional-functions/changeUserPassword'

import LoaderForSection from "../../../components/LoaderForSection/LoaderForSection";


class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            oldPass: "",
            newPass: "",
            onSuccessPassChange: false
        }
    }

    async componentWillMount() {
        await this.updateUserData();
    }

    updateUserData = async () => {
        await this.props.getUserData();

        this.setState({
            name: this.props.userData.name,
            email: this.props.userData.email
        });
    };

    changeUserName = e => {
        e.preventDefault();

        this.props.changeUserName(this.state.name);
    };

    changeUserEmail = e => {
        e.preventDefault();

        this.props.changeUserEmail(this.state.email);
    };

    changeUserPassword = e => {
        e.preventDefault();

        changeUserPassword(this.state.oldPass, this.state.newPass)
    };

    render() {
        if (this.props.pending) return <LoaderForSection/>;

        return (
            <div className="settings-page">
                <div className="l-wrapper">
                    <section className="name-change">
                        <form onSubmit={this.changeUserName}>
                            <input type="text"
                                   value={this.state.name}
                                   onChange={e => this.setState({name: e.target.value})}
                                   required/>

                            <MainButton
                                styles={{
                                    marginLeft: '3rem'
                                }}
                                title="Zmień imię" />
                        </form>

                    </section>
                    <section className="email-change">
                        <form onSubmit={this.changeUserEmail}>
                            <input type="email"
                                   value={this.state.email}
                                   onChange={e => this.setState({email: e.target.value})}
                                   required/>

                            <MainButton
                                styles={{
                                    marginLeft: '3rem'
                                }}
                                title="Zmień email" />
                        </form>

                    </section>
                    <section className="password-change">
                        <form  onSubmit={this.changeUserPassword}>
                            <input type="password"
                                   className="old-pass"
                                   placeholder="Stare hasło"
                                   onChange={e => this.setState({oldPassword: e.target.value})}
                                   required/>
                            <input type="password"
                                   className="new-pass"
                                   placeholder="Nowe hasło"
                                   onChange={e => this.setState({newPassword: e.target.value})}
                                   required/>

                            <MainButton
                                styles={{
                                    marginLeft: '3rem'
                                }}
                                title="Zmień hasło" />
                        </form>

                    </section>
                </div>

                <div className="r-wrapper">
                        <button>Usuń konto</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pending: state.user.pending,
    userData: state.user.userData
});


export default connect(
    mapStateToProps,
    {getUserData, changeUserName, changeUserEmail}
)(Settings);
