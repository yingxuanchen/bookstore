import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BookForm } from "../types/types";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import fetcher from "../utils/fetcher";
import { snackbarStore } from "../stores/snackbarStore";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [categories, setCategories] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(snackbarStore);
  const navigate = useNavigate();

  const {
    register,
    getValues,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookForm>();

  useEffect(() => {
    getCategories();
    getLanguages();
  }, []);

  const getCategories = useCallback(async () => {
    try {
      const res = await fetcher.get(`/categories`);
      setCategories([...res.data]);
    } catch (error) {}
  }, []);

  const getLanguages = useCallback(async () => {
    try {
      const res = await fetcher.get(`/languages`);
      setLanguages([...res.data]);
    } catch (error) {}
  }, []);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    const num = parseInt(value, 10) || 0;
    setValue("price", (num / 100).toFixed(2));
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const onSubmit: SubmitHandler<BookForm> = (data) => {
    setOpenModal(true);
  };

  const handleConfirmSubmit = () => {
    handleSubmit(async (data) => {
      try {
        await fetcher.post(`books`, data);
        setSnackbar({ message: `Book added successfully`, severity: "success", open: true });
        navigate("/");
      } catch (error) {}
    })();
  };

  return (
    <>
      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>Are you sure to put this book up for sale at ${getValues("price")}?</DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirmSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ width: "50%", margin: "0 auto" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            <TextField
              variant="standard"
              label="Title"
              {...register("title", { required: "Title is required" })}
              error={errors.title ? true : false}
              helperText={errors.title?.message}
            />
            <TextField
              variant="standard"
              label="Author"
              {...register("author", { required: "Author is required" })}
              error={errors.author ? true : false}
              helperText={errors.author?.message}
            />
            <TextField variant="standard" label="Description" multiline {...register("description")} />
            <TextField
              variant="standard"
              label="Year of publish"
              multiline
              {...register("yearOfPublish", {
                required: "Year of publish is required",
                pattern: { value: /^\d{4}$/, message: "Must be 4 digits, e.g. 1989" },
              })}
              error={errors.yearOfPublish ? true : false}
              helperText={errors.yearOfPublish?.message}
            />
            <Controller
              name="bookLanguage"
              control={control}
              rules={{ required: "Language is required" }}
              render={({ field: { ref, onChange, value, ...field } }) => (
                <Autocomplete
                  disablePortal
                  disableClearable
                  options={languages}
                  onChange={(_, data) => onChange(data)}
                  value={value ?? null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      inputRef={ref}
                      label="Language"
                      variant="standard"
                      error={errors.bookLanguage ? true : false}
                      helperText={errors.bookLanguage?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="categories"
              control={control}
              defaultValue={[]}
              rules={{ required: "Categories is required" }}
              render={({ field: { ref, onChange, value, ...field } }) => (
                <Autocomplete
                  multiple
                  disablePortal
                  disableClearable
                  options={categories}
                  onChange={(_, data) => onChange(data)}
                  value={value}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      inputRef={ref}
                      label="Categories"
                      variant="standard"
                      error={errors.categories ? true : false}
                      helperText={errors.categories?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              render={({ field: { ref, onChange, value, ...field } }) => (
                <Autocomplete
                  multiple
                  freeSolo
                  disablePortal
                  disableClearable
                  options={[]}
                  onChange={(_, data) => onChange(data)}
                  value={value}
                  renderInput={(params) => (
                    <TextField {...params} {...field} inputRef={ref} label="Tags" variant="standard" />
                  )}
                />
              )}
            />
            <TextField
              variant="standard"
              label="Price"
              {...register("price", { value: "0.00", onChange: handlePriceChange })}
            />
          </Stack>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Add book
          </Button>
        </form>
      </Box>
    </>
  );
}

export default AddBook;
