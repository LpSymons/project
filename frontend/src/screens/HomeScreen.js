import { Link } from 'react-router-dom';
//import data from '../data';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

//using states with reducer fuction to get current item and preform a state update
//returning the new state, re rendering the component if there has been a change.
const reducer = (state, action) => {
  switch (action.type) {
    case 'get_request':
      return { ...state, loading: true };
    case 'request_success':
      return { ...state, products: action.payload, loading: false };
    case 'request_failed':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'get_request' });
      try {
        //Call axios to send a ajax request to put the result in result.
        const result = await axios.get('/api/products');
        dispatch({ type: 'request_success', payload: result.data });
      } catch (err) {
        dispatch({ type: 'request_failed', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Shopping Project</title>
      </Helmet>
      {/* shows an loading message to the user with states */}
      <h1>Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                {/* Gets the product component */}
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
