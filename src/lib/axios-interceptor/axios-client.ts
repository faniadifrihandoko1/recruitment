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
      error.response?.status === 401 &&
      error.response?.data?.message === "Unauthorized";

    console.log("err");
    console.log("error.response?.status", error.response?.status);
    console.log("error.response?.data?.message", error.response?.data?.message);
    console.log("error.response", error.response);
    console.log("error", error);
    console.log(
      "error.response?.status === 401",
      error.response?.status === 401
    );
    console.log(
      "error.response?.data?.message === 'Unauthorized'",
      error.response?.data?.message === "Unauthorized"
    );
    console.log(
      "error.response?.status === 401 && error.response?.data?.message === 'Unauthorized'",
      error.response?.status === 401 &&
        error.response?.data?.message === "Unauthorized"
    );

    if (isUnauthorized) {
      // Trigger unauthorized modal
      setOpenUnauthorizedModal();
    }

    return Promise.reject(error);
  }
);
