export const FAKE_AUTH_COOKIE = "fake-auth-token";
export const AUTH_USER_STORAGE_KEY = "recruitment:auth-user";
export type FakeAuthResponse = {
  token: string;
  user: {
    name: string;
    email: string;
    role: "admin" | "recruiter" | "viewer";
  };
};

const VALID_USERS: Record<
  string,
  { password: string; name: string; role: FakeAuthResponse["user"]["role"] }
> = {
  "admin@example.com": {
    password: "password123",
    name: "Admin User",
    role: "admin",
  },
  "recruiter@example.com": {
    password: "recruitme",
    name: "Recruiter Jane",
    role: "recruiter",
  },
};

export const fakeLogin = async (
  email: string,
  password: string
): Promise<FakeAuthResponse> => {
  await new Promise(resolve => setTimeout(resolve, 700));

  const normalizedEmail = email.trim().toLowerCase();
  const user = VALID_USERS[normalizedEmail];

  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }

  return {
    token: `fake-token-${Math.random().toString(36).slice(2)}`,
    user: {
      name: user.name,
      email: normalizedEmail,
      role: user.role,
    },
  };
};
