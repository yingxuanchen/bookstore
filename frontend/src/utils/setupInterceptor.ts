import fetcher from "./fetcher";
import { SetStateAction } from "react";
import { SnackbarState } from "../stores/snackbarStore";
import { AuthState } from "../stores/authStore";

const setupInterceptor = (authState: AuthState, setSnackbar: React.Dispatch<SetStateAction<SnackbarState>>) => {
  fetcher.interceptors.request.use(
    (request) => {
      if (authState.jwt) {
        request.headers.Authorization = `Bearer ${authState.jwt}`;
      }
      return request;
    },
    (error) => Promise.reject(error)
  );

  fetcher.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      setSnackbar({ message: error.response?.data?.error || "Unknown error", severity: "error", open: true });
      return Promise.reject(error);
    }
  );
};

export default setupInterceptor;
