import React from 'react';
import { Col, Image, Row, Container } from 'react-bootstrap';
import FormUserName from '../pages/users-list/form-username.component';

const SideBar = () => {

  return (
    <>
      <Container className='sidebar bg-body-tertiary'>
        <Row>
          <Col md={12}>
            <FormUserName></FormUserName>
          </Col>
        </Row>
      </Container>
    </>
  );

}

export default (SideBar);