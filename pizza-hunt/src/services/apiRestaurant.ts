const API_URL: string = 'https://react-fast-pizza-api.onrender.com/api';

export interface Menu {
  id: string;
  imageUrl: string;
  ingredients: string[];
  name: string;
  soldOut: boolean;
  unitPrice: number;
}

export interface CartItem {
  addIngredients: string[];
  name: string;
  pizzaId: string;
  quantity: number;
  removeIngredients: string[];
  totalPrice: number;
  unitPrice: number;
}

export interface OrderStatus {
  cart: CartItem[];
  customer: string;
  estimatedDelivery: string;
  id: string;
  orderPrice: number;
  priority: boolean;
  priorityPrice: number;
  status: string;
}

export async function getMenu(): Promise<Menu | never> {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error('Failed getting menu');

  const { data } = await res.json();
  return data;
}

export async function getOrder(id: string): Promise<OrderStatus> {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);
  const { data } = await res.json();
  return data;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    console.log(data);
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}

export async function updateOrder(id: string, updateObj): Promise<any> {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your order');
  }
}
