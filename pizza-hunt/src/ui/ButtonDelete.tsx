import { useDispatch } from 'react-redux';
import Button from './Button';
import { deleteCartItem } from '../features/cart/cartSlice';
import { FormEvent, ReactNode } from 'react';
import React from 'react';

interface Button {
  disabled?: boolean;
  children?: ReactNode;
  to?: string;
  type?: string;
  pizzaId: string;
}

function ButtonDelete({ pizzaId }: Button) {
  const dispatch = useDispatch();
  function handleDeleteCartItem(e: FormEvent): void {
    e.preventDefault();
    dispatch(deleteCartItem(pizzaId));
  }
  return (
    <Button
      type={'small'}
      onClick={handleDeleteCartItem}
      disabled={false}
      to={''}
    >
      Delete
    </Button>
  );
}

export default ButtonDelete;
