import { useEffect, useCallback, useState } from 'react';

export default () => {
  const [isScaleScreen, setIsScaleScreen] = useState({
    transform: `scale(1)`,
    scale: 0,
  });

  const onWidthChange = useCallback(() => {
    const { innerWidth } = window;
    setIsScaleScreen({
      transform: `scale(${innerWidth / 1920})`,
      scale: innerWidth / 1920,
    });

    console.log(innerWidth / 1920, 'innerWidth / 1920');
  }, [window.innerWidth]);

  useEffect(() => {
    onWidthChange();
    window.addEventListener('resize', onWidthChange);
    return () => {
      window.removeEventListener('resize', onWidthChange);
    };
  }, []);

  return { isScaleScreen };
};
