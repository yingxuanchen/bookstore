import { SubmitHandler, useForm } from "react-hook-form";
import { LoginForm } from "../types/types";
import { Button, DialogActions, DialogContent, Stack, TextField } from "@mui/material";
import fetcher from "../utils/fetcher";
import { useContext } from "react";
import { authStore } from "../stores/authStore";

interface Props {
  onClose: () => void;
}

function LoginFormComponent({ onClose }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const { dispatch: dispatchAuth } = useContext(authStore);

  const onSubmit: SubmitHandler<LoginForm> = (_data) => {
    handleSubmit(async (data) => {
      try {
        const res = await fetcher.post(`login`, data);
        dispatchAuth({ type: "LOGIN", payload: res.data });
        onClose();
      } catch (error) {}
    })();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <Stack spacing={1}>
          <TextField
            variant="standard"
            label="Username"
            {...register("username", { required: "Username is required" })}
            error={errors.username ? true : false}
            helperText={errors.username?.message}
          />
          <TextField
            variant="standard"
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" autoFocus>
          Login
        </Button>
      </DialogActions>
    </form>
  );
}

export default LoginFormComponent;
