import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import DataContext, { DataContextProps } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import './ShoppingCart.css';

const ShoppingCart: React.FC = () => {
  const {
    shopCart,
    formatNumber,
    increase,
    decrease
  } = useContext(DataContext) as DataContextProps;

  const navigate = useNavigate();

  const total = shopCart.reduce((acc, { count, price }) => acc + price * count, 0);

  const handleGoToPaying = () => {
    navigate('/paying');
  };

  return (
    <div className="container-cart">
      <div className="p-2">
        <h2>Order details:</h2>
      </div>
      <div className="p-1 bg-dark">
        <ul className="cart-ul">
          {shopCart?.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="item-details d-flex">
                <span className="fw-bold text-white p-1" style={{ textTransform: 'capitalize' }}>
                  Name: {item?.name}
                </span>
                <span className="fw-bold text-white p-1">Price: $ {formatNumber(item?.price)} </span>
                <div className="quantity-controls d-flex">
                  <Button variant="danger" onClick={() => decrease(item?.id)}>
                    -
                  </Button>
                  <b className='text-white p-2'>{item?.count}</b>
                  <Button variant="primary" onClick={() => increase(item?.id)}>
                    +
                  </Button>
                </div>
                <span className="fw-bold text-white p-1">Total: ${formatNumber(item?.price * item?.count)} </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="total-price text-white text-center">
          <span> Order total: ${formatNumber(total)}</span>
        </div>
        {total > 0 && (
          <div className="btn-pay p-2">
            <Button onClick={handleGoToPaying} className='css-button-gradient--8'>Go to Pay</Button>
          </div>
        )}
      </div>
    </div>
  );

};

export default ShoppingCart;
