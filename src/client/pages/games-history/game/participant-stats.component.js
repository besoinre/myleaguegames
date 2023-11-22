import React from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import runesReforged from '../../../assets/runesReforged.json'
import Kda from '../../globals/kda';
import Username from '../../globals/username';
import ItemsBuild from '../../globals/items-build';
import ChampionSummonerSpells from '../../globals/champion-summoner-spells';
import SummonerRunes from '../../globals/summoner-runes';

const ParticipantStats = ({ participant, maxDamageDealt, maxDamageTaken, gameDuration, totalKills }) => {

    const primaryRune = runesReforged.filter((element) =>
        element["id"] == participant["perks"]["styles"][0]["style"]
    ).map((runesSubList) =>
        runesSubList["slots"][0]["runes"].filter((element) =>
            element["id"] == participant["perks"]["styles"][0]["selections"][0]["perk"]
        ))[0][0]

    const secondaryRune = runesReforged.filter((element) =>
        element["id"] == participant["perks"]["styles"][0]["style"]
    )[0]

    return (
        <Row key={participant.summonerName} className='d-flex justify-content-between align-items-center participant-score-row'>
            <Col md={"auto"}>
                <Row>
                    <ChampionSummonerSpells
                        champion={participant.championName}
                        championSize={"50px"}
                        spell1={participant.summoner1Id}
                        spell2={participant.summoner2Id}
                        spellSize={"25px"}
                    />
                    <SummonerRunes
                        primaryName={primaryRune["name"]}
                        primaryIcon={primaryRune["icon"]}
                        secondaryName={secondaryRune["name"]}
                        secondaryIcon={secondaryRune["icon"]}
                        size={"25px"}
                    />
                </Row>
            </Col>
            <Col md={"2"} className='d-flex flex-column'>
                <span className='participant-summoner-name'>
                    <Username name={participant.summonerName} id={participant.summonerId} puuid={participant.puuid} />
                </span>
                <span className='participant-summoner-level'>
                    Level {participant.summonerLevel}
                </span>

            </Col>
            <Col md={"auto"} className='d-flex flex-column'>
                <span >
                    {participant.kills}/{participant.deaths}/{participant.assists} {' '}
                    ({(((participant.kills + participant.assists) / totalKills) * 100).toFixed(1)}%)
                </span>
                <Kda
                    kills={participant.kills}
                    deaths={participant.deaths}
                    assists={participant.assists}
                    kdaLabel={true}
                />
            </Col>
            <Col md={"1"}>
                <Row>
                    <Col md={12}>
                        {(participant.totalMinionsKilled + participant.neutralMinionsKilled)}cs
                    </Col>
                    <Col md={12}>
                        {((participant.totalMinionsKilled + participant.neutralMinionsKilled) / (gameDuration / 60000)).toFixed(1)}/min
                    </Col>
                </Row>
            </Col>
            <Col md={"1"} className='d-flex flex-column justify-content-center'>
                <div className='participant-damage-dealt'>{participant.totalDamageDealtToChampions.toLocaleString('en-US', { style: 'decimal' })}</div>
                <ProgressBar className="participant-damage-bar"
                    variant="danger"
                    max={maxDamageDealt}
                    now={participant.totalDamageDealtToChampions}
                />
            </Col>
            <Col md={"1"} className='d-flex flex-column justify-content-center'>
                <div className='participant-damage-taken'>{participant.totalDamageTaken.toLocaleString('en-US', { style: 'decimal' })}</div>
                <ProgressBar className="participant-damage-bar"
                    variant="secondary"
                    max={maxDamageTaken}
                    now={participant.totalDamageTaken}
                />
            </Col>
            <Col md={"auto"}>
                <ItemsBuild participant={participant} size={"30px"} />
            </Col>
        </Row >
    );

}

export default React.memo(ParticipantStats);