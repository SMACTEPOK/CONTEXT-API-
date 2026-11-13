const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_USERS = [
  { id: 1, email: 'admin@test.com', password: 'admin', name: 'Адмін', role: 'admin' },
  { id: 2, email: 'user@test.com', password: 'user', name: 'Звичайний Користувач', role: 'user' }
];

export const mockLogin = async (email, password) => {
  await delay(1000);
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Невірний email або пароль');
  
  return {
    token: `fake-jwt-token-${user.id}`,
    user: { id: user.id, email: user.email, name: user.name, role: user.role, registeredAt: '2026-01-01' }
  };
};

export const mockVerifyToken = async (token) => {
  await delay(500);
  if (!token || !token.startsWith('fake-jwt-token')) throw new Error('Невалідний токен');
  const id = parseInt(token.split('-').pop());
  const user = MOCK_USERS.find(u => u.id === id);
  if (!user) throw new Error('Користувача не знайдено');
  return { id: user.id, email: user.email, name: user.name, role: user.role, registeredAt: '2026-01-01' };
};

export const mockUpdateProfile = async (userId, data) => {
  await delay(800);
  return { id: userId, ...data };
};
