import React from 'react';
import SideBar from './sidebar';
import Header from './header';
import GameHistory from '../pages/game-history/game-history.component';
import { Col, Container, Row } from 'react-bootstrap';

const Layout =() =>{
    return(
        <Container fluid>
            <Row>
                <Col md={12} className='p-0'>
                    <Header></Header>
                </Col>
            </Row>
            <Row>
                <Col l={2} md={3} xs={4} className='p-0'>
                    <SideBar></SideBar>
                </Col>
                <Col l={10} md={9} xs={8} className='p-0'>
                    <GameHistory></GameHistory>
                </Col>
            </Row>
        </Container>
    )
}

export default Layout;