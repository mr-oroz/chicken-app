import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';

const SearchProductComponent = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const param = useParams()
    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${param.name}`)
        .then((res) => {
            const data = res.data.meals;
            console.log(res)
            setData(data)
            setLoading(false);
        })
    }, [param.name])
    return (
        <>
            {
                loading === true
                    ?
                    <LoadingComponent />
                    :
                    <>
                        {
                            data === null && data !== ''
                                ?
                                <>
                                    <h1>Error</h1>
                                </>
                                :
                                <>
                                    {
                                        data.map((v, i) => {
                                            return (
                                                <>
                                                    <div
                                                        className="shadow-lg rounded p-4 m-4"
                                                    >
                                                        <h1>{v.strIngredient4}</h1>
                                                        <img
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                            }}
                                                            src={v.strMealThumb} />
                                                        {/* <p className='mt-4'><strong>description product:</strong> {''}</p> */}
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </>
                        }
                    </>
            }
        </>
    );
};

export default SearchProductComponent;