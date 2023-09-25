import React from 'react';
import { ListGroup } from 'react-bootstrap';
import UserItem from './user-item.component';

const UserList = (props) => {

    let users = props.users;
    let onSubmit = props.onSubmit

    return (
        <>
            <ListGroup className='mt-2' as="ul">
                {
                    users.length > 0 ?
                        users.map((element, index) => (
                            <UserItem user={element} index={index} removeItem={onSubmit}></UserItem>
                        )) : <ListGroup.Item>No users were added yet</ListGroup.Item>
                }
            </ListGroup >
        </>
    );

}

export default (UserList);