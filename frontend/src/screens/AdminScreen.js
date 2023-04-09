import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import Card from 'react-bootstrap/Card';
import { Helmet } from 'react-helmet-async';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useContext } from 'react';
import { Store } from '../Store';
import Product from '../components/ProductAdmin';
import { Link } from 'react-router-dom';
//import data from '../data';
import logger from 'use-reducer-logger';

//using states with a logger to fetch data from the backend
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function AdminScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, product }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        //Call axios to send a ajax request to put the result in result.
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  //a direct function that plugs the slug

  return (
    <div>
      <Helmet>
        <title>Admin Panel</title>
      </Helmet>
      <div>
        {userInfo && userInfo.isAdmin ? (
          <div>
            {/* shows an loading message to the user with states */}
            <h1>Admin Screen</h1>
            <Row md={3}>
              <Col>
                <Link to={`/addProduct`}>
                  <Button>Add Product</Button>
                </Link>
              </Col>{' '}
            </Row>
            <div className="products">
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <Row>
                  {product.map((product) => (
                    <Col
                      key={product.slug}
                      sm={2}
                      md={2}
                      lg={2}
                      className="mb-3"
                    >
                      {/* Gets the product component */}
                      <Product product={product}></Product>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </div>
        ) : (
          window.alert('This page is restricted')
        )}
      </div>
    </div>
  );
}

//   const adminCheckHandler = async (isAdmin) => {
//     const { data } = await axios.get(`/api/users/${isAdmin}`);
//     if (data.isAdmin === false) {
//       this.adminPass = adminPass;
//       adminPass = true;
//       window.alert('This page is restricted');
//       <h1>Hello</h1>;
//       return <redirect to="/" />;
//     }
//   };
//   <InputGroup className="mb-3">
//           <div>
//             {userInfo.isAdmin === true ? (
//               <Button type="submit" onClick={adminHandler}>
//                 Admin Panel
//               </Button>
//             ) : null}
//           </div>
//         </InputGroup>
// }
