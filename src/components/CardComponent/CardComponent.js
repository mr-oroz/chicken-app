import React from 'react';

const CardComponent = ({ children, img, }) => {
    return (
        <>
            <img
                style={{
                    width: '100%',
                    height: '200',
                    cursor: 'pointer',
                }}
                src={img} alt="" />
            <p
                style={{
                    cursor: 'pointer',
                    color: 'black',
                    textDecoration: 'none'
                }}
            >({children})</p>
        </>
    );
};

export default CardComponent;