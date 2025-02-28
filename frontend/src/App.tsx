import { useContext, useState } from "react";
import "./App.css";
import Explore from "./pages/Explore";
import { SnackbarProvider, snackbarStore } from "./stores/snackbarStore";
import setupInterceptor from "./utils/setupInterceptor";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import MainNavigation from "./components/MainNavigation";
import Sell from "./pages/Sell";
import Manage from "./pages/Manage";
import { AuthStateProvider, authStore } from "./stores/authStore";
import Read from "./pages/Read";

interface Props {
  children: React.ReactNode;
}

function InterceptorComponent({ children }: Props): React.ReactNode {
  const { setSnackbar } = useContext(snackbarStore);
  const { state: authState } = useContext(authStore);
  const [ran, setRan] = useState(false);

  // only run setup once
  if (!ran) {
    setupInterceptor(authState, setSnackbar);
    setRan(true);
  }
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <AuthStateProvider>
        <SnackbarProvider>
          <InterceptorComponent>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <MainNavigation />
                    <Outlet />
                  </>
                }
              >
                <Route index={true} element={<Explore />} />
                <Route path="read" element={<Read />} />
                <Route path="sell" element={<Sell />} />
                <Route path="manage" element={<Manage />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </InterceptorComponent>
        </SnackbarProvider>
      </AuthStateProvider>
    </BrowserRouter>
  );
}

export default App;
