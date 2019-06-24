import React, {Fragment} from 'react';
import './App.css';

import {Switch, BrowserRouter, Route, Redirect} from "react-router-dom";

import Navigation from "./pages/App/Navigation/Navigation";
import Rootpage from "./pages/RootPage/Rootpage";

import { Provider } from 'react-redux';
import store from './redux/store';
import PageNotFound from "./pages/PageNotFound/PageNotFound";

import { Scrollbars } from 'react-custom-scrollbars';

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
                            <Scrollbars style={{ width: '100vw', height: '100vh' }}
                                        autoHide
                                        autoHideTimeout={500}>
                                <Switch>
                                    <Redirect exact path="/" to="/rp" />

                                    <Route path="/rp" component={Rootpage} />

                                    <Route
                                        path="/app"
                                        component={Navigation} />

                                    <Route path="*" component={PageNotFound}/>

                                </Switch>
                            </Scrollbars>
                        </Fragment>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
}

export default App;
