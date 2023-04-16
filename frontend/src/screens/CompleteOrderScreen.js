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
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    basket: { basketItems },
  } = state;
  const { basket, userInfo } = state;
  const total = basket.basketItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  function order() {
    order = basket.basketItems.map((x) => ({ ...x, product: x._id }));
  }
  const orderHandler = async () => {
    try {
      dispatch({ type: 'request' });

      const { data } = await axios.put(`/api/products/${order}`, {
        productId: basket.basketItems,
      });

      ctxDispatch({ type: 'clear_basket' });
    } catch (err) {
      window.alert(err);
    }
    navigate('/');
  };

  //   const updateProductHandler = async () => {
  //     try {
  //       dispatch({ type: 'UPDATE_REQUEST' });
  //       await axios.put(`/api/products/${product._id}`, {
  //         _id: productId,
  //         name,
  //         price,
  //         category,
  //         brand,
  //         countInStock,
  //         description,
  //         storage,
  //       });
  //       dispatch({
  //         type: 'UPDATE_SUCCESS',
  //       });
  //       window.alert('Product updated successfully');
  //       navigate('/admin');
  //     } catch (err) {
  //       window.alert(getError(err));
  //       dispatch({ type: 'UPDATE_FAIL' });
  //     }
  //   };
  //   const updateProductHandler = async () => {
  //     try {
  //       dispatch({ type: 'UPDATE_REQUEST' });
  //       await axios.put(`/api/products/${product._id}`, {
  //         _id: productId,
  //         name,
  //         price,
  //         category,
  //         brand,
  //         countInStock,
  //         description,
  //         storage,
  //       });
  //       dispatch({
  //         type: 'UPDATE_SUCCESS',
  //       });
  //       window.alert('Product updated successfully');
  //       navigate('/admin');
  //     } catch (err) {
  //       window.alert(getError(err));
  //       dispatch({ type: 'UPDATE_FAIL' });
  //     }
  //   };
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
