import React from 'react';
import { Spinner } from 'react-bootstrap';

const ClassicSpinner = () => {

    return (
        <div className='h-50 d-flex justify-content-center align-items-center'>
            < Spinner animation="border" role="status" className='mt-2 spinner' >
                <span className="visually-hidden">Loading...</span>
            </Spinner >
        </div>

    )
}

export default (ClassicSpinner)
