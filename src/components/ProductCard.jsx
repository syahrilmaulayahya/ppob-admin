import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";

const ProductCard = (props) => {
  const [openAlert, setOpenAlert] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [openAlert1, setOpenAlert1] = useState(false);
  const Alert1 = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const { listProduct } = props;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    id: listProduct?.id,
    description: listProduct?.description,
    name: listProduct?.name,
    price: listProduct?.price,
    stocks: listProduct?.stocks,
  });
  console.log(listProduct?.id);
  console.log(input);
  const [errMsg, setErrmsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useSelector((state) => state.login);
  const editProduct = async (data) => {
    setLoading(true);
    try {
      await axios.put(`https://api.stevenhoyo.co/v1/product/`, data, {
        headers: { Authorization: `Bearer ${currentUser?.data?.token}` },
      });
      setOpenAlert(true);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data);
      setError(err);
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!input.name || !input.price || !input.stocks || !input.description) {
      setErrmsg("Masih ada data yang kosong");
    } else {
      setErrmsg("");
      editProduct(input);
    }
  };
  const handleDelete = (id) => {
    const deleteProduct = async () => {
      setLoading(true);
      try {
        await axios.delete(`https://api.stevenhoyo.co/v1/product/${id}`, {
          headers: { Authorization: `Bearer ${currentUser?.data?.token}` },
        });
        setOpenAlert1(true);
      } catch (err) {
        return err;
      }
    };
    deleteProduct();
  };
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="300"
          image={listProduct?.link}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {listProduct?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Stock : {listProduct?.stocks}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setOpen(true)}>
            Edit
          </Button>
          <Button size="small" onClick={() => handleDelete(listProduct?.id)}>
            Hapus
          </Button>
        </CardActions>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)}>
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
            overflow: "auto",
            margin: "auto",
            [theme.breakpoints.down("sm")]: {
              width: "100vw",
              height: "100vh",
            },
          })}
        >
          {loading ? (
            <Box sx={{ m: 1 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <Typography variant="h4">Edit Produk</Typography>
              <TextField
                disabled
                id="outlined-disabled"
                label="Kategori"
                defaultValue={listProduct?.category}
              />

              <TextField
                disabled
                id="outlined-disabled"
                label="Sub Kategori"
                defaultValue={listProduct?.sub_category}
              />
              <TextField
                id="outlined"
                label="Nama Produk"
                name="name"
                defaultValue={listProduct?.name}
                onChange={(e) => setInput({ ...input, name: e.target.value })}
              />
              <TextField
                id="outlined"
                label="Harga"
                name="price"
                defaultValue={listProduct?.price}
                onChange={(e) =>
                  setInput({ ...input, price: parseInt(e.target.value) })
                }
                type="number"
              />
              <TextField
                id="outlined"
                label="Stock"
                name="stocks"
                defaultValue={listProduct?.stocks}
                onChange={(e) =>
                  setInput({ ...input, stocks: parseInt(e.target.value) })
                }
                type="number"
              />
              <TextField
                id="outlined"
                label="Description"
                name="description"
                defaultValue={listProduct?.description}
                onChange={(e) =>
                  setInput({ ...input, description: e.target.value })
                }
              />
              <Typography sx={{ color: "error.main" }}>{errMsg}</Typography>
              <br />
              <div>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: "15px" }}
                  onClick={() => handleSubmit()}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </Box>
          )}
        </Container>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Berhasil diedit, silahkan refresh halaman
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlert1}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert1 onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Sukses delete produk, silahkan referesh halaman
        </Alert1>
      </Snackbar>
    </>
  );
};

export default ProductCard;
