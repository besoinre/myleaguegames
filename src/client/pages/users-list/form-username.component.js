import React from 'react';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import { useState, useContext } from 'react';
import useUsernameExistence from '../../hooks/useUsernameExistence';
import { BsPersonPlusFill } from "react-icons/bs";
import { GlobalStateContext } from '../../App';
import { ACTIONS } from '../../hooks/useGlobalState'

const FormUserName = () => {

    const [newUserName, setNewUserName] = useState("");
    const [tag, setTag] = useState("EUW");
    const [userData, isLoading, apiError] = useUsernameExistence(newUserName, tag)
    const { dispatchState } = useContext(GlobalStateContext);

    let addUserName = (e) => {
        e.preventDefault();
        if (Object.keys(apiError).length === 0 && !isLoading) {
            dispatchState(
                [
                    { type: ACTIONS.ADD_USER, userName: {name: userData.gameName, tag: userData.tagLine, puuid: userData.puuid} },
                    {
                        type: ACTIONS.DEFAULT_UPDATE, updateObject: {
                            selectedUserName: userData.gameName,
                            selectedTag: userData.tagLine,
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

    let tagInputOnChange = (e) => {
        setTag(e.target.value)
    }

    return (
        <>
            <Form onSubmit={addUserName} className="mt-2">
                <Row>
                    <Col md={8} className='pe-0'>
                        <input
                            type="text" placeholder="Enter Username"
                            required value={newUserName}
                            onChange={userNameInputOnChange}
                            className='username-input mb-1' />
                    </Col>
                    <Col md={4} className='ps-1'>
                        <input
                            type="text" placeholder="Enter Tag"
                            required value={tag}
                            onChange={tagInputOnChange}
                            className='username-input mb-1' />
                    </Col>
                </Row>
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
                                <Card.Body>User {newUserName} #{tag} doesn't exist.</Card.Body>
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
                                                    {userData.gameName} #{userData.tagLine}
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