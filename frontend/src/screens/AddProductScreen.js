import React, { useContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Store } from '../Store';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utlis.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    default:
      return state;
  }
};

export default function ProductListScreen() {
  const [{ loading, error, products, pages, loadingCreate }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const navigate = useNavigate();
  const { search } = useLocation();
  const [name, setName] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [price, setPrice] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [storage, setStorage] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;
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

  const addProductHandler = async () => {
    if (window.confirm('Are you sure to create?')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        await axios.post('/api/products', {
          name,
          slug,
          price,
          storage,
          category,
          brand,
          countInStock,
          description,
        });
        window.alert('product created successfully');
        dispatch({ type: 'CREATE_SUCCESS' });
        navigate(`/admin/`);
      } catch (err) {
        window.alert(getError(error));
        dispatch({
          type: 'CREATE_FAIL',
        });
      }
    }
  };
  return (
    <div>
      <Row>
        <Col>
          <h1>Create Product</h1>
        </Col>
        <Form onSubmit={addProductHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              placeholder="E.g iPhone 10 Pro"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name1">
            <Form.Label>Product Slug</Form.Label>
            <Form.Control
              placeholder="E.g iphone-10-pro"
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              placeholder="No symbols only numbers"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name2">
            <Form.Label>Storage</Form.Label>
            <Form.Control
              placeholder="E.g 1TB"
              onChange={(e) => setStorage(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              placeholder="E.g mobiles"
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name2">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              placeholder="E.g apple"
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name2">
            <Form.Label>Stock Level</Form.Label>
            <Form.Control
              placeholder="Only enter numbers"
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Only enter numbers"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="button" onClick={addProductHandler}>
              Create
            </Button>
          </div>
        </Form>
      </Row>
    </div>
  );
}

// import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
// import { useEffect, useReducer, useState } from 'react';
// import Container from 'react-bootstrap/esm/Container';
// import axios from 'axios';
// import Row from 'react-bootstrap/Row';
// import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
// import InputGroup from 'react-bootstrap/InputGroup';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Badge from 'react-bootstrap/Badge';
// import Button from 'react-bootstrap/Button';
// import Rating from '../components/Rating';
// import Card from 'react-bootstrap/Card';
// import { Helmet } from 'react-helmet-async';
// import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import { useContext } from 'react';
// import { Store } from '../Store';
// import Modal from 'react-bootstrap/Modal';
// import { getError } from '../utlis.js';

// //using states with a logger to fetch data from the backend
// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_REQUEST':
//       return { ...state, loading: true };
//     case 'FETCH_SUCCESS':
//       return { ...state, product: action.payload, loading: false };
//     case 'FETCH_FAIL':
//       return { ...state, loading: false, error: action.payload };
//     case 'CREATE_REQUEST':
//       return { ...state, loadingCreate: true };
//     case 'CREATE_SUCCESS':
//       return {
//         ...state,
//         loadingCreate: false,
//       };
//     case 'CREATE_FAIL':
//       return { ...state, loadingCreate: false };
//     default:
//       return state;
//   }
// };

// function AddProductScreen() {
//   const [
//     {
//       loading,
//       error,
//       product,
//       pages,
//       loadingCreate,
//       loadingDelete,
//       successDelete,
//     },
//     dispatch,
//   ] = useReducer(reducer, {
//     loading: true,
//     error: '',
//   });
//   const navigate = useNavigate();
//   const { state, dispatch: ctxDispatch } = useContext(Store);
//   const params = useParams();
//   const { id: productId } = params;
//   const [show, setShow] = useState(false);
//   const { userInfo } = state;

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const [name, setName] = useState('');
//   const [slug, setSlug] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState('');
//   const [category, setCategory] = useState('');
//   const [countInStock, setCountInStock] = useState('');
//   const [brand, setBrand] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch({ type: 'FETCH_REQUEST' });
//       try {
//         //Call axios to send a ajax request to put the result in result.
//         const result = await axios.get('/api/products');
//         dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
//       } catch (err) {
//         dispatch({ type: 'FETCH_FAIL', payload: err.message });
//       }
//     };
//     fetchData();
//   }, []);

//   const addProductHandler = async (e) => {
//     e.preventDefault();
//     try {
//       ctxDispatch({ type: 'CREATE_REQUEST' });
//       await axios.post('api/products', {
//         name,
//         slug,
//         price,
//         image,
//         category,
//         brand,
//         countInStock,
//         description,
//       });
//       ctxDispatch({ type: 'CREATE-SUCCESS' });
//     } catch (err) {
//       window.alert('Fag', err);
//       dispatch({ type: 'CREATE_FAIL' });
//     }
//   };

//   return (
//     <Container className="small-container">
//       <Helmet>
//         <title>Sign Up</title>
//       </Helmet>
//       <h1 className="my-3">Sign Up</h1>
//       <Form onSubmit={addProductHandler}>
//         <Form.Group className="mb-3" controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control onChange={(e) => setName(e.target.value)} required />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="email">
//           <Form.Label>Email</Form.Label>
//           <Form.Control required onChange={(e) => setSlug(e.target.value)} />
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="password">
//           <Form.Label>Pa</Form.Label>
//           <Form.Control required onChange={(e) => setPrice(e.target.value)} />
//           <Form.Group className="mb-3" controlId="confirmPassword">
//             <Form.Label>Co</Form.Label>
//             <Form.Control
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             />
//           </Form.Group>
//         </Form.Group>
//         <div className="mb-3">
//           <Button type="submit">button</Button>
//         </div>
//       </Form>
//     </Container>
//   );
// }
// export default AddProductScreen;
