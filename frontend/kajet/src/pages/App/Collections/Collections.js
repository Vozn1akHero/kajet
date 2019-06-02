import React, {Component} from 'react';
import CollectionCard from "../../../components/CollectionCard/CollectionCard";

import { connect } from 'react-redux';
import { getCollections, removeCollectionById } from '../../../actions/collectionActions';

import LoaderForSection from "../../../components/LoaderForSection/LoaderForSection";

import "./collections-page.scss"

class Collections extends Component {
    componentDidMount() {
        if(this.props.collections.length === 0){
            this.props.getCollections();
        }
    }

    removeCollection = async id => {
        await this.props.removeCollectionById(id);
    };

    render() {
        if(this.props.collections) {
            return (
                <div className="collections-page">
                    {
                        this.props.collections.length === 0 ?
                            <span>nic nie znaleziono</span> :
                        this.props.collections.map(collection =>
                            <CollectionCard
                                key={collection.id}
                                collection={collection}
                                removeCollection={this.removeCollection}
                            />)
                    }
                </div>
            );
        }

        return (
            <LoaderForSection />
        )
    }
}


const mapStateToProps = state => ({
    collections: state.collection.collections
});


export default connect(
    mapStateToProps,
    { getCollections, removeCollectionById }
)(Collections);
