import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

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

  //Add out of stock and hide button for basket to-do
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <Card.Text>£{product.price}</Card.Text>
        <Link to={`/product/${product.slug}`}>
          <Button>Edit Product</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
export default Product;
