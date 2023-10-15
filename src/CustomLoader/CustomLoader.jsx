import React from 'react';
import "./CustomLoader.css"
const CustomLoader = () => {
    return (
        <div className="mains">
  <div className="centers">
        <div className="ring"></div>
        <span className='loadClass'>loading Data...</span>
    </div>
        </div>
    );
};

export default CustomLoader;