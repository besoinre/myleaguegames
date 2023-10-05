import React from 'react';
import Header from './header';
import ActiveGame from '../pages/game-history/active-game.component';
import { Col, Container, Row } from 'react-bootstrap';
import MatchHistory from '../pages/game-history/match-history.component';
import UsersList from '../pages/users-list/users-list.component';

const Layout = () => {
    return (
        <Container fluid>
            <Row>
                <Col md={12} className='p-0'>
                    <Header />
                </Col>
            </Row>
            <Row>
                <Col l={2} md={3} xs={4} className='p-0'>
                    <UsersList />
                </Col>
                <Col l={10} md={9} xs={8} className='p-2'>
                    <Row>
                        <Col md={12}>
                            <ActiveGame />
                        </Col>
                        <Col md={12}>
                            <MatchHistory />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Layout;