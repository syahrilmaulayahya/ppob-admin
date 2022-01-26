import {
  AppBar,
  Box,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Login from "./Login";

const Dashboard = () => {
  const drawerWidth = 240;
  const { currentUser } = useSelector((state) => state.login);
  console.log(currentUser?.data?.role)
  if(currentUser?.data?.role !== "admin"){
    return(
      <Login/>
    )
  }
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />

          <Typography>
            Laporan penjualan hari ini bisa diunduh <Link href="https://app.stevenhoyo.co/static/report.csv">disini</Link>{" "}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
