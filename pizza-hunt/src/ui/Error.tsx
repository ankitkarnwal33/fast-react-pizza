import { useNavigate, useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';
import React from 'react';

function NotFound() {
  const error: any = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.message || error.data}</p>
      <LinkButton to={'-1'}>&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
