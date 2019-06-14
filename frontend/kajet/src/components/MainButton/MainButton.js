import React from 'react';

import './mainbutton.scss'

const MainButton = props => {
    return (
        <>
          <button className="main-btn" style={
              props.styles
          }>
              {props.title}
          </button>
        </>
    );
};

export default MainButton;
