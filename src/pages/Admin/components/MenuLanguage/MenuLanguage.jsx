import React from 'react';

const MenuLanguage = ({ setTypeLanguage, value, src, content }) => {
    return (
        <div onClick={() => setTypeLanguage(value)}>
            <img src={src} alt={content} />
            <p>{content}</p>
        </div>
    );
};

export default MenuLanguage;
