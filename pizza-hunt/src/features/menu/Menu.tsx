import { useSelector } from 'react-redux';
import { getMenu, Menu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import { useLoaderData } from 'react-router-dom';
import React from 'react';

function Menu() {
  const menu: Menu[] = useLoaderData();
  return (
    <ul className="space-y divide-y divide-stone-200 px-5">
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
