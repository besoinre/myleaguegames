import React from 'react';
import { Button, Form, Card, ListGroup } from 'react-bootstrap';
import UserItem from './user-item.component';
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
        setUsers({ ...users, names: [...users.names, newUserName] })
        setNewUserName("")
    }

    let deleteUserName = (e) => {
        e.preventDefault()
        const updatedUsers = users.names.filter((user) => user !== e.target.userName.value);
        setUsers({ names: updatedUsers });
    }

    let userNameInputOnChange = (e) => {
        setNewUserName(e.target.value)
    }

    return (
        <>
            <Card className='mt-2'>
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
                                <Card bg="light" text="dark" className="mt-2 d-flex justify-content-center align-items-center p-2">
                                    <ClassicSpinner />
                                </Card>
                                :
                                newUserName.trim() !== "" && Object.keys(apiError).length !== 0
                                    ?
                                    <Card bg="danger" text="white" className="mt-2">
                                        <Card.Body>User {newUserName} doesn't exist.</Card.Body>
                                    </Card>
                                    :
                                    newUserName.trim() !== "" && Object.keys(apiError).length === 0
                                        ?
                                        <Card bg="light" text="dark" className="mt-2 p-0">
                                            <Card.Body className="p-0"><Button className="search-result" type="submit">Click to add : {userData.name} lv.{userData.summonerLevel}</Button></Card.Body>
                                        </Card>
                                        :
                                        <></>
                        }
                    </Form>
                    <ListGroup className='mt-2' as="ul">
                        {
                            users.names.length > 0 ?
                                users.names.map((element, index) => (
                                    <UserItem key={element} user={element} removeItem={deleteUserName}></UserItem>
                                )) : <ListGroup.Item>No users were added yet</ListGroup.Item>
                        }
                    </ListGroup >
                </Card.Body>
            </Card>
        </>
    );

}

export default (FormUserName);