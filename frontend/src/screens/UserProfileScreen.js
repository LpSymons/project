import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

export default function UserProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

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
      </div>
    </div>
  );
}

{
  /* <div>
<Helmet>
  <title>Customer Address</title>
</Helmet>
<div className="container small-container">
  <h1 className="my-3">Address</h1>
  <Form onSubmit={submitHandler}>
    <Form.Group className="mb-3" controlId="fullName">
      <Form.Label>Full Name</Form.Label>
      <Form.Control
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="address">
      <Form.Label>Address</Form.Label>
      <Form.Control
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="city">
      <Form.Label>City</Form.Label>
      <Form.Control
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="postcode">
      <Form.Label>PostCode</Form.Label>
      <Form.Control
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        required
      />
    </Form.Group>{' '}
    <Form.Group className="mb-3" controlId="country">
      <Form.Label>Country</Form.Label>
      <Form.Control
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />
    </Form.Group>
    <div className="mb-3">
      <Button varient="primary" type="submit">
        Payment
      </Button>
    </div>
  </Form>
</div>
</div> */
}
