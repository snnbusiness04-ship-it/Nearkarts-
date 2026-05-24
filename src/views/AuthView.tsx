import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Store, User, ArrowRight, ShieldCheck, Smartphone } from 'lucide-react';
import { UserRole } from '../types';
import { signInWithGoogle } from '../firebase';

interface AuthViewProps {
  onLoginSuccess: (role: UserRole) => void;
}

export function AuthView({ onLoginSuccess }: AuthViewProps) {
  const [step, setStep] = useState<'role_selection' | 'phone_input' | 'otp_input'>('role_selection');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep('otp_input');
    }
  };

  const handleVerifyOtp = () => {
    if (otp.join('').length === 4) {
      onLoginSuccess(selectedRole);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      onLoginSuccess(selectedRole);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to login with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-b-[40px] -z-10 overflow-hidden shadow-lg">
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-yellow-400/20 rounded-full blur-2xl"></div>
      </div>

      <div className="flex-1 flex flex-col p-6 pt-16 mt-4 z-10">
        <div className="text-white mb-10 text-center">
          <div className="w-16 h-16 bg-yellow-400 rounded-2xl mx-auto flex items-center justify-center shadow-inner mb-4">
            <Store className="w-8 h-8 text-blue-800" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter italic uppercase mb-2">NearKart</h1>
          <p className="text-blue-100 font-medium">Your neighborhood marketplace.</p>
        </div>

        <motion.div 
          className="bg-white rounded-[2rem] p-6 shadow-2xl flex-1 max-h-[600px] border border-slate-100 flex flex-col"
          layout
        >
          <AnimatePresence mode="wait">
            {step === 'role_selection' && (
              <motion.div
                key="role_selection"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col h-full"
              >
                <div className="mb-8">
                  <h2 className="text-xl font-black uppercase italic tracking-tight text-slate-800">Join NearKart</h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Select how you want to use the app</p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => setSelectedRole('customer')}
                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center text-left ${
                      selectedRole === 'customer' 
                        ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-50' 
                        : 'border-slate-100 hover:border-blue-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors ${
                      selectedRole === 'customer' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <User size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className={`font-black uppercase tracking-wide text-sm ${selectedRole === 'customer' ? 'text-blue-900' : 'text-slate-700'}`}>Customer</h3>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 font-bold">Shop from nearby stores</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedRole('shop_owner')}
                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center text-left ${
                      selectedRole === 'shop_owner' 
                        ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-50' 
                        : 'border-slate-100 hover:border-blue-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors ${
                      selectedRole === 'shop_owner' ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <Store size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className={`font-black uppercase tracking-wide text-sm ${selectedRole === 'shop_owner' ? 'text-blue-900' : 'text-slate-700'}`}>Shop Owner</h3>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 font-bold">Sell to local customers</p>
                    </div>
                  </button>
                </div>

                <div className="mt-auto pt-8">
                  <button
                    onClick={() => setStep('phone_input')}
                    className="w-full bg-blue-600 text-white font-black py-4 rounded-xl flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-colors shadow-lg shadow-blue-200"
                  >
                    CONTINUE <ArrowRight size={20} strokeWidth={2.5} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'phone_input' && (
              <motion.div
                key="phone_input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col h-full"
              >
                <div className="mb-8">
                  <button 
                    onClick={() => setStep('role_selection')}
                    className="text-slate-400 hover:text-blue-600 mb-4 text-sm font-bold uppercase tracking-wider flex items-center transition-colors"
                  >
                    ← Back
                  </button>
                  <h2 className="text-xl font-black uppercase italic tracking-tight text-slate-800">Mobile Number</h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">We'll send you an OTP to verify</p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-6">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-slate-500 font-bold">+91</span>
                      <div className="w-px h-6 bg-slate-200 mx-3"></div>
                      <Smartphone size={20} className="text-blue-500" strokeWidth={2.5} />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full pl-24 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none font-black text-slate-900 transition-all placeholder:text-slate-300 placeholder:font-medium"
                      placeholder="Enter 10-digit number"
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={phone.length < 10}
                    className="w-full bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black py-4 rounded-xl flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-colors shadow-lg shadow-blue-200 disabled:shadow-none"
                  >
                    SEND OTP
                  </button>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-400 text-xs uppercase font-black tracking-wider">Or continue with</span>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 text-center text-red-500 text-sm font-bold">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full bg-slate-50 border-2 border-slate-100 text-slate-700 font-black tracking-wide py-3.5 rounded-xl flex items-center justify-center hover:border-blue-200 hover:bg-blue-50 transition-colors disabled:opacity-50"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 mr-3" alt="Google" />
                  {isLoading ? 'SIGNING IN...' : 'GOOGLE'}
                </button>
                
                <p className="text-center text-xs text-slate-400 mt-auto pt-6 font-medium">
                  By continuing, you agree to our Terms of Service.
                </p>
              </motion.div>
            )}

            {step === 'otp_input' && (
              <motion.div
                key="otp_input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col h-full"
              >
                <div className="mb-8">
                  <button 
                    onClick={() => setStep('phone_input')}
                    className="text-slate-400 hover:text-blue-600 mb-4 text-sm font-bold uppercase tracking-wider flex items-center transition-colors"
                  >
                    ← Back
                  </button>
                  <h2 className="text-xl font-black uppercase italic tracking-tight text-slate-800">Verify OTP</h2>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Sent to +91 {phone}</p>
                </div>

                <div className="flex justify-between mb-8">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={otp[index]}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        const newOtp = [...otp];
                        newOtp[index] = val;
                        setOtp(newOtp);
                        
                        if (val && index < 3) {
                          const nextInput = document.getElementById(`otp-${index + 1}`);
                          if (nextInput) nextInput.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otp[index] && index > 0) {
                          const prevInput = document.getElementById(`otp-${index - 1}`);
                          if (prevInput) prevInput.focus();
                        }
                      }}
                      className="w-[3.5rem] h-[4rem] sm:w-[4rem] sm:h-[4.5rem] text-center text-2xl font-black border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none text-slate-900 transition-all"
                    />
                  ))}
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={otp.join('').length < 4}
                  className="w-full bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black py-4 rounded-xl flex items-center justify-center transition-colors mb-6 hover:bg-yellow-400 hover:text-blue-900 shadow-lg shadow-blue-200 disabled:shadow-none uppercase tracking-wide"
                >
                  Verify & Proceed
                </button>

                <div className="text-center mt-auto">
                  <p className="text-sm text-slate-500 font-medium">
                    Didn't receive code? <button className="text-blue-600 font-black ml-1 uppercase hover:underline">Resend</button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
