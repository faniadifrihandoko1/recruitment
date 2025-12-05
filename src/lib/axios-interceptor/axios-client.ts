import { setOpenUnauthorizedModal } from "@/context/unauthorized-modal-context";
import axios from "axios";

export const axiosClient = axios.create();

axiosClient.interceptors.request.use(async config => {
  const session = localStorage.getItem("token");

  if (session) {
    config.headers.Authorization = `Bearer ${session}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  response => response,
  error => {
    // Check if error is Unauthorized (401 status or message)
    const isUnauthorized =
      // (error.response?.status === 401 &&
      //   error.response?.data?.message === "Unauthorized") ||
      error.response?.data?.error?.details?.type === "Unauthorized";

    if (isUnauthorized) {
      // Trigger unauthorized modal
      setOpenUnauthorizedModal();
    }

    return Promise.reject(error);
  }
);
