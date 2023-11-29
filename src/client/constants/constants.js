export const runesIconLink = (rune) =>
("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/"
    + rune.toLowerCase())

export const championIconLink = (champion) => {
    const championNameReplacement = {
        Nunuwillump: "Nunu",
        Renataglasc: "Renata",
        KhaZix: "Khazix",
        KaiSa: "Kaisa",
        FiddleSticks: "Fiddlesticks"
    }

    champion = champion.replace(/[&'\s]/g, '')

    if (championNameReplacement.hasOwnProperty(champion)) {
        champion = championNameReplacement[champion]
    }
    return "http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/" + champion + ".png"
}


export const summonerSpellIconLink = (spell) =>
    ("http://ddragon.leagueoflegends.com/cdn/13.19.1/img/spell/" + spell + ".png")

export const itemIconLink = (item) =>
    ("http://ddragon.leagueoflegends.com/cdn/13.20.1/img/item/" + item + ".png")

export const rolesOrder = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"]

export const itemKeys = ["item0", "item1", "item2", "item3", "item4", "item5"]

export const trinketKey = "item6"