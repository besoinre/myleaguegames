import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = () => {

    return (
        <>
            <Navbar className="bg-primary bg-gradient ml-2">
                <Navbar.Brand href="#">
                    <img
                        alt=""
                        src="../teemo.png"
                        width="50"
                        height="50"
                        className="d-inline-block align-top mx-3"
                    />{' '}
                    <span id='header-title'>
                        MY LEAGUE GAMES
                    </span>
                </Navbar.Brand>
            </Navbar>
        </>
    );
}

export default (Header);