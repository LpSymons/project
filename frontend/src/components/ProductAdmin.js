import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { products } = state;
  const {
    cart: { cartItems },
  } = state;

  const productHandler = async (item) => {
    const itemCheck = products.find((x) => x._id === product.id);
    const quantity = itemCheck ? itemCheck.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    return data;
  };

  const getProdHandler = async (item) => {
    const { data } = await axios.get(`/api/product/${item._id}`);
    return data;
  };

  //Add out of stock and hide button for basket to-do
  return (
    <div>
      <Card>
        <Link to={`/admin/product/${product.slug}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
        </Link>
        <Card.Body>
          <Link to={`/admin/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <Card.Text>£{product.price.toFixed(2)}</Card.Text>
          <Link to={`/admin/product/${product.slug}`}>
            <Button>Edit Product</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}
export default Product;
