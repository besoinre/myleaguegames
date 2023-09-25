import React from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import UserList from './user-list.component';
import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import useUsernameExistence from '../../hooks/useUsernameExistence';
import ClassicSpinner from '../../components/spinner'

const FormUserName = () => {

    const [users, setUsers] = useLocalStorage("users", { names: [] });
    const [newUserName, setNewUserName] = useState("");
    const [userData, isLoading, apiError] = useUsernameExistence(newUserName)

    let addUserName = (e) => {
        e.preventDefault();
        let currentUsers = users.names;
        setUsers({ ...users, names: [...currentUsers, newUserName] })
        setNewUserName("")
    }

    let deleteUserName = (e) => {
        e.preventDefault();
        let nameIndex = e.target.index.value;
        let usersNames = users.names;
        usersNames.splice(parseInt(nameIndex), 1);
        setUsers(users)
        setUsers({ ...users, names: usersNames })
    }

    let userNameInputOnChange = (e) => {
        setNewUserName(e.target.value)
    }

    return (
        <>
            <Card>
                <Card.Header>
                    Summoners List
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={addUserName}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Enter Username" required value={newUserName}
                                onChange={userNameInputOnChange} />
                        </Form.Group>
                        {
                            newUserName.trim() !== "" && isLoading
                                ?
                                <Card bg="light" text="dark" className="m-1 d-flex justify-content-center align-items-center p-2">
                                    <ClassicSpinner />
                                </Card>
                                :
                                newUserName.trim() !== "" && Object.keys(apiError).length !== 0
                                    ?
                                    <Card bg="danger" text="white" className="m-1">
                                        <Card.Body>User {newUserName} doesn't exist.</Card.Body>
                                    </Card>
                                    :
                                    newUserName.trim() !== "" && Object.keys(apiError).length === 0
                                        ?
                                        <Card bg="light" text="dark" className="m-1 p-0">
                                            <Card.Body className="p-0"><Button className="search-result" type="submit">{userData.name} lv.{userData.summonerLevel}</Button></Card.Body>
                                        </Card>
                                        :
                                        <></>
                        }
                    </Form>
                    <UserList users={users.names} onSubmit={deleteUserName}></UserList>
                </Card.Body>
            </Card>
        </>
    );

}

export default (FormUserName);