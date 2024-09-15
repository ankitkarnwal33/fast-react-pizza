import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const classes = 'text-sm text-blue-500 hover:text-blue-600';
  if (to === '-1')
    return (
      <button className={classes} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}

export default LinkButton;
