import { LogOut, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Lock className="h-6 w-6 text-blue-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">Secure Dashboard</h1>
        </div>
        
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;