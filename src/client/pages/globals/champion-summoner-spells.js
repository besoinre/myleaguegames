import React from 'react'
import { championIconLink, summonerSpellIconLink } from '../../constants/constants';
import { Col, Image } from 'react-bootstrap';
import TooltipDescription from './tooltip-description';
import summonerSpells from '../../assets/summoner-spells.json'

const ChampionSummonerSpells = ({ champion, championSize, spell1, spell2, spellSize }) => {

    const summonerSpellsData = Object.values(summonerSpells.data)
    const summonerSpell1 = summonerSpellsData.filter((element) =>
        Number(element.key) === spell1
    )[0]
    const summonerSpell2 = summonerSpellsData.filter((element) =>
        Number(element.key) === spell2
    )[0]

    return (
        <>
            <Col md={"auto"} className='pe-0'>
                <TooltipDescription title={champion}>
                    <Image
                        src={championIconLink(champion)}
                        alt={champion}
                        width={championSize}
                    />
                </TooltipDescription>
            </Col>
            <Col md={"auto d-flex flex-column p-0"}>
                <TooltipDescription title={summonerSpell1.name}>
                    <Image
                        width={spellSize}
                        src={summonerSpellIconLink(summonerSpell1.id)}
                        alt={summonerSpell1.name}
                    />
                </TooltipDescription>
                <TooltipDescription title={summonerSpell2.name}>
                    <Image
                        width={spellSize}
                        src={summonerSpellIconLink(summonerSpell2.id)}
                        alt={summonerSpell2.name}
                    />
                </TooltipDescription>
            </Col>
        </>
    )
}

export default React.memo(ChampionSummonerSpells)