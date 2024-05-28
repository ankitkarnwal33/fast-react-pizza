import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const username = useSelector((store) => store.user.username);
  const cart = useSelector(getCart);
  const dispath = useDispatch();
  if (cart.length === 0) return <EmptyCart />;
  function hanleClearCart(e) {
    e.preventDefault();
    dispath(clearCart());
  }
  return (
    <div className="px-6 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-7 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className=" mt-5 space-x-3">
        <Button to="/order/new" type={'small'}>
          {' '}
          Order pizzas
        </Button>
        <Button type={'secondry'} onClick={hanleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
