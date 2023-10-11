import React from 'react';
import { Col, Image } from 'react-bootstrap';

const ParticipantScore = ({ participant }) => {

    const kda = ((participant.kills + participant.assists) / participant.deaths) == "Infinity"
        ? "Perfect"
        : Math.round(((participant.kills + participant.assists) / participant.deaths) * 100) / 100

    return (
        <Col md={12} key={participant.summonerName}>
            <Image
                width={"20px"}
                src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/" + participant.championName + ".png"}
                alt={participant.championName}
            />
            <span className='fw-semibold mx-2'>
                {participant.summonerName}
            </span>
            <span>
                {participant.kills}/{participant.deaths}/{participant.assists}
            </span>
            <span
                className={'mx-2 fw-semibold '
                    + (kda < 2 ? "text-dark-emphasis" : kda < 4 ? "text-success" : kda < 6 ? "text-primary" : "text-danger")}
            >
                {kda}:1 KDA
            </span>
        </Col>
    );

}

export default (ParticipantScore);