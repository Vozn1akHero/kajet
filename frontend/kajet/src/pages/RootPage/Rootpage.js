import React, {Component, Fragment, useState, useEffect} from 'react';
import {Switch, Route, Redirect } from 'react-router-dom'
import {checkIfUserIsLoggedIn} from "../../security/auth/Auth";

import Mainpage from "./Mainpage/Mainpage";
import Joinuppage from "./JoinupPage/Joinuppage";
import Loginpage from "./LoginPage/Loginpage";

import Loader from 'react-loader-spinner'

const Rootpage = props => {
    const [loading, setLoadingValue] = useState(true);

    useEffect(() => {(async() => {
            const res = await checkIfUserIsLoggedIn();
            if(res) props.history.push('/app/home');
            else setLoadingValue(false);
        })()
    }, []);

    if(loading){
        return(
            <div style={{background: '#3a3a3a', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Loader
                type="Grid"
                color="#FFF"
                height="70"
                width="70"
            /></div>)
    }

    return (
        <Fragment>
            <Switch>
                <Redirect exact from='/rp' to={`/rp/main`}/>

                <Route path={`/rp/main`} component={Mainpage} />

                <Route path={`/rp/joinup`} component={Joinuppage} />

                <Route path={`/rp/login`} component={Loginpage} />
            </Switch>
        </Fragment>);
};

export default Rootpage;
