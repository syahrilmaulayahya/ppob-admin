import {
  AppBar,
  Box,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { loginSuccess } from "../redux/loginSlice";

const Dashboard = () => {
  const drawerWidth = 240;
  const { currentUser } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  if (currentUser?.data?.role !== "admin") {
    dispatch(loginSuccess(null));
    return <Navigate to="/login" />;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
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
            Laporan penjualan hari ini bisa diunduh{" "}
            <Link href="https://app.stevenhoyo.co/static/report.csv">
              disini
            </Link>{" "}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
