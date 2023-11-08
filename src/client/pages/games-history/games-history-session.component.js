import React from 'react';
import Game from './game/game.component';
import Kda from '../globals/kda';

const GamesHistorySession = (
    { date, games, wins, loses, totalKills, totalAssists, totalDeaths, totalCS, totalTimePlayed }
) => {

    return (
        <>
            <div className='daily-session-header d-flex justify-content-between mb-1 p-3'>
                <div className='d-flex flex-column'>
                    <span className='session-date'>{date}</span>
                    <span className='session-result'>{wins} <span className='game-won-text'>W</span> / {loses} <span className='game-lost-text'>L</span></span>
                </div>
                <div className='d-flex justify-content-between session-average'>
                    <div className='d-flex flex-column align-items-center me-2'>
                        <span>Avg. KDA</span>
                        <Kda
                            kills={totalKills}
                            deaths={totalDeaths}
                            assists={totalAssists}
                        />
                    </div>
                    <div className='d-flex flex-column align-items-center ms-2'>
                        <span>Avg. CS/min</span>
                        <span>{((totalCS) / (totalTimePlayed / 60000)).toFixed(1)}</span>
                    </div>
                </div>
            </div>
            {
                games.map((element, index) => (
                    <Game
                        key={"match-"+index+"-"+date}
                        game={element.game}
                        selectedParticipant={element.selectedParticipant}
                    />
                ))
            }
        </>
    )
}

export default React.memo(GamesHistorySession)