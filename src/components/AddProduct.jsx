import {
  Button,
  Container,
  Fab,
  Modal,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useState } from "react";
import { Box } from "@mui/system";
import MuiAlert from "@mui/material/Alert";
import React from "react";
const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  return (
    <>
      <Tooltip title="add" aria-label="add" onClick={() => setOpen(true)}>
        <Fab color="primary" sx={{ position: "fixed", bottom: 20, right: 20 }}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal open={open} onClose={()=>setOpen(false)}>
        <Container
          sx={(theme) => ({
            width: 500,
            height: 550,
            backgroundColor: "white",
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            margin: "auto",
            [theme.breakpoints.down("sm")]: {
              width: "100vw",
              height: "100vh",
            },
          })}
        >
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
             <Typography variant="h4">Tambah Produk</Typography>
            <TextField
              id="outlined"
              label="Kategori"
              defaultValue={null}
            />

            <TextField
              id="outlined"
              label="Sub Kategori"
              defaultValue={null}
            />
             <TextField
              
              id="outlined"
              label="Nama Produk"
              defaultValue={null}
            />
            <TextField
              
              id="outlined"
              label="Harga"
              defaultValue={null}
            />
            <TextField
              
              id="outlined"
              label="Stock"
              defaultValue={null}
              type="number"
            />
             <TextField
              
              id="outlined"
              label="Description"
              defaultValue={null}
            />
            <div>
            <Button variant="outlined" color = "primary" style={{marginRight:"15px"}}>Tambah</Button>
            <Button variant="outlined" color = "secondary" onClick={() => setOpen(false)}>Cancel</Button>
            </div>
          </Box>
        </Container>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddProduct;
