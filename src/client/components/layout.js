import React from 'react';
import Header from './header';
import ActiveGame from '../pages/game-history/active-game.component';
import { Col, Container, Row } from 'react-bootstrap';
import MatchHistory from '../pages/game-history/match-history.component';
import UsersList from '../pages/users-list/users-list.component';

const Layout = () => {
    return (
        <>
            <Header />
            <UsersList />
            <div className='main-container'>
                <Row>
                    <Col md={12}>
                        <ActiveGame />
                    </Col>
                    <Col md={12}>
                        <MatchHistory />
                    </Col>
                </Row>
            </div>
        </>


    )
}

export default Layout;