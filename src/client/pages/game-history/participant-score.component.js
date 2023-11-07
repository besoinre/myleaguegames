import React from 'react';
import { Row, Col, Image, ProgressBar } from 'react-bootstrap';
import summonerSpells from '../../assets/summoner-spells.json'
import TooltipDescription from '../globals/tooltip'
import runesReforged from '../../assets/runesReforged.json'
import { BsFillStopFill } from 'react-icons/bs';
import Kda from '../globals/kda';
import Username from '../globals/username';

const ParticipantScore = ({ participant, maxDamageDealt, maxDamageTaken, gameDuration, totalKills }) => {

    const itemKeys = ["item0", "item1", "item2", "item3", "item4", "item5"]
    const runesImageLink = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/"

    const summonerSpellsData = Object.values(summonerSpells.data)

    return (
        <Row key={participant.summonerName} className='d-flex justify-content-between align-items-center participant-score-row'>
            <Col md={"auto"}>
                <Row>
                    <Col md={"auto p-0"}>
                    <TooltipDescription title={participant.championName}>
                        <Image
                            width={"50px"}
                            src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/" + participant.championName + ".png"}
                            alt={participant.championName}
                        />
                        </TooltipDescription>
                    </Col>
                    <Col md={"auto d-flex flex-column p-0"}>
                        {
                            summonerSpellsData.filter((element) =>
                                Number(element["key"]) === participant.summoner1Id
                            ).map((element, index) => (
                                <TooltipDescription title={element.name} key={"tooltip-"+index+"-"+element.id}>
                                    <Image
                                        width={"25px"}
                                        src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/" +
                                            element.id + ".png"}
                                        alt={participant.summoner1Id}
                                    />
                                </TooltipDescription>
                            ))
                        }
                        {
                            summonerSpellsData.filter((element) =>
                                Number(element["key"]) === participant.summoner2Id
                            ).map((element, index) => (
                                <TooltipDescription title={element.name} key={"tooltip-"+index+"-"+element.id}>
                                    <Image
                                        width={"25px"}
                                        src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/" +
                                            element.id + ".png"}
                                        alt={participant.summoner2Id}
                                    />
                                </TooltipDescription>
                            ))
                        }
                    </Col>
                    <Col md={"auto d-flex flex-column px-1"}>
                        {
                            runesReforged.filter((element) =>
                                element["id"] == participant["perks"]["styles"][0]["style"]
                            ).map((runesSubList) =>
                                runesSubList["slots"][0]["runes"].filter((element) =>
                                    element["id"] == participant["perks"]["styles"][0]["selections"][0]["perk"]
                                ).map((rune, index) => (
                                    <TooltipDescription title={rune["name"]} key={"tooltip-"+index+"-"+rune["key"]}>
                                        <Image
                                            width={"25px"}
                                            src={runesImageLink + rune["icon"].toLowerCase()}
                                            alt={rune["key"]}
                                        />
                                    </TooltipDescription>
                                ))
                            )
                        }
                        {
                            runesReforged.filter((element) =>
                                element["id"] == participant["perks"]["styles"][0]["style"]
                            ).map((element, index) => (
                                <TooltipDescription title={element["name"]} key={"tooltip-"+index+"-"+element["key"]}>
                                    <Image
                                        width={"25px"}
                                        src={runesImageLink + element["icon"].toLowerCase()}
                                        alt={element["key"]}
                                    />
                                </TooltipDescription>
                            ))
                        }
                    </Col>
                </Row>
            </Col>
            <Col md={"2"} className='d-flex flex-column'>
                <span className='participant-summoner-name'>
                    <Username name={participant.summonerName} id={participant.summonerId} puuid={participant.puuid}/>
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
                {
                    itemKeys.filter((element) => (
                        participant[element] !== 0
                    )).map((element, index) =>
                    (
                        <Image
                            key={"tooltip-"+index+"-"+participant[element]}
                            className='participant-item'
                            width={"25px"}
                            src={"http://ddragon.leagueoflegends.com/cdn/13.20.1/img/item/" + participant[element] + ".png"}
                            alt={"item" + participant[element]}
                        />
                    )
                    )
                }
                {
                    itemKeys.filter((element) => (
                        participant[element] === 0
                    )).map((element, index) =>
                        <BsFillStopFill className='empty-item participant-item' key={"emptyItem-"+index}/>
                    )
                }
                <Image
                    className='participant-item'
                    width={"25px"}
                    src={"http://ddragon.leagueoflegends.com/cdn/13.20.1/img/item/" + participant["item6"] + ".png"}
                    alt={"item" + participant["item6"]}
                />
            </Col>
        </Row >
    );

}

export default (ParticipantScore);