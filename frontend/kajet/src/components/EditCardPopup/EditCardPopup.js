import React, {Component} from 'react';
import Popup from 'reactjs-popup'

import './editcardpopup.scss'

class EditCardPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newTitle: this.props.title,
            newDescription: this.props.description
        }
    }

    saveChangesToCard = e => {
        e.preventDefault();

        this.props.changeCardData({ id: this.props.id, ...this.state })

        this.props.modifyStatus();
    };

    closePopup = () => {
        this.props.modifyStatus();
    };

    render() {
        return (
            <div className="edit-card-popup">
                <Popup
                    open={this.props.open}
                    closeOnDocumentClick>
                    <div className="modal">
                        <a className="close"
                           style={{
                               position: 'absolute',
                               right: '1rem',
                               top: '-1rem',
                               fontSize: '2.5rem',
                               background: 'white',
                               borderRadius: '50%',
                               width: '3rem',
                               height: '3rem',
                               textAlign: 'center',
                               boxShadow: 'rgba(0, 0, 0, 0.45) 0px 1px .5rem 0px'
                           }}
                           onClick={this.closePopup}>
                            &times;
                        </a>
                        <div style={{padding: '2rem'}}>
                            <form className="edit-card-popup__form"
                                onSubmit={this.saveChangesToCard}>
                                <input type="text"
                                       className="card-newTitle-input"
                                       defaultValue={this.props.title}
                                       onChange={e => this.setState({ newTitle: e.target.value })}
                                />

                                <input type="text"
                                       className="card-newDesc-input"
                                       defaultValue={this.props.description}
                                       onChange={e => this.setState({ newDescription: e.target.value })}
                                />

                                <button className="card-submitChanges-btn"
                                    type="submit">Zapisz</button>
                            </form>
                        </div>
                    </div>
                </Popup>
            </div>
        );
    }
}

export default EditCardPopup;
