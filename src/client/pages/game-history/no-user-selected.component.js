import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';

const NoUserSelected = () => {

    return (
        <div className='main-container-no-user d-flex justify-content-center align-items-center'>
            <Row>
                <Col>
                    <h1>Click on a user to display its information !</h1>
                </Col>
            </Row>
        </div>
    );

}

export default (NoUserSelected);