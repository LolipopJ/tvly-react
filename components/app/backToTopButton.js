import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      right: theme.spacing(1),
    },
  },
}));

export default function BackToTopButton() {
  const classes = useStyles();
  const theme = useTheme();

  const [btnVisible, setBtnVisible] = React.useState(false);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  React.useEffect(() => {
    document.addEventListener('scroll', handleScroll, true);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [btnVisible]);

  // TODO: 使用节流函数增加性能
  const handleScroll = () => { // 处理滚动事件
    const scrollTop = window.pageYOffset;

    // 当滚动的距离大于 300 时，显示按钮
    if (scrollTop > 300) {
      setBtnVisible(true);
    } else {
      setBtnVisible(false);
    }
  };

  const handleBackToTop = () => { // 把页面滚动到页面顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Zoom
        in={btnVisible}
        timeout={transitionDuration}
        unmountOnExit
      >
        <Fab
          className={classes.fab}
          color="primary"
          aria-label="backToTop"
          onClick={handleBackToTop}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </>
  );
}
