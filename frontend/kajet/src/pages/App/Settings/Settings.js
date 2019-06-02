import React, {Component} from 'react';

import "./settings-page.scss"

import apolloFetch from "../../../cfg/apollo-fetch"
import { logOut } from "../../../security/auth/Auth"


class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            oldPass: "",
            newPass: ""
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
                <section className="remove-acc">
                    <button>Usuń konto</button>
                </section>

                <section className="name-change">
                    <form onSubmit={this.changeUserName}>
                        <input type="text"
                               value={this.state.name}
                               onChange={e => this.setState({name: e.target.value})}/>
                        <button>Zmień imię</button>
                    </form>
                    
                </section>
                <section className="email-change">
                    <form onSubmit={this.changeUserEmail}>
                        <input type="email"
                               value={this.state.email}
                               onChange={e => this.setState({email: e.target.value})}/>
                        <button>Zmień email</button>
                    </form>
                    
                </section>
                <section className="password-change">
                    <form  onSubmit={this.changeUserPassword}>
                        <input type="password"
                               className="old-pass"
                               placeholder="Stare hasło"
                               onChange={e => this.setState({oldPassword: e.target.value})}/>
                        <input type="password"
                               className="new-pass"
                               placeholder="Nowe hasło"
                               onChange={e => this.setState({newPassword: e.target.value})}/>
                        <button>Zmień hasło</button>
                    </form>

                </section>
            </div>
        );
    }
}

export default Settings;
