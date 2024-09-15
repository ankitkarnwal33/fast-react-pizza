import React from 'react';
import { OrderStatus } from '../../services/apiRestaurant';
import { formatCurrency } from '../../utility/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-5">
      <div className="flex items-center justify-between gap-2">
        <p>
          <span className=" font-bold">{quantity}&times;</span> {name}
        </p>
        <p className=" font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <span className=" p-2 px-5 text-sm">
        {isLoadingIngredients ? `Loading...` : `${ingredients}`}
      </span>
    </li>
  );
}

export default OrderItem;
