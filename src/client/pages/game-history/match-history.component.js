import React from 'react';
import { useContext } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { GlobalStateContext } from '../../App'
import useMatchHistory from '../../hooks/useMatchHistory';
import ClassicSpinner from '../../components/spinner';

const MatchHistory = () => {

    const { globalState } = useContext(GlobalStateContext);
    const [historyData, isLoading, apiError] = useMatchHistory(globalState.selectedPuuid)

    const isSelected = globalState.hasOwnProperty("selectedPuuid")
    const historyLoaded = Object.keys(historyData).length !== 0 && !isLoading && Object.keys(apiError).length === 0

    return (
        isSelected ?
            <ListGroup className='mt-2' as="ul">
                {
                    isLoading ?
                        <ClassicSpinner />
                        :
                        historyLoaded ?
                            historyData.map((game) =>
                                <ListGroup.Item className='game-row'>
                                    <Row >
                                        <Col md={12}>
                                            <div className="fw-bold">{game.info.gameMode} as {game.championName} : {game.gameResult} - {new Date(game.info.gameEndTimestamp - game.info.gameStartTimestamp).getMinutes()}:{new Date(game.info.gameEndTimestamp - game.info.gameStartTimestamp).getSeconds()}</div> 
                                            {new Date(game.info.gameEndTimestamp).getDay()}/{new Date(game.info.gameEndTimestamp).getMonth()}/{new Date(game.info.gameEndTimestamp).getFullYear()} {new Date(game.info.gameEndTimestamp).getHours()}:{new Date(game.info.gameEndTimestamp).getMinutes()}                                            
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                            :
                            <></>
                }
            </ListGroup >
            :
            <></>

    );

}

export default (MatchHistory);