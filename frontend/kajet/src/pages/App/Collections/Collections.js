import React, {Component} from 'react';
import CollectionCard from "../../../components/CollectionCard/CollectionCard";

import { connect } from 'react-redux';
import { getCollections, removeCollectionById } from '../../../redux/actions/collectionActions';

import LoaderForSection from "../../../components/LoaderForSection/LoaderForSection";

import "./collections-page.scss"
import svg from "../../../images/sprite.svg";
import SearchInputBottomBordered from "../../../components/SearchInputBottomBordered/SearchInputBottomBordered";

import {createSelector} from "reselect";

class Collections extends Component {
    constructor(props) {
        super(props);

        this.state = {
            foundCollections: [],
            allCollections: []
        }
    }

    async componentWillMount() {
        await this.updateCollectionList();
    }

    removeCollection = async id => {
        await this.props.removeCollectionById(id);

        await this.updateCollectionList();
    };

    updateCollectionList = async () => {
        await this.props.getCollections();
        this.setState({
            allCollections: this.props.collections,
            foundCollections: this.props.collections
        })
    };

    lookForCollections = title => {
        const foundCollections = this.props.collections
            .filter(collection => collection.title.substring(0, title.length) === title);
        this.setState({
            foundCollections: foundCollections
        })
    };

    render() {
        if(this.props.pending) return <LoaderForSection />;

        return (
            <div className="collections-page">
                <div className="wrapper1">
                    <section className="collections-page__searching">
                        <SearchInputBottomBordered onInputChange={(searchPhrase) => {
                            this.lookForCollections(searchPhrase)
                        }}
                                   styles={{width: '20rem'}}
                        />
                    </section>

                    <section className="collections-page__collections-list">
                        {
                                this.state.foundCollections.length !== 0 ?
                                this.state.foundCollections.map(collection =>
                                    <CollectionCard
                                        key={collection.id}
                                        collection={collection}
                                        removeCollection={this.removeCollection}
                                    />) : <div style={{marginTop: "-1rem"}}>
                                        <span>
                                            Nic nie znaleziono
                                        </span>
                                    </div>
                        }
                    </section>
                </div>

                <div className="wrapper2">
                    <section className="add-info">
                            <div className="col-amount-info">
                                <div className="col-amount-info__text">
                                    <span>Masz już</span>
                                    <span>
                                        {this.state.allCollections.length}
                                    </span>
                                    <span>kolekcje</span>
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


const mapStateToProps = state => ({
    collections: state.collection.collections,
    pending: state.collection.pending
});


export default connect(
    mapStateToProps,
    { getCollections, removeCollectionById }
)(Collections);
