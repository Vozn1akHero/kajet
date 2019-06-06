import React, {Fragment} from 'react';
import './App.css';

import {Switch, BrowserRouter, Route, Redirect} from "react-router-dom";

import Navigation from "./pages/App/Navigation/Navigation";
import Rootpage from "./pages/RootPage/Rootpage";

import { checkIfUserIsLoggedIn } from "./security/auth/Auth";

import { Provider } from 'react-redux';
import store from './redux/store';
import PageNotFound from "./pages/PageNotFound/PageNotFound";

class App extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <BrowserRouter>
                        <Fragment>
                            <Switch>
                                <Redirect exact path="/" to="/rp" />

                                <Route path="/rp" component={Rootpage} />

                                <Route
                                    path="/app"
                                    component={Navigation} />

                                <Route path="*" component={PageNotFound}/>

                            </Switch>
                        </Fragment>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
}

export default App;
