import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
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
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
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

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [storage, setStorage] = useState('');

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

  const removeProductHandler = async (product) => {
    try {
      await axios.delete(`/api/products/${product._id}`);
      window.alert('Product Removed');
      handleClose();
      navigate('/admin');

      dispatch({ type: 'DELETE_SUCCESS' });
    } catch (err) {
      console.log(err.response);
      dispatch({ type: 'DELETE_FAIL' });
    }
  };

  const updateProductHandler = async () => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/products/${product._id}`, {
        _id: productId,
        name,
        price,
        category,
        brand,
        countInStock,
        description,
        storage,
      });
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      window.alert('Product updated successfully');
      navigate('/admin');
    } catch (err) {
      window.alert(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

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

            <ListGroup as="ol" numbered>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Product Name</div>
                  {product.name}
                </div>
                <InputGroup
                  onSubmit={updateProductHandler}
                  size="sm"
                  className="mb-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                >
                  <Form.Control placeholder="Enter a new Name" />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => updateProductHandler(product.name)}
                  >
                    Change
                  </Button>
                </InputGroup>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Category</div>
                  {product.category}
                </div>
                <InputGroup
                  onSubmit={updateProductHandler}
                  size="sm"
                  className="mb-3"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <Form.Control placeholder="Enter a New Product Category" />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => updateProductHandler(product.category)}
                  >
                    Change
                  </Button>
                </InputGroup>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Storage</div>
                  {product.storage}
                </div>
                <InputGroup
                  onSubmit={updateProductHandler}
                  size="sm"
                  className="mb-3"
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                >
                  <Form.Control placeholder="Enter a Storage Amount" />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => updateProductHandler(product.storage)}
                  >
                    Change
                  </Button>
                </InputGroup>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Price</div>
                  {product.price.toFixed(2)}
                </div>
                <InputGroup
                  onSubmit={updateProductHandler}
                  size="sm"
                  className="mb-3"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                >
                  <Form.Control placeholder="Enter a New Price" />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => updateProductHandler(product.price)}
                  >
                    Change
                  </Button>
                </InputGroup>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Stock Level</div>
                  {product.countInStock}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Brand</div>
                  {product.brand}
                </div>
                <InputGroup
                  onSubmit={updateProductHandler}
                  size="sm"
                  className="mb-3"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <Form.Control placeholder="Enter a New Product Brand" />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => updateProductHandler(product.brand)}
                  >
                    Change
                  </Button>
                </InputGroup>
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
                <InputGroup
                  onSubmit={updateProductHandler}
                  size="sm"
                  className="mb-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                >
                  <Form.Control placeholder="Enter a New Description" />
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => updateProductHandler(product.description)}
                  >
                    Change
                  </Button>
                </InputGroup>
              </ListGroup.Item>
            </ListGroup>
            <Form on onSubmit={updateProductHandler}>
              <h2>Stock Control</h2>
              <Row className="align-items-center">
                <Col sm={3} className="my-1">
                  <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                    Name
                  </Form.Label>
                  <Form.Control
                    value={countInStock}
                    id="inlineFormInputName"
                    onChange={(e) => setCountInStock(e.target.value)}
                    required
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
                      Removing Product: {product.name}. This will delete this
                      product from the website, Are you sure?
                    </Form.Label>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => removeProductHandler(product)}
                >
                  Remove
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
