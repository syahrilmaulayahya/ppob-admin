import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import Dashboard from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";
import { Inventory2 } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const drawerWidth = 240;
  const navigate = useNavigate()

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",
          marginTop: 3,
          marginBottom: 0,
        }}
      >
        <Avatar sx={{ marginBottom: 2, width: 100, height: 100 }} />
        <Typography>Administrator</Typography>
      </Box>
      <Toolbar />

      <Divider />
      <List>
        <ListItem button onClick={()=>navigate('/')}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={()=>navigate('/product')}>
          <ListItemIcon>
            <Inventory2 />
          </ListItemIcon>
          <ListItemText primary="Product" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
