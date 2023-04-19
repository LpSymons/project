import { useContext, useEffect, useReducer, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'request':
      return { ...state, loading: true };
    case 'success':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function CompleteOrderScreen() {
  const navigate = useNavigate();
  const [{ loading, product }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const [countInStock, setCountInStock] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { basket, userInfo } = state;
  const total = basket.basketItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const orderHandler = async () => {
    try {
      dispatch({ type: 'request' });

      const prod = basket.basketItems.find((x) => x._id === product._id);
      await axios.put(`/api/products/${product._id === prod}`, {
        countInStock,
      });
      //   const existItem = basket.basketItems.find((x) => x._id === product._id);
      ctxDispatch({ type: 'clear_basket' });
      navigate('/');
    } catch (err) {
      window.alert(err);
    }
  };

  // const checkCart = (product) => {
  //   const exist = basket.basketItems.find((x) => x.id === product.id);
  //   if (exist) {
  //     window.alert('itsalive');
  //     basket.basketItems.map((x) =>
  //       x.id === product.id ? { ...(exist === product.id) } : x
  //     );
  //   }
  // };

  return (
    <div>
      <Row>
        <h1>Order Confirmation</h1>
      </Row>
      <Row>
        <h3>Thankyou for your order...</h3>
      </Row>

      <Form>
        <Col md={8}>
          <Row>
            <div className="card" id="cardOrder">
              <div className="card-header">Order Summary</div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>Thanks for your order {basket.postalAddress.fullName}</p>
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
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </blockquote>
              </div>
            </div>
            <div className="card" id="card3">
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <strong>Total Paid : </strong>£{total}
                </blockquote>
              </div>
              <Button onClick={orderHandler} varient="primary" type="button">
                Continue Shopping
              </Button>
            </div>
          </Row>
        </Col>
      </Form>
    </div>
  );
}
