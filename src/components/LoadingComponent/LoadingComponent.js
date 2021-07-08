import React from 'react';
import { Spinner } from 'react-bootstrap'

const LoadingComponent = () => {
    return (
        <div 
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                textDecoration: 'translate(-50%, 50%)'
            }}
        >
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>

    );
};

export default LoadingComponent;