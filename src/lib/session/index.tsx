"use server";
import { cookies } from "next/headers";

// set session to cookie
export const setSession = async (token: any) => {
  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
};

export const getSession = async (): Promise<string | null> => {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  const user = JSON.parse(session);

  return user;
};

export const removeSession = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete("session");
};
