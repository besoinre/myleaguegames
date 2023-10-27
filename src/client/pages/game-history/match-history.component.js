import React from 'react';
import { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { GlobalStateContext } from '../../App'
import useMatchHistory from '../../hooks/useMatchHistory';
import ClassicSpinner from '../../components/spinner';
import SessionMatches from './session-matches.component';

const MatchHistory = () => {

    const { globalState } = useContext(GlobalStateContext);
    const [historyData, isLoading, apiError] = useMatchHistory(globalState.selectedPuuid, globalState.selectedUserId)
    const historyLoaded = historyData.length > 0 && !isLoading && Object.keys(apiError).length === 0

    return (
        <ListGroup className='mt-2' as="ul">
            {
                isLoading ?
                    <ClassicSpinner />
                    :
                    historyLoaded ?
                        historyData.map((session) => (
                            <SessionMatches
                                date={session.date}
                                games={session.games}
                                wins={session.wins}
                                loses={session.loses}
                                totalKills={session.totalKills}
                                totalAssists={session.totalAssists}
                                totalDeaths={session.totalDeaths}
                                totalCS={session.totalCS}
                                totalTimePlayed={session.totalTimePlayed}
                                selectedUserId={globalState.selectedUserId}
                            />
                        ))
                        :
                        <></>
            }
        </ListGroup >
    );

}

export default (MatchHistory);