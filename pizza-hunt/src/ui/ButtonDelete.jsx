import { useDispatch } from 'react-redux';
import Button from './Button';
import { deleteCartItem } from '../features/cart/cartSlice';

function ButtonDelete({ pizzaId }) {
  const dispatch = useDispatch();
  function handleDeleteCartItem(e) {
    e.preventDefault();
    dispatch(deleteCartItem(pizzaId));
  }
  return (
    <Button type={'small'} onClick={handleDeleteCartItem}>
      Delete
    </Button>
  );
}

export default ButtonDelete;
