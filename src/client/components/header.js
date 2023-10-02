import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = () => {

    return (
        <>
            <Navbar className="bg-primary ml-2">
                <Navbar.Brand href="#">
                    <img
                        alt=""
                        src="../LoL_icon.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    My League Games
                </Navbar.Brand>
            </Navbar>
        </>
    );

}

export default (Header);