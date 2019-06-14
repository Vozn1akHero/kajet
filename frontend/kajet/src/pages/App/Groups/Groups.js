import React, {Component} from 'react';
import GroupCard from "../../../components/GroupCard/GroupCard";
import CollectionCardForGroupsPage from '../../../components/CollectionCardForGroupsPage/CollectionCardForGroupsPage'


import {connect} from "react-redux";
import {getGroups, removeGroupById} from "../../../redux/actions/groupActions";

import LoaderForSection from "../../../components/LoaderForSection/LoaderForSection";


import "./groups-page.scss"
import AddWrapperForGroupsPage from "../../../components/AddWrapperForGroupsPage/AddWrapperForGroupsPage";
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

        this.setState({
            leftSideWrapperHeight: document.getElementsByClassName('wrapper1')[0].clientHeight
        })
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

                    <AddWrapperForGroupsPage
                        height={this.state.leftSideWrapperHeight}
                        groupsCount={this.state.allGroups.length}
                    />
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
