import React from 'react';
import Header from './header';
import ActiveGame from '../pages/game-history/active-game.component';
import { Col, Row } from 'react-bootstrap';
import MatchHistory from '../pages/game-history/match-history.component';
import UsersList from '../pages/users-list/users-list.component';
import { useContext } from 'react';
import { GlobalStateContext } from '../App'
import NoUserSelected from '../pages/game-history/no-user-selected.component';

const Layout = () => {

    const { globalState } = useContext(GlobalStateContext);
    const isSelected = globalState.hasOwnProperty("selectedUserId")

    return (
        <>
            <Header />
            <div className='container-background'>
                <div className='container-padding'>
                    <Row>
                        <Col md={4}>
                            <UsersList />
                        </Col>
                        <Col md={8}>
                            {
                                isSelected ?
                                    <Row>
                                        <Col md={12}>
                                            <ActiveGame />
                                        </Col>
                                        <Col md={12}>
                                            <MatchHistory />
                                        </Col>
                                    </Row>
                                    :
                                    <NoUserSelected />
                            }
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Layout;