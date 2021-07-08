import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const CategoriesComponent = () => {
    const [categories, setCategories] = useState([]);
    const [spinner, setSpiner] = useState(true);
    
    useEffect(() => {
        axios.get(`https://themealdb.com/api/json/v1/1/categories.php`)
            .then(res => {
                const data = res.data.categories
                // console.log(data);
                setCategories(data)
                setSpiner(false)
            })
    }, [])
    return (
        <>
            {
                spinner === true
                    ?
                    <LoadingComponent />
                    :
                    <>
                        <h1>Products({categories.length})</h1>
                        <Row variant='justify-content-between'>
                            {
                                categories.map((v, i) => {
                                    return (
                                        <div key={i} className='shadow-lg rounded p-4 bg-body col-xxl-3 col-xl-3 col-lg-3 col-md-3 m-4'>
                                            <Link to={'/area/' + v.strCategory}>
                                                <img
                                                    style={{
                                                        width: '100%',
                                                        height: '200',
                                                        cursor: 'pointer',
                                                    }}
                                                    src={v.strCategoryThumb} alt="" />
                                                <p
                                                    style={{ cursor: 'pointer' }}
                                                >({v.strCategory})</p>
                                            </Link>

                                        </div>
                                    )
                                })
                            }
                        </Row>
                    </>
            }
        </>
    );
};

export default CategoriesComponent;