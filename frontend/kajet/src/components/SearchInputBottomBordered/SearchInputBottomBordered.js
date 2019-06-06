import React, {Component} from 'react';

import './search-input-bottom-bordered.scss'
import svg from "../../images/sprite.svg";

class SearchInputBottomBordered extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false
        }
    }

    render() {
        return (
            <div className="search-input-bottom-bordered">
                <input type="text"
                       onChange={e => { this.props.onInputChange(e.target.value) }}
                       placeholder="Szukaj"
                       style={{width: this.props.styles.width,
                           borderBottom: this.state.error && '1px solid red'}}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="collections-search-input__icon">
                    <use xlinkHref={`${svg}#icon-search`} />
                </svg>
            </div>
        );
    }
}

export default SearchInputBottomBordered;
