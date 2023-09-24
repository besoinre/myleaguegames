import React from 'react';
import { Spinner } from 'react-bootstrap';


const ClassicSpinner = () => {

    return (
        < Spinner animation="border" role="status" className='mt-2' >
            <span className="visually-hidden">Loading...</span>
        </Spinner >
    )
}

export default (ClassicSpinner)
