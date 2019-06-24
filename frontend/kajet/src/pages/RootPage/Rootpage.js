import React, {useState, useEffect} from 'react';
import {Route, Redirect } from 'react-router-dom'
import {checkIfUserIsLoggedIn} from "../../security/auth/Auth";

import Mainpage from "./Mainpage/Mainpage";
import Joinuppage from "./JoinupPage/Joinuppage";
import Loginpage from "./LoginPage/Loginpage";

import Loader from 'react-loader-spinner'
import Footer from "../../components/Footer/Footer";

import Switch from 'react-router-transition-switch';
import Fader from 'react-fader';

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
        <>
            <Switch component={Fader}>
                <Redirect exact from='/rp' to={`/rp/main`}/>

                <Route path={`/rp/main`} component={Mainpage} />

                <Route path={`/rp/joinup`} component={Joinuppage} />

                <Route path={`/rp/login`} component={Loginpage} />
            </Switch>

            <Footer />
        </>);
};

export default Rootpage;
