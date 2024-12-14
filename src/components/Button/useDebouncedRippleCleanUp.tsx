import { useIsomorphicLayoutEffect } from 'hooks-react-custom';

const useDebouncedRippleCleanUp = (
  rippleCount: number,
  duration: number,
  cleanUpFunction: () => void,
) => {
  useIsomorphicLayoutEffect(() => {
    let bounce: any = null;
    if (rippleCount > 0) {
      bounce && clearTimeout(bounce);

      bounce = setTimeout(() => {
        cleanUpFunction();
        bounce && clearTimeout(bounce);
      }, duration * 4);
    }

    return () => void (bounce && clearTimeout(bounce));
  }, [rippleCount, duration, cleanUpFunction]);
};

export default useDebouncedRippleCleanUp;
