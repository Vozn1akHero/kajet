import React, {Component} from 'react';
import {connect} from "react-redux";
import CollectionCardForGroupCreation from "../../../components/CollectionCardForGroupCreation/CollectionCardForGroupCreation";

import {getCollections} from "../../../actions/collectionActions";
import {addGroup} from "../../../actions/groupActions";

import "./newgroup-page.scss"
import svg from "../../../images/sprite.svg";

class NewGroup extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: "",
            allCollections: [],
            foundCollections: [],
            chosenCollections: []
        };
    }

    async componentWillMount() {
        if(this.props.collections.length === 0){
          await this.props.getCollections();
        }

        this.setState({
            allCollections: this.props.collections,
            foundCollections: this.props.collections
        })
    }

    setGroupTitle = e => {
        this.setState({
            title: e.target.value
        })
    };

    lookForCollections = e => {
        const value = e.target.value;
        const foundCollections = this.state.allCollections
            .filter(collection => collection.title.substring(0, value.length) === value);
        this.setState({
            foundCollections: foundCollections
        })
    };

    createGroup = async e => {
        e.preventDefault();

        await this.props.addGroup(this.state.title, this.state.chosenCollections);
    };

    selectCard = (id, e) => {
        e.preventDefault();

        this.setState({
            chosenCollections: [id, ...this.state.chosenCollections]
        });
    };

    unselectCard = (id, e) => {
        e.preventDefault();
        const collectionsLeft = this.state.chosenCollections.filter(value => value !== id);
        this.setState({
            chosenCollections: collectionsLeft
        })
    };

    render() {
        return (
            <div className="new-group-page">
                <form>
                    <input type="text"
                           className="group-title-input"
                           onChange={this.setGroupTitle}
                           placeholder="Nazwa grupy"/>

                    <section className="all-collections">
                        <div className="collections-search-input-wrapper">
                            <input type="text"
                                   className="collections-search-input"
                                   placeholder="Szukaj"
                                   onChange={this.lookForCollections}/>

                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className="collections-search-input__icon">
                                <use xlinkHref={`${svg}#icon-search`} />
                            </svg>
                        </div>


                        <section className="found-collections-wrapper"
                        style={{justifyContent: this.state.foundCollections.length === 0 ? 'center' : 'normal',
                            alignItems: this.state.foundCollections.length === 0 ? 'center' : 'normal'}}>
                            {
                                this.state.foundCollections.length === 0 ?
                                    <span>nic nie znaleziono</span> :
                                this.state.foundCollections.map(value =>
                                    <CollectionCardForGroupCreation key={value.id}
                                                                    id={value.id}
                                                                    title={value.title}
                                                                    cardsLength={value.cards.length}
                                                                    selectCard={this.selectCard.bind(this)}
                                                                    unselectCard={this.unselectCard.bind(this)}
                                    />)
                            }
                        </section>
                    </section>

                    <button type="submit"
                            className="add-new-group-btn"
                            onClick={this.createGroup}>Stwórz</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    collections: state.collection.collections
});


export default connect(
    mapStateToProps,
    { getCollections, addGroup }
)(NewGroup);
