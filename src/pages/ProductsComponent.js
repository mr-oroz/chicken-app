import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PRODUCT_API from '../utils/ApiData';
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';
import ProductsItems from './ProductsItems/ProductsItems';

function ProductsComponent() {
    const [products, setProducts] = useState([]);
    const [spinner, setSpiner] = useState(true);
    const params = useParams();

    useEffect(() => {
        axios.get(PRODUCT_API + params.menu)
            .then((res) => {
                const data = res.data.meals;
                setProducts(data);
                setSpiner(false)
            })
    }, []);
    return (
        <>
            {
                spinner === true
                    ?
                    <LoadingComponent />
                    :
                    <>
                        <h2>{params.menu}({products.length})</h2>
                        <Row variant='justify-content-between'>
                            {
                                products.map((v, i) => {
                                    return (
                                        <>
                                            <ProductsItems key={i} value={v} />
                                        </>
                                    )
                                })
                            }
                        </Row>
                    </>
            }
        </>
    );
}

export default ProductsComponent;