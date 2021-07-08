import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import ButtonBasket from '../../components/Buttons/ButtonBasket';
import CardComponent from '../../components/CardComponent/CardComponent';
import ProductContext from '../../useContext/ProductContext';

function MenuDropdownComponent() {
    const [dropdownMenu, setDropdowMenu] = useState([]);
    const [spinner, setSpiner] = useState(true);
    const Product = useContext(ProductContext);

    const params = useParams();
    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${params.menu}`)
            .then((res) => {
                const data = res.data.meals;
                // console.log(data)
                setDropdowMenu(data)
                setSpiner(false)
            })
    }, [params.menu])
    return (
        <>
            {
                spinner === true
                    ?
                    <LoadingComponent />
                    :
                    <>
                        <h2>{params.menu}:({dropdownMenu.length})</h2>
                        <Row variant='justify-content-between'>
                            {
                                dropdownMenu.map((v, i) => {
                                    return (
                                        <>
                                            <div key={i} className='shadow-lg rounded p-4 bg-body col-xxl-3 col-xl-3 col-lg-3 col-md-3 m-4'>
                                                <Link to={'/details/' + v.idMeal}>
                                                    <CardComponent img={v.strMealThumb}>
                                                        {v.strMeal}
                                                    </CardComponent>
                                                </Link>
                                                <ButtonBasket
                                                    click={v}
                                                    value={v}>
                                                    {
                                                        !Product.product.includes(v) ? 'addBasket' : 'removeBasket'
                                                    }
                                                </ButtonBasket>
                                            </div>
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

export default MenuDropdownComponent;