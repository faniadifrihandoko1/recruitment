// import axios from "axios";

// export const axiosInterceptor = axios.create();

// axiosInterceptor.interceptors.request.use(async config => {
//   const session = localStorage.getItem("token");

//   if (session) {
//     config.headers.Authorization = `Bearer ${session}`;
//   }

//   return config;
// });

import axios from "axios";
import { cookies } from "next/headers";

export const axiosServer = axios.create();

axiosServer.interceptors.request.use(async config => {
  const token = (await cookies()).get("session")?.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// handle modal expired token to redirect to login page
