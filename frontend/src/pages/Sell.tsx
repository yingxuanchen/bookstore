import { Button } from "@mui/material";
import { useState } from "react";
import AddBook from "./AddBook";

function Sell() {
  const [step, setStep] = useState(0);

  return (
    <>
      {step === 0 && (
        <Button variant="contained" onClick={() => setStep(1)}>
          Add book
        </Button>
      )}
      {step === 1 && <AddBook />}
    </>
  );
}

export default Sell;
