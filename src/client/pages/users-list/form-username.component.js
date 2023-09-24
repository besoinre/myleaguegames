import React from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import UserList from './user-list.component';
import { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const FormUserName = () => {

    const [users, setUsers] = useLocalStorage("users", { names: [] });
    const [newUserName, setNewUserName] = useState("");

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

    return (
        <>
            <Card>
                <Card.Header>
                    Summoners List
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={addUserName}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Enter Username" required value={newUserName} onChange={(e) => {
                                setNewUserName(e.target.value)
                            }} />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={newUserName.trim() === ""}>
                            Add
                        </Button>
                    </Form>
                    <UserList users={users.names} onSubmit={deleteUserName}></UserList>
                </Card.Body>
            </Card>
        </>
    );

}

export default (FormUserName);