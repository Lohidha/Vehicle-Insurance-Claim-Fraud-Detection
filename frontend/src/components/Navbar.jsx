import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, LayoutDashboard, FileSearch, History, Info, Home, LogIn, LogOut } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    
    // Listen to custom auth events
    window.addEventListener('auth-change', handleAuthChange);
    
    // Check on location change in case local storage changed in another tab
    handleAuthChange();

    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login');
  };

  const publicNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Login', path: '/login', icon: LogIn },
    { name: 'Sign Up', path: '/signup', icon: LogIn },
  ];

  const protectedNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Predict Claim', path: '/predict', icon: FileSearch },
    { name: 'History', path: '/history', icon: History },
    { name: 'About', path: '/about', icon: Info },
  ];

  const navItems = isLoggedIn ? protectedNavItems : publicNavItems;

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-slate-800">FraudSafe AI</span>
          </Link>
          <div className="flex space-x-1 items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {/* Additional Public Action */}
            {!isLoggedIn && (
              <Link
                to="/login"
                className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
              >
                Get Started
              </Link>
            )}

            {/* Logout Action */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="ml-2 flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
