// Admin Authentication & Session Management

const AUTH_STORAGE_KEY = 'lgs_admin_session';
const CREDENTIALS_KEY = 'lgs_admin_credentials';

// Read Default Accounts from Environment Variables
export function getDefaultAdminAccounts() {
  const accounts = [];

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@littlegiftstudio.com';
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'studioadmin2026';
  const adminRole = import.meta.env.VITE_ADMIN_ROLE || 'Developer / Super Admin';
  const adminName = import.meta.env.VITE_ADMIN_NAME || 'Dev Admin';

  if (adminEmail && adminPassword) {
    accounts.push({
      email: adminEmail,
      password: adminPassword,
      role: adminRole,
      name: adminName
    });
  }

  const clientEmail = import.meta.env.VITE_CLIENT_EMAIL || 'client@littlegiftstudio.com';
  const clientPassword = import.meta.env.VITE_CLIENT_PASSWORD || 'giftclient2026';
  const clientRole = import.meta.env.VITE_CLIENT_ROLE || 'Store Owner';
  const clientName = import.meta.env.VITE_CLIENT_NAME || 'Little Gift Studio Owner';

  if (clientEmail && clientPassword) {
    accounts.push({
      email: clientEmail,
      password: clientPassword,
      role: clientRole,
      name: clientName
    });
  }

  return accounts;
}

export function getAdminAccounts() {
  const defaultAccounts = getDefaultAdminAccounts();
  try {
    const saved = localStorage.getItem(CREDENTIALS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load credentials', e);
  }
  return defaultAccounts;
}

export function saveAdminAccounts(accounts) {
  try {
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error('Failed to save credentials', e);
  }
}

export function loginAdmin(email, password) {
  const trimmedEmail = email.trim().toLowerCase();
  const defaultAccounts = getDefaultAdminAccounts();
  const savedAccounts = getAdminAccounts();

  // Look in both default env accounts and saved accounts
  const combinedAccounts = [...defaultAccounts];
  savedAccounts.forEach(acc => {
    if (!combinedAccounts.some(a => a.email.toLowerCase() === acc.email.toLowerCase())) {
      combinedAccounts.push(acc);
    }
  });

  const matched = combinedAccounts.find(
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
