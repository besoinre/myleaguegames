import React from 'react';
import { Col, ListGroup, Row, Image } from 'react-bootstrap';

const GameItem = () => {

    return (
        <>
            <ListGroup.Item  className='game-row'>
                <Row >
                    <Col md={4}  >
                        <Image src="../shaco.jpg" rounded  alt='shaco icon' className='champion-game-icon'/>
                    </Col>
                    <Col md={8}>
                        0 / 0 / 0 Victory
                    </Col>
                </Row>
            </ListGroup.Item>
        </>

    );

}

export default (GameItem);