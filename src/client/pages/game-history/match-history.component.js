import React from 'react';
import { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { GlobalStateContext } from '../../App'
import useMatchHistory from '../../hooks/useMatchHistory';
import ClassicSpinner from '../../components/spinner';
import MatchItem from './match-item.component';

const MatchHistory = () => {

    const { globalState } = useContext(GlobalStateContext);
    const [historyData, isLoading, apiError] = useMatchHistory(globalState.selectedPuuid)

    const historyLoaded = historyData.length > 0 && !isLoading && Object.keys(apiError).length === 0

    return (
        <ListGroup className='mt-2' as="ul">
            {
                isLoading ?
                    <ClassicSpinner />
                    :
                    historyLoaded ?
                        historyData.map((game, index) =>
                            <MatchItem game={game} key={globalState.selectedUserId + "-" + index} selectedUserId={globalState.selectedUserId} />
                        )
                        :
                        <></>
            }
        </ListGroup >
    );

}

export default (MatchHistory);