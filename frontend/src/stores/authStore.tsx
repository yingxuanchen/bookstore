import { createContext, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface AuthState {
  username: string;
  roles: string[];
  jwt: string;
}

interface Action {
  type: "LOGIN" | "LOGOUT";
  payload?: AuthState | any;
}

const emptyState = {
  username: "",
  roles: [],
  jwt: "",
};

const getInitialState = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    const user = JSON.parse(userStr);
    return {
      username: user.username,
      roles: user.roles,
      jwt: user.jwt,
    };
  } else {
    return { ...emptyState };
  }
};

const authStore = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<Action>;
}>({ state: getInitialState(), dispatch: () => null });

const { Provider } = authStore;

const reducer = (_state: AuthState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { ...emptyState };
  }
};

interface Props {
  children: React.ReactNode;
}

function AuthStateProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);
  useEffect(() => {
    if (!state.jwt && location.pathname !== "/") {
      navigate("/");
    }
  }, [state]);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { authStore, AuthStateProvider };
