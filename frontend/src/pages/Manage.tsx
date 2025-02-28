import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import fetcher from "../utils/fetcher";
import { snackbarStore } from "../stores/snackbarStore";
import DeleteIcon from "@mui/icons-material/Delete";

const tabs = [
  { tabLabel: "Categories", url: "/categories", label: "Category" },
  { tabLabel: "Languages", url: "/languages", label: "Language" },
];

function Manage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const { setSnackbar } = useContext(snackbarStore);

  useEffect(() => {
    getData(0);
  }, []);

  const getData = useCallback(async (tabIndex: number) => {
    try {
      const res = await fetcher.get(`${tabs[tabIndex].url}`);
      setData([...res.data]);
    } catch (error) {
      throw error;
    }
  }, []);

  const handleTabChange = async (_event: React.SyntheticEvent, newValue: number) => {
    try {
      await getData(newValue);
      setTabIndex(newValue);
    } catch (error) {}
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    try {
      await fetcher.post(`${tabs[tabIndex].url}`, formJson);
      setSnackbar({ message: `${tabs[tabIndex].label} added successfully`, severity: "success", open: true });
      setOpenModal(false);
      getData(tabIndex);
    } catch (error) {}
  };

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleModalClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleSubmit,
          },
        }}
      >
        <DialogTitle>Add {tabs[tabIndex].label}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            variant="standard"
            fullWidth
            label={`${tabs[tabIndex].label} name`}
            name="name"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleTabChange}>
            {tabs.map((tab) => (
              <Tab label={tab.tabLabel} key={tab.tabLabel} />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ marginTop: 1 }}>
          <Button variant="outlined" sx={{ textAlign: "left" }} onClick={handleModalOpen}>
            Add {tabs[tabIndex].label}
          </Button>
          <List>
            {data.map((item) => (
              <ListItem
                key={item}
                disablePadding
                // secondaryAction={
                //   <IconButton edge="end" aria-label="delete">
                //     <DeleteIcon />
                //   </IconButton>
                // }
              >
                <ListItemButton>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
}

export default Manage;
