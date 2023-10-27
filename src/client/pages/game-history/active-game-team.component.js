import React from 'react';
import { ListGroup, Container, Row, Col, Image } from 'react-bootstrap';
import summonerSpells from '../../assets/summoner-spells.json'
import TooltipDescription from '../../components/tooltip'
import runesReforged from '../../assets/runesReforged.json'

const ActiveGameTeam = ({ team, leftTeam }) => {

    const summonerSpellsData = Object.values(summonerSpells.data)
    const runesImageLink = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/"

    return (
        <ListGroup horizontal>
            <Container>
                {team.map((participant, index) =>
                    <Row className={'active-game-row'} key={participant.summonerName}>
                        <Col md={12} className={'active-game-participant ' + (leftTeam ? 'team-blue' : 'team-red')}>
                            <Row>
                                <Col md={"auto pe-0"}>
                                    <TooltipDescription title={participant.champion.championData.name}>
                                        <Image
                                            width={"50px"}
                                            src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/" + participant.champion.championData.id + ".png"}
                                            alt={participant.champion.championData.id}
                                        />
                                    </TooltipDescription>
                                </Col>
                                <Col md={"auto d-flex flex-column px-0"}>
                                    {
                                        summonerSpellsData.filter((element) =>
                                            Number(element.key) === participant.spell1Id
                                        ).map((element) => (
                                            <TooltipDescription title={element.name}>
                                                <Image
                                                    width={"25px"}
                                                    src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/" +
                                                        element.id + ".png"}
                                                    alt={participant.spell1Id}
                                                />
                                            </TooltipDescription>
                                        ))
                                    }
                                    {
                                        summonerSpellsData.filter((element) =>
                                            Number(element.key) === participant.spell2Id
                                        ).map((element) => (
                                            <TooltipDescription title={element.name}>
                                                <Image
                                                    width={"25px"}
                                                    src={"http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/" +
                                                        element.id + ".png"}
                                                    alt={participant.spell2Id}
                                                />
                                            </TooltipDescription>
                                        ))
                                    }
                                </Col>
                                <Col md={"auto d-flex flex-column px-1"}>
                                    {
                                        runesReforged.filter((element) =>
                                            element["id"] == participant.perks["perkStyle"]
                                        ).map((runesSubList) =>
                                            runesSubList["slots"][0]["runes"].filter((element) =>
                                                element["id"] == participant.perks["perkIds"][0]
                                            ).map((rune) => (

                                                <TooltipDescription title={rune["name"]}>
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
                                            element["id"] == participant.perks["perkSubStyle"]
                                        ).map((element) => (
                                            <TooltipDescription title={element["name"]}>
                                                <Image
                                                    width={"25px"}
                                                    src={runesImageLink + element["icon"].toLowerCase()}
                                                    alt={element["key"]}
                                                />
                                            </TooltipDescription>
                                        ))
                                    }
                                </Col>
                                <Col md={"auto"}>
                                    <div className="fw-bold">{participant.summonerName}</div>
                                    {
                                        participant.hasOwnProperty("rank") ?
                                            <>{participant.rank} {participant.lp}</>
                                            :
                                            "UNRANKED"
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}
            </Container>
        </ListGroup>
    )
}

export default (ActiveGameTeam);