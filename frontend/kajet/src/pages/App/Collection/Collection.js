import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCollectionById,
    updateCollectionCardsById,
    updateCollectionTitleById} from "../../../actions/collectionActions";
import apolloFetch from "../../../cfg/apollo-fetch";


import "./collection-page.scss"

import LoaderForSection from "../../../components/LoaderForSection/LoaderForSection";
import Card from "../../../components/Card/Card";
import svg from "../../../images/sprite.svg";


class Collection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collectionId: this.props.match.params.id,
            titleEditing: false,
            newCollectionTitle: ""
        }
    }

    componentWillMount() {
        this.props.getCollectionById(this.state.collectionId);
    }

    changeCardData = async data => {
        const newCardData = await apolloFetch({
            query :  `
              mutation{
                  updateCard(id: "${data.id}", newTitle: "${data.newTitle}", newDescription: "${data.newDescription}"){
                    id
                    title
                    description
                  }
                }
            `
        }).then(res => res.data.updateCard);


        this.props.updateCollectionCardsById({
            id: newCardData.id,
            newTitle: newCardData.title,
            newDescription: newCardData.description
        });
    };

    turnOnOffEditing = () => {
        this.setState(prevState => ({
            titleEditing: !prevState.titleEditing
        }));
    };

    changeCollectionTitle = async e => {
        e.preventDefault();

        const newCollectionTitle = await apolloFetch({
            query :  `
              mutation{
                  changeCollectionTitle(id: "${this.state.collectionId}", newTitle: "${this.state.newCollectionTitle}"){
                    title
                  }
                }
            `
        }).then(res => res.data.changeCollectionTitle.title);

        this.props.updateCollectionTitleById({
            id: this.state.collectionId,
            newTitle: newCollectionTitle
        });

        this.turnOnOffEditing();
    };

    render() {
        if(this.props.collection
            && typeof this.props.collection.cards !== 'undefined') {
            return (
                <div className="collection-page">
                    <section className="collection-page__header">
                        <div hidden={!this.state.titleEditing} className="collection-title-editing">
                            <div className="collection-title-editing__wrapper">
                                <form onSubmit={this.changeCollectionTitle}>
                                    <input type="text"
                                           onChange={e => { this.setState({ newCollectionTitle: e.target.value })}}
                                           className="change-title-input"
                                    />

                                    <button type="submit"
                                    className="change-title-btn">Zapisz</button>
                                </form>
                                <button onClick={this.turnOnOffEditing}
                                        className="cancel-change-title-btn">Cancel</button>
                            </div>
                        </div>

                        <div className="collection-title"
                            hidden={this.state.titleEditing}>
                            <div className="collection-title__wrapper">
                                <h2>
                                    { this.props.collection.title }
                                </h2>

                                <span className="collection-termamount">
                                    {this.props.collection.cards.length} pojęć
                                </span>
                            </div>


                            <button className="collection__editing-btn"
                                onClick={this.turnOnOffEditing}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    className="collection__editing-btn__icon"
                                >
                                    <use xlinkHref={`${svg}#icon-pencil2`} />
                                </svg>
                            </button>
                        </div>
                    </section>

                    <section className="cards">
                        {
                                this.props.collection.cards.map(card => {
                                    return <Card
                                        key={card.id}
                                        id={card.id}
                                        changeCardData={this.changeCardData}
                                        title={card.title}
                                        description={card.description} />
                                })
                        }
                    </section>
                </div>
            );
        }

        return (
            <LoaderForSection />
        )
    }
}


const mapStateToProps = state => ({
    collection: state.collection.collection
});


export default connect(
    mapStateToProps,
    { getCollectionById,
        updateCollectionCardsById,
        updateCollectionTitleById
    }
)(Collection);
