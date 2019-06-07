import React, {Component} from 'react';

import "./newcollection-page.scss"

import CardForCollectionCreation from "../../../components/CardForCollectionCreation/CardForCollectionCreation"

import { connect } from 'react-redux';
import { addCollection } from '../../../redux/actions/collectionActions';
import MainButton from "../../../components/MainButton/MainButton";


class NewCollection extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: "",
            cards: [],
            cardRefs: []
        }
    }

    componentWillMount() {
        this.showOrUpdateCardList();
    }

    setCollectionTitle = e => {
      this.setState({
          title: e.target.value
      })
    };

    showOrUpdateCardList = () => {
        this.cardRef = React.createRef();

        const newCard = (
            <CardForCollectionCreation ref={this.cardRef}/>
        );

        this.setState({
            cards: [...this.state.cards, newCard],
            cardRefs: [...this.state.cardRefs, this.cardRef]
        })
    };

    addNewCard = e => {
        e.preventDefault();

        this.showOrUpdateCardList();
    };

    submitCards = async e => {
        e.preventDefault();

        let allCards = [];

        for(const [index, value] of this.state.cards.entries()){
            allCards.push(this.state.cardRefs[index].current.state)
        }

        await this.props.addCollection({
            title: this.state.title,
            cards: allCards
        });

        this.props.history.push('/app/collections');
    };

    render() {
        return (
            <div className="new-collection-page">
                <form onSubmit={this.submitCards}>
                    <input type="text"
                           className="collection-title"
                           onChange={this.setCollectionTitle}
                           placeholder="Nazwa kolekcji"
                           required/>


                    <section className="new-cards">
                        <ul className="new-cards__list">
                            {
                                this.state.cards.map(card => card)
                            }
                        </ul>

                        <button className="new-cards__add-one-btn" onClick={this.addNewCard}>
                            &#43;
                        </button>
                    </section>

                    <MainButton
                        styles={{marginTop: '5rem'}}
                        title="Stwórz"
                    />
                </form>
            </div>
        );
    }
}


export default connect(
    null,
    { addCollection }
)(NewCollection)
