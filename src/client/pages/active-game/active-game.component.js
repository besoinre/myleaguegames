import React from 'react';
import { useContext } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import useActiveGame from '../../hooks/useActiveGame';
import { GlobalStateContext } from '../../App'
import queuesJSON from '../../assets/queues.json'
import ClassicSpinner from '../globals/spinner';
import ActiveGameTeam from '../active-game/active-game-team.component';
import { useTranslation } from 'react-i18next';
import { ACTIONS } from '../../hooks/useGlobalState';

const ActiveGame = () => {

    const { state, dispatchState } = useContext(GlobalStateContext);
    const { t } = useTranslation();
    let [gameData, isLoading] = useActiveGame(state.selectedUserId)
    const isInGame = Object.keys(gameData).length !== 0 && !isLoading

    return (
        <Card className='active-game-container w-100 mt-2'>
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <Card.Title>
                            <strong>{state.selectedUserName}</strong> Active Game
                        </Card.Title>
                        <Card.Subtitle className="mb-2">
                            {
                                isInGame ?
                                    queuesJSON.filter((element) =>
                                        element.queueId === parseInt(gameData.gameQueueConfigId)
                                    )[0].description
                                    :
                                    isLoading ?
                                        <ClassicSpinner />
                                        :
                                        "User is not is game"
                            }
                        </Card.Subtitle>
                    </div>
                    {
                        isInGame &&
                        <div>
                            <span className='user-rank-details'>
                                {t(gameData.rank + " " + gameData.tier)} {gameData.lp}
                            </span>
                            <span className='user-lp-annotation'>
                                LP
                            </span>
                        </div>

                    }
                    <Button className='themed-button'
                        onClick={
                            () => dispatchState(
                                [{
                                    type: ACTIONS.DEFAULT_UPDATE,
                                    updateObject: { refresh: !state.refresh }
                                }]
                            )
                        }
                    >Refresh</Button>
                </div>
                {
                    isInGame ?
                        <Container className='mx-0'>
                            <Row>
                                <Col md={6} className='px-0'>
                                    <ActiveGameTeam team={gameData.teamsConfiguration[0]} leftTeam={true} />
                                </Col>
                                <Col md={6} className='px-0'>
                                    <ActiveGameTeam team={gameData.teamsConfiguration[1]} leftTeam={false} />
                                </Col>
                            </Row>
                        </Container>
                        :
                        <></>
                }
            </Card.Body >
        </Card >
    )
}

export default ActiveGame;