import React from 'react';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import { useState, useContext } from 'react';
import useUsernameExistence from '../../hooks/useUsernameExistence';
import { BsPersonPlusFill } from "react-icons/bs";
import { GlobalStateContext } from '../../App';
import { ACTIONS } from '../../hooks/useGlobalState'

const FormUserName = () => {

    const [newUserName, setNewUserName] = useState("");
    const [userData, isLoading, apiError] = useUsernameExistence(newUserName)
    const { dispatchState } = useContext(GlobalStateContext);

    let addUserName = (e) => {
        e.preventDefault();
        if (Object.keys(apiError).length === 0 && !isLoading) {
            dispatchState(
                [
                    { type: ACTIONS.ADD_USER, userName: newUserName },
                    {
                        type: ACTIONS.DEFAULT_UPDATE, updateObject: {
                            selectedUserId: userData.id,
                            selectedUserName: userData.name,
                            selectedPuuid: userData.puuid
                        }
                    }
                ]
            )
            setNewUserName("")
        }
    }

    let userNameInputOnChange = (e) => {
        setNewUserName(e.target.value)
    }

    return (
        <>
            <Form onSubmit={addUserName} className="mt-2">

                <input
                    type="text" placeholder="Enter Username"
                    required value={newUserName}
                    onChange={userNameInputOnChange}
                    className='username-input mb-1' />

                {
                    newUserName.trim() !== "" && isLoading
                        ?
                        <Card className="username-result username-loading justify-content-center">
                            <Card.Body>Loading...</Card.Body>
                        </Card>
                        :
                        newUserName.trim() !== "" && Object.keys(apiError).length !== 0
                            ?
                            <Card className='username-result username-not-found justify-content-center'>
                                <Card.Body>User {newUserName} doesn't exist.</Card.Body>
                            </Card>
                            :
                            newUserName.trim() !== "" && Object.keys(apiError).length === 0
                                ?
                                <Card className='username-result username-found search-result'>
                                    <Button type="submit" className='themed-button h-100 w-100 text-start'>
                                        <Row>
                                            <Col md={"auto"}>
                                                <BsPersonPlusFill />
                                            </Col>
                                            <Col md={"auto"}>
                                                <span>
                                                    {userData.name} lv.{userData.summonerLevel}
                                                </span>
                                            </Col>
                                        </Row>
                                    </Button>
                                </Card>
                                :
                                <></>
                }
            </Form>
        </>
    );
}

export default FormUserName;