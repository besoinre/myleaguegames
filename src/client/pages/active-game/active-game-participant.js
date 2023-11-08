import React from 'react';
import { Row, Col } from 'react-bootstrap';
import runesReforged from '../../assets/runesReforged.json'
import Username from '../globals/username';
import ChampionSummonerSpells from '../globals/champion-summoner-spells';
import SummonerRunes from '../globals/summoner-runes';

const ActiveGameParticipant = ({ participant, leftTeam }) => {

    const primaryRune = runesReforged.filter((element) =>
        element["id"] == participant.perks["perkStyle"]
    ).map((runesSubList) =>
        runesSubList["slots"][0]["runes"].filter((element) =>
            element["id"] == participant.perks["perkIds"][0]
        ))[0][0];

    const secondaryRune = runesReforged.filter((element) =>
        element["id"] == participant.perks["perkSubStyle"]
    )[0]

    return (
        <Row className={'active-game-row'} key={participant.summonerName}>
            <Col md={12} className={'active-game-participant ' + (leftTeam ? 'team-blue' : 'team-red')}>
                <Row>
                    <ChampionSummonerSpells
                        champion={participant.champion.championData.name}
                        championSize={"50px"}
                        spell1={participant.spell1Id}
                        spell2={participant.spell2Id}
                        spellSize={"25px"}
                    />
                    <SummonerRunes
                        primaryName={primaryRune["name"]}
                        primaryIcon={primaryRune["icon"]}
                        secondaryName={secondaryRune["name"]}
                        secondaryIcon={secondaryRune["icon"]}
                        size={"25px"}
                    />
                    <Col md={"auto"}>
                        <div className="fw-bold">
                            <Username name={participant.summonerName}
                                id={participant.id} puuid={participant.puuid} />
                        </div>
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
    )
}

export default React.memo(ActiveGameParticipant);