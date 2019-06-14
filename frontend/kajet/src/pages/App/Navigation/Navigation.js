import React, {Component, Fragment} from 'react';
import {Link, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { checkIfUserIsLoggedIn, logOut } from "../../../security/auth/Auth";

import Collections from "../Collections/Collections";
import Groups from "../Groups/Groups";
import Settings from "../Settings/Settings";

import SideNavbar from "../../../components/SideNavbar/SideNavbar";
import NewCollection from "../NewCollection/NewCollection";

import Loader from 'react-loader-spinner'

import "./navigation.scss"
import Collection from "../Collection/Collection";
import NewGroup from "../NewGroup/NewGroup";

class Navigation extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: true
        };
    }

    componentWillMount() {
        this.onRouteChanged();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    async onRouteChanged() {
        const res = await checkIfUserIsLoggedIn();
        if(res) this.setState({
            loading: false
        });
        else this.props.history.push('/rp/login');
    }

    userLogOut = () => {
        logOut();
        this.props.history.push('/rp/login');
    };

    render() {
        if(this.state.loading){
            return (<div style={{background: '#3a3a3a', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Loader
                    type="Grid"
                    color="#FFF"
                    height="70"
                    width="70"
                /></div>)
        }

        return (
            <>
                <>
                    {
                        window.location.pathname === '/app/newcollection' ?
                            <Link to={`/app/newcollection`} style={{display: 'none'
                            }} className="create-new-set-btn">
                                <span>&#43;</span>
                            </Link> :
                            <Link to={`/app/newcollection`} className="create-new-set-btn">
                                <span>&#43;</span>
                            </Link>
                    }
                </>

                <div className="navigation-page">


                    <SideNavbar logout={this.userLogOut}/>

                    <section className="chosen-subpage">
                        <Fragment>
                            <Switch>
                                <Redirect exact from='/app' to="/app/collections" />

                                {/*<Route exact path={`/app/home`} component={Home} />*/}
                                <Route exact path={`/app/collections`} component={Collections} />
                                <Route exact path={`/app/collection/:id`} component={Collection} />

                                <Route exact path={`/app/groups`} component={Groups} />
                                <Route exact path={`/app/newgroup`} component={NewGroup} />

                                <Route exact path={`/app/settings`} component={Settings} />

                                <Route exact path={`/app/newcollection`} component={NewCollection} />
                            </Switch>
                        </Fragment>
                    </section>
                </div>
            </>
        );
    }
}

export default Navigation;
