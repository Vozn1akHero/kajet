import React, {PureComponent} from 'react';

import './addwrapperforcollectionspage.scss'

import svg from "../../images/sprite.svg";

class AddWrapperForCollectionsPage extends PureComponent {
    render() {
        return (
            <div className="addwrapperforcollectionspage"
            style={{
                height: this.props.height + "px"
            }}>
                <section className="add-info">
                    <div className="col-amount-info">
                        <div className="col-amount-info__text">
                            <span>Masz już</span>
                            <span>
                                        {this.props.allCollectionsCount}
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
        );
    }
}

export default AddWrapperForCollectionsPage;
