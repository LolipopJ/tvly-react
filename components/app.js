/* eslint-disable quote-props */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {fade, makeStyles, useTheme} from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
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
import Hidden from '@material-ui/core/Hidden';
import Popover from '@material-ui/core/Popover';
import PopupState, {bindTrigger, bindPopover} from 'material-ui-popup-state';

import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import PaletteIcon from '@material-ui/icons/Palette';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewListIcon from '@material-ui/icons/ViewList';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import HdIcon from '@material-ui/icons/Hd';
import StarsIcon from '@material-ui/icons/Stars';
import RadioIcon from '@material-ui/icons/Radio';
import FavoriteIcon from '@material-ui/icons/Favorite';

import ColorPicker from './app/colorPicker';
import channelFilter from '../assets/channelFilter';

const drawerWidth = 240;

const appName = process.env.NEXT_PUBLIC_APP_NAME;
const themeLightLabel = '切换为暗色';
const themeDarkLabel = '切换为亮色';
const paletteLabel = '选择主题色';
const viewListLabel = '排列为模块视图';
const viewModuleLabel = '排列为列表视图';
const defaultChannelView = 'module';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  appBarTitle: {
    cursor: 'pointer',
  },
  menuButton: { // 打开 Drawer 的按钮
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
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
  drawer: { // 抽屉
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerDivider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: { // 主要内容
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App(props) {
  const searchPlaceHolder = props.filter && props.filter != 'start' ?
      '在' + props.filter + '中搜索...' : '搜索频道...';

  const {window, switchThemePaletteType, selectThemePalettePrimary} = props;
  const container = window !== undefined ?
      () => window().document.body : undefined;

  const classes = useStyles();
  const theme = useTheme();
  const [themeMode, setThemeMode] = React.useState(theme.palette.type);
  const [itemView, setItemView] = React.useState(defaultChannelView);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  React.useEffect(() => { // 页面渲染完成后更新 itemView 值为 localStorage 中的值
    setItemView(localStorage.itemView ?
        localStorage.itemView : defaultChannelView);
  }, []);

  const handleDrawerToggle = () => { // 打开或关闭抽屉
    setMobileOpen(!mobileOpen);
  };

  const handelDrawerClose = () => { // 关闭抽屉
    setMobileOpen(false);
  };

  const handleMobileMenuOpen = (event) => { // 打开移动端的操作菜单
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => { // 关闭移动端的操作菜单
    setMobileMoreAnchorEl(null);
  };

  const handleThemeModeSwitch = () => { // 点击切换深色/浅色主题颜色
    setThemeMode(themeMode == 'light' ? 'dark' : 'light');
    switchThemePaletteType();
  };

  const handleItemViewSwitch = () => { // 点击切换 IPTV 节目展示方式
    itemView == 'module' ?
        localStorage.itemView = 'list' :
        localStorage.itemView = 'module';
    setItemView(itemView == 'module' ? 'list' : 'module');
  };

  /**
   * 渲染切换深色/浅色主题颜色按钮
   */
  const renderThemeModeIconButton = (
    <IconButton color="inherit" onClick={handleThemeModeSwitch}>
      <Badge color="secondary">
        <DarkModeIcon />
      </Badge>
    </IconButton>
  );

  /**
   * 渲染桌面端主题颜色选择器按钮
   */
  const colorPickerPopupId = 'app-theme-color-picker-popup';
  const renderDesktopColorPickerButton = (
    <PopupState variant="popover" popupId={colorPickerPopupId}>
      {(popupState) => (
        <div>
          <IconButton
            {...bindTrigger(popupState)}
            color="inherit"
          >
            <Badge color="secondary">
              <PaletteIcon />
            </Badge>
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={2}>
              <ColorPicker
                selectThemePalettePrimary={selectThemePalettePrimary}
              />
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );

  // eslint-disable-next-line valid-jsdoc
  /**
   * 渲染移动端主题颜色选择操作菜单项
   */
  const renderMobileColorPickerMenuItem = (
    <PopupState variant="popover" popupId={colorPickerPopupId}>
      {(popupState) => (
        <div>
          <MenuItem {...bindTrigger(popupState)}>
            <IconButton
              color="inherit"
            >
              <Badge color="secondary">
                <PaletteIcon />
              </Badge>
            </IconButton>
            <p>{paletteLabel}</p>
          </MenuItem>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={2}>
              <ColorPicker
                selectThemePalettePrimary={selectThemePalettePrimary}
              />
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );

  /**
   * 渲染切换 IPTV 节目展示方式按钮
   */
  const renderItemViewIconButton = (
    <IconButton color="inherit" onClick={handleItemViewSwitch}>
      <Badge color="secondary">
        {itemView == 'module' ? <ViewModuleIcon /> : <ViewListIcon />}
      </Badge>
    </IconButton>
  );

  /**
   * 渲染移动端菜单中的操作按钮
   */
  const renderMenuItems = (
    <div>
      <MenuItem onClick={handleThemeModeSwitch}>
        {renderThemeModeIconButton}
        <p>
          {themeMode == 'light' ? themeLightLabel : themeDarkLabel}
        </p>
      </MenuItem>
      {renderMobileColorPickerMenuItem}
      <MenuItem onClick={handleItemViewSwitch}>
        {renderItemViewIconButton}
        <p>
          {itemView == 'module' ? viewModuleLabel : viewListLabel}
        </p>
      </MenuItem>
    </div>
  );

  /**
   * 渲染桌面端的操作按钮
   */
  const renderDesktopActions = (
    <div className={classes.sectionDesktop}>
      {renderThemeModeIconButton}
      {renderDesktopColorPickerButton}
      {renderItemViewIconButton}
    </div>
  );

  /**
   * 渲染移动端的操作按钮及菜单
   */
  const menuId = 'app-bar-menu-mobile';
  const renderMobileActionsMenu = (
    <div className={classes.sectionMobile}>
      <IconButton
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
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
    </div>
  );

  /**
   * 根据抽屉列表元素的 type 返回对应 Icon 组件
   * @param {string} type 元素的类型
   * @return {component}
   */
  function renderDrawerListItemIcon(type) {
    switch (type) {
      case 'all':
        return <LiveTvIcon />;
      case 'hd':
        return <HdIcon />;
      case 'radio':
        return <RadioIcon />;
      case 'star':
        return <StarsIcon />;
      case 'favorite':
        return <FavoriteIcon />;
      default:
        return null;
    }
  }

  /**
   * 根据抽屉列表元素的 divider 值在该列表项的下方渲染分割线
   * @param {boolean} divider 组件是否在该元素下方渲染
   * @return {component}
   */
  function renderDrawerListItemDivider(divider) {
    if (divider) {
      return <Divider className={classes.drawerDivider} />;
    } else {
      return null;
    }
  }

  /**
   * 渲染抽屉
   */
  const renderDrawer = (
    <div>
      <div className={classes.toolbar}>

      </div>
      <Divider />
      <List>
        {channelFilter.map((item) => (
          <div key={item.filter}>
            <Link href={'/channel/' + item.filter}>
              <ListItem
                button
                selected={props.filter === item.filter}
                onClick={handelDrawerClose}
              >
                <ListItemIcon>
                  {renderDrawerListItemIcon(item.type)}
                </ListItemIcon>
                <ListItemText primary={item.filter} />
              </ListItem>
            </Link>
            {renderDrawerListItemDivider(item.divider)}
          </div>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Link href="/channel/start">
            <Typography
              variant="h6"
              noWrap
              className={classes.appBarTitle}
            >{appName}</Typography>
          </Link>

          <div className={classes.grow} />

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

          {renderDesktopActions}

          {renderMobileActionsMenu}

        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {renderDrawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {renderDrawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
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
    </div>
  );
}

App.propTypes = {
  window: PropTypes.func,
  filter: PropTypes.string,
  switchThemePaletteType: PropTypes.func,
  selectThemePalettePrimary: PropTypes.func,
};

export default App;
