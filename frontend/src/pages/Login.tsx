import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://gaming-onn.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        
        // Add fade-out animation class
        const container = document.querySelector('.login-container');
        if (container) {
          container.classList.add('fade-out');
        }
        
        // Quick transition before navigation
        await new Promise(resolve => setTimeout(resolve, 300));
        navigate('/', { replace: true });
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container min-h-screen flex items-center justify-center bg-cover bg-center p-4 bg-blend-overlay transition-opacity duration-300"
      style={{ 
        backgroundImage: "url('/assets/login-bg.jpg')",
        backgroundColor: "rgba(0, 0, 0, 0.9)"
      }}>
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black/50 to-pink-900/20 animate-gradient-slow" />

      <div className={`relative w-full max-w-md p-8 bg-gray-900/95 rounded-2xl 
        shadow-[0_0_50px_0_rgba(139,92,246,0.1)] backdrop-blur-sm 
        transform transition-all duration-500 ease-out
        ${isLoading ? 'scale-[0.99] opacity-90' : 'hover:scale-[1.01]'}
        border border-purple-500/10 login-container`}>
        
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-text">
            GAMING_ONN
          </h2>
          <p className="mt-2 text-purple-300">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 mb-4 text-sm text-pink-400 bg-pink-900/30 rounded-lg border border-pink-800">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <input
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                autoComplete="email"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 placeholder-gray-500 transition-all duration-300 group-hover:border-purple-400"
              />
            </div>

            <div className="relative group">
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-100 placeholder-gray-500 transition-all duration-300 group-hover:border-purple-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-3 text-lg font-medium text-white 
              bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 
              rounded-lg relative overflow-hidden
              transition-all duration-300 
              ${isLoading ? 'cursor-wait' : 'hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 hover:scale-[1.02]'}
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
              focus:ring-offset-gray-900 disabled:opacity-75
              shadow-lg shadow-purple-500/20`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-3 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-pink-200 animate-pulse">
                  Logging in...
                </span>
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-pink-400 animate-loading-bar"></div>
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-400 hover:text-pink-400 transition-colors duration-300 font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
