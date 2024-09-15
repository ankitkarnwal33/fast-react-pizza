// Test ID: IIDSAT
import { useFetcher, useLoaderData } from 'react-router-dom';
import {
  CartItem,
  getOrder,
  Menu,
  OrderStatus,
} from '../../services/apiRestaurant';
import OrderItem from './OrderItem';
import { useEffect } from 'react';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utility/helpers';
import UpdateOrder from './UpdateOrder';
import React from 'react';

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address, these are only for the restaurant staff
  const order: any = useLoaderData();
  const fetcher = useFetcher();
  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/menu');
    }
  }, [fetcher]);
  const isLoadingIngredients: boolean = fetcher.state === 'loading';
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  }: OrderStatus = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className=" space-y-8 px-4 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="flex flex-col items-center gap-4 space-x-3  sm:flex-row">
          {priority && (
            <span className=" rounded-md bg-red-600 px-3 py-1 text-sm uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-md bg-green-600 px-3 py-1 text-center text-sm uppercase tracking-wide text-green-200">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className=" font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className=" text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className=" divide-y divide-stone-200 border-b border-t">
        {cart.map((item: any) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={isLoadingIngredients}
            ingredients={fetcher.data
              ?.find((el: CartItem): boolean => el.pizzaId === item.id)
              ?.ingredients.join(', ')}
          />
        ))}
      </ul>

      <div className=" relative space-y-2 bg-stone-200 px-6 py-5">
        <p className=" text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className=" text-sm font-bold text-stone-600">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
        <span className="absolute right-4 top-8">
          <UpdateOrder />
        </span>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const loader = await getOrder(params.orderId);
  return loader;
}

export default Order;
