import React, { useState } from 'react';
import { Lock, Mail, Key, ShieldCheck, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { loginAdmin } from './adminAuth';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const res = loginAdmin(email, password);
      if (res.success) {
        onLoginSuccess(res.session);
      } else {
        setError(res.message);
      }
      setLoading(false);
    }, 400);
  };

  const handleQuickLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    const res = loginAdmin(demoEmail, demoPass);
    if (res.success) {
      onLoginSuccess(res.session);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-stone-200/80 p-8 sm:p-10 relative overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rosebud-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-studio-100 rounded-full blur-3xl opacity-60 pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="w-14 h-14 bg-studio-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-studio-600/20">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Studio Admin Portal
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Sign in to manage catalog, product images, & store listings
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@littlegiftstudio.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-studio-500 focus:border-transparent bg-stone-50/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-studio-500 focus:border-transparent bg-stone-50/50"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-studio-600 hover:bg-studio-700 text-white text-sm font-semibold shadow-md shadow-studio-600/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Management Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Logins for Client / Dev Convenience */}
        <div className="mt-8 pt-6 border-t border-stone-100">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 text-center mb-3">
            Quick Fill Credentials
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickLogin('client@littlegiftstudio.com', 'giftclient2026')}
              className="p-2.5 rounded-lg bg-studio-50 hover:bg-studio-100 text-studio-700 font-medium text-left border border-studio-200/60 transition-colors flex flex-col"
            >
              <span className="font-semibold flex items-center gap-1">
                <UserCheck className="w-3 h-3 text-studio-600" /> Client Account
              </span>
              <span className="text-[10px] text-stone-500">giftclient2026</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@littlegiftstudio.com', 'studioadmin2026')}
              className="p-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-left border border-stone-200 transition-colors flex flex-col"
            >
              <span className="font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-stone-600" /> Dev Admin
              </span>
              <span className="text-[10px] text-stone-500">studioadmin2026</span>
            </button>
          </div>
        </div>

        {onCancel && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-stone-500 hover:text-stone-800 underline"
            >
              ← Return to Little Gift Studio Store
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
