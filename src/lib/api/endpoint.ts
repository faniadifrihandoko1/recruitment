export const endpoints = {
  login: "/auth/login",
  register: "signup",
} as const;

export type ApiEndpoint = keyof typeof endpoints;

// Use NEXT_PUBLIC_ prefix for client-side access
const host = process.env.NEXT_PUBLIC_API_HOST || "";
export const API_BASE_PATH = "/api/v1";

export const getApi: (key: ApiEndpoint) => string = key => {
  return `${host}${API_BASE_PATH}/${endpoints[key]}`;
};
