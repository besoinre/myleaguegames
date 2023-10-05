import React from 'react';
import { ListGroup, Container, Row, Col } from 'react-bootstrap';

const ActiveGameTeam = ({ team }) => {

    return (
        <ListGroup horizontal>
            <Container>
                {team.map((participant) =>
                    <Row>
                        <Col md={12}>
                            <ListGroup.Item className='game-row w-100'>
                                <div className="fw-bold">{participant.summonerName} {participant.rank} {participant.lp}</div>
                                {participant.champion.championData.id} {participant.role}
                            </ListGroup.Item>
                        </Col>
                    </Row>
                )}
            </Container>
        </ListGroup>
    )
}

export default (ActiveGameTeam);