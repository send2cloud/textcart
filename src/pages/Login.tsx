
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { indianRestaurantSample } from '../utils/sampleMenus';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // For demo purposes, we'll accept any credentials
    // In a real app, you would validate credentials against a server
    
    // Set login state in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    
    // Initialize with Indian restaurant data
    localStorage.setItem('currentRestaurant', JSON.stringify(indianRestaurantSample));
    
    toast.success('Login successful');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Menu Creator</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="your@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="••••••••"
            />
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full px-4 py-2 text-white bg-primary hover:bg-primary/90 rounded-md"
            >
              Sign In
            </button>
          </div>
        </form>
        
        <div className="text-center text-sm text-muted-foreground">
          <span>Don't have an account? </span>
          <button 
            onClick={() => navigate('/register')}
            className="text-primary hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
