import { Dialog, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import LoginFormComponent from "./LoginFormComponent";
import SignupFormComponent from "./SignupFormComponent";

const tabs = [
  { id: "login", label: "Login" },
  { id: "signup", label: "Sign Up" },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

function LoginModal({ open, onClose }: Props) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = async (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          {tabs.map((tab) => (
            <Tab label={tab.label} key={tab.id} />
          ))}
        </Tabs>
      </Box>
      {tabs[tabIndex].id === "login" ? (
        <LoginFormComponent onClose={onClose} />
      ) : (
        <SignupFormComponent onClose={onClose} />
      )}
    </Dialog>
  );
}

export default LoginModal;
