import React, {Component} from 'react';
import Loader from 'react-loader-spinner'

const LoaderForSection = () => {
    return (
        <div style={{background: 'none',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'}}>

            <Loader
                type="Grid"
                color="#00baff"
                height="70"
                width="70"/>
        </div>
    );
};

export default LoaderForSection;
