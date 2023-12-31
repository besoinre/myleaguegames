import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ParticipantStats from './participant-stats.component';
import { rolesOrder } from '../../../constants/constants';

const GameDetails = ({ game }) => {

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
            <Col md={12} className='mb-3 participant-team'>
                {
                    game.info.participants
                        .filter((element) => element.teamId === 100)
                        .sort((a, b) =>
                            rolesOrder.indexOf(a.individualPosition) - rolesOrder.indexOf(b.individualPosition))
                        .map((participant) => (
                            <ParticipantStats
                                key={participant.summonerName}
                                participant={participant}
                                maxDamageDealt={maxDamageDealt}
                                maxDamageTaken={maxDamageTaken}
                                gameDuration={gameDuration}
                                totalKills={totalKills100}
                            />
                        ))
                }
            </Col>
            <hr />
            <Col md={12} className='participant-team'>
                {
                    game.info.participants
                        .filter((element) => element.teamId === 200)
                        .sort((a, b) =>
                            rolesOrder.indexOf(a.individualPosition) - rolesOrder.indexOf(b.individualPosition))
                        .map((participant) => (
                            <ParticipantStats
                                key={participant.summonerName}
                                participant={participant}
                                maxDamageDealt={maxDamageDealt}
                                maxDamageTaken={maxDamageTaken}
                                gameDuration={gameDuration}
                                totalKills={totalKills200}
                            />
                        ))
                }
            </Col>
        </Row>
    )
}

export default React.memo(GameDetails);