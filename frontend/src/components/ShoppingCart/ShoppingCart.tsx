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
        <h2>Detalles del pedido:</h2>
      </div>
      <div className="p-1 bg-dark">
        <ul className="cart-ul">
          {shopCart?.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="item-details">
                <span className="fw-bold text-white" style={{ textTransform: 'capitalize' }}>
                  {item?.name}
                </span>
                <div className="quantity-controls">
                  <span className="fw-bold text-white">Precio: $ {formatNumber(item?.price)} </span>
                  <Button variant="danger" onClick={() => decrease(item?.id)}>
                    -
                  </Button>
                  <b className='text-white p-2'>{item?.count}</b>
                  <Button variant="primary" onClick={() => increase(item?.id)}>
                    +
                  </Button>
                </div>
                <span className="fw-bold text-white">Total: ${formatNumber(item?.price * item?.count)} </span>
              </div>
            </li>
          ))}
        </ul>
        <div className="total-price text-white">
          <span> Total del pedido: ${formatNumber(total)}</span>
        </div>
        {total > 0 && (
          <div className="btn-price p-2">
            <Button onClick={handleGoToPaying}>Ir a pagar</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
