import React, {Component} from 'react';
import {connect} from "react-redux";
import {getCollectionById,
    updateCollectionCardsById,
    updateCollectionTitleById} from "../../../redux/actions/collectionActions";
import apolloFetch from "../../../cfg/apollo-fetch";


import "./collection-page.scss"

import LoaderForSection from "../../../components/LoaderForSection/LoaderForSection";
import Card from "../../../components/Card/Card";
import svg from "../../../images/sprite.svg";
import InputBottomBordered from "../../../components/InputBottomBordered/InputBottomBordered";


class Collection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collectionId: this.props.match.params.id,
            titleEditing: false,
            newCollectionTitle: "",
            newCollectionTitleFormError: false
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

        if (this.state.newCollectionTitle.length === 0) {
            this.setState({
                newCollectionTitleFormError: true
            });

            return;
        }
        else this.setState({
            newCollectionTitleFormError: true
        });

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
                        <div className="collection-editing-btn">
                            <button onClick={this.turnOnOffEditing}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    className="collection__editing-btn__icon"
                                >
                                    <use xlinkHref={`${svg}#icon-pencil2`} />
                                </svg>
                            </button>
                        </div>

                        <div hidden={!this.state.titleEditing} className="collection-title-editing">
                            <div className="collection-title-editing__wrapper">
                                <form onSubmit={this.changeCollectionTitle}>
                                    <InputBottomBordered onInputChange={(newTitle) => { this.setState({
                                        newCollectionTitle: newTitle })}}
                                         styles={{width: '30rem'}}
                                         placeholder={"Wprowadż nową nazwę"}
                                    />

                                    <button type="submit"
                                    className="change-title-btn">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                        >
                                            <use xlinkHref={`${svg}#icon-checkmark`} />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="collection-title">
                            <div className="collection-title__wrapper">
                                <h2 hidden={this.state.titleEditing}>
                                    { this.props.collection.title }
                                </h2>

                                <span hidden={this.state.titleEditing} className="collection-termamount">
                                    {this.props.collection.cards.length} pojęć
                                </span>
                            </div>
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
