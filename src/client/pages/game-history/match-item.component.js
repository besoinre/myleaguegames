import React, { useState } from 'react';
import { Col, ListGroup, Row, Image, Collapse, Button } from 'react-bootstrap';
import queuesJSON from '../../assets/queues.json'
import { useTranslation } from 'react-i18next';
import AdditionalMatchData from './additional-match-data.component';
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import summonerSpells from '../../assets/summoner-spells.json'
import TooltipDescription from '../../components/tooltip';
import Kda from './kda.component';

const MatchItem = ({ game, selectedUserId, selectedParticipant }) => {
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

    const summonerSpellsData = Object.values(summonerSpells.data)

    return (
        <Row className='mb-1'>
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
                            <TooltipDescription title={game.championName}>
                                <Image
                                    src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/" + game.championName + ".png"}
                                    alt={game.championName}
                                    width={"60px"}
                                />
                            </TooltipDescription>
                        </Col>
                        <Col md={"auto"} className='ps-0'>
                            <div key={selectedUserId}>
                                <Col md={"auto d-flex flex-column p-0"}>
                                    {
                                        summonerSpellsData.filter((element) =>
                                            Number(element["key"]) === selectedParticipant.summoner1Id
                                        ).map((element) => (
                                            <TooltipDescription title={element.name}>
                                                <Image
                                                    width={"30px"}
                                                    src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/" +
                                                        element.id + ".png"}
                                                    alt={selectedParticipant.summoner1Id}
                                                />
                                            </TooltipDescription>
                                        ))
                                    }
                                    {
                                        summonerSpellsData.filter((element) =>
                                            Number(element["key"]) === selectedParticipant.summoner2Id
                                        ).map((element) => (
                                            <TooltipDescription title={element.name}>
                                                <Image
                                                    width={"30px"}
                                                    src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/" +
                                                        element.id + ".png"}
                                                    alt={selectedParticipant.summoner2Id}
                                                />
                                            </TooltipDescription>
                                        ))
                                    }
                                </Col>
                            </div>
                        </Col>
                        <Col md={"2"}>
                            <div key={selectedUserId}>
                                <p className='fw-bold mb-0'>
                                    {selectedParticipant.kills + "/" + selectedParticipant.deaths + "/" + selectedParticipant.assists}
                                </p>
                                <Kda
                                    kills={selectedParticipant.kills}
                                    deaths={selectedParticipant.deaths}
                                    assists={selectedParticipant.assists}
                                    kdaLabel={true}
                                />
                            </div>
                        </Col>
                        <Col md={"auto"}>
                            <div key={selectedUserId}>
                                {
                                    itemKeys.map((element) =>
                                    (
                                        selectedParticipant[element] !== 0 ?
                                            <Image
                                                width={"40px"}
                                                src={"http://ddragon.leagueoflegends.com/cdn/13.20.1/img/item/" + selectedParticipant[element] + ".png"}
                                                alt={"item" + selectedParticipant[element]}
                                            />
                                            : <></>
                                    ))
                                }
                            </div>
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
    );

}

export default (MatchItem);