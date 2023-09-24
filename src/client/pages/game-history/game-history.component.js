import React from 'react';
import GameItem from './game-item.component';
import { ListGroup } from 'react-bootstrap';

const GameHistory = () => {

    return (
        <>
        <ListGroup variant="flush">
            <GameItem></GameItem>
            <GameItem></GameItem>
            <GameItem></GameItem>
        </ListGroup>
        </>
    );

}

export default (GameHistory);