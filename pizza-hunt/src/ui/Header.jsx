import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/users/username';
function Header() {
  return (
    <header className="flex items-center justify-between border-b  border-stone-300 bg-yellow-400 px-4 py-3 uppercase">
      <Link to={'/'} className="tracking-widest">
        Pizza King Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
