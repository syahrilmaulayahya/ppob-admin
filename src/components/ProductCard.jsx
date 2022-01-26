import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const ProductCard = (props) => {
  const { listProduct } = props;
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(listProduct?.name)
  const [price, setPrice] = useState(listProduct?.price)
  const [stocks, setStocks] = useState(listProduct?.stocks)
  const [description, setDescription] = useState(listProduct?.description)
  console.log(name,price,stocks,description)
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
          <Button size="small">Hapus</Button>
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
              onChange={(e)=>setName(e.target.value)}
            />
            <TextField
              id="outlined"
              label="Harga"
              name="price"
              defaultValue={listProduct?.price}
              onChange={(e)=>setPrice(e.target.value)}
            />
            <TextField
              id="outlined"
              label="Stock"
              name="stocks"
              defaultValue={listProduct?.stocks}
              onChange ={(e)=>setStocks(e.target.value)}
              type="number"
            />
            <TextField
              id="outlined"
              label="Description"
              name="description"
              defaultValue={listProduct?.description}
              onChange={(e)=>setDescription(e.target.value)}
            />
            <div>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: "15px" }}
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
        </Container>
      </Modal>
    </>
  );
};

export default ProductCard;
