import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import "../Componets/Navbar.css";
import { useAuth } from "../AuthContextProvider";
import swal from "sweetalert";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { useEffect } from "react";
import { useProduct } from "../../Pages/HomePage/ProductContextProvider";

import Fade from "@mui/material/Fade";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const pages = [
  {
    name: "Главная",
    path: "/home",
    id: 1,
  },
  {
    name: "Добавить музыку",
    path: "/add",
    id: 2,
  },
  {
    name: "Сохраненные",
    path: "/saved",
    id: 3,
  },
];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser, logoutUser, deleteAccount } = useAuth();

  React.useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { fetchByParams } = useProduct();

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //search logic

  const { getMusic } = useProduct();

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = React.useState(searchParams.get("q") || "");

  useEffect(() => {
    getMusic();
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      q: search,
    });
  }, [search]);

  //Dropdown

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="ewfeef"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {pages.map(page => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => navigate(page.path)}>
                    {page.name}
                    <Menu
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}>
                      <FormControl className="filterBlocK">
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          defaultValue="all"
                          onChange={e =>
                            fetchByParams("genre", e.target.value)
                          }>
                          <FormControlLabel
                            className="filterButtons"
                            value="all"
                            control={<Radio />}
                            label="All"
                          />
                          <FormControlLabel
                            className="filterButtons"
                            value="Hiphop"
                            control={<Radio />}
                            label="Hiphop"
                          />
                          <FormControlLabel
                            className="filterButtons"
                            value="Funk"
                            control={<Radio />}
                            label="Funk"
                          />
                          <FormControlLabel
                            className="filterButtons"
                            value="Rock"
                            control={<Radio />}
                            label="Rock"
                          />
                          <FormControlLabel
                            className="filterButtons"
                            value="Disco"
                            control={<Radio />}
                            label="Disco"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Menu>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <div>
            <Button
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="white">
              Выбрать по жанру
            </Button>
          </div>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(page => (
              <Button
                key={page.id}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(page.path);
                }}
                sx={{ my: 2, color: "white", display: "block" }}>
                {page.name}
              </Button>
            ))}
          </Box>
          <input
            onChange={e => setSearch(e.target.value)}
            value={search}
            placeholder="Поиск.."
            className="input_search"></input>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" className="www">
                    {currentUser && currentUser.username}
                    {currentUser ? null : "Нет аккаунта"}
                  </Typography>
                </MenuItem>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {currentUser ? (
                <MenuItem>
                  <Typography
                    style={{ width: "150px", height: "30px" }}
                    onClick={() => {
                      swal({
                        title: "Вы уверены??",
                        text: "После удаления восстановление не возможно!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      }).then(willDelete => {
                        if (willDelete) {
                          swal({
                            icon: "success",
                            title: "оууу щиииит....",
                            text: "Аккаунт успешно удален!",
                          });
                          deleteAccount(currentUser.id);
                          // console.log("its working!");
                        } else {
                          swal("Фуух, аккаунт сохранен");
                        }
                      });
                    }}>
                    Удалить аккаунт
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={() => navigate("/login")}>
                  <Typography>Войти в аккаунт</Typography>
                </MenuItem>
              )}
              {currentUser ? (
                <MenuItem>
                  <Typography
                    style={{ width: "150px", height: "30px" }}
                    onClick={() => logoutUser()}>
                    Выйти с аккаунта
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={() => navigate("/register")}>
                  <Typography>Зарегистрироваться</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
