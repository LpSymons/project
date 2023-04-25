import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateOrderScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const { basket, userInfo } = state;
  const total = basket.basketItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const orderHandler = async () => {
    navigate('/completeOrder');
  };

  return (
    <div>
      <div>
        <h1>Order Confirmation</h1>
      </div>
      <Form>
        <Col md={8}>
          <Row>
            <div className="card" id="cardOrder">
              <div className="card-header">Delivery Information</div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>Name :</p>
                  <footer className="blockquote-footer">
                    {basket.postalAddress.fullName}{' '}
                  </footer>
                </blockquote>
                <blockquote className="blockquote mb-0">
                  <p>Address :</p>
                  <footer className="blockquote-footer">
                    {basket.postalAddress.address}{' '}
                  </footer>
                </blockquote>
                <blockquote className="blockquote mb-0">
                  <p>City :</p>
                  <footer className="blockquote-footer">
                    {basket.postalAddress.city}{' '}
                  </footer>
                </blockquote>
              </div>
            </div>
            <div className="card" id="card2">
              <div className="card-header">Products</div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <ListGroup variant="flush">
                    {basket.basketItems.map((item) => (
                      <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                          <span>{item.name}</span>
                          <Col lg={6}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid rounded img-thumbnail"
                            ></img>{' '}
                          </Col>
                          <Col md={3}>
                            <span>Quantity : {item.quantity}</span>
                          </Col>
                          <Col md={3}>Price: £{item.price}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </blockquote>
              </div>
            </div>
            <div className="card" id="card3">
              <div className="card-header">Amount Due</div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <strong>Total Cost : </strong>£{total}
                </blockquote>
              </div>
              <Button onClick={orderHandler} varient="primary" type="button">
                Pay
              </Button>
            </div>
          </Row>
        </Col>
      </Form>
      <div></div>
    </div>
  );
}
