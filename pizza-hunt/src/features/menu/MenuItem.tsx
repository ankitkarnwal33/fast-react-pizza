import Button from '../../ui/Button';
import UpdateCartQuantity from '../../ui/UpdateCartQuantity';
import { formatCurrency } from '../../utility/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getTotalCartQuantityById } from '../cart/cartSlice';
import ButtonDelete from '../../ui/ButtonDelete';
import React from 'react';
import { Menu } from '../../services/apiRestaurant';

function MenuItem({ pizza }: { pizza: Menu }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getTotalCartQuantityById(id));
  const isInCart = currentQuantity > 0;
  const dispatch = useDispatch();

  function handleAddToCart(event) {
    event.preventDefault();
    const newPizza = {
      pizzaId: id,
      name,
      unitPrice,
      totalPrice: unitPrice * 1,
      quantity: 1,
    };
    dispatch(addItem(newPizza));
  }
  return (
    <li className="flex gap-4 py-4">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-60 grayscale' : ''} `}
      />
      <div className="flex grow flex-col pt-2">
        <p className="font-semibold">{name}</p>
        <p className=" text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500 ">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className=" flex gap-8">
              <UpdateCartQuantity pizzaId={id} quantity={currentQuantity} />
              <ButtonDelete type={'small'} pizzaId={id}>
                Delete
              </ButtonDelete>
            </div>
          )}
          {!soldOut && !isInCart && (
            <>
              <Button
                type={'small'}
                onClick={handleAddToCart}
                disabled={false}
                to={''}
              >
                Add to cart
              </Button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
