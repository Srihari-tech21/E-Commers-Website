import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Store, UserCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartItemsCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Store className="h-6 w-6" />
          <span className="text-xl font-bold">SportsHub</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Products
          </Link>
          {isAdmin && (
            <>
              <Link to="/admin/products" className="text-sm font-medium transition-colors hover:text-primary">
                Manage Products
              </Link>
              <Link to="/admin/orders" className="text-sm font-medium transition-colors hover:text-primary">
                Manage Orders
              </Link>
            </>
          )}
          {user && (
            <>
              <Link to="/orders" className="text-sm font-medium transition-colors hover:text-primary">
                My Orders
              </Link>
              <Link to="/profile" className="text-sm font-medium transition-colors hover:text-primary">
                Profile
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
