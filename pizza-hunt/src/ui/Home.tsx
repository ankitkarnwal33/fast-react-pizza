import { useSelector } from 'react-redux';
import CreateUser from '../features/users/CreateUser';
import Button from './Button';
import React from 'react';

function Home() {
  const username: string = useSelector((store: any) => store.user.username);
  return (
    <div className="my-10 px-4 text-center">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl ">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button
          type={'primary'}
          to={'/menu'}
          disabled={false}
          onClick={function (e: React.FormEvent): void {
            throw new Error('Function not implemented.');
          }}
        >
          Start ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
