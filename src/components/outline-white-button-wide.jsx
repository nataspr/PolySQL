import React from 'react';

const OutlineWhiteButtonWide = ({text, onClick}) => {
    return (
        <div className="outline-white-button-wide-outline-white-button-wide">
            <button onClick={onClick} className="outline-white-button-wide-button ButtonSmall button">
                {text}
            </button>
        </div>
    )

}

export default OutlineWhiteButtonWide;
