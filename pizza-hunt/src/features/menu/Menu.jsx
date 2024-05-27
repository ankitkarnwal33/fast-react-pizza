import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { useLoaderData } from "react-router-dom";

function Menu() {
  const menu = useLoaderData();
  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const data = await getMenu();
  return data;
}

export default Menu;
