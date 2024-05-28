import { useDispatch } from 'react-redux';
import Button from './Button';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from '../features/cart/cartSlice';

function UpdateCartQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();

  function handleDecreaseCartQuantity(e) {
    e.preventDefault();
    dispatch(decreaseItemQuantity(pizzaId));
  }
  function handleIncreaseCartQuantity(e) {
    e.preventDefault();
    dispatch(increaseItemQuantity(pizzaId));
  }
  return (
    <div className=" flex items-center gap-2">
      <Button type={'ex_small'} onClick={handleDecreaseCartQuantity}>
        -
      </Button>
      <span>{quantity}</span>
      <Button type={'ex_small'} onClick={handleIncreaseCartQuantity}>
        +
      </Button>
    </div>
  );
}

export default UpdateCartQuantity;
