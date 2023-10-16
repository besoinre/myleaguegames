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
            <UsersList />
            {
                isSelected ?
                    <div className='main-container'>
                        <Row className='w-100 justify-content-center'>
                            <Col md={10}>
                                <ActiveGame />
                            </Col>
                            <Col md={10}>
                                <MatchHistory />
                            </Col>
                        </Row>
                    </div>
                    :
                    <NoUserSelected />
            }
        </>


    )
}

export default Layout;