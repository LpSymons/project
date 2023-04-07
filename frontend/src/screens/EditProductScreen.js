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

function EditProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const { userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/basket');
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
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
            {/* <Row md-3>
                <Col>
                  <Link to={`/product/newProduct`}>
                    <Button>Add Product</Button>
                  </Link>
                </Col>{' '}
              </Row> */}
          </div>
        ) : (
          window.alert('This page is restricted')
        )}
      </div>
    </div>
  );
}
//     <div>
//       <Row>
//         <div>

//       {userInfo && userInfo.isAdmin ? (
//         <Col md={6}>
//           <img
//             className="img-large"
//             src={product.image}
//             alt={product.name}
//           ></img>
//         </Col>
//         <Col md={3}>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               {/* Using helmet to display the product name as the name of the tab in chrome */}
//               <Helmet>
//                 <title>{product.name}</title>
//               </Helmet>
//               <h1>{product.name}</h1>
//             </ListGroup.Item>
//             <ListGroup.Item>Storage : {product.storage}</ListGroup.Item>
//             <ListGroup.Item>
//               <Rating
//                 rating={product.rating}
//                 numReviews={product.numReviews}
//               ></Rating>
//             </ListGroup.Item>
//             <ListGroup.Item>Price : £{product.price}</ListGroup.Item>
//             <ListGroup.Item>
//               Description:
//               <p>{product.description}</p>
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={3}>
//           <Card>
//             <Card.Body>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Price:</Col>
//                     <Col>£{product.price}</Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Row>
//                     <Col>Stock:</Col>
//                     <Col>
//                       {product.countInStock > 0 ? (
//                         <Badge bg="success">In Stock</Badge>
//                       ) : (
//                         <Badge bg="danger">Out of Stock</Badge>
//                       )}
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>
//                 {/* Check stock count if greater than zero show add to cart button */}
//                 {product.countInStock > 0 && (
//                   <ListGroup.Item>
//                     <div className="d-grid">
//                       <Button onClick={addToCartHandler} variant="primary">
//                         Add to Basket
//                       </Button>
//                     </div>
//                   </ListGroup.Item>
//                 )}
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>

// ) : (
//   window.alert('This page is restricted')
//   )}
//   </div>
//       </Row>
//     </div>
//   );
// }
export default EditProductScreen;
