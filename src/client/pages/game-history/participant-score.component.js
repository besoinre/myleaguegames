import React from 'react';
import { Row, Col, Image, ProgressBar } from 'react-bootstrap';
import summonerSpells from '../../assets/summoner-spells.json'

const ParticipantScore = ({ participant, maxDamageDealt, maxDamageTaken }) => {

    const kda = ((participant.kills + participant.assists) / participant.deaths) == "Infinity"
        ? "Perfect"
        : Math.round(((participant.kills + participant.assists) / participant.deaths) * 100) / 100

    const itemKeys = ["item0", "item1", "item2", "item3", "item4", "item5", "item6"]


    return (
        <Col md={12} key={participant.summonerName}>
            <Row className='mb-1'>
                <Col md={"auto p-0"}>
                    <Image
                        width={"50px"}
                        src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/" + participant.championName + ".png"}
                        alt={participant.championName}
                    />
                </Col>
                <Col md={"auto d-flex flex-column p-0"}>
                    <Image
                        width={"25px"}
                        src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/" +
                            Object.entries(summonerSpells.data).filter((element) =>
                                element[1].key == participant.summoner1Id
                            )[0][1].id + ".png"}
                        alt={participant.summoner1Id}
                    />
                    <Image
                        width={"25px"}
                        src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/" +
                            Object.entries(summonerSpells.data).filter((element) =>
                                element[1].key == participant.summoner2Id
                            )[0][1].id + ".png"}
                        alt={participant.summoner2Id}
                    />
                </Col>
                <Col md={"4 d-flex flex-column"}>
                    <span className='fw-semibold'>
                        {participant.summonerName}
                    </span>
                    <div>
                        {
                            itemKeys.map((element) => {
                                if (participant[element] !== 0) {
                                    return (
                                        <Image
                                            width={"20px"}
                                            src={"http://ddragon.leagueoflegends.com/cdn/13.20.1/img/item/" + participant[element] + ".png"}
                                            alt={"item" + participant[element]}
                                        />
                                    )
                                }
                            })
                        }
                    </div>
                </Col>
                <Col md={"3"}>
                    <Row>
                        <Col md={"12"}>
                            <span>
                                {participant.kills}/{participant.deaths}/{participant.assists}
                            </span>
                        </Col>
                        <Col md={"12"}>
                            {
                                kda === "Perfect" ?
                                    <span className='fw-semibold text-danger'>{kda} KDA</span>
                                    :
                                    <span
                                        className={'fw-semibold '
                                            + (kda < 2 ? "text-secondary" : kda < 4 ? "text-success" : kda < 6 ? "text-primary" : "text-danger")}
                                    >{kda}:1 KDA</span>
                            }
                                    
                        </Col>
                    </Row>
                </Col>
                <Col md={"3 d-flex flex-column justify-content-center"}>
                    <ProgressBar variant="danger" max={maxDamageDealt} now={participant.totalDamageDealtToChampions} label={participant.totalDamageDealtToChampions} className='mb-1'/>
                    <ProgressBar variant="secondary" max={maxDamageTaken} now={participant.totalDamageTaken} label={participant.totalDamageTaken}/>
                </Col>
            </Row>
        </Col>
    );

}

export default (ParticipantScore);