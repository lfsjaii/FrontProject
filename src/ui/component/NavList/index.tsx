import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useTheme} from "@mui/material/styles";
import {alpha, Button, Container, InputBase, Stack, styled} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {Dispatch, SetStateAction, useContext, useState} from "react";
import {UserData} from "../../../data/user/UserData.ts";
import CircularProgress from "@mui/material/CircularProgress";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import PlusIcon from "../../../img/outdoor-logo-design-including-mountains--trees--ca_preview_rev_1.png";
import LogoLight from "../../../img/logo-light.svg"
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '28ch',
            },
        },
    },
}));

const drawerWidth = 240;


const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

type Prop = {
    search?: string;
    setSearch?: Dispatch<SetStateAction<string>>
}


export default function NavList({search, setSearch}: Prop) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const loginUser = useContext<UserData | null | undefined>(LoginUserContext);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // const [drawOpen,setDrawOpen] = useState<boolean>(false);


    const navigate = useNavigate();

    const renderLoginUser = () => {

        if (loginUser) {
            const firstLetter = loginUser.email ? loginUser.email.charAt(0).toUpperCase() : '';
            return (
                <Stack direction="row">
                    <Box display="flex" alignItems="center" mr={2} ml={2}>
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar>{firstLetter}</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={() => {
                                    FirebaseAuthService.handleSignOut().then();
                                    handleCloseUserMenu();
                                }}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Stack>
            )
        } else if (loginUser === null) {
            return (
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => {
                        navigate("/login")
                    }}
                >
                    <AccountCircle/>
                </IconButton>
            )
        } else {
            return (
                <Box>
                    <CircularProgress color="inherit"/>
                </Box>
            )
        }
    }


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <React.Fragment>
            <AppBar variant="elevation" sx={{backgroundColor: "#122315"}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Button sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}><Link to="/" style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}><img src={PlusIcon} alt="Plus Icon" width={60} height={60}/></Link></Button>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <img src={LogoLight} alt="Logo light" width={60} height={60}/>
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{mr: 2, ...(open && {display: 'none'})}}
                            >
                                <MenuIcon/>
                            </IconButton>
                        </Box>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {/*<Link to="/" style={{textDecoration: 'none'}}>*/}
                            {/*    <Button sx={{my: 2, color: 'white', display: 'block'}}>*/}
                            {/*        Product Listing*/}
                            {/*    </Button>*/}
                            {/*</Link>*/}
                            {/*<Link to="/product/1/99" style={{textDecoration: 'none'}}>*/}
                            {/*    <Button sx={{my: 2, color: 'white', display: 'block'}}>*/}
                            {/*        Product Detail Page*/}
                            {/*    </Button>*/}
                            {/*</Link>*/}
                        </Box>
                        {/*<Button sx={{display: {xs: 'none', md: 'none', sm: 'block'}, mr: 1}}><Link to="/" style={{textDecoration: 'none', color: 'inherit'}}><img src={PlusIcon} alt="Plus Icon" width={100} height={100}/></Link></Button>*/}
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{'aria-label': 'search'}}
                                value={search}
                                onChange={(event) => {
                                    if (setSearch) {
                                        setSearch(event.target.value)
                                    }
                                }}
                            />
                        </Search>
                        {renderLoginUser()}
                        <IconButton size="large" color="inherit" onClick={() => {
                            if (loginUser) {
                                navigate("/shoppingcart");
                            } else {
                                navigate("/login");
                            }
                        }}>
                            <Badge color="error">
                                {/*badgeContent={3}*/}
                                <ShoppingCartOutlinedIcon/>
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
            {/*<ShoppingCartDrawer drawerOpen={drawOpen} setDrawerOpen={setDrawOpen}/>*/}
            <Toolbar/>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Button sx={{display: {md: 'flex'}, mr: 3}}><Link to="/" style={{
                        textDecoration: 'none',
                        color: 'inherit'
                    }}><img src={PlusIcon} alt="Plus Icon" width={100} height={100}/></Link></Button>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {['Product Listing'].map((text) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton component={Link} to="/">
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
            </Drawer>
        </React.Fragment>
    )
}