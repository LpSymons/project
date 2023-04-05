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
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        //Call axios to send a ajax request to put the result in result.
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, [slug]);

  //a direct function that plugs the slug

  return (
    <div>
      <Helmet>Admin Screen</Helmet>
      <div>
        {userInfo.isAdmin === true ? (
          <div>
            <Row>
              <Col md={6}>
                <img
                  className="img-large"
                  src={product.image}
                  alt={product.name}
                ></img>
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    {/* Using helmet to display the product name as the name of the tab in chrome */}
                    <Helmet>
                      <title>{product.name}</title>
                    </Helmet>
                    <h1>{product.name}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>Storage : {product.storage}</ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                  </ListGroup.Item>
                  <ListGroup.Item>Price : £{product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description:
                    <p>{product.description}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>£{product.price}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Stock:</Col>
                          <Col>
                            {product.countInStock > 0 ? (
                              <Badge bg="success">In Stock</Badge>
                            ) : (
                              <Badge bg="danger">Out of Stock</Badge>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {/* Check stock count if greater than zero show add to cart button */}
                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <div className="d-grid">
                            <Button
                              onClick={addToCartHandler}
                              variant="primary"
                            >
                              Add to Basket
                            </Button>
                          </div>
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
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
