import React from 'react';
import { FormEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  disabled: boolean;
  children: ReactNode;
  to: string;
  type: string;
  onClick(e: FormEvent): void;
}

function Button({
  disabled = false,
  children,
  to = '',
  type,
  onClick,
}: ButtonProps) {
  const base =
    'inline-block rounded-full bg-yellow-400  text-sm font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ';
  const styles = {
    primary: base + ' px-4 py-3 sm:px-6 sm:py-3',
    small: base + ' px-2 py-1 md:px-5 md:py-2 text-sm',
    secondry:
      'inline-block rounded-full text-sm border border-stone-400 font-semibold uppercase tracking-wide text-stone-600 transition-colors duration-300 hover:bg-stone-200 hover:text-stone-800 focus:bg-stone-400 focus:outline-none focus:ring focus:ring-stone-600 focus:ring-offset-2 px-4 py-2',
    ex_small:
      'inline-block rounded-full font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 hover:text-stone-800 focus:bg-yellow-300 focus:outline-none  px-3 py-1 bg-yellow-400',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]} onClick={onClick}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
