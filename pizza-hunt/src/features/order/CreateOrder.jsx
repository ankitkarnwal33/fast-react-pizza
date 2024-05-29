import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store/store';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { clearCart, getTotalCartPrice } from '../cart/cartSlice';
import { formatCurrency } from '../../utility/helpers';
import { fetchUserAddress } from '../users/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const [withPriority, setWithPriority] = useState(false);
  const isSubmitting = navigation.state === 'submitting'; // 'idle' || 'loading' || 'submitting'
  const dispatch = useDispatch();
  const formErrors = useActionData();
  const cart = useSelector((state) => state.cart.cart);
  const {
    username,
    position,
    address,
    error: addressError,
    status: addressStatus,
  } = useSelector((store) => store.user);
  const isLoadingAddress = addressStatus === 'loading';
  const totalPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? 0.2 * totalPrice : 0;
  const finalPrice = totalPrice + priorityPrice;
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-3 text-xl font-semibold">
        Ready to order? {"let's"} go!
      </h2>

      <Form method={'POST'} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            placeholder="name"
            className="input grow"
            defaultValue={username}
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="text-red-5 00 ml-3 mt-2  inline-block rounded-sm bg-red-400 px-2 py-1 text-xs">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative  flex flex-col gap-2 sm:flex-row sm:items-center">
          {!position.latitude && !position.longtitude && (
            <span className=" absolute right-2 top-9 sm:top-1 md:top-1">
              <Button
                type={'small'}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchUserAddress());
                }}
                disabled={isLoadingAddress}
              >
                Get address
              </Button>
            </span>
          )}

          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={address}
              disabled={isLoadingAddress}
            />
            {addressStatus === 'error' && (
              <p className="text-red-5 00 ml-3 mt-2  inline-block rounded-sm bg-red-400 px-2 py-1 text-xs">
                {addressError}
              </p>
            )}
          </div>
        </div>

        <div className="mb-10 mt-5 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className=" font-medium">
            Want to you give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="user"
            value={JSON.stringify({ position, address })}
          />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longtitude
                ? `${position.latitude}, ${position.longtitude} `
                : ''
            }
          />

          <Button disabled={isSubmitting} type={'primary'}>
            {' '}
            {isSubmitting
              ? 'Placing order...'
              : ` Order now for ${formatCurrency(finalPrice)}`}{' '}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = 'Invalid mobile number!';
  if (Object.keys(errors).length > 0) return errors;
  //Everything is okk now create new order
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
