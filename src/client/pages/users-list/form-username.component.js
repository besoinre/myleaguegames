import React from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { useState } from 'react';
import useUsernameExistence from '../../hooks/useUsernameExistence';

const FormUserName = ({ dispatchUsers }) => {

    const [newUserName, setNewUserName] = useState("");
    const [userData, isLoading, apiError] = useUsernameExistence(newUserName)

    let addUserName = (e) => {
        e.preventDefault();
        if (Object.keys(apiError).length === 0 && !isLoading) {
            dispatchUsers({ type: "ADD", userName: newUserName })
            setNewUserName("")
        }
    }

    let userNameInputOnChange = (e) => {
        setNewUserName(e.target.value)
    }

    return (
        <>
            <Form onSubmit={addUserName}>
                <Form.Group>
                    <Form.Control
                        type="text" placeholder="Enter Username"
                        required value={newUserName}
                        onChange={userNameInputOnChange}
                        className='mb-2' />
                </Form.Group>
                {
                    newUserName.trim() !== "" && isLoading
                        ?
                        <Card bg="light" text="dark" className="search-result justify-content-center">
                            <Card.Body>Loading...</Card.Body>
                        </Card>
                        :
                        newUserName.trim() !== "" && Object.keys(apiError).length !== 0
                            ?
                            <Card bg="danger" text="white" className='search-result justify-content-center'>
                                <Card.Body>User {newUserName} doesn't exist.</Card.Body>
                            </Card>
                            :
                            newUserName.trim() !== "" && Object.keys(apiError).length === 0
                                ?
                                <Card bg="light" text="dark" className='search-result'>
                                    <Button type="submit" className='h-100 w-100 text-start'><Card.Body className='d-inline px-0'>{userData.name} lv.{userData.summonerLevel}</Card.Body></Button>
                                </Card>
                                :
                                <></>
                }
            </Form>
        </>
    );
}

export default (FormUserName);