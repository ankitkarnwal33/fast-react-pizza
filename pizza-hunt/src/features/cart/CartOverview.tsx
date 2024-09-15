import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import React from 'react';

function CartOverview() {
  const totalQuantity: number = useSelector(getTotalCartQuantity);
  const totalPrice: number = useSelector(getTotalCartPrice);

  return (
    <div className="flex items-center justify-between bg-stone-600  px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        {totalQuantity !== 0 && (
          <>
            <span>{totalQuantity} pizzas</span>
            <span>${totalPrice}</span>
          </>
        )}
      </p>
      <Link to={'/cart'}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
