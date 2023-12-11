import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Details.css';
import DataContext, { DataContextProps, Product } from '../../context/context';

const Details: React.FC = () => {
  const { products } = useContext(DataContext) as DataContextProps;
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const product: Product | undefined = products.find((p) => p.id === id);

  return (
    <Container className="details-container">
      {product && (
        <Row className='product-details'>
          <Col md={6}>
            <h2>Product Details</h2>
            <h3>{product?.name}</h3>
            <p>Price: ${product?.price}</p>
            <p>Category: {product?.category}</p>
            <p>Stock: {product?.stock}</p>
          </Col>
          <Col md={6}>
            <img src={product?.url} alt={product?.name} className="product-image" />
          </Col>
        </Row>
      )}
       <div className='row mt-4'>
        <div className='col-md-12 text-center'>
          <Link to="/products">Return to Products</Link>
        </div>
      </div>
    </Container>
  );
};

export default Details;
