import React, {Component, Fragment} from 'react';
import GroupCard from "../../../components/GroupCard/GroupCard";
import CollectionCardForGroupsPage from '../../../components/CollectionCardForGroupsPage/CollectionCardForGroupsPage'
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {getGroups, removeGroupById} from "../../../redux/actions/groupActions";

import LoaderForSection from "../../../components/LoaderForSection/LoaderForSection";

import svg from "../../../images/sprite.svg";


import "./groups-page.scss"
class Groups extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedGroup: null,
            allGroups: [],
            foundGroups: []
        }
    }

    async componentWillMount() {
        await this.updateGroupList();
    }

    updateGroupList = async () => {
        await this.props.getGroups();
        this.setState({
            allGroups: this.props.groups
        })
    };

    selectGroup = id => {
        const selectedGroup = this.state.allGroups.filter(group => group.id === id)[0];
        this.setState({
            selectedGroup: selectedGroup
        })
    };

    removeGroup = async id => {
        await this.props.removeGroupById(id);

        await this.updateGroupList();
    };

    render() {
        if (this.props.pending) return <LoaderForSection/>;

        else {
            return (
                <div className="groups-page">
                    <div className="wrapper1">
                        <section className="groups-cards-wrapper">
                                <section className="group-cards">
                                    {
                                        this.state.allGroups.map(group =>
                                                <GroupCard
                                                    key={group.id}
                                                    id={group.id}
                                                    title={group.title}
                                                    collectionAmount={group.collections.length}
                                                    isGroupSelected={this.state.selectedGroup !== null &&
                                                    group.id === this.state.selectedGroup.id}
                                                    selectGroup={this.selectGroup.bind(this)}
                                                    removeGroup={this.removeGroup.bind(this)}
                                                />)
                                    }
                                </section>

                                <hr/>

                                <section className="chosen-group">
                                    {
                                        this.state.selectedGroup !== null ?
                                            this.state.selectedGroup.collections.map(collection =>
                                                <CollectionCardForGroupsPage
                                                    collection={collection}/>) :
                                            <span className="choose-group-text">Wybierz grupę</span>
                                    }
                                </section>
                        </section>
                    </div>

                    <div className="wrapper2">
                        <section className="add-info">
                            <Link className="new-group-btn" to={'/app/newgroup'}>
                                +
                            </Link>


                            <div className="groups-amount-info">
                                <div className="groups-amount-info__text">
                                    <span>Masz już</span>
                                    <span>
                                        {this.state.allGroups.length}
                                    </span>
                                    <span>grupy</span>
                                </div>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    className="col-amount-info__icon"
                                >
                                    <use xlinkHref={`${svg}#icon-sort-amount-asc`} />
                                </svg>
                            </div>

                        </section>
                    </div>
                </div>
            );
        }
    }

}


const mapStateToProps = state => ({
    pending: state.group.pending,
    groups: state.group.groups
});


export default connect(
    mapStateToProps,
    {getGroups, removeGroupById}
)(Groups);
