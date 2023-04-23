import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export default function UserProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const adminMessage = 'Admin';
  const navigate = useNavigate();

  const adminHandler = () => {
    navigate('/admin');
  };

  return (
    <div>
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <div className="container small-container">
        <h1>{userInfo.name}'s Profile</h1>
        <InputGroup className="mb-3">
          <InputGroup.Text>Username: {userInfo.name}</InputGroup.Text>
          <Form.Control placeholder="Enter New Name" aria-label="Change Name" />
          <Button variant="btn btn-primary" id="button-addon2">
            Change
          </Button>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Email: {userInfo.email}</InputGroup.Text>
          <Form.Control
            placeholder="Enter New Email"
            aria-label="Change Name"
          />
          <Button variant="btn btn-primary" id="button-addon2">
            Change
          </Button>
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Password: </InputGroup.Text>
          <Form.Control
            placeholder="Change Password"
            aria-label="Change Name"
          />{' '}
          <InputGroup.Text>Confirm: </InputGroup.Text>
          <Form.Control
            placeholder="Confirm Password"
            aria-label="Change Name"
          />
          <Button variant="btn btn-primary" id="button-addon2">
            Change
          </Button>
        </InputGroup>
        <InputGroup className="mb-3">
          <div>
            {userInfo.isAdmin === true ? (
              <Button type="submit" onClick={adminHandler}>
                Admin Panel
              </Button>
            ) : null}
          </div>
        </InputGroup>
      </div>
    </div>
  );
}
