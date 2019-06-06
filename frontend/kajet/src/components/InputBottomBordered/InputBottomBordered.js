import React, {Component} from 'react';

import './InputBottomBordered.scss'

class InputBottomBordered extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false
        }
    }

    render() {
        return (
            <>
                <input type="text"
                       onChange={e => { this.props.onInputChange(e.target.value) }}
                       className="input-bottom-bordered"
                       placeholder={`${this.props.placeholder}`}
                       style={{width: this.props.styles.width,
                           borderBottom: this.state.error && '1px solid red'}}
                />
            </>
        );
    }
}

export default InputBottomBordered;
