import React from 'react';
import { Col, Row, Container, ListGroup } from 'react-bootstrap';
import FormUserName from './form-username.component';
import UserItem from './user-item.component';
import { useContext } from 'react';
import { GlobalStateContext } from '../../App'

const UsersList = () => {

  const { state } = useContext(GlobalStateContext);

  return (
    <>
      <Container className='sidebar'>
        <Row>
          <Col md={12}>
            <FormUserName />
          </Col>
          <Col md={12}>
            <ListGroup className='mt-2' as="ul">
              {
                state.names.length > 0 ?
                  state.names.map((element, index) => (
                    <UserItem key={element} user={element}></UserItem>
                  )) : <ListGroup.Item>No users were added yet</ListGroup.Item>
              }
            </ListGroup >
          </Col>
        </Row>
      </Container>
    </>
  );

}

export default UsersList;