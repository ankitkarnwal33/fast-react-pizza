import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder() {
  const fetcher = useFetcher('/menu');

  const isLoading = fetcher.state === 'loading';
  return (
    <fetcher.Form method="PATCH">
      <Button type={'primary'}>
        {isLoading ? 'Updating...' : 'Make Priority'}
      </Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
export default UpdateOrder;
