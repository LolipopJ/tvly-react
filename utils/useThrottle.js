import React from 'react';

/**
 * 基于 Hook 的节流函数
 * @param {function} fn 需要绑定节流操作的函数
 * @param {number} delay 节流的时间
 * @param {*} dep ……
 * @return {useCallback}
 */
export default function useThrottle(fn, delay, dep = []) {
  const {current} = React.useRef({fn, timer: null});

  React.useEffect(function() {
    current.fn = fn;
  }, [current, fn]);

  return React.useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer;
      }, delay);
      current.fn.call(this, ...args);
    }
  }, dep);
}
