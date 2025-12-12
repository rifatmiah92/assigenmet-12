
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import Swal from 'sweetalert2';
import { Trophy, Mail, Lock, User, Image as ImageIcon } from 'lucide-react';

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useApp();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const success = await login(data.email, data.password);
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Welcome back!',
        text: 'Login successful',
        timer: 1500,
        showConfirmButton: false
      });
      navigate('/');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Invalid email or password credentials.',
        confirmButtonColor: '#d33'
      });
    }
  };

  const handleGoogleLogin = () => {
      login('alice@arena.com', '123');
      Swal.fire('Info', 'Simulated Google Login as Alice (User)', 'info');
      navigate('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
        <div className="text-center">
           <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-full inline-flex mb-4">
             <Trophy className="h-8 w-8 text-primary-600 dark:text-primary-400" />
           </div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
             New to Arena? <Link to="/register" className="font-bold text-primary-600 hover:text-primary-500">Create an account</Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                {...register('email', { required: true })}
                type="email" 
                className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition" 
                placeholder="Email address" 
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                 {...register('password', { required: true })}
                 type="password" 
                 className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition" 
                 placeholder="Password" 
              />
            </div>
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg shadow-primary-500/30 transition transform hover:-translate-y-0.5">
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span></div>
            </div>
            <button onClick={handleGoogleLogin} className="mt-6 w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-sm font-bold text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
            </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 text-center text-xs text-gray-400 space-y-1 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <p>Demo Credentials:</p>
            <div className="grid grid-cols-3 gap-2">
                <div>Admin:<br/>admin@arena.com</div>
                <div>Creator:<br/>creator@arena.com</div>
                <div>User:<br/>alice@arena.com</div>
            </div>
            <p className="pt-1 font-mono text-gray-500">Pass: 123</p>
        </div>
      </div>
    </div>
  );
};

export const Register = () => {
  const { register, handleSubmit } = useForm();
  const { register: registerUser } = useApp();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        photoUrl: data.photoUrl || 'https://i.pravatar.cc/150',
    });
    Swal.fire({
      icon: 'success',
      title: 'Account Created!',
      text: 'You can now log in.',
      confirmButtonColor: '#7c3aed'
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">Join The Arena</h2>
          <p className="mt-2 text-sm text-gray-500">Start your journey to glory today.</p>
        </div>
        
        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User className="h-5 w-5 text-gray-400" /></div>
              <input {...register('name', { required: true })} className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Full Name" />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
              <input {...register('email', { required: true })} type="email" className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Email Address" />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-400" /></div>
              <input {...register('password', { required: true })} type="password" className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Password" />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><ImageIcon className="h-5 w-5 text-gray-400" /></div>
              <input {...register('photoUrl')} className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Photo URL (Optional)" />
            </div>

            <button type="submit" className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 focus:outline-none shadow-lg shadow-primary-500/30 transition transform hover:-translate-y-0.5">
              Create Account
            </button>
        </form>
        <div className="text-center mt-6">
             <Link to="/login" className="text-sm font-semibold text-primary-600 hover:text-primary-500">Already have an account? Log in</Link>
        </div>
      </div>
    </div>
  );
};
