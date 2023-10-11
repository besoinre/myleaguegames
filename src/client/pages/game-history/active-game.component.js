import React from 'react';
import { useContext } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import useActiveGame from '../../hooks/useActiveGame';
import { GlobalStateContext } from '../../App'
import queuesJSON from '../../assets/queues.json'
import ClassicSpinner from '../../components/spinner';
import ActiveGameTeam from './active-game-team.component';

const ActiveGame = () => {

    const { globalState, setGlobalState } = useContext(GlobalStateContext);

    // To get active game, use summonerData.id
    let [gameData, isLoading, apiError] = useActiveGame(globalState.selectedUserId)

    const isSelected = globalState.hasOwnProperty("selectedUserId")
    const isInGame = Object.keys(gameData).length !== 0 && !isLoading

    return (
        isSelected ?
            <Card className='m-2'>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                        <div>
                            <Card.Title>
                                <strong>{globalState.selectedUserName}</strong> Active Game
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
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
                        <Button
                            onClick={() => setGlobalState({ ...globalState, refresh: !globalState.refresh })}
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
            :
            <></>
    )
}

export default (ActiveGame);