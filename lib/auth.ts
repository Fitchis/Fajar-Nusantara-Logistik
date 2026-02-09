'use server';

export interface AdminUser {
  id: string;
  email: string;
  password: string;
}

// In-memory admin users (in production, use a database)
const ADMIN_USERS: AdminUser[] = [
  {
    id: '1',
    email: 'admin@fajarlogistik.com',
    password: 'Admin@123456', // In production, use bcrypt or similar
  },
];

export async function validateAdminCredentials(email: string, password: string) {
  const user = ADMIN_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
  };
}

export async function getAdminUserByEmail(email: string) {
  return ADMIN_USERS.find((u) => u.email === email);
}
