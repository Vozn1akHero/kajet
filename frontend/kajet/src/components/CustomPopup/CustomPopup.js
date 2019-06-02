import React, {Component} from 'react';
import Popup from "reactjs-popup";

class CustomPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    closePopup = () => {
        this.props.closePopup();
    };


    render() {
        const { text, open } = this.props;

        return (
            <div className="custom-popup-1">
                <Popup
                    open={open}
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
                            <p>{text}</p>
                        </div>
                    </div>
                </Popup>
            </div>
        );
    }
}

export default CustomPopup;
