import React, { useContext, useEffect, useState } from 'react';
import ProductContext from '../../useContext/ProductContext';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import CardComponent from '../../components/CardComponent/CardComponent';

const Basket = () => {
    const Product = useContext(ProductContext);
    const [loading, setLoading] = useState(true)
    const basket = Product.product;
    useEffect(() => {
        setLoading(false)
    }, [basket])
    return (
        <>
            {
                basket.length === 0
                    ?
                    <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Корзина пуста</h2>
                    :
                    <>
                        {
                            loading === true
                                ?
                                <LoadingComponent />
                                :
                                <div className='d-flex'>
                                    {
                                        basket.map((basket) => {
                                            return (
                                                <>
                                                    <div className='shadow-lg rounded p-4 bg-body col-xxl-3 col-xl-3 col-lg-3 col-md-3 m-4'>
                                                        <CardComponent img={basket.strMealThumb}>
                                                            {basket.strMeal}
                                                        </CardComponent>
                                                        <button
                                                            onClick={() => { Product.removeClick(basket) }}
                                                            className='btn btn-danger'
                                                        >
                                                            removeClick
                                                        </button>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                        }
                    </>
            }
        </>
    );
};

export default Basket;