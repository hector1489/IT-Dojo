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
    decrease,
    removeFromCart
  } = useContext(DataContext) as DataContextProps;

  const navigate = useNavigate();

  const updatedCart = shopCart.filter((item) => item.count > 0)
  const total = shopCart.reduce((acc, { count, price }) => acc + price * count, 0);

  const clearCart = () => {
    updatedCart.forEach((item) => removeFromCart(item.id))
  }

  const handleGoToPaying = () => {
    navigate('/paying');
  };

  return (
    <div className="box-cart">
      <div className="p-2">
      <h2 className="text-center text-uppercase fw-bold p-2">
        Order Details
       <span className='text-warning fw-bold'> : </span>
      </h2>
      </div>
      <div className="box-cart-ul p-1 bg-dark">
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
          <span className='fw-bold'> Order total: ${formatNumber(total)}</span>
        </div>
        {total > 0 && (
          <div className="btn-pay p-2">
            <Button onClick={handleGoToPaying} className='css-button-gradient'>Go to Pay</Button>
            <Button onClick={clearCart} className='css-button-gradient--8'>Clear Cart</Button>
          </div>
        )}
      </div>
    </div>
  );

};

export default ShoppingCart;
