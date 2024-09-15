import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../utility/helpers';
import { getTotalCartQuantityById } from './cartSlice';
import UpdateCartQuantity from '../../ui/UpdateCartQuantity';
import ButtonDelete from '../../ui/ButtonDelete';
import React from 'react';
import { CartItem } from '../../services/apiRestaurant';

function CartItem({ item }: { item: CartItem }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-4 sm:flex sm:items-center sm:justify-between ">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-4">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>

        <UpdateCartQuantity pizzaId={pizzaId} quantity={quantity} />

        <ButtonDelete pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
