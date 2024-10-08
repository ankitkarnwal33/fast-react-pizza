import React, { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        id="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Order status.."
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-xs placeholder:font-medium placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
