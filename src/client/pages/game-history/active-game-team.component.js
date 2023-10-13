import React from 'react';
import { ListGroup, Container, Row, Col, Image } from 'react-bootstrap';
import summonerSpells from '../../assets/summoner-spells.json'

const ActiveGameTeam = ({ team, leftTeam }) => {

    const rolesOrder = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"]

    return (
        <ListGroup horizontal>
            <Container>
                {team.map((participant, index) =>
                    <Row className={'active-game-row'} key={participant.summonerName}>
                        <Col md={10} className={'active-game-participant px-0 ' + (leftTeam ? 'team-blue' : 'team-red')}>
                            <ListGroup.Item className='w-100'>
                                <Row>
                                    <Col md={"auto pe-0"}>
                                        <Image
                                            width={"40px"}
                                            src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/" + participant.champion.championData.id + ".png"}
                                            alt={participant.champion.championData.id}
                                        />
                                    </Col>
                                    <Col md={"auto d-flex flex-column ps-0"}>
                                        <Image
                                            width={"20px"}
                                            src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/" +
                                                Object.entries(summonerSpells.data).filter((element) =>
                                                    element[1].key == participant.spell1Id
                                                )[0][1].id + ".png"}
                                            alt={participant.spell1Id}
                                        />

                                        <Image
                                            width={"20px"}
                                            src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/" +
                                                Object.entries(summonerSpells.data).filter((element) =>
                                                    element[1].key == participant.spell2Id
                                                )[0][1].id + ".png"}
                                            alt={participant.spell1Id}
                                        />
                                    </Col>
                                    <Col md={"auto"}>
                                        <div className="fw-bold">{participant.summonerName}</div>
                                        {
                                            participant.hasOwnProperty("rank") ?
                                            <>{participant.rank} {participant.lp}</>
                                            :
                                            "UNRANKED"
                                        }
                                        
                                        
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </Col>
                        <Col md={2} className='px-0'>
                            <div className='justify-content-center align-items-center d-flex w-100 h-100'>
                                {leftTeam && <Image src={"../roles/" + rolesOrder[index] + ".png"} width="40px" />}
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
        </ListGroup>
    )
}

export default (ActiveGameTeam);