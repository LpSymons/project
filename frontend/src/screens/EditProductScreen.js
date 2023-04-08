import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
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
import Modal from 'react-bootstrap/Modal';
import { getError } from '../utlis.js';

//using states with a logger to fetch data from the backend
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

function EditProductScreen() {
  const [
    {
      loading,
      error,
      product,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const params = useParams();
  const { slug } = params;
  const { id: productId } = params;
  const [show, setShow] = useState(false);
  const { userInfo } = state;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        //Call axios to send a ajax request to put the result in result.
        const { data } = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
    fetchData();
  }, [slug, successDelete]);

  // const updateBasketHandler = async (item, quantity) => {
  //   //Ajax request to backend to get data of the current product
  //   const { data } = await axios.get(`/api/products/${item._id}`);

  //Delete handler
  // const removeProductHandler = async (product) => {
  //   if (window.confirm('Are you sure to delete?')) {
  //     try {
  //       await axios.delete(`/api/products/${product._id}`, {
  //         headers: { Authorization: `Bearer ${userInfo.token}` },
  //       });
  //       window.alert('product deleted successfully');
  //       dispatch({ type: 'DELETE_SUCCESS' });
  //     } catch (err) {
  //       //window.alert(error.response.data);
  //       console.log(err);
  //       dispatch({
  //         type: 'DELETE_FAIL',
  //       });
  //     }
  //   }
  // };

  const removeProductHandler = async (product) => {
    try {
      await axios.delete(`/api/products/${product._id}`);
      window.alert('Product Removed');
      dispatch({ type: 'DELETE_SUCCESS' });
    } catch (err) {
      // window.alert(error.response.data);
      //console.log(err);
      console.log(err.response);
      dispatch({ type: 'DELETE_FAIL' });
    }
  };

  // const removeProductHandler = async (product) => {
  //   try{
  //     await axios.delete(`${product._id}`);
  //   }
  // };

  // const { state, dispatch: ctxDispatch } = useContext(Store);
  // const { cart } = state;
  // const { userInfo } = state;
  // const addToCartHandler = async () => {
  //   const existItem = cart.cartItems.find((x) => x._id === product._id);
  //   const quantity = existItem ? existItem.quantity + 1 : 1;
  //   const { data } = await axios.get(`/api/products/${product._id}`);
  //   if (data.countInStock < quantity) {
  //     window.alert('Sorry. Product is out of stock');
  //     return;
  //   }
  //   ctxDispatch({
  //     type: 'CART_ADD_ITEM',
  //     payload: { ...product, quantity },
  //   });
  //   navigate('/basket');
  // };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Admin Panel</title>
      </Helmet>
      <div>
        {userInfo && userInfo.isAdmin ? (
          <div>
            {/* shows an loading message to the user with states */}
            <h1>Admin Screen for ID = {product._id}</h1>
            <h2>{product.slug}</h2>
            <div>
              <Button onClick={() => removeProductHandler(product)}>
                test
              </Button>
            </div>
            <ListGroup as="ol" numbered>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Product Name</div>
                  {product.name}
                </div>
                <Button>Change</Button>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Category</div>
                  {product.category}
                </div>
                <Button>Change</Button>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Storage</div>
                  {product.storage}
                </div>
                <Button>Change</Button>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Price</div>
                  {product.price.toFixed(2)}
                </div>
                <Button>Change</Button>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Stock Level</div>
                  {product.countInStock}
                </div>
                <Button>Change</Button>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Brand</div>
                  {product.brand}
                </div>
                <Button>Change</Button>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Rating</div>
                  {product.rating}/5
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Number of Reviews</div>
                  {product.numReviews}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Description</div>
                  {product.description}
                </div>
                <Button>Change</Button>
              </ListGroup.Item>
            </ListGroup>
            <Form>
              <h2>Stock Control</h2>
              <Row className="align-items-center">
                <Col sm={3} className="my-1">
                  <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                    Name
                  </Form.Label>
                  <Form.Control
                    id="inlineFormInputName"
                    placeholder="Enter Stock Amount (Digits only)"
                  />
                </Col>
                <Col xs="auto" className="my-1">
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
            <Form>
              <h2>Remove Product</h2>
              <Button variant="danger" onClick={handleShow} type="button">
                Remove
              </Button>
            </Form>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Removing Product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>
                      Removing Product: {product.name}. Are you sure?
                    </Form.Label>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => removeProductHandler(product._id)}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        ) : (
          window.alert('This page is restricted')
        )}
      </div>
    </div>
  );
}
export default EditProductScreen;
