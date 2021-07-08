import React, { useContext } from 'react';
import CardComponent from '../../components/CardComponent/CardComponent';
import ButtonBasket from '../../components/Buttons/ButtonBasket';
import { Link } from 'react-router-dom';
import ProductContext from '../../useContext/ProductContext';

const ProductsItems = ({ value }) => {

    const Product = useContext(ProductContext);

    return (
        <div className='shadow-lg rounded p-4 bg-body col-xxl-3 col-xl-3 col-lg-3 col-md-3 m-4'>
            <Link to={'/details/' + value.idMeal}>
                <CardComponent img={value.strMealThumb}>
                    {value.strMeal}
                </CardComponent>
            </Link>
            <ButtonBasket
                click={value}
                value={value}>
                {
                !Product.product.includes(value) ? ('addBasket') : ('removeBasket')
                }
            </ButtonBasket>
        </div>
    );
};

export default ProductsItems;