import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = () => {

    return (
        <>
            <Navbar className="bg-primary-subtle ml-2">
                <Navbar.Brand href="#">
                    <img
                        alt=""
                        src="../logo192.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    React Bootstrap
                </Navbar.Brand>
            </Navbar>
        </>
    );

}

export default (Header);