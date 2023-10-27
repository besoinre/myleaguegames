import React from 'react';
import MatchItem from './match-item.component';
import Kda from './kda.component';

const SessionMatches = ({ date, games, wins, loses, selectedUserId, totalKills, totalAssists, totalDeaths, totalCS, totalTimePlayed }) => {
    
    return (
        <>
            <div className='session-header d-flex justify-content-between'>
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
                    <MatchItem
                        game={element.game}
                        key={selectedUserId + "-" + index}
                        selectedUserId={selectedUserId}
                        selectedParticipant={element.selectedParticipant}
                    />
                ))
            }
        </>
    )
}

export default (SessionMatches)