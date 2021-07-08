import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../components/LoadingComponent/LoadingComponent';
import SEARCH_API from '../utils/ApiData'

const SearchProductComponent = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const param = useParams()
    useEffect(() => {
        axios.get(SEARCH_API + param.name)
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