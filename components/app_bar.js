/* eslint-disable quote-props */
import React from 'react';
import clsx from 'clsx';
import {fade, makeStyles, useTheme} from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SearchIcon from '@material-ui/icons/Search';
import PaletteIcon from '@material-ui/icons/Palette';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewListIcon from '@material-ui/icons/ViewList';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: { // 打开 Drawer 后 App Bar 的偏移
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: { // 打开 Drawer 的按钮
    marginRight: theme.spacing(2),
  },
  search: { // 搜索栏
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: { // 搜索栏图标
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: { // 搜索栏输入框
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: { // 桌面端 App Bar 的操作按钮
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: { // 移动端 App Bar 的操作按钮
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  const searchPlaceHolder = '搜索频道...';
  const themeLightLabel = '切换为暗色';
  const themeDarkLabel = '切换为亮色';
  const paletteLabel = '选择主题色';
  const viewListLabel = '排列为模块视图';
  const viewModuleLabel = '排列为列表视图';

  const classes = useStyles();
  const theme = useTheme();
  const [themeMode, setThemeMode] = React.useState(theme.palette.type);
  const [itemView, setItemView] = React.useState('module');
  const [open, setOpen] = React.useState(true);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleThemeModeSwitch = () => {
    setThemeMode(themeMode == 'light' ? 'dark' : 'light');
  };

  const handlePaletteOpen = () => {
    //
  };

  const handleItemViewSwitch = () => {
    setItemView(itemView == 'module' ? 'list' : 'module');
  };

  const renderThemeModeIconButton = (
    <IconButton color="inherit" onClick={handleThemeModeSwitch}>
      <Badge color="secondary">
        <DarkModeIcon />
      </Badge>
    </IconButton>
  );

  const renderPaletteIconButton = (
    <IconButton color="inherit" onClick={handlePaletteOpen}>
      <Badge color="secondary">
        <PaletteIcon />
      </Badge>
    </IconButton>
  );

  const renderItemViewIconButton = (
    <IconButton color="inherit" onClick={handleItemViewSwitch}>
      <Badge color="secondary">
        {itemView == 'module' ? <ViewModuleIcon /> : <ViewListIcon />}
      </Badge>
    </IconButton>
  );

  const renderMenuItems = (
    <div>
      <MenuItem onClick={handleThemeModeSwitch}>
        {renderThemeModeIconButton}
        <p>
          {themeMode == 'light' ? themeLightLabel : themeDarkLabel}
        </p>
      </MenuItem>
      <MenuItem onClick={handlePaletteOpen}>
        {renderPaletteIconButton}
        <p>{paletteLabel}</p>
      </MenuItem>
      <MenuItem onClick={handleItemViewSwitch}>
        {renderItemViewIconButton}
        <p>
          {itemView == 'module' ? viewModuleLabel : viewListLabel}
        </p>
      </MenuItem>
    </div>
  );

  const renderDesktopActions = (
    <div>
      {renderThemeModeIconButton}
      {renderPaletteIconButton}
      {renderItemViewIconButton}
    </div>
  );

  const menuId = 'app-bar-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={menuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {renderMenuItems}
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>{appName}</Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={searchPlaceHolder}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'search'}}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {renderDesktopActions}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ?
              <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ?
                  <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet.
          Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus
          id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus
          euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed
          ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
      </main>

      {renderMobileMenu}
    </div>
  );
}
