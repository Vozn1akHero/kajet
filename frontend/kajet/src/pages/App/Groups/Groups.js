import React, {Component, Fragment} from 'react';
import GroupCard from "../../../components/GroupCard/GroupCard";
import CollectionCardForGroupsPage from '../../../components/CollectionCardForGroupsPage/CollectionCardForGroupsPage'

import "./groups-page.scss"
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {getGroups, removeGroupById} from "../../../actions/groupActions";
import LoaderForSection from "../../../components/LoaderForSection/LoaderForSection";

class Groups extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedGroup: null
        }
    }

    componentWillMount() {
        if(this.props.groups.length === 0) {
            this.props.getGroups();
        }
        this.setState({
            selectedGroup: this.props.groups[0]
        })
    }

    selectGroup = (id, e) => {
        const selectedGroup = this.props.groups.filter(group => group.id === id)[0];
        this.setState({
            selectedGroup: selectedGroup
        })
    };

    removeGroup = async (id, e) => {
        await this.props.removeGroupById(id);
    };

    render() {
        if(this.props.groups){
            if(this.props.groups.length === 0){
                return (
                    <div className="groups-page">
                        <div className="new-group-btn-wrapper">
                            <Link className="new-group-btn" to={'/app/newgroup'}>
                                Stwórz grupę
                            </Link>
                        </div>

                        <section>
                            tu jest pusto:(
                        </section>
                    </div>
                );
            }

            else {
                return (
                    <div className="groups-page">
                        <div className="new-group-btn-wrapper">
                            <Link className="new-group-btn" to={'/app/newgroup'}>
                                Stwórz grupę
                            </Link>
                        </div>

                        <section className="group-cards">
                            {
                                this.props.groups.map(group =>
                                    <div className="groupCardWrapper" style={{ background: typeof this.state.selectedGroup !== "undefined" &&
                                        group.id === this.state.selectedGroup.id ?
                                        '#f0f8ff' : 'f8f8f8'}}>
                                        <GroupCard
                                            key={group.id}
                                            id={group.id}
                                            title={group.title}
                                            collectionAmount={group.collections.length}
                                            selectGroup={this.selectGroup.bind(this)}
                                            removeGroup={this.removeGroup.bind(this)}
                                        />
                                    </div>)
                            }
                        </section>

                        <section className="chosen-group">
                            <hr/>
                            {
                                this.state.selectedGroup && typeof this.state.selectedGroup.collections !== 'undefined' ?
                                    this.state.selectedGroup.collections.map(collection =>
                                        <CollectionCardForGroupsPage
                                            collection={collection} />) :
                                    <span className="choose-group-text">Wybierz jakąś grupę</span>
                            }
                        </section>
                    </div>
                );
            }
        }
        else if(!this.state.groups){
            return <LoaderForSection />
        }
    }
}


const mapStateToProps = state => ({
    groups: state.group.groups
});


export default connect(
    mapStateToProps,
    { getGroups, removeGroupById }
)(Groups);
