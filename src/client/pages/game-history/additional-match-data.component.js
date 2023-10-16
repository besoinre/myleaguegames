import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import ParticipantScore from './participant-score.component';

const AdditionalMatchData = ({ game }) => {

    const rolesOrder = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"]

    const maxDamageDealt = game.info.participants.reduce((acc, current) => {
        return Math.max(acc, current.totalDamageDealtToChampions);
    }, -Infinity);

    const maxDamageTaken = game.info.participants.reduce((acc, current) => {
        return Math.max(acc, current.totalDamageTaken);
    }, -Infinity);

    const gameDuration = game.info.gameEndTimestamp - game.info.gameStartTimestamp

    const totalKills100 = game.info.participants.reduce((acc, current) => {
        return (current.teamId === 100 ? acc + current.kills : acc)
    }, 0)
    const totalKills200 = game.info.participants.reduce((acc, current) => {
        return (current.teamId === 200 ? acc + current.kills : acc)
    }, 0)

    return (
        <Row>
            <Col md={6}>
                <Row>
                    {
                        game.info.participants.filter((element) => element.teamId === 100).sort((a, b) => rolesOrder.indexOf(a.individualPosition) - rolesOrder.indexOf(b.individualPosition))
                            .map((participant) => (
                                <ParticipantScore
                                    key={participant.summonerName}
                                    participant={participant}
                                    maxDamageDealt={maxDamageDealt}
                                    maxDamageTaken={maxDamageTaken}
                                    gameDuration={gameDuration}
                                    totalKills={totalKills100}
                                />
                            ))
                    }
                </Row>
            </Col>
            <Col md={6}>
                <Row>
                    {
                        game.info.participants.filter((element) => element.teamId === 200).sort((a, b) => rolesOrder.indexOf(a.individualPosition) - rolesOrder.indexOf(b.individualPosition))
                            .map((participant) => (
                                <ParticipantScore
                                    key={participant.summonerName}
                                    participant={participant}
                                    maxDamageDealt={maxDamageDealt}
                                    maxDamageTaken={maxDamageTaken}
                                    gameDuration={gameDuration}
                                    totalKills={totalKills200}
                                />
                            ))
                    }
                </Row>
            </Col>
        </Row>
    )

}

export default (AdditionalMatchData);