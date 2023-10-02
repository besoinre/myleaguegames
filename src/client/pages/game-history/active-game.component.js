import React from 'react';
import { useContext } from 'react';
import { Card, Container, ListGroup, Row, Col } from 'react-bootstrap';
import useActiveGame from '../../hooks/useActiveGame';
import { GlobalStateContext } from '../../App'
import queuesJSON from '../../assets/queues.json'
import ClassicSpinner from '../../components/spinner';

const ActiveGame = () => {

    const { globalState } = useContext(GlobalStateContext);

    // To get active game, use summonerData.id
    let [gameData, isLoading, apiError] = useActiveGame(globalState.selectedUserId)

    const isSelected = globalState.hasOwnProperty("selectedUserId")
    const isInGame = Object.keys(gameData).length !== 0 && !isLoading

    return (
        isSelected ?
            <Card>
                < Card.Body >
                    <Card.Title><strong>{globalState.selectedUserName}</strong> Active Game</Card.Title>
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
                    <Card.Text>
                        {
                            isInGame ?
                                gameData.participants.map((element) => {
                                    let [participant1, participant2] = element
                                    return (
                                        <ListGroup horizontal>
                                            <Container>
                                                <Row>
                                                    <Col md={6}>
                                                        <ListGroup.Item className='game-row'>
                                                            <div className="fw-bold">{participant1.summonerName} {participant1.rank} {participant1.lp}</div>
                                                            {participant1.champion} {participant1.role}
                                                        </ListGroup.Item>
                                                    </Col>
                                                    {
                                                        participant2 &&
                                                        <Col md={6}>
                                                            <ListGroup.Item className='game-row'>
                                                                <div className="fw-bold">{participant2.summonerName} {participant2.rank} {participant2.lp}</div>
                                                                {participant2.champion} {participant2.role}
                                                            </ListGroup.Item>
                                                        </Col>
                                                    }

                                                </Row>
                                            </Container>
                                        </ListGroup>
                                    )
                                })
                                :
                                ""
                        }
                    </Card.Text>
                </Card.Body >
            </Card >
            :
            <></>
    )
}

export default (ActiveGame);