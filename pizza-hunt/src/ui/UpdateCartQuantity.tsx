import { useDispatch } from 'react-redux';
import Button from './Button';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from '../features/cart/cartSlice';
import { FormEvent } from 'react';
import React from 'react';

function UpdateCartQuantity({
  pizzaId,
  quantity,
}: {
  pizzaId: string;
  quantity: number;
}) {
  const dispatch = useDispatch();

  function handleDecreaseCartQuantity(e: FormEvent) {
    e.preventDefault();
    dispatch(decreaseItemQuantity(pizzaId));
  }
  function handleIncreaseCartQuantity(e: FormEvent) {
    e.preventDefault();
    dispatch(increaseItemQuantity(pizzaId));
  }
  return (
    <div className=" flex items-center gap-2">
      <Button
        type={'ex_small'}
        onClick={handleDecreaseCartQuantity}
        disabled={false}
        to={''}
      >
        -
      </Button>
      <span>{quantity}</span>
      <Button
        type={'ex_small'}
        onClick={handleIncreaseCartQuantity}
        disabled={false}
        to={''}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateCartQuantity;
