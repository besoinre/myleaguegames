import React, { useEffect, useState } from 'react';
import Header from './header';
import ActiveGame from '../active-game/active-game.component';
import { Col, Row } from 'react-bootstrap';
import GamesHistory from '../games-history/games-history.component';
import UsersList from '../users-list/users-list.component';
import { useContext } from 'react';
import { GlobalStateContext } from '../../App'
import NoUserSelected from './no-user-selected.component';

const Layout = () => {

    const { state } = useContext(GlobalStateContext);
    const [isSelected, setIsSelected] = useState(state.selectedUserId !== undefined)

    useEffect(() => {
        if((state.selectedUserId !== undefined) !== isSelected)
            setIsSelected(state.selectedUserId !== undefined)
    }, [state])

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
                                            <GamesHistory />
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