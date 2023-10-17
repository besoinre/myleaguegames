import React, { useState } from 'react';
import { Col, ListGroup, Row, Image, Collapse, Button } from 'react-bootstrap';
import queuesJSON from '../../assets/queues.json'
import { useTranslation } from 'react-i18next';
import AdditionalMatchData from './additional-match-data.component';
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import summonerSpells from '../../assets/summoner-spells.json'

const MatchItem = ({ game, selectedUserId }) => {
    const { t } = useTranslation();
    const optionsDate = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    const gameDate = new Date(game.info.gameEndTimestamp).toLocaleDateString(undefined, optionsDate)
    const gameDuration =
        String(new Date(game.info.gameEndTimestamp - game.info.gameStartTimestamp).getMinutes()).padStart(2, '0')
        + ":"
        + String(new Date(game.info.gameEndTimestamp - game.info.gameStartTimestamp).getSeconds()).padStart(2, '0')

    const [showAdditionalData, toggleAdditionData] = useState(false)
    const itemKeys = ["item0", "item1", "item2", "item3", "item4", "item5", "item6"]
    const selectedParticipant = game.info.participants.filter((element) => element.summonerId === selectedUserId)

    return (
        <>
            <Row className='mb-2'>
                <Col md={11} className='pe-0'>
                    <ListGroup.Item className={(game.gameResult === "Win" ? 'game-won-bg' : 'game-lost-bg') + ' history-game-row'}>
                        <Row>
                            <Col md={"2"}>
                                <p className={(game.gameResult === "Win" ? 'game-won-text' : 'game-lost-text') + ' fw-bold mb-0'}>
                                    {t(queuesJSON.filter((element) =>
                                        element.queueId === parseInt(game.info.queueId)
                                    )[0].description)}
                                </p>
                                <p className='fw-lighter mb-1'>
                                    {gameDate}
                                </p>
                            </Col>
                            <Col md={"1"}>
                                <p className={(game.gameResult === "Win" ? 'game-won-text' : 'game-lost-text') + ' mb-0 fw-semibold'}>
                                    {game.gameResult}
                                </p>
                                <p className='mb-0'>
                                    {gameDuration}
                                </p>
                            </Col>
                            <Col md={"auto"} className='pe-0'>
                                <Image
                                    src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/" + game.championName + ".png"}
                                    alt={game.championName}
                                    width={"60px"}
                                />
                            </Col>
                            <Col md={"auto"} className='ps-0'>
                                {selectedParticipant.map((participant) => (
                                    <div key={selectedUserId}>
                                        <Col md={"auto d-flex flex-column p-0"}>
                                            <Image
                                                width={"30px"}
                                                src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/" +
                                                    Object.entries(summonerSpells.data).filter((element) =>
                                                        element[1].key == participant.summoner1Id
                                                    )[0][1].id + ".png"}
                                                alt={participant.summoner1Id}
                                            />
                                            <Image
                                                width={"30px"}
                                                src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/" +
                                                    Object.entries(summonerSpells.data).filter((element) =>
                                                        element[1].key == participant.summoner2Id
                                                    )[0][1].id + ".png"}
                                                alt={participant.summoner2Id}
                                            />
                                        </Col>
                                    </div>
                                ))}
                            </Col>
                            <Col md={"2"}>
                                {selectedParticipant.map((participant) => {
                                    const kda = ((participant.kills + participant.assists) / participant.deaths) == "Infinity"
                                        ? "Perfect"
                                        : Math.round(((participant.kills + participant.assists) / participant.deaths) * 100) / 100
                                    return (
                                        <div key={selectedUserId}>
                                            <p className='fw-bold mb-0'>
                                                {participant.kills + "/" + participant.deaths + "/" + participant.assists}
                                            </p>
                                            <p
                                                className={'mb-0 fw-semibold '
                                                    + (kda < 2 ? "text-secondary" : kda < 4 ? "text-success" : kda < 6 ? "text-primary" : "text-danger")}
                                            >
                                                {kda}:1 KDA
                                            </p>
                                        </div>
                                    )
                                })}
                            </Col>
                            <Col md={"auto"}>
                                {selectedParticipant.map((participant) => (
                                    <div key={selectedUserId}>
                                        {
                                            itemKeys.map((element) => {
                                                if (participant[element] !== 0) {
                                                    return (
                                                        <Image
                                                            width={"40px"}
                                                            src={"http://ddragon.leagueoflegends.com/cdn/13.20.1/img/item/" + participant[element] + ".png"}
                                                            alt={"item" + participant[element]}
                                                        />
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                ))}
                            </Col>
                        </Row>
                        <Collapse in={showAdditionalData}>
                            <div className='px-3 w-100'>
                                <hr />
                                <AdditionalMatchData game={game} />
                            </div>
                        </Collapse>
                    </ListGroup.Item>
                </Col>
                <Col md={"1"} className='ps-0'>
                    <Button className='themed-button button-additional-data' onClick={() => toggleAdditionData(!showAdditionalData)}>
                        {showAdditionalData ? <BsArrowUp /> : <BsArrowDown />}
                    </Button>
                </Col>
            </Row>

        </>
    );

}

export default (MatchItem);