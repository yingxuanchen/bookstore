import { useContext, useState } from "react";
import "./App.css";
import Explore from "./pages/Explore";
import { SnackbarProvider, snackbarStore } from "./stores/snackbarStore";
import setupInterceptor from "./utils/setupInterceptor";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import Sell from "./pages/Sell";
import Manage from "./pages/Manage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <MainNavigation />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <Explore /> },
      { path: "sell", element: <Sell /> },
      { path: "manage", element: <Manage /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);

interface Props {
  children: React.ReactNode;
}

function InterceptorComponent({ children }: Props): React.ReactNode {
  const { setSnackbar } = useContext(snackbarStore);
  const [ran, setRan] = useState(false);

  // only run setup once
  if (!ran) {
    setupInterceptor(setSnackbar);
    setRan(true);
  }
  return <>{children}</>;
}

function App() {
  return (
    <SnackbarProvider>
      <InterceptorComponent>
        <RouterProvider router={router} />
      </InterceptorComponent>
    </SnackbarProvider>
  );
}

export default App;
