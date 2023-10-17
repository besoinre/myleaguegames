import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useContext } from 'react';
import { GlobalThemeContext } from '../App';

const Header = () => {

    const { darkMode, toggleDarkMode } = useContext(GlobalThemeContext);

    return (
        <>
            <Navbar className="header">
                <div className='d-flex justify-content-between align-items-center w-100'>
                    <img
                        alt="teemo icon"
                        src="../teemo.png"
                        width="50"
                        height="50"
                        className="d-inline-block align-top mx-3"
                    />
                    <span id='header-title'>
                        MY LEAGUE GAMES
                    </span>
                    <Button variant="outline-light" className="me-2" onClick={toggleDarkMode}>
                        {
                            (darkMode === 'light'
                                ? <BsSunFill />
                                : <BsMoonFill />

                            )
                        }
                    </Button>
                </div>
            </Navbar>
        </>
    );
}

export default (Header);