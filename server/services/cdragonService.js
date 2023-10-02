const axios = require('axios');
const all_champs = {};

function getChampionsPosition(res) {
    axios.get("https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champion-statistics/global/default/rcp-fe-lol-champion-statistics.js")
        .then(response => {
            const supportStats = response.data.match(/"SUPPORT":{.*?}/)[0].substring(10)
            const jungleStats = response.data.match(/"JUNGLE":{.*?}/)[0].substring(9)
            const midStats = response.data.match(/"MIDDLE":{.*?}/)[0].substring(9)
            const topStats = response.data.match(/"TOP":{.*?}/)[0].substring(6)
            const bottomStats = response.data.match(/"BOTTOM":{.*?}/)[0].substring(9)
            const champsRole = {
                support: supportStats,
                jungle: jungleStats,
                mid: midStats,
                top: topStats,
                bottom: bottomStats
            }
            axios.get("https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json")
                .then(response => {
                    let champions = response.data.data
                    for (const keyChampion in champions) {
                        const champion = champions[keyChampion];
                        let role = ""
                        for (const roleObject in champsRole) {
                            if (JSON.parse(champsRole[roleObject]).hasOwnProperty(champion.key)){
                                role = roleObject
                            }
                        }
                        champions[keyChampion] = {
                            ...champions[keyChampion],
                            role: role
                        }
                    }
                    res.json(champions)
                })
                .catch(err => {
                    console.error("Error getting champion data:", err);
                });
        })
        .catch(err => {
            console.error("Error getting champion statistics data:", err);
        });
}

module.exports = { getChampionsPosition };