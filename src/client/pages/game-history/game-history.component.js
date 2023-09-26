import React from 'react';
import GameItem from './game-item.component';
import { ListGroup } from 'react-bootstrap';
import useActiveGame from '../../hooks/useActiveGame';

const GameHistory = () => {

    // To get active game, use summonerData.id
    let [gameData, isLoading, apiError] = useActiveGame("V8jjArdQugoeW-05om6ivo-Wfq291hWso-BS2WE-fAQ8gxj7cZP8EwqeKA")
    
    console.log(gameData)

    return (
        <>

        <ListGroup variant="flush">
            <GameItem></GameItem>
        </ListGroup>
        </>
    );

}

export default (GameHistory);