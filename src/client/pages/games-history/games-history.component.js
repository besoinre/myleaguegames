import React from 'react';
import { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { GlobalStateContext } from '../../App'
import useGamesHistory from '../../hooks/useGamesHistory';
import ClassicSpinner from '../globals/spinner';
import GamesHistorySession from './games-history-session.component';
import GamesHistorySummary from './games-history-summary.component';

const GamesHistory = () => {

    const { state } = useContext(GlobalStateContext);
    const [historyData, historySummary, isLoading, apiError] = useGamesHistory(state.selectedPuuid, state.selectedUserId)
    const historyLoaded = historyData.length > 0 && !isLoading && Object.keys(apiError).length === 0

    return (
        <ListGroup className='mt-2' as="ul">
            {
                isLoading ?
                    <ClassicSpinner />
                    :
                    historyLoaded ?
                        <>
                            <GamesHistorySummary
                                totalWins={historySummary.totalWins}
                                totalLoses={historySummary.totalLoses}
                                totalKills={historySummary.totalKills}
                                totalAssists={historySummary.totalAssists}
                                totalDeaths={historySummary.totalDeaths}
                                totalCS={historySummary.totalCS}
                                totalTimePlayed={historySummary.totalTimePlayed}
                            />
                            {
                                historyData.map((session, index) => (
                                    <GamesHistorySession
                                        key={"session-"+index}
                                        date={session.date}
                                        games={session.games}
                                        wins={session.wins}
                                        loses={session.loses}
                                        totalKills={session.totalKills}
                                        totalAssists={session.totalAssists}
                                        totalDeaths={session.totalDeaths}
                                        totalCS={session.totalCS}
                                        totalTimePlayed={session.totalTimePlayed}
                                    />
                                ))
                            }
                        </>
                        :
                        <></>
            }
        </ListGroup >
    );

}

export default (GamesHistory);