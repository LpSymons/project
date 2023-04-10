import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { CarouselItem } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateOrderScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: basket, userInfo } = state;
  const total = basket.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <div>
        <h1>Order Confirmation</h1>
      </div>
      <Col md-4>
        <Row>
          <div class="card" id="cardOrder">
            <div class="card-header">Delivery Information</div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p>Name :</p>
                <footer class="blockquote-footer">
                  {basket.postalAddress.fullName}{' '}
                </footer>
              </blockquote>
              <blockquote class="blockquote mb-0">
                <p>Address :</p>
                <footer class="blockquote-footer">
                  {basket.postalAddress.address}{' '}
                </footer>
              </blockquote>
              <blockquote class="blockquote mb-0">
                <p>City :</p>
                <footer class="blockquote-footer">
                  {basket.postalAddress.city}{' '}
                </footer>
              </blockquote>
            </div>
          </div>
          <div class="card" id="card2">
            <div class="card-header">Products</div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <ListGroup variant="flush">
                  {basket.cartItems.map((item) => (
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
          <div class="card" id="card3">
            <div class="card-header">Amount Due</div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <strong>Total Cost : </strong>£{total}
              </blockquote>
            </div>
          </div>
        </Row>
      </Col>
      <div>
        <Button>Place Order</Button>
      </div>
    </div>
  );
}

// const [fullName, setFullName] = useState('');
// const [address, setAddress] = useState('');
// const [city, setCity] = useState('');
// const [postcode, setPostcode] = useState('');
// const [country, setCountry] = useState('');
