import React from 'react';
import Kda from '../globals/kda';

const MatchHistorySummary = (
    { totalWins, totalLoses, totalKills, totalDeaths, totalAssists, totalCS, totalTimePlayed }
) => {

    return (
        <>
            <div className='full-session-header'>
                <h1>Last 15 games</h1>
                <div className=' d-flex justify-content-between'>
                    <div className='d-flex flex-column'>
                        <span className='session-result'>{totalWins} <span className='game-won-text'>W</span> / {totalLoses} <span className='game-lost-text'>L</span></span>
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
                </div >

            </div>
        </>
    );

}

export default (MatchHistorySummary);