import React, { useContext } from 'react';
import ProductContext from '../../useContext/ProductContext';

const ButtonBasket = ({ children, click, value }) => {
    const Product = useContext(ProductContext)
    return (
        <>
            <button
                onClick={() => { Product.toggleClick(click) }}
                className={!Product.product.includes(value) ? 'btn btn-primary' : 'btn btn-danger'
                }
            >
                {children}
            </button>
        </>
    );
};

export default ButtonBasket;