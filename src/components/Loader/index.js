import React from 'react';
import loaderSrc from '../../assets/loader.gif';

const Loader = props => (
    <div>
        <img
            style={{ width: 250, position: "absolute", left: "40%", top: "40%"}}
            alt="Loader icon"
            src={loaderSrc}/>
    </div>
);

export default Loader;