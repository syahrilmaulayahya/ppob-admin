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
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Dashboard from "@mui/icons-material/Dashboard";
import ChatIcon from "@mui/icons-material/Chat";

const Sidebar = () => {
  const drawerWidth = 240;

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
        {["Dashboard", "Product", "Chat"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index === 0 ? (
                <Dashboard />
              ) : index === 1 ? (
                <Inventory2Icon />
              ) : (
                <ChatIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
