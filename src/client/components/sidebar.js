import React from 'react';
import { Col, Image, Row, Container } from 'react-bootstrap';
import FormUserName from '../pages/users-list/form-username.component';

const SideBar = () => {

  return (
    <>
      <Container className='sidebar bg-body-tertiary'>
        <Row className="justify-content-md-center p-2">
          <Col md={8}>
            <Image src="../logo512.png" roundedCircle fluid alt='shaco icon' id="sidebaricon" />
          </Col>
        </Row>
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