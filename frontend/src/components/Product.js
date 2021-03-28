import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 product'>
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
        <Card.Img src={product.image} variant='top' />

        <Card.Body>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>

          <Card.Text as='div'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>

          <Card.Text as='h3'>R${product.price}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Product;
