import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Star } from './Star';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    basket: { basketItems },
  } = state;

  //Define update item handler
  const addBasketHandler = async (item) => {
    const existItem = basketItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    //Ajax request to backend to get data of the current product
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'basket_add',
      payload: { ...item, quantity },
    });
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
        <Star rating={product.rating} reviews={product.numReviews}>
          {' '}
        </Star>
        <Card.Text>£{product.price.toFixed(2)}</Card.Text>
        <Button onClick={() => addBasketHandler(product)}>Add to Basket</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
