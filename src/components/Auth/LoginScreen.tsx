import React, { useState } from 'react';
import { useHouse } from '../../context/HouseContext';
import { MahanadiLogo } from '../MahanadiLogo';
import { RegistrationModal } from './RegistrationModal';
import { 
  Mail, 
  Smartphone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  KeyRound, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { 
    loginWithEmail, 
    loginWithMobileOtp, 
    loginWithGoogle, 
    users, 
    switchUser 
  } = useHouse();

  const [authTab, setAuthTab] = useState<'email' | 'mobile'>('email');
  
  // Email Form State
  const [email, setEmail] = useState('rohan.verma@mahanadi.school.edu');
  const [password, setPassword] = useState('mahanadi123');
  const [showPassword, setShowPassword] = useState(false);

  // Mobile Form State
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [timer, setTimer] = useState(30);

  // UI state
  const [error, setError] = useState<string | null>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Validation
  const validateIndianMobile = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    const clean10 = cleaned.length === 12 && cleaned.startsWith('91') ? cleaned.slice(2) : cleaned.slice(-10);
    return /^[6-9]\d{9}$/.test(clean10);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    const success = loginWithEmail(email);
    if (!success) {
      setError('Invalid email address. Please check your credentials or use the demo accounts below.');
    }
  };

  const handleSendOtp = () => {
    setError(null);
    if (!validateIndianMobile(mobileNumber)) {
      setError('Please enter a valid 10-digit Indian mobile number (+91 6xxxxxxxxx to 9xxxxxxxxx).');
      return;
    }
    setOtpSent(true);
    setOtpCode('123456'); // Pre-fill test OTP for easy testing
    setTimer(30);
  };

  const handleMobileLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const digitsOnly = mobileNumber.replace(/\D/g, '');
    const clean10 = digitsOnly.length === 12 && digitsOnly.startsWith('91') 
      ? digitsOnly.slice(2) 
      : digitsOnly.slice(-10);
    const formatted = `+91 ${clean10}`;

    const success = loginWithMobileOtp(formatted, otpCode.trim());
    if (!success) {
      setError('Invalid OTP code. For this demo, use 123456 or select a demo account.');
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex flex-col justify-between py-6 px-4">
      {/* Top Bar / Logo */}
      <div className="max-w-md w-full mx-auto flex flex-col items-center text-center mt-2">
        <MahanadiLogo size="xl" showText={false} variant="dark" />
        
        <h1 
          className="text-2xl xs:text-3xl font-black tracking-widest text-amber-400 mt-2"
          style={{ fontFamily: 'var(--font-crest)' }}
        >
          MAHANADI
        </h1>
        <p className="text-xs font-bold tracking-[0.25em] uppercase text-white mt-0.5">
          PRIDE BY MY SIDE
        </p>
        <p className="text-xs text-sky-200/80 mt-1.5 max-w-xs">
          Secure Portal for Students, House Teachers & House Captain
        </p>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-5 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-white/10 dark:border-slate-800 overflow-hidden">
        
        {/* Toggle Login Method */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-1.5">
          <button
            onClick={() => { setAuthTab('email'); setError(null); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              authTab === 'email'
                ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Email Login
          </button>
          <button
            onClick={() => { setAuthTab('mobile'); setError(null); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              authTab === 'mobile'
                ? 'bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile OTP Login
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl flex items-start gap-2.5 text-xs text-rose-700 dark:text-rose-300 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Email Login Form */}
          {authTab === 'email' && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  School / Registered Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="student@mahanadi.school.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                id="btn-login-email"
                className="w-full py-3 bg-gradient-to-r from-blue-700 to-sky-700 hover:from-blue-800 hover:to-sky-800 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 mt-2"
              >
                <span>Sign In to Mahanadi House</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Mobile OTP Login Form */}
          {authTab === 'mobile' && (
            <form onSubmit={handleMobileLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Indian Mobile Number
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500 select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="9876543210"
                      value={mobileNumber}
                      onChange={e => setMobileNumber(e.target.value)}
                      className="w-full pl-12 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="px-3 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors whitespace-nowrap"
                  >
                    {otpSent ? 'Resend OTP' : 'Send OTP'}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  Format: +91 9876543210 (10 digits starting with 6-9)
                </p>
              </div>

              {otpSent && (
                <div className="animate-in fade-in space-y-2">
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300 flex items-center justify-between">
                    <span>SMS OTP sent to +91 {mobileNumber}</span>
                    <span className="font-mono font-bold bg-blue-200 dark:bg-blue-800 px-1.5 py-0.5 rounded text-[11px]">
                      Test OTP: 123456
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Enter 6-Digit OTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otpCode}
                      onChange={e => setOtpCode(e.target.value)}
                      placeholder="123456"
                      className="w-full tracking-widest text-center text-lg font-bold py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    id="btn-verify-otp"
                    className="w-full py-3 bg-gradient-to-r from-blue-700 to-sky-700 hover:from-blue-800 hover:to-sky-800 text-white font-bold rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Verify & Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-2 text-slate-400 font-semibold">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            id="btn-google-login"
            onClick={handleGoogleLogin}
            className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 transition-all flex items-center justify-center gap-2.5 shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google School Workspace</span>
          </button>

          {/* Create Account / Joining Form Link */}
          <div className="mt-5 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              New to Mahanadi House?{' '}
              <button
                type="button"
                id="btn-open-register"
                onClick={() => setIsRegisterOpen(true)}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline ml-1"
              >
                Enroll / Joining Form
              </button>
            </p>
          </div>
        </div>

        {/* Quick Testing Profiles Switcher */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-2.5">
            Instant 1-Click Role Access (Evaluation)
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              id="quick-login-captain"
              onClick={() => {
                const captain = users.find(u => u.role === 'CAPTAIN');
                if (captain) switchUser(captain.id);
              }}
              className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-left transition-all"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Captain</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">Rohan Verma</p>
            </button>

            <button
              type="button"
              id="quick-login-teacher"
              onClick={() => {
                const teacher = users.find(u => u.role === 'HOUSE_TEACHER');
                if (teacher) switchUser(teacher.id);
              }}
              className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-left transition-all"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Teacher</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">Mrs. Sharma</p>
            </button>

            <button
              type="button"
              id="quick-login-member"
              onClick={() => {
                const member = users.find(u => u.role === 'MEMBER');
                if (member) switchUser(member.id);
              }}
              className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300 text-left transition-all"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>Member</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">Priya Patel</p>
            </button>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="max-w-md w-full mx-auto text-center text-[11px] text-slate-400/80">
        <p>Mahanadi House Management System • St. Xavier's Model School</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Role-based security & attendance verification enabled</p>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={() => setIsRegisterOpen(false)}
      />

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-blue-600" />
              Reset Password
            </h3>
            {forgotSuccess ? (
              <div className="py-4 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Password reset link and OTP has been dispatched to <strong>{forgotEmail}</strong>.
                </p>
                <button
                  onClick={() => { setForgotPasswordOpen(false); setForgotSuccess(false); }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold w-full"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <div className="mt-3 space-y-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter your registered email address or mobile number to receive password recovery instructions.
                </p>
                <input
                  type="email"
                  placeholder="Enter registered email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl dark:text-white"
                />
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    onClick={() => setForgotPasswordOpen(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (forgotEmail.trim()) {
                        setForgotSuccess(true);
                      }
                    }}
                    className="px-4 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Send Reset Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
