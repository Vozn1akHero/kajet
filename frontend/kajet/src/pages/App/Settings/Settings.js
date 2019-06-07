import React, {Component} from 'react';

import "./settings-page.scss"

import apolloFetch from "../../../cfg/apollo-fetch"
import { logOut } from "../../../security/auth/Auth"
import MainButton from "../../../components/MainButton/MainButton";


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

    componentWillMount() {
        apolloFetch({
            query :  `
              mutation{
                  getUserNameAndEmail{
                    name
                    email
                  }
              }
        `
        }).then(res => {
                const {name, email} = res.data.getUserNameAndEmail;
                this.setState({
                    name: name,
                    email: email
                });
            }
        );
    }

    changeUserName = async e => {
        e.preventDefault();

        await apolloFetch({
            query :  `
              mutation{
                  changeUserName(newName: "${this.state.name}")
              }
        `
        }).then(res => res.data);

        this.forceUpdate();
    };

    changeUserEmail = async e => {
        e.preventDefault();

        await apolloFetch({
            query :  `
              mutation{
                  changeUserEmail(newEmail: "${this.state.email}")
              }
        `
        }).then(res => res.data);

        this.forceUpdate();
    };

    changeUserPassword = async e => {
        e.preventDefault();

        const res = await apolloFetch({
            query :  `
              mutation{
                  changeUserPassword(oldPassword: "${this.state.oldPassword}",
                   newPassword: "${this.state.newPassword}")
              }
        `
        }).then(res => res.data.changeUserPassword);

        if(res) {
            logOut();
        }
        else alert("Stare hasło nie jest prawidłowe");
    };

    render() {
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

export default Settings;
