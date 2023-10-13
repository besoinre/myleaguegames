import React from 'react';
import { Col, ListGroup, Row, Image } from 'react-bootstrap';
import queuesJSON from '../../assets/queues.json'
import { useTranslation } from 'react-i18next';
import ParticipantScore from './participant-score.component';

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
    const rolesOrder = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"]

    const gameDate = new Date(game.info.gameEndTimestamp).toLocaleDateString(undefined, optionsDate)
    const gameDuration =
        String(new Date(game.info.gameEndTimestamp - game.info.gameStartTimestamp).getMinutes()).padStart(2, '0')
        + ":"
        + String(new Date(game.info.gameEndTimestamp - game.info.gameStartTimestamp).getSeconds()).padStart(2, '0')

    return (
        <ListGroup.Item className={(game.gameResult === "Win" ? 'game-won-bg' : 'game-lost-bg') + ' history-game-row m-2'}>
            <Row >
                <Col md={"auto"}>
                    <p className={(game.gameResult === "Win" ? 'game-won-text' : 'game-lost-text') + ' fw-bold mb-0'}>
                        {t(queuesJSON.filter((element) =>
                            element.queueId === parseInt(game.info.queueId)
                        )[0].description)}
                    </p>
                    <p className='fw-lighter mb-1'>
                        {gameDate}
                    </p>
                    <hr className='my-1' />
                    <p className='mb-0 fw-semibold'>
                        {game.gameResult}
                    </p>
                    <p className='mb-0'>
                        {gameDuration}
                    </p>
                </Col>
                <Col md={"auto"}>
                    <Image
                        src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/" + game.championName + ".png"}
                        alt={game.championName}
                        width={"80px"}
                    />
                    {game.info.participants.filter((element) => element.summonerId === selectedUserId).map((participant) => {
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
                <Col>
                    <Row>
                        <Col md={6}>
                            <Row>
                                {
                                    game.info.participants.filter((element) => element.teamId === 100).sort((a, b) => rolesOrder.indexOf(a.individualPosition) - rolesOrder.indexOf(b.individualPosition))
                                        .map((participant) => (
                                            <ParticipantScore key={participant.summonerName} participant={participant} />
                                        ))
                                }
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row>
                                {
                                    game.info.participants.filter((element) => element.teamId === 200).sort((a, b) => rolesOrder.indexOf(a.individualPosition) - rolesOrder.indexOf(b.individualPosition))
                                        .map((participant) => (
                                            <ParticipantScore key={participant.summonerName} participant={participant} />
                                        ))
                                }
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </ListGroup.Item>
    );

}

export default (MatchItem);