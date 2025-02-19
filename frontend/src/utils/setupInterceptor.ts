import fetcher from "./fetcher";
import { SetStateAction } from "react";
import { SnackbarState } from "../stores/snackbarStore";

const setupInterceptor = (setSnackbar: React.Dispatch<SetStateAction<SnackbarState>>) => {
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
