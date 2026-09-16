// Admin Authentication & Session Management

const AUTH_STORAGE_KEY = 'lgs_admin_session';
const CREDENTIALS_KEY = 'lgs_admin_credentials';

// Default Accounts for Developer and Client
const DEFAULT_ACCOUNTS = [
  {
    email: 'admin@littlegiftstudio.com',
    password: 'studioadmin2026',
    role: 'Developer / Super Admin',
    name: 'Dev Admin'
  },
  {
    email: 'client@littlegiftstudio.com',
    password: 'giftclient2026',
    role: 'Store Owner',
    name: 'Little Gift Studio Owner'
  }
];

export function getAdminAccounts() {
  try {
    const saved = localStorage.getItem(CREDENTIALS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load credentials', e);
  }
  return DEFAULT_ACCOUNTS;
}

export function saveAdminAccounts(accounts) {
  try {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Failed to save credentials', e);
  }
}

export function loginAdmin(email, password) {
  const accounts = getAdminAccounts();
  const trimmedEmail = email.trim().toLowerCase();
  const matched = accounts.find(
    acc => acc.email.toLowerCase() === trimmedEmail && acc.password === password
  );

  if (matched) {
    const session = {
      email: matched.email,
      name: matched.name,
      role: matched.role,
      token: `token_${Date.now()}_${Math.random().toString(36).substr(2)}`,
      loggedInAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    } catch (e) {}
    return { success: true, session };
  }

  return { success: false, message: 'Invalid email or password. Please check your credentials.' };
}

export function getAdminSession() {
  try {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function logoutAdmin() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {}
}

export function updateAccountPassword(email, newPassword) {
  const accounts = getAdminAccounts();
  const index = accounts.findIndex(a => a.email.toLowerCase() === email.toLowerCase());
  if (index !== -1) {
    accounts[index].password = newPassword;
    saveAdminAccounts(accounts);
    return true;
  }
  return false;
}
