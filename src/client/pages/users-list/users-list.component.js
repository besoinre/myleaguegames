import React from 'react';
import { Col, Row, Container, ListGroup } from 'react-bootstrap';
import FormUserName from './form-username.component';
import useLocalStorage from '../../hooks/useLocalStorage';
import UserItem from './user-item.component';

const UsersList = () => {

  const [users, dispatchUsers] = useLocalStorage("users", { names: [] });

  return (
    <>
      <Container className='sidebar bg-light'>
        <Row>
          <Col md={12} className='my-2'>
            <FormUserName dispatchUsers={dispatchUsers} />
          </Col>
          <Col md={12}>
            <ListGroup className='mt-2' as="ul">
              {
                users.names.length > 0 ?
                  users.names.map((element, index) => (
                    <UserItem key={element} user={element} dispatchUsers={dispatchUsers}></UserItem>
                  )) : <ListGroup.Item>No users were added yet</ListGroup.Item>
              }
            </ListGroup >
          </Col>
        </Row>
      </Container>
    </>
  );

}

export default (UsersList);