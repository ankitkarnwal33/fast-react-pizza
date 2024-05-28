import Button from '../../ui/Button';

function EmptyCart() {
  return (
    <div className=" px-10 py-6">
      <Button to="/menu" type={'secondry'}>
        &larr; Back to menu
      </Button>

      <p className=" mt-4 font-semibold ">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
