import { SubmitHandler, useForm } from "react-hook-form";
import { SignupForm } from "../types/types";
import { Button, Checkbox, DialogActions, DialogContent, FormControlLabel, Stack, TextField } from "@mui/material";
import fetcher from "../utils/fetcher";
import { useContext } from "react";
import { authStore } from "../stores/authStore";
import { snackbarStore } from "../stores/snackbarStore";

interface Props {
  onClose: () => void;
}

function SignupFormComponent({ onClose }: Props) {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>();

  const { dispatch: dispatchAuth } = useContext(authStore);
  const { setSnackbar } = useContext(snackbarStore);

  const onSubmit: SubmitHandler<SignupForm> = (_data) => {
    handleSubmit(async (data) => {
      try {
        const res = await fetcher.post(`signup`, data);
        setSnackbar({ message: `Signed up successfully`, severity: "success", open: true });
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
          <TextField
            variant="standard"
            label="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              validate: (value) => value === getValues("password") || "Password entered is different from above",
            })}
            error={errors.confirmPassword ? true : false}
            helperText={errors.confirmPassword?.message}
          />
          <TextField
            variant="standard"
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
          />
          <FormControlLabel control={<Checkbox {...register("isSeller")} />} label="Do you want to sell books?" />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" autoFocus>
          Sign Up
        </Button>
      </DialogActions>
    </form>
  );
}

export default SignupFormComponent;
