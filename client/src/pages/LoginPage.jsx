import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Truck, Route, Wrench, BarChart3, ChevronDown, Mail, Lock, EyeOff, Eye } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login: redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen font-inter">
      {/* Left Section: Illustration & Value Prop */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-surface-container to-surface-container-high relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-container opacity-5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <Car className="text-primary shrink-0" size={36} />
            <h1 className="text-3xl font-bold text-primary tracking-tight">TransitOps</h1>
          </div>
          
          <h2 className="text-4xl font-semibold text-on-surface mb-6 max-w-md tracking-tight leading-tight">
            Smart Transport Operations Platform
          </h2>
          <p className="text-base font-medium text-on-surface-variant max-w-md mb-12 leading-relaxed">
            Empowering modern fleets with intelligent routing, real-time analytics, and automated maintenance workflows.
          </p>
          
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="p-2 bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 flex-shrink-0">
                <Truck className="text-secondary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-on-surface">Fleet Management</h3>
                <p className="text-sm text-on-surface-variant">Real-time visibility into asset location and status.</p>
              </div>
            </li>
            
            <li className="flex items-start gap-4">
              <div className="p-2 bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 flex-shrink-0">
                <Route className="text-tertiary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-on-surface">Dispatch Automation</h3>
                <p className="text-sm text-on-surface-variant">AI-driven routing for maximum operational efficiency.</p>
              </div>
            </li>
            
            <li className="flex items-start gap-4">
              <div className="p-2 bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 flex-shrink-0">
                <Wrench className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-on-surface">Maintenance Tracking</h3>
                <p className="text-sm text-on-surface-variant">Predictive alerts to minimize unexpected downtime.</p>
              </div>
            </li>
            
            <li className="flex items-start gap-4">
              <div className="p-2 bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 flex-shrink-0">
                <BarChart3 className="text-primary-container" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-medium text-on-surface">Fuel Analytics</h3>
                <p className="text-sm text-on-surface-variant">Comprehensive insights into consumption and spend.</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Large Logistics Illustration */}
        <div className="relative z-10 w-full mt-12 rounded-xl overflow-hidden shadow-card border border-outline-variant/20 flex items-center justify-center">
            <img src="/transit-illustration.png" alt="Transit Operations Control Center" className="w-full h-auto object-cover" />
        </div>
      </div>
      
      {/* Right Section: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 bg-surface">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-10">
            <Car className="text-primary-container" size={32} />
            <h1 className="text-2xl font-bold text-primary">TransitOps</h1>
          </div>
          
          <div className="bg-surface-container-lowest rounded-2xl p-8 sm:p-10 shadow-card border border-outline-variant/30">
            <div className="mb-8">
              <h2 className="text-2xl font-medium text-on-surface mb-2">Welcome Back</h2>
              <p className="text-sm text-on-surface-variant">Sign in to manage your fleet operations.</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Role Dropdown */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2" htmlFor="role">Role</label>
                <div className="relative">
                  <select 
                    id="role" 
                    name="role"
                    className="block w-full rounded-[14px] border border-outline-variant/40 bg-surface-container-lowest py-3 pl-4 pr-10 text-[15px] font-medium text-on-surface focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-shadow appearance-none"
                  >
                    <option value="fleet_manager">Fleet Manager</option>
                    <option value="dispatcher">Dispatcher</option>
                    <option value="safety_officer">Safety Officer</option>
                    <option value="financial_analyst">Financial Analyst</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                    <ChevronDown className="text-on-surface-variant" size={20} />
                  </div>
                </div>
              </div>
              
              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2" htmlFor="email">Email Address</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Mail className="text-on-surface-variant/70" size={20} />
                  </div>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="name@company.com"
                    defaultValue="demo@transitops.com"
                    className="block w-full rounded-[14px] border border-outline-variant/40 bg-surface-container-lowest py-3 pl-12 pr-4 text-[15px] font-medium text-on-surface placeholder-on-surface-variant/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-shadow"
                  />
                </div>
              </div>
              
              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant mb-2" htmlFor="password">Password</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Lock className="text-on-surface-variant/70" size={20} />
                  </div>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    id="password" 
                    name="password" 
                    placeholder="••••••••"
                    defaultValue="password123"
                    className="block w-full rounded-[14px] border border-outline-variant/40 bg-surface-container-lowest py-3 pl-12 pr-10 text-[15px] font-medium text-on-surface placeholder-on-surface-variant/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-shadow"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-on-surface-variant/70 hover:text-on-surface focus:outline-none p-1 rounded-full hover:bg-surface-container transition-colors"
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Remember & Forgot */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember-me" 
                    name="remember-me" 
                    defaultChecked
                    className="h-4 w-4 rounded border-outline-variant/50 text-secondary focus:ring-secondary/50 bg-surface-container-lowest"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-on-surface-variant">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-sm text-secondary hover:text-secondary-container font-medium hover:underline transition-all">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-[14px] shadow-sm text-[15px] font-medium text-on-primary bg-primary-container hover:bg-primary-container/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container transition-colors duration-200"
                >
                  Sign In
                </button>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-outline-variant/20 text-center">
              <p className="text-sm text-on-surface-variant">
                Need an account? <a href="#" className="font-medium text-secondary hover:text-secondary-container hover:underline">Contact Sales</a>
              </p>
            </div>
          </div>
          
          {/* Footer Links */}
          <div className="mt-8 flex justify-center gap-6 text-sm text-on-surface-variant/70">
            <a href="#" className="hover:text-on-surface transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-on-surface transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
