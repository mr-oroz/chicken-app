import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import DETAILS_API from '../../utils/ApiData'

const ProductDetails = () => {
    const [detail, setDetail] = useState([]);
    const [spinner, setSpiner] = useState(true);

    const param = useParams();
    useEffect(() => {
        axios.get(DETAILS_API + param.id)
            .then((res) => {
                const data = res.data.meals[0];
                // console.log(data);
                setDetail(data);
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
                        <div
                            className="shadow-lg rounded p-4 m-4"
                            style={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }}
                        >
                            <h3 style={{textAlign: 'center'}}>{detail.strMeal}</h3>
                            <p className='mt-4'
                                style={{
                                    display: 'inline-block',
                                    // fontSize: '25px'
                                }}
                            >
                                <img
                                    style={{
                                        width: 300,
                                        margin: '3px 30px'
                                    }}
                                    align='left'
                                    src={detail.strMealThumb} />
                                <strong>description product:</strong> {detail.strInstructions}</p>
                        </div>
                    </>
            }
        </>
    );
};

export default ProductDetails;