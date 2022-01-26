import {
  Button,
  Container,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import MuiAlert from "@mui/material/Alert";
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
const AddProduct = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(1);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  const { currentUser } = useSelector((state) => state.login);
  const [errMsg, setErrmsg] = useState("");
 
  
  const [getSubCat, setGetSubCat] = useState(null);
  const [subCategory, setSubCategory] = useState("");
  const [input, setInput] = useState({
    description: "",
    name: "",
    price: "",
    stocks: "",
    category_id: "",
    sub_category: "",
  });
  const handleChange = (event) => {
    setCategory(event.target.value);
    setInput({ ...input, category_id:event.target.value })
  };
  const addProduct = async (data) => {
    setLoading(true);
    try {
      await axios.post("https://api.stevenhoyo.co/v1/product/", data, {
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
  const handleAddProduct = ()=>{
    if (input.name==="" || !input.price==="" || !input.stocks==="" || !input.description==="" || input.category_id==="" || !input.sub_category ==="") {
      setErrmsg("Masih ada data yang kosong");
    } else {
      setErrmsg("");
      addProduct(input);
    }
  }
  const handleSubCategory = (event) => {
    setSubCategory(event.target.value);
    setInput({ ...input, sub_category:event.target.value })
  };
  console.log("Sub Category", subCategory);
  console.log("Input", input);

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
  useEffect(() => {
    const getSubCat = async () => {
      try {
        const res = await axios.get("https://api.stevenhoyo.co/v1/subcategory");
        console.log(res?.data?.data);
        setGetSubCat(res?.data?.data);
      } catch (err) {
        return err;
      }
    };
    getSubCat();
  }, []);


  return (
    <>
      <Tooltip title="add" aria-label="add" onClick={() => setOpen(true)}>
        <Fab color="primary" sx={{ position: "fixed", bottom: 20, right: 20 }}>
          <AddIcon />
        </Fab>
      </Tooltip>
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
            margin: "auto",
            overflow: "auto",
            [theme.breakpoints.down("sm")]: {
              width: "100vw",
              height: "100vh",
            },
          })}
        >
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
          >
            <Typography variant="h4">Tambah Produk</Typography>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={category}
                onChange={handleChange}
              >
                <MenuItem value={1}>Pulsa</MenuItem>
                <MenuItem value={2}>Voucher</MenuItem>
                <MenuItem value={3}>Listrik</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Sub Kategori
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={subCategory}
                onChange={(e) => handleSubCategory(e)}
              >
                {getSubCat?.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField id="outlined" label="Nama Produk" defaultValue={null} name="name" onChange={(e) => setInput({ ...input, name: e.target.value })} />
            <TextField id="outlined" label="Harga" defaultValue={null} name="price" type="number" onChange={(e) => setInput({ ...input, price: parseInt(e.target.value) })} />
            <TextField
              id="outlined"
              label="Stock"
              defaultValue={null}
              type="number"
              name="stocks"
              onChange={(e) => setInput({ ...input, stocks: parseInt(e.target.value) })}
            />
            <TextField id="outlined" label="Description" defaultValue={null}  name="description" onChange={(e) => setInput({ ...input, description: e.target.value })}/>
            <Typography sx={{ color: "error.main" }}>{errMsg}</Typography>
            <br/>
            <div>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: "15px" }}
                onClick={()=>handleAddProduct()}
              >
                Tambah
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
        </Container>
      </Modal>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Produk berhasil ditambahkan, silahkan refresh halaman
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddProduct;
