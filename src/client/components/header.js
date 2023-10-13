import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useContext } from 'react';
import { GlobalThemeContext } from '../App';

const Header = () => {

    const { darkMode, toggleDarkMode } = useContext(GlobalThemeContext);

    return (
        <>
            <Navbar className="ml-2 header d-flex justify-content-between align-items-center">
                <>
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
                </>
                <Button onClick={toggleDarkMode}>
                    {
                        (darkMode === 'light'
                            ? <BsSunFill />
                            : <BsMoonFill />

                        )
                    }
                </Button>
            </Navbar>
        </>
    );
}

export default (Header);