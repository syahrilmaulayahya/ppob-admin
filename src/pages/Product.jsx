import {
  AppBar,

  CircularProgress,

  CssBaseline,
  FormControl,

  Grid,
  InputLabel,
  MenuItem,


  Select,

  Toolbar,
  Typography,
} from "@mui/material";

import Box from "@mui/material/Box";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddProduct from "../components/AddProduct";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
const Product = () => {
  const drawerWidth = 240;
  const [category, setCategory] = useState(1);
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
 
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.stevenhoyo.co/v1/product/${category}`
        );
        setProduct(res?.data?.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    getProduct();
  }, [category]);

  return (
      <>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Product
          </Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />

        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
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

        <Box sx={{ width: 900, margin: "auto", marginTop: 3 }}>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography>Terjadi kesalahan, coba lagi beberapa saat</Typography>
          ) : (
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 2, sm: 2, md: 2 }}
            >
              {product?.map((item) => (
                <Grid key={item?.id} item xs={4}>
                  <ProductCard key={item?.id} listProduct={item}/>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
      <AddProduct/>
    </Box>
   
    </>
  );
};

export default Product;
