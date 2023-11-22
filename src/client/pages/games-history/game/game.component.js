import React, { useState, useContext } from 'react';
import { Col, ListGroup, Row, Collapse, Button } from 'react-bootstrap';
import queuesJSON from '../../../assets/queues.json'
import { useTranslation } from 'react-i18next';
import GameDetails from './game-details.component';
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import Kda from '../../globals/kda';
import { GlobalStateContext } from '../../../App'
import ItemsBuild from '../../globals/items-build';
import ChampionSummonerSpells from '../../globals/champion-summoner-spells'


const Game = ({ game, selectedParticipant }) => {

    const { state } = useContext(GlobalStateContext);

    const { t } = useTranslation();
    const optionsDate = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    const gameDate = new Date(game.info.gameEndTimestamp).toLocaleDateString(undefined, optionsDate).slice(-8)
    const gameDuration =
        String(new Date(game.info.gameEndTimestamp - game.info.gameStartTimestamp).getMinutes()).padStart(2, '0')
        + ":"
        + String(new Date(game.info.gameEndTimestamp - game.info.gameStartTimestamp).getSeconds()).padStart(2, '0')

    const [showAdditionalData, toggleAdditionData] = useState(false)

    return (
        <Row className='mb-1'>
            <Col md={11} className='pe-0'>
                <ListGroup.Item
                    className={(game.gameResult === "Win" ? 'game-won-bg' : 'game-lost-bg') + ' history-game-row'}>
                    <Row>
                        <Col md={"2"}>
                            <p
                                className={(game.gameResult === "Win"
                                    ? 'game-won-text' : 'game-lost-text') + ' fw-bold mb-0'}>
                                {t(queuesJSON.filter((element) =>
                                    element.queueId === parseInt(game.info.queueId)
                                )[0].description)}
                            </p>
                            <p className='fw-lighter mb-1'>
                                {gameDate}
                            </p>
                        </Col>
                        <Col md={"1"}>
                            <p
                                className={(game.gameResult === "Win"
                                    ? 'game-won-text' : 'game-lost-text') + ' mb-0 fw-semibold'}>
                                {game.gameResult}
                            </p>
                            <p className='mb-0'>
                                {gameDuration}
                            </p>
                        </Col>
                        <ChampionSummonerSpells
                            champion={game.championName}
                            championSize={"50px"}
                            spell1={selectedParticipant.summoner1Id}
                            spell2={selectedParticipant.summoner2Id}
                            spellSize={"25px"}
                        />
                        <Col md={"2"}>
                            <div key={state.selectedUserId}>
                                <p className='fw-bold mb-0'>
                                    {selectedParticipant.kills + "/"
                                        + selectedParticipant.deaths + "/"
                                        + selectedParticipant.assists}
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
                            <div key={state.selectedUserId}>
                                <ItemsBuild participant={selectedParticipant} size={"50px"} />
                            </div>
                        </Col>
                    </Row>
                    <Collapse in={showAdditionalData}>
                        <div className='p-2 w-100'>
                            <GameDetails game={game} />
                        </div>
                    </Collapse>
                </ListGroup.Item>
            </Col>
            <Col md={"1"} className='ps-0'>
                <Button className='themed-button button-additional-data'
                    onClick={() => toggleAdditionData(!showAdditionalData)}>
                    {showAdditionalData ? <BsArrowUp /> : <BsArrowDown />}
                </Button>
            </Col>
        </Row>
    );

}

export default React.memo(Game);