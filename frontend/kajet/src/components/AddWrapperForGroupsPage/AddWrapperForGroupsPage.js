import React, {PureComponent} from 'react';
import {Link} from "react-router-dom";
import svg from "../../images/sprite.svg";

import "./addwrapperforgroupspage.scss"

class AddWrapperForGroupsPage extends PureComponent {
    render() {
        return (
            <div className="addwrapperforgroupspage"
            style={{
                height: this.props.height
            }}>
                <section className="add-info">
                    <Link className="new-group-btn" to={'/app/newgroup'}>
                        +
                    </Link>


                    <div className="groups-amount-info">
                        <div className="groups-amount-info__text">
                            <span>Masz już</span>
                            <span>
                                        {this.props.groupsCount}
                                    </span>
                            <span>grupy</span>
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

export default AddWrapperForGroupsPage;
